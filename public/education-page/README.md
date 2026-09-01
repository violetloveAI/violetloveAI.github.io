# 教育页内容编辑说明

这个文件夹集中管理教育页的文字和素材。修改后只需刷新 `http://localhost:3002/`，不需要改 GitHub。

## 最常用的文件

- `content.json`：页面标题、提示文案、两所学校和三条大学支线的全部文字与素材路径。
- `assets/schools/`：高中和大学主图。
- `assets/branches/`：校园活动、学生骨干、在校荣誉三个入口图。
- `assets/galleries/`：三个支线展开后的真实照片；每个分支目前各有 2 张，网页以点击切换画廊展示。
- `assets/details/`：此前使用的软陶详情图归档，当前三个分支不再展示这些图片。
- `assets/photos/`：预留给新增照片。
- `assets/characters/`：预留给透明背景人物模型或人物插画。

## 增减文字

在 `content.json` 中：

- `lead` 是展开后的主介绍。
- `notes` 或 `items` 是项目符号列表，可以直接增删行。
- `page` 管理教育页顶部说明、按钮状态文案和底部提示。
- 不建议修改现有的 `id`。目前布局依赖 `high-school`、`university`、`activities`、`leadership`、`honors`。

## 新增照片或人物模型

1. 把支线照片放进 `assets/galleries/分支名/`，其他新增照片或人物模型放进 `assets/photos/` 或 `assets/characters/`。
2. 在对应学校的 `details`，或对应支线的 `details` 中添加：

```json
{
  "src": "/education-page/assets/galleries/分支名/你的文件名.webp",
  "width": 1600,
  "height": 1200,
  "alt": "这张图片展示的内容",
  "label": "画廊底部显示的简短说明"
}
```

人物模型同理，把路径改成 `/education-page/assets/characters/文件名.webp`。透明背景素材优先使用 WebP 或 PNG。

如果人物需要在点击某所学校时单独弹出，请修改该学校的 `character`：

```json
"character": {
  "src": "/education-page/assets/characters/人物文件名.png",
  "width": 1024,
  "height": 1536,
  "alt": "人物形象说明"
}
```

填 `null` 表示这所学校不展示弹出人物。

大学三个分支也各自支持同样的 `character` 字段。把它放在对应 `topics` 项目的 `items` 和 `details` 之间即可；删除人物时改为 `"character": null`，不需要删除素材文件。

`width` 和 `height` 填网页优化版图片的像素尺寸；`alt` 用一句话说明画面内容，不能留空。`details` 的数组顺序就是画廊中的 01、02 顺序。删除一个条目会从页面移除对应素材，但不会删除本地图片文件。

## 当前边界

- 可以直接修改文字、增删列表项、增删详情照片或人物模型、替换现有主图。
- 当前桌面布局为“两所学校 + 三条支线”设计。若要增加第四条支线或第三所学校，需要同步调整页面布局，建议再让 Codex 协助。
- JSON 最后一项后面不要加逗号，否则页面会编译失败。
