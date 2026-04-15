# Nano Banana 视觉流水线

这条流水线只把脚本和流程落在仓库里，不把任何密钥提交进仓库。

## 1. 配置

复制一份 `.env.local`：

```bash
cp .env.example .env.local
```

填入：

- `NANO_BANANA_API_KEY`
- `NANO_BANANA_BASE_URL`
- `NANO_BANANA_MODEL`

## 2. 角色参考生图

主路径不是先生成普通图、再粗暴像素化，而是：

- 直接让模型按 **低像素游戏角色风格** 重画
- 用三视图做人设与识别约束
- 先把一张角色打磨到过线，再扩到其他角色和漫画

```bash
python3 scripts/nano_banana_generate.py \
  --prompt "Create a clean character portrait..." \
  --reference article/visual-protocol/characters/小黄龙.png \
  --out .local/generated-images/nano-banana/xiao-huanglong-raw.png
```

## 3. 可选后处理

如果某一轮输出已经足够接近目标风格，就直接作为正式像素资产。

只有在少数需要压缩尺寸、统一显示倍率或做终端预览时，才再用代码后处理。

```bash
python3 scripts/pixelize_image.py \
  --input .local/generated-images/nano-banana/xiao-huanglong-raw.png \
  --output assets/visual-protocol/pixel/xiao-huanglong-64.png
```

## 当前约定

- 原始生成图放 `.local/generated-images/nano-banana/`
- 选中的正式像素资产放 `assets/visual-protocol/pixel/`
- 未来漫画先用三视图作参考图，再叠加分镜 prompt 逐张生成
- 当前正式 baseline：
  - 小黄龙 `xiao-huanglong-64.png`
