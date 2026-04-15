#!/usr/bin/env python3
from __future__ import annotations

import argparse
from collections import deque
from pathlib import Path

from PIL import Image


def color_distance(a: tuple[int, int, int], b: tuple[int, int, int]) -> int:
    return abs(a[0] - b[0]) + abs(a[1] - b[1]) + abs(a[2] - b[2])


def average_corners(image: Image.Image) -> tuple[int, int, int]:
    width, height = image.size
    corners = [
        image.getpixel((0, 0))[:3],
        image.getpixel((width - 1, 0))[:3],
        image.getpixel((0, height - 1))[:3],
        image.getpixel((width - 1, height - 1))[:3],
    ]
    return tuple(sum(color[i] for color in corners) // len(corners) for i in range(3))


def remove_background(image: Image.Image, threshold: int) -> Image.Image:
    image = image.convert("RGBA")
    width, height = image.size
    background = average_corners(image)

    visited = [[False] * width for _ in range(height)]
    queue: deque[tuple[int, int]] = deque(
        [
            (0, 0),
            (width - 1, 0),
            (0, height - 1),
            (width - 1, height - 1),
        ]
    )

    while queue:
        x, y = queue.popleft()
        if not (0 <= x < width and 0 <= y < height):
            continue
        if visited[y][x]:
            continue
        visited[y][x] = True

        pixel = image.getpixel((x, y))
        if pixel[3] == 0:
            continue
        if color_distance(pixel[:3], background) > threshold:
            continue

        image.putpixel((x, y), (pixel[0], pixel[1], pixel[2], 0))
        queue.extend(
            [
                (x + 1, y),
                (x - 1, y),
                (x, y + 1),
                (x, y - 1),
            ]
        )

    return image


def main() -> int:
    parser = argparse.ArgumentParser(description="Remove a connected flat background from sprite-style PNGs.")
    parser.add_argument("--input", required=True, help="Input image path.")
    parser.add_argument("--output", required=True, help="Output image path.")
    parser.add_argument("--threshold", type=int, default=36, help="Corner-color tolerance. Higher removes more.")
    args = parser.parse_args()

    input_path = Path(args.input).expanduser().resolve()
    output_path = Path(args.output).expanduser().resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)

    image = Image.open(input_path)
    cleaned = remove_background(image, args.threshold)
    cleaned.save(output_path)
    print(output_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
