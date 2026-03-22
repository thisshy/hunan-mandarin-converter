# 后端化版本（首个可运行版）

这个版本已把词库、审核队列、评测记录迁移到后端存储：

- 后端数据文件：`server/data/db.json`
- 默认词库种子：`server/data/default-lexicon.json`
- 审核只通过后端 API 执行（前台不能直接改词库）

## 1. 启动

先安装 Node.js（建议 18+），然后在项目根目录执行：

```bash
npm start
```

默认地址：`http://127.0.0.1:8080`

可选环境变量：

- `PORT`：服务端口（默认 8080）
- `HOST`：监听地址（默认 0.0.0.0）
- `ADMIN_TOKEN`：后台审核令牌（默认 `change-me-admin-token`）
- `CORS_ORIGINS`：允许跨域访问的来源（逗号分隔），例如 `https://thisshy.github.io,http://127.0.0.1:8080`
- `DATA_DIR`：后端数据目录（默认 `./server/data`，生产环境建议挂载持久化目录）

Windows PowerShell 示例：

```powershell
$env:ADMIN_TOKEN = "your-strong-token"
npm start
```

## 2. 前台/后台模式

- 普通前台：`/index.html`
  - 可提交新增/修改词条申请
  - 评测记录写入后端
  - 看不到审核操作

- 后台审核：`/index.html?admin=1` 或 `/admin`
  - 需要输入管理员令牌
  - 可查看待审核队列
  - 可通过/驳回、批量通过/驳回
  - 可导入、导出、重置词库

## 3. 数据说明

`server/data/db.json` 结构：

- `lexicon`: 生效词库（审核通过后才会更新）
- `pending`: 待审核申请
- `evaluations`: 评测记录
- `metadata`: 更新时间

## 4. API 概览

公开接口：

- `GET /api/health`
- `GET /api/lexicon`
- `POST /api/change-requests`
- `GET /api/evaluations`
- `POST /api/evaluations`

管理员接口（请求头需要 `x-admin-token`）：

- `GET /api/admin/change-requests`
- `POST /api/admin/change-requests/:id/approve`
- `POST /api/admin/change-requests/:id/reject`
- `POST /api/admin/change-requests/approve-all`
- `POST /api/admin/change-requests/reject-all`
- `POST /api/admin/import`
- `POST /api/admin/reset-lexicon`
- `DELETE /api/admin/evaluations`
- `GET /api/admin/export`

## 5. 当前版本定位

这是首个可运行后端版，已解决你提到的两件事：

1. 审核流程不再在前端直接生效。
2. 词库与评测数据不再存浏览器 `localStorage`，改为后端存储。

后续如果你要，我可以继续升级到：

- JWT 登录 + 角色权限（admin/reviewer/user）
- PostgreSQL/MySQL 正式数据库
- 审核日志、词库版本回滚、操作审计
- Docker 一键部署

## 6. GitHub Pages 部署方式

`GitHub Pages` 只托管静态前端，不能运行 `server.js`。正确方式是：

1. 前端继续发布到 `https://thisshy.github.io/hunan-mandarin-converter/`
2. 后端部署到独立服务（Render/Railway/VPS 等）
3. 在前端 `config.js` 中把 `API_BASE_URL` 改成后端地址（必须带 `/api`）
4. 后端环境变量设置 `CORS_ORIGINS=https://thisshy.github.io`

示例 `config.js`：

```js
window.APP_CONFIG = {
  API_BASE_URL: "https://your-backend.example.com/api"
};
```
