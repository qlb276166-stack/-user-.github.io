# 部署方案

这是纯静态个人作品集网站，入口文件是 `index.html`，不需要后端服务。

## 推荐部署

1. 国内正式访问
   - 阿里云 OSS 或腾讯云 COS 开启静态网站托管。
   - 上传 `site` 目录内所有文件。
   - 绑定自有域名，并开启 HTTPS。

2. 快速预览或海外访问
   - 使用 Vercel、Netlify 或 Cloudflare Pages。
   - 部署目录选择 `site`。
   - Build command 留空，Output directory 填 `site`。

3. 免费备选
   - GitHub Pages。
   - 将 `site` 目录内容放到仓库根目录，或配置 Pages 指向 `/site`。

## 更新作品

- 新作品图片放入 `site/assets`。
- 在 `index.html` 中复制一个现有项目卡片并替换图片、标题和说明。
- 图片建议导出为 WebP，长边控制在 1800px 左右。

## 隐私

当前页面只公开邮箱和微信占位，没有展示手机号、生日、籍贯、政治面貌等敏感信息。
