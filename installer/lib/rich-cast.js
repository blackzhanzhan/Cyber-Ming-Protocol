const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { ANSI, joinColumns, paint } = require("./theme");

const PIXEL_ASSETS = [
  {
    label: "小黄龙",
    role: "终裁",
    color: ANSI.gold,
    relativePath: "assets/visual-protocol/pixel/xiao-huanglong-64.png",
  },
  {
    label: "徐阶",
    role: "审计",
    color: ANSI.steel,
    relativePath: "assets/visual-protocol/pixel/xu-jie-64.png",
  },
  {
    label: "严嵩",
    role: "执行",
    color: ANSI.vermilion,
    relativePath: "assets/visual-protocol/pixel/yan-song-64.png",
  },
];

function renderOne(scriptPath, imagePath, width) {
  const result = spawnSync(
    "python3",
    [scriptPath, "--width", String(width), "--no-labels", "--image", `sprite=${imagePath}`],
    {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    },
  );

  if (result.status !== 0) {
    return null;
  }

  return result.stdout.trim().split("\n");
}

function renderRichCast(rootDir, scriptPath, relativeAssetRoot = "") {
  const specs = PIXEL_ASSETS.map((asset) => ({
    ...asset,
    absolutePath: path.join(rootDir, relativeAssetRoot, asset.relativePath),
  }));

  for (const spec of specs) {
    if (!fs.existsSync(spec.absolutePath)) {
      return null;
    }
  }

  const width = 8;
  const titleColumns = specs.map((spec) => [
    paint(spec.color, spec.label, { bold: true }),
    paint(ANSI.ash, spec.role),
  ]);
  const spriteColumns = specs.map((spec) => renderOne(scriptPath, spec.absolutePath, width));

  if (spriteColumns.some((column) => !column)) {
    return null;
  }

  return [
    ...joinColumns(titleColumns, "     "),
    "",
    ...joinColumns(spriteColumns, "     "),
  ].join("\n");
}

module.exports = {
  PIXEL_ASSETS,
  renderRichCast,
};
