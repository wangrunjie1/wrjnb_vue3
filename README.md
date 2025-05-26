# vue_project

## 简介

本项目为基于 Vue 3 + Element Plus 的前端项目，包含弹幕墙、留言板、实用工具箱等功能，配套 Node.js 后端服务（danmu-server.js），支持弹幕、留言、IP归属地、随机头像等。

## 主要功能

- 弹幕墙：支持彩色弹幕、弹幕速度调节
- 留言板：支持富文本留言、插入图片、显示IP归属地和头像
- 实用工具箱：字符串、编码、颜色、时间、生活等常用工具
- 彩蛋/隐藏功能：多种趣味彩蛋
- 响应式设计，兼容手机端

## 前端启动

```bash
npm install
npm run dev
```

默认端口：5173

## 后端启动

需 Node.js 16+ 环境

```bash
npm install
node danmu-server.js
```

默认端口：3001

## 注意事项

- 前端通过 `/danmu-api/*` 访问后端接口，开发时建议配置 Vite 代理或使用 nginx 反向代理。
- 留言板和弹幕数据分别保存在 `msgboard.json` 和 `danmu.json` 文件中。
- IP归属地查询使用百度开放数据接口，头像使用 Dicebear 7.x API。
- 若头像无法显示，请检查 dicebear API 是否可访问。

## 目录结构

```
vue_project/
├── src/
│   ├── views/
│   ├── router/
│   └── ...
├── danmu-server.js
├── danmu.json
├── msgboard.json
├── package.json
└── ...
```

## 常见问题

- **端口冲突**：如 3001 被占用，可修改 danmu-server.js 中的端口。
- **接口跨域**：开发环境建议前端配置代理。
- **头像不显示**：请检查网络环境或 dicebear 服务可用性。

## 反馈与建议

如有建议或问题，欢迎 issue 或联系开发者。
