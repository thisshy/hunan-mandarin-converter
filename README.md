# 湘言通

湘言通是一个面向湖南方言资源整理、普通话互转展示与词库共享维护的项目仓库。项目当前以网页端为主，提供普通话与湖南方言的双向转换、场景化表达推荐、开放词库维护、评测反馈与后台审核流程，并配套了面向专家展示的 App 原型页面。

## 项目定位

项目围绕湖南方言数字化整理与应用展示展开，目标是把方言词汇、场景表达和转换规则组织成可检索、可扩展、可持续维护的开放数据库与演示系统。当前版本优先支持长沙、湘潭、株洲三类子区域表达，并结合日常交流、校园沟通、文旅问路、短视频表达等典型场景进行展示。

## 主要功能

- 普通话与湖南方言双向转换
- 按方言子区域与使用场景进行切换
- 展示主推荐结果、候选表达与转换依据
- 支持公开词条申请、后台审核和词库入库
- 支持转换结果评测与反馈记录
- 支持文件存储与 PostgreSQL/Neon 后端存储切换
- 提供专家展示版移动端 App 原型

## 仓库结构

- `index.html` / `app.js` / `style.css`
  - 主网页前端，展示“湘言通”网页端转换与词库功能
- `server.js`
  - Node.js 后端服务，负责 API、审核流程和数据读写
- `server/`
  - 后端数据与默认词库文件
- `config.js`
  - 前端 API 地址配置
- `hunan-dialect-app-prototype/`
  - 专家展示版 App 原型页面
- `hunan-mandarin-converter-work/`
  - 早期网页方案与样式工作目录
- `deploy/oracle/`
  - 部署脚本与部署说明
- `相关文件/`
  - 项目申报、附件与相关参考资料
- `项目申报框架初稿/`
  - 项目申报框架与阶段性文档

## 本地运行

### 环境要求

- Node.js 18 或更高版本
- npm

### 启动步骤

```bash
npm install
npm start
```

默认访问地址：

```text
http://127.0.0.1:8080
```

## 配置说明

前端接口地址在 `config.js` 中配置：

```js
window.APP_CONFIG = {
  API_BASE_URL: "https://hunan-mandarin-api.onrender.com/api"
};
```

如果需要本地联调后端，可将 `API_BASE_URL` 改为 `"/api"`，或留空让前端自动走同源接口。

## 后端与数据

后端提供词库、待审核申请和评测记录的统一存储能力。未配置数据库时，可使用本地数据目录；配置 `DATABASE_URL` 后，可切换到 PostgreSQL/Neon 存储。

相关文件位置：

- 默认词库：`server/data/default-lexicon.json`
- 后端迁移说明：[BACKEND_MIGRATION_README.md](./BACKEND_MIGRATION_README.md)

常用环境变量：

- `PORT`：服务端口，默认 `8080`
- `HOST`：监听地址，默认 `0.0.0.0`
- `ADMIN_TOKEN`：后台审核令牌
- `CORS_ORIGINS`：允许跨域的前端来源
- `DATA_DIR`：本地数据目录
- `DATABASE_URL`：PostgreSQL 连接串

## 页面入口

- 普通前台：`/index.html`
- 后台审核：`/index.html?admin=1` 或 `/admin`
- App 原型：`/hunan-dialect-app-prototype/index.html`

## 当前展示重点

当前仓库主要包含两部分可直接展示的成果：

1. 网页端“湘言通”平台
   - 展示湖南方言与普通话互转、词库检索、词条维护与评测反馈
2. App 专家展示原型
   - 展示移动端场景下的转换、场景包、词库管理与质量反馈布局

## 补充说明

如果仅部署静态网页到 GitHub Pages，后端服务需要单独部署，并在 `config.js` 中填写对应的线上 API 地址。部署细节可参考 [BACKEND_MIGRATION_README.md](./BACKEND_MIGRATION_README.md) 和 `deploy/oracle/` 目录。
