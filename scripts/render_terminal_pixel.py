#!/usr/bin/env python3
from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


RESET = "\x1b[0m"


def rgb_fg(rgb: tuple[int, int, int]) -> str:
    return f"\x1b[38;2;{rgb[0]};{rgb[1]};{rgb[2]}m"


def rgb_bg(rgb: tuple[int, int, int]) -> str:
    return f"\x1b[48;2;{rgb[0]};{rgb[1]};{rgb[2]}m"


def parse_specs(items: list[str]) -> list[tuple[str, Path]]:
    result = []
    for item in items:
        if "=" not in item:
            raise SystemExit(f"Invalid --image value: {item}. Expected label=path")
        label, raw_path = item.split("=", 1)
        result.append((label, Path(raw_path).expanduser().resolve()))
    return result


def pixel_block_lines(image_path: Path, width: int) -> list[str]:
    image = Image.open(image_path).convert("RGBA")
    bbox = image.getbbox()
    if bbox:
        image = image.crop(bbox)
    aspect = image.height / image.width if image.width else 1
    target_width = width
    target_height = max(2, int(target_width * aspect))
    if target_height % 2 == 1:
        target_height += 1
    image = image.resize((target_width, target_height), Image.Resampling.NEAREST)

    lines: list[str] = []
    for y in range(0, target_height, 2):
        parts: list[str] = []
        for x in range(target_width):
            top = image.getpixel((x, y))
            bottom = image.getpixel((x, y + 1))

            top_rgb = top[:3]
            bottom_rgb = bottom[:3]
            top_alpha = top[3]
            bottom_alpha = bottom[3]

            if top_alpha < 20 and bottom_alpha < 20:
                parts.append(" ")
                continue
            if top_alpha < 20:
                parts.append(f"{rgb_fg(bottom_rgb)}▄{RESET}")
                continue
            if bottom_alpha < 20:
                parts.append(f"{rgb_fg(top_rgb)}▀{RESET}")
                continue

            parts.append(f"{rgb_fg(top_rgb)}{rgb_bg(bottom_rgb)}▀{RESET}")
        lines.append("".join(parts))
    return lines


def join_columns(columns: list[list[str]], gap: str = "   ") -> str:
    max_height = max(len(column) for column in columns)
    rows: list[str] = []
    for i in range(max_height):
        parts = [column[i] if i < len(column) else "" for column in columns]
        rows.append(gap.join(parts))
    return "\n".join(rows)


def main() -> int:
    parser = argparse.ArgumentParser(description="Render pixel PNGs as ANSI terminal blocks.")
    parser.add_argument("--image", action="append", default=[], help="label=path, may be repeated")
    parser.add_argument("--width", type=int, default=18, help="Logical pixel width in terminal cells")
    parser.add_argument("--no-labels", action="store_true", help="Render image blocks only, without label header rows.")
    args = parser.parse_args()

    specs = parse_specs(args.image)
    if not specs:
      raise SystemExit("No --image specs supplied.")

    columns: list[list[str]] = []
    for label, image_path in specs:
        if not image_path.exists():
            raise SystemExit(f"Missing image: {image_path}")
        block = pixel_block_lines(image_path, args.width)
        columns.append(block if args.no_labels else [label, *block])

    print(join_columns(columns))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
