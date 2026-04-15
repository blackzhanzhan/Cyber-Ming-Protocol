# 像素角色资产

这组资产是给 CLI / 终端安装器的视觉层预备的第一批正式像素角色。

当前策略：

- 小黄龙以 `v4` 正面低像素 sprite 作为 baseline
- 徐阶与严嵩跟随同一密度和轮廓语言
- 先保证角色可识别，再决定是否进一步补 sprite sheet、表情帧或漫画分镜

当前文件：

- `xiao-huanglong-64.png`
- `xu-jie-64.png`
- `yan-song-64.png`
- `manifest.json`

说明：

- 这些文件目前只是“CLI rich mode / 视觉层”预备资产
- 终端默认仍可使用 ASCII fallback
- 后续如果接入支持图片协议的终端，再从 `manifest.json` 读取正式角色路径
