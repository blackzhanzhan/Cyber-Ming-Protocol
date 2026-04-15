const path = require("path");
const { spawnSync } = require("child_process");

const PIXEL_ASSETS = [
  ["小黄龙", "assets/visual-protocol/pixel/xiao-huanglong-64.png"],
  ["徐阶", "assets/visual-protocol/pixel/xu-jie-64.png"],
  ["严嵩", "assets/visual-protocol/pixel/yan-song-64.png"],
];

function renderRichCast(rootDir, scriptPath, relativeAssetRoot = "") {
  const specs = PIXEL_ASSETS.map(([label, relativePath]) => ({
    label,
    absolutePath: path.join(rootDir, relativeAssetRoot, relativePath),
  }));

  for (const spec of specs) {
    if (!require("fs").existsSync(spec.absolutePath)) {
      return null;
    }
  }

  const result = spawnSync(
    "python3",
    [
      scriptPath,
      "--width",
      "12",
      ...specs.flatMap((spec) => ["--image", `${spec.label}=${spec.absolutePath}`]),
    ],
    {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    },
  );

  if (result.status !== 0) {
    return null;
  }

  return result.stdout.trim();
}

module.exports = {
  PIXEL_ASSETS,
  renderRichCast,
};
