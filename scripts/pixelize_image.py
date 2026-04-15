#!/usr/bin/env python3
from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


def main() -> int:
    parser = argparse.ArgumentParser(description="Pixelize an image into a sprite-friendly PNG.")
    parser.add_argument("--input", required=True, help="Input image path.")
    parser.add_argument("--output", required=True, help="Output image path.")
    parser.add_argument("--sprite-size", type=int, default=64, help="Final logical sprite size.")
    parser.add_argument("--display-scale", type=int, default=8, help="Nearest-neighbor upscale factor.")
    parser.add_argument("--colors", type=int, default=24, help="Palette color count.")
    args = parser.parse_args()

    input_path = Path(args.input).expanduser().resolve()
    output_path = Path(args.output).expanduser().resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)

    image = Image.open(input_path).convert("RGBA")

    # Crop to a centered square before sprite reduction.
    width, height = image.size
    side = min(width, height)
    left = (width - side) // 2
    top = (height - side) // 2
    image = image.crop((left, top, left + side, top + side))

    reduced = image.resize((args.sprite_size, args.sprite_size), Image.Resampling.BILINEAR)
    palette = reduced.convert("P", palette=Image.Palette.ADAPTIVE, colors=args.colors)
    reduced = palette.convert("RGBA")
    enlarged = reduced.resize(
        (args.sprite_size * args.display_scale, args.sprite_size * args.display_scale),
        Image.Resampling.NEAREST,
    )
    enlarged.save(output_path)
    print(str(output_path))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
