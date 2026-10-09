# Violet Xie Portfolio

Violet 的个人作品集网站，展示 AI 辅助构建的作品、企业交付经历、教育经历与生活兴趣。

[访问个人网站](https://violetloveai.github.io/)

![网站首页预览](./assets/portfolio-preview.jpg)

## 网站内容

- 作品案例：家里话、跨境经营舱、企服智诊、英语搭子团、启衡智审、课时簿，以及收录 Final Human 等项目的「更多创作」。
- 职业经历：交付管理、实施顾问、应用支持与 FDE 方案实践，附工作记录和可查看的图片。
- 教育经历、校园活动、生活兴趣与联系方式。
- 页面交互：可展开的项目预览、独立案例页、Life 图片交互，以及可开关的网站音效。

一页中文简历与 FDE 项目作品集 PDF 的新版文件待补充，当前下载入口不可用。

## 本地运行

需要 Node.js 22.13.0 或更高版本，使用 npm 安装依赖。

1. 在项目根目录安装依赖：

   ```bash
   npm ci
   ```

2. 安装完成后，启动开发服务：

   ```bash
   npm run dev
   ```

3. 打开终端显示的地址，默认是 `http://localhost:3000`。

## 构建与静态预览

构建时通过 `next/font/google` 下载字体，需要访问 `fonts.googleapis.com` 和 `fonts.gstatic.com`。网络受限时，构建可能因字体下载失败而中断。导出后，字体随静态文件托管。

安装依赖后，在项目根目录执行以下步骤。静态预览需要 Python 3。

1. 检查代码：

   ```bash
   npm run lint
   ```

2. 检查通过后，构建静态文件：

   ```bash
   npm run build
   ```

3. 构建成功后，启动 `out/` 的静态预览：

   ```bash
   python3 -m http.server 4179 --bind 127.0.0.1 --directory out
   ```

   打开 [本地静态预览](http://127.0.0.1:4179/)。

此项目使用 `output: 'export'` 静态导出，`npm run start` 不适用于此配置。

## 技术与部署

网站使用 Next.js 16、React 19、TypeScript、GSAP / ScrollTrigger 与 Tailwind CSS 4。

GitHub Pages 托管静态导出的 `out/`。GitHub Actions 工作流在 `main` 分支更新或手动触发时构建和部署。

## 使用权

本仓库没有开源许可证。代码、文字、肖像、插画和图片素材仅供浏览与作品参考；公开访问不代表授予复制、修改、再发布或商业使用权。如需引用或合作，请先联系作者。案例中的第三方品牌与商标归各自权利人所有。
