# 烽火传承·数字记忆 - 抗战精神数字展厅

## 项目简介

本项目是一个基于 Vue 3 的抗战精神数字展厅,旨在通过数字化手段传承和弘扬伟大的抗战精神。

## 在线访问

访问地址: `https://您的用户名.github.io/danghuiDemo/`

## 本地开发

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run serve

# 构建生产版本
npm run build
```

## 部署到 GitHub Pages

### 方法一:自动部署(推荐)

本项目已配置 GitHub Actions 自动部署。每次推送代码到 `main` 分支时,会自动构建并部署到 GitHub Pages。

**首次部署需要配置:**

1. 进入您的 GitHub 仓库
2. 点击 `Settings` > `Pages`
3. 在 `Source` 下拉菜单中选择 `gh-pages` 分支
4. 点击 `Save`

之后,每次推送代码都会自动部署!

### 方法二:手动部署

```bash
cd frontend
npm run build
```

然后将 `frontend/dist` 目录的内容推送到 `gh-pages` 分支。

## 项目结构

```
danghuiDemo/
├── frontend/              # 前端项目
│   ├── public/           # 静态资源
│   │   ├── XZ/          # 序章模块资源
│   │   ├── FHSJX/       # 烽火时间线模块资源
│   │   ├── XQDT/        # 西迁地图模块资源
│   │   ├── YXTP/        # 英雄图谱模块资源
│   │   ├── SJKB/        # 数据看板模块资源
│   │   ├── ZXDT/        # 最新动态模块资源
│   │   ├── WXZL/        # 文献资料模块资源
│   │   └── images/      # 其他图片资源
│   ├── src/
│   │   ├── components/  # Vue 组件
│   │   ├── App.vue      # 主应用组件
│   │   └── main.js      # 入口文件
│   ├── package.json
│   └── vue.config.js    # Vue CLI 配置
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions 配置
└── README.md
```

## 技术栈

- Vue 3
- Chart.js (数据可视化)
- CSS3 (动画和样式)

## 贡献

欢迎提交 Issue 和 Pull Request!

## 开发团队

西南交通大学计算机与人工智能学院本科第二党支部

## 许可证

MIT License

