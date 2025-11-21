# GitHub 版本控制设置指南

本项目已在本地初始化为 Git 仓库。请按照以下步骤将其关联到 GitHub。

## 第一步：在 GitHub 上创建仓库

1.  登录您的 [GitHub 账号](https://github.com)。
2.  点击右上角的 **+** 号，选择 **New repository**。
3.  **Repository name** (仓库名称): 输入 `CSP-J-Algorithm-Studio` (或您喜欢的名字)。
4.  **Description** (描述): 可选，例如 "CSP-J 算法可视化学习平台"。
5.  **Public/Private**: 根据需要选择公开或私有。
6.  **Initialize this repository with**: **不要** 勾选任何选项 (不要选 README, .gitignore, license)，我们需要一个空仓库。
7.  点击 **Create repository**。

## 第二步：关联并推送代码

在 GitHub 仓库创建成功后的页面上，您会看到一串命令。请复制其中的 **HTTPS** 或 **SSH** 地址（例如 `https://github.com/yourusername/CSP-J-Algorithm-Studio.git`）。

### 方法 A：使用自动脚本 (推荐)

1.  打开本项目目录下的 `setup_github.bat` 文件（右键 -> 编辑）。
2.  将 `SET REPO_URL=...` 这一行修改为您刚才复制的 GitHub 仓库地址。
3.  保存并关闭文件。
4.  双击运行 `setup_github.bat`。

### 方法 B：手动命令行

在项目根目录打开终端 (Terminal)，执行以下命令：

```bash
# 1. 关联远程仓库 (将 URL 替换为您的真实地址)
git remote add origin https://github.com/您的用户名/CSP-J-Algorithm-Studio.git

# 2. 重命名主分支为 main (GitHub 默认标准)
git branch -M main

# 3. 推送代码到 GitHub
git push -u origin main
```

## 第三步：日常开发流程

以后每次修改代码后，只需执行以下步骤：

1.  **保存文件**。
2.  **提交更改**：
    ```bash
    git add .
    git commit -m "描述您修改了什么"
    ```
3.  **推送到 GitHub**：
    ```bash
    git push
    ```

---
**当前状态**：
- ✅ 本地 Git 仓库已初始化
- ✅ `.gitignore` 已配置
- ✅ 所有当前文件已提交到本地仓库
- ⏳ 等待关联 GitHub 远程仓库
