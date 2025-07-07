# QRManager - 动态二维码管理平台

[![Deploy](https://github.com/sdrpsps/qr-manager/actions/workflows/deploy.yml/badge.svg)](https://github.com/sdrpsps/qr-manager/actions/workflows/deploy.yml)

> 码不变，内容随时变。一个二维码，无限可能。

QRManager 是一个基于 Cloudflare 构建的免费且高可用的动态二维码管理平台。支持二维码内容动态更新、个性化设计、专属Logo上传等功能，让每个二维码都独一无二。

## 📋 目录

- [✨ 特性](#-特性)
- [🚀 快速开始](#-快速开始)
- [🏗️ 项目结构](#️-项目结构)
- [⚙️ 环境变量配置](#️-环境变量配置)
- [🛠️ 技术栈](#️-技术栈)
- [📦 部署](#-部署)
- [🤝 贡献](#-贡献)
- [📄 许可证](#-许可证)

## ✨ 特性

### 🎯 核心功能
- **动态内容更新** - 二维码外观保持不变，扫描后显示的内容可以随时更新
- **Cloudflare 托管** - 基于 Cloudflare 构建，享受免费数据库和存储服务
- **个性化设计** - 丰富的预设风格，支持完全自定义颜色、样式
- **专属Logo上传** - 支持上传公司Logo、个人头像或任何标识图片

### 🎨 设计特色
- **精美预设模板** - 内置多种专业设计的二维码模板
- **完全自定义设计** - 自由调整前景色、背景色、边距、圆角等参数
- **品牌化定制** - 打造完全符合品牌形象的专属二维码

### 🌍 应用场景
- 产品说明书、安装指南、使用说明
- 会议资料、演示文稿、会议纪要
- 培训材料、操作手册、学习资料
- 营销资料、产品目录、宣传册
- 活动门票、活动详情、时间地点
- 个人文件、简历、作品集

## 🚀 快速开始

### 前置要求
- Node.js 20+
- Bun 包管理器
- Cloudflare 账户

### 安装依赖
```bash
# 克隆项目
git clone https://github.com/your-username/qr-manager.git
cd qr-manager

# 安装依赖
bun install
```

### 环境配置
1. 复制环境变量模板
```bash
cp .env.example .env.local
```

2. 配置环境变量（详见下方配置表格）

### 本地开发
```bash
# 启动开发服务器
bun run dev

# 运行数据库迁移
bun run migrate
```

### 构建部署
```bash
# 构建项目
bun run build

# 部署到 Cloudflare
bun run deploy
```

## 🏗️ 项目结构

```
qr-manager/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 (auth)/            # 认证相关页面
│   │   ├── 📁 (workspace)/       # 工作区页面
│   │   ├── 📁 api/               # API 路由
│   │   └── 📁 s/                 # 二维码扫描页面
│   ├── 📁 components/            # 可复用组件
│   │   ├── 📁 ui/               # UI 基础组件
│   │   └── 📁 features/         # 功能组件
│   ├── 📁 features/             # 功能模块
│   │   ├── 📁 auth/             # 认证功能
│   │   ├── 📁 qr-code/          # 二维码功能
│   │   ├── 📁 upload/           # 文件上传
│   │   └── 📁 user/             # 用户管理
│   ├── 📁 lib/                  # 工具库
│   │   ├── 📁 db/              # 数据库配置
│   │   └── 📁 storage/         # 存储配置
│   └── 📁 emails/              # 邮件模板
├── 📁 drizzle/                 # 数据库迁移文件
├── 📁 scripts/                 # 部署脚本
└── 📁 public/                  # 静态资源
```

## ⚙️ 环境变量配置

| 变量名 | 类型 | 必需 | 描述 | 示例值 |
|--------|------|------|------|--------|
| **Cloudflare 配置** |
| `CLOUDFLARE_API_TOKEN` | string | ✅ | Cloudflare API Token | `your-api-token` |
| `CLOUDFLARE_ACCOUNT_ID` | string | ✅ | Cloudflare 账户 ID | `your-account-id` |
| `CUSTOM_DOMAIN` | string | ✅ | 自定义域名 (不包含协议) | `qr.example.com` |
| **认证配置** |
| `BETTER_AUTH_SECRET` | string | ✅ | Better Auth 密钥 (随机字符串) | `your-secret-key` |
| `BETTER_AUTH_URL` | string | ✅ | Better Auth URL | `https://qr.example.com` |
| `BETTER_AUTH_GITHUB_CLIENT_ID` | string | ✅ | GitHub OAuth Client ID | `your-github-client-id` |
| `BETTER_AUTH_GITHUB_CLIENT_SECRET` | string | ✅ | GitHub OAuth Client Secret | `your-github-client-secret` |
| **邮件配置** |
| `RESEND_API_KEY` | string | ✅ | Resend API 密钥 | `your-resend-api-key` |
| `RESEND_SENDER_ADDRESS` | string | ✅ | 发件人邮箱地址 | `QRManager <noreply@example.com>` |
| **文件上传配置** |
| `NEXT_PUBLIC_MAX_FILE_MB` | number | ✅ | 最大文件大小 (MB) | `10` |
| `NEXT_PUBLIC_BUCKET_ADDRESS` | string | ✅ | Cloudflare R2 存储桶地址 | `https://your-bucket.your-subdomain.r2.cloudflarestorage.com` |

### 环境变量获取指南

#### Cloudflare 配置
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 获取 Account ID（在右侧边栏）
3. 创建 API Token（My Profile > API Tokens）

#### GitHub OAuth
1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 创建新的 OAuth App
3. 设置 Authorization callback URL: `https://your-domain.com/api/auth/github/callback`

#### Resend 邮件服务
1. 注册 [Resend](https://resend.com/)
2. 获取 API Key
3. 验证发件人域名

## 🛠️ 技术栈

### 前端
- **Next.js 15** - React 全栈框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **shadcn/ui** - UI 组件库
- **Lucide React** - 图标库
- **React Email** - React 邮件模板

### 后端
- **Cloudflare Workers** - 边缘计算
- **Drizzle ORM** - 数据库 ORM
- **Better Auth** - 认证解决方案
- **Resend** - 邮件服务

### 数据库 & 存储
- **Cloudflare D1** - SQLite 数据库
- **Cloudflare R2** - 对象存储

### 部署
- **GitHub Actions** - CI/CD 自动化

## 📦 部署

### 自动部署
项目配置了 GitHub Actions 自动部署流程：

1. 推送标签触发部署：
```bash
git tag v1.0.0
git push origin v1.0.0
```

2. GitHub Actions 将自动：
   - 安装依赖
   - 运行构建
   - 部署到 Cloudflare

### 手动部署
```bash
# 运行部署脚本
bun run scripts/deploy/index.ts
```

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

**QRManager** - 让每个二维码都独一无二 ✨
