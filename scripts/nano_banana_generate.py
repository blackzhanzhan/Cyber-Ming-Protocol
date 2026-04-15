#!/usr/bin/env python3
from __future__ import annotations

import argparse
import base64
import io
import json
import mimetypes
import os
import sys
import urllib.parse
from pathlib import Path

import requests
from PIL import Image


def load_dotenv(dotenv_path: Path) -> None:
    if not dotenv_path.exists():
        return
    for raw_line in dotenv_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


def file_to_inline_part(image_path: Path, max_dim: int | None) -> dict:
    mime_type = mimetypes.guess_type(str(image_path))[0] or "image/png"
    image_bytes = image_path.read_bytes()

    if max_dim:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGBA")
        width, height = image.size
        longest = max(width, height)
        if longest > max_dim:
            ratio = max_dim / float(longest)
            image = image.resize(
                (max(1, int(width * ratio)), max(1, int(height * ratio))),
                Image.Resampling.LANCZOS,
            )
        output = io.BytesIO()
        image.save(output, format="PNG", optimize=True)
        image_bytes = output.getvalue()

    return {
        "inlineData": {
            "mimeType": mime_type,
            "data": base64.b64encode(image_bytes).decode("ascii"),
        }
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate an image with Nano Banana via Gemini-compatible API.")
    parser.add_argument("--prompt", required=True, help="Text prompt for image generation.")
    parser.add_argument("--reference", action="append", default=[], help="Reference image path; may be repeated.")
    parser.add_argument("--out", required=True, help="Output PNG path.")
    parser.add_argument("--dotenv", default=".env.local", help="Optional dotenv file to load before reading env vars.")
    parser.add_argument("--temperature", type=float, default=0.4, help="Generation temperature.")
    parser.add_argument("--base-url", default=None, help="Override API base URL.")
    parser.add_argument("--model", default=None, help="Override model name.")
    parser.add_argument("--emit-json", action="store_true", help="Print response metadata as JSON.")
    parser.add_argument("--reference-max-dim", type=int, default=768, help="Downscale references before upload.")
    args = parser.parse_args()

    load_dotenv(Path(args.dotenv))

    api_key = os.environ.get("NANO_BANANA_API_KEY")
    if not api_key:
        raise SystemExit("Missing NANO_BANANA_API_KEY. Put it in environment or .env.local.")

    base_url = args.base_url or os.environ.get("NANO_BANANA_BASE_URL", "https://new.apipudding.com")
    model = args.model or os.environ.get("NANO_BANANA_MODEL", "[官逆C]Nano banana 2")
    url = f"{base_url}/v1beta/models/{urllib.parse.quote(model, safe='')}:generateContent"

    parts = [{"text": args.prompt}]
    for reference in args.reference:
        ref_path = Path(reference).expanduser().resolve()
        if not ref_path.exists():
            raise SystemExit(f"Reference image not found: {ref_path}")
        parts.append(file_to_inline_part(ref_path, args.reference_max_dim))

    payload = {
        "contents": [{"parts": parts}],
        "generationConfig": {
            "temperature": args.temperature,
            "responseModalities": ["TEXT", "IMAGE"],
        },
    }

    response = requests.post(
        url,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json=payload,
        timeout=240,
    )

    if response.status_code != 200:
        sys.stderr.write(response.text + "\n")
        raise SystemExit(f"Generation failed with status {response.status_code}")

    data = response.json()
    image_written = False
    output_path = Path(args.out).expanduser().resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)

    for part in (data.get("candidates") or [{}])[0].get("content", {}).get("parts", []):
        node = part.get("inlineData") or part.get("inline_data")
        if not node:
            continue
        image_bytes = base64.b64decode(node["data"])
        output_path.write_bytes(image_bytes)
        image_written = True
        break

    if not image_written:
        raise SystemExit("No image payload returned from API.")

    if args.emit_json:
        print(
            json.dumps(
                {
                    "model": model,
                    "base_url": base_url,
                    "out": str(output_path),
                    "references": [str(Path(p).expanduser()) for p in args.reference],
                },
                ensure_ascii=False,
                indent=2,
            )
        )
    else:
        print(str(output_path))

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
