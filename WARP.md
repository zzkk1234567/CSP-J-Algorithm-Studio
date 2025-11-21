# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

这是一个完整的CSP-J（中国计算机学会非专业级软件能力认证）学习助手项目，包含知识点讲解、算法可视化、编程练习和历年真题。项目基于HTML、CSS和JavaScript技术栈，是一个纯前端的学习工具。

## Project Type and Architecture

**技术栈：** HTML5 + CSS3 + JavaScript + TailwindCSS
**项目类型：** 纯前端单页应用（SPA）教育工具

### 核心文件结构

```
cspj/
├── csp-j-complete-final.html    # 主要完整版学习界面
├── csp-j-complete.html          # 基础完整版
├── csp-j-fixed.html             # 修复版本
├── csp-j-full-complete.html     # 全功能版本
├── csp-j-learning-tool.html     # 核心学习工具
├── knowledge-data.js            # 完整知识点数据库
├── templates-data.js            # 代码模板数据
├── CSP-J知识点.md               # 完整知识点文档（98KB）
├── debug_test.js                # 调试测试脚本
├── temp_check.js                # 临时检查脚本
├── switch_content.txt           # 内容切换数据
├── minimal_test.html            # 最小化测试
├── simple_test.html             # 简单功能测试
├── test_functionality.html     # 功能测试页面
├── test_js_syntax.js            # JS语法测试
└── .claude/settings.local.json # Claude配置
```

## Core Features and Components

### 1. 知识点学习系统
- **完整知识体系覆盖**: 包含竞赛介绍、数据表示、逻辑运算、数据结构等8大模块
- **真题解析**: 50+道历年CSP-J真题详细解析
- **交互式学习**: 动态知识点导航和内容切换

### 2. 编程练习环境
- **代码编辑器**: 内置代码编辑器支持C++语法
- **代码模板**: 预设多种常用代码模板（Hello World、数组操作、递归等）
- **模拟运行**: 前端代码执行模拟

### 3. 算法可视化
- **排序算法演示**: 冒泡排序、选择排序等算法可视化
- **数据结构演示**: 数组、链表等数据结构操作演示
- **算法执行步骤**: 逐步展示算法执行过程

### 4. 模拟测试系统
- **历年真题**: 完整的CSP-J历年真题库
- **自动评分**: 选择题自动批改和解析
- **学习进度跟踪**: 学习进度和完成状态跟踪

## Common Development Commands

### 本地开发服务器
```bash
# 使用Python创建本地HTTP服务器（推荐）
python -m http.server 8000
# 或使用Python 2.x
python -m SimpleHTTPServer 8000

# 使用Node.js http-server (如果已安装)
npx http-server -p 8000

# 访问应用
# 浏览器打开: http://localhost:8000/csp-j-complete-final.html
```

### 测试和调试
```bash
# 运行JavaScript语法检查（需要Node.js）
node debug_test.js

# 运行临时检查脚本
node temp_check.js

# 运行语法测试
node test_js_syntax.js
```

### 文件验证
```bash
# 检查HTML文件是否能正常打开
# 直接在浏览器中打开相应的HTML文件

# 主要入口点：
# - csp-j-complete-final.html (最完整版本)
# - csp-j-learning-tool.html (核心学习工具)
```

## Key Data Files

### knowledge-data.js
包含完整的CSP-J知识体系数据，结构如下：
- `competition-intro`: 竞赛与CCF简介
- `data-representation`: 数据表示与进制转换  
- `logical-operations`: 逻辑运算与短路策略
- `data-structures`: 基本数据结构
- 每个知识点包含详细讲解、例题和代码示例

### templates-data.js
预设的C++代码模板，包括：
- Hello World程序
- 输入输出示例
- 数组操作
- 函数定义
- 递归算法
- 文件操作
- 经典算法实现

## Architecture Patterns

### 1. 模块化数据结构
- 知识点数据与界面逻辑分离
- 每个功能模块独立的数据结构
- 便于扩展和维护

### 2. Tab切换架构
- 基于tab的多功能界面切换
- 知识点学习、编程练习、算法可视化、模拟测试四大模块
- 状态管理通过全局JavaScript对象

### 3. 响应式设计
- 使用TailwindCSS实现响应式布局
- 支持桌面和移动设备
- 渐进式用户界面

## Development Guidelines

### 添加新知识点
1. 在`knowledge-data.js`中添加新的知识点对象
2. 更新知识点导航生成逻辑
3. 确保包含标题、内容、例题和代码示例

### 添加新的代码模板
1. 在`templates-data.js`中添加新模板
2. 更新模板选择下拉菜单
3. 确保代码格式正确且有注释

### 添加新的算法可视化
1. 在相应HTML文件中添加可视化容器
2. 实现算法步骤分解函数
3. 添加动画效果和用户交互

### 性能优化考虑
- 大量文本内容使用延迟加载
- 算法可视化使用requestAnimationFrame
- 避免频繁的DOM操作

## Testing Strategy

### 功能测试
- `simple_test.html`: 基础功能验证
- `test_functionality.html`: 完整功能测试
- `minimal_test.html`: 最小化功能测试

### 代码质量检查
- `debug_test.js`: JavaScript语法错误检查
- `test_js_syntax.js`: 语法规范验证
- `temp_check.js`: 临时验证脚本

### 浏览器兼容性
- 主要支持现代浏览器（Chrome、Firefox、Safari、Edge）
- ES6+语法使用需要考虑兼容性
- TailwindCSS确保跨浏览器样式一致性

## Content Management

### 知识点内容维护
- 主要内容在`CSP-J知识点.md`中维护（98KB）
- 结构化数据在`knowledge-data.js`中
- 内容更新需同步更新两处

### 真题库管理
- 历年真题按年份和类型分类
- 每题包含题目、选项、答案、详细解析
- 支持按难度和知识点标签筛选

## Notes for AI Assistants

- 这是一个教育性质的CSP-J学习工具，专注于计算机竞赛知识点
- 项目使用纯前端技术，无需后端服务器
- 代码模板和示例都是C++语言
- 知识点覆盖了CSP-J考试的完整大纲
- 测试和开发主要通过浏览器进行
- 所有内容都是中文，面向中国学生
- 包含大量数学和计算机科学概念，需要准确理解

## File Access Patterns

### 主要入口文件
- 开发和演示首选：`csp-j-complete-final.html`
- 核心功能版本：`csp-j-learning-tool.html`

### 数据文件修改
- 知识点内容：修改`knowledge-data.js`
- 代码模板：修改`templates-data.js`
- 长文档内容：修改`CSP-J知识点.md`

### 测试文件使用
- 快速测试：打开`simple_test.html`
- 语法检查：运行`node debug_test.js`
- 功能验证：打开`test_functionality.html`
