# 贡献指南 (Contributing Guide)

感谢你考虑为CSP-J算法可视化学习系统做出贡献！🎉

本文档提供了参与项目开发的指南和最佳实践。

---

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [提交规范](#提交规范)
- [测试要求](#测试要求)
- [文档要求](#文档要求)

---

## 🤝 行为准则

### 我们的承诺

为了营造一个开放和友好的环境，我们承诺：

- 使用友好和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

### 不可接受的行为

- 使用性化的语言或图像
- 人身攻击或侮辱性评论
- 公开或私下骚扰
- 未经许可发布他人的私人信息
- 其他不道德或不专业的行为

---

## 💡 如何贡献

### 报告Bug

发现Bug？请帮助我们改进！

1. **检查是否已报告**
   - 搜索 [Issues](https://github.com/your-username/cspj-algorithm-visualizer/issues) 确认问题未被报告

2. **创建Bug报告**
   - 使用清晰描述性的标题
   - 详细描述重现步骤
   - 提供预期行为和实际行为
   - 包含截图或GIF（如果适用）
   - 说明你的环境（浏览器、操作系统等）

**Bug报告模板：**
```markdown
**描述Bug**
简要描述Bug是什么。

**重现步骤**
1. 打开 '...'
2. 点击 '...'
3. 滚动到 '...'
4. 看到错误

**预期行为**
描述你期望发生什么。

**实际行为**
描述实际发生了什么。

**截图**
如果适用，添加截图帮助解释问题。

**环境信息**
- 浏览器: [如 Chrome 120]
- 操作系统: [如 Windows 11]
- 版本: [如 v2.0.0]
```

### 提出新功能

有好的想法？我们很乐意听到！

1. **检查是否已提出**
   - 搜索现有的 [Issues](https://github.com/your-username/cspj-algorithm-visualizer/issues)

2. **创建功能请求**
   - 使用清晰描述性的标题
   - 详细描述功能和使用场景
   - 解释为什么这个功能有用
   - 提供可能的实现方案（可选）

**功能请求模板：**
```markdown
**功能描述**
简要描述你想要的功能。

**使用场景**
描述这个功能在什么情况下有用。

**建议的解决方案**
描述你希望如何实现这个功能。

**替代方案**
描述你考虑过的其他解决方案。

**附加信息**
添加任何其他相关信息或截图。
```

### 改进文档

文档永远可以更好！

- 修正拼写或语法错误
- 添加缺失的文档
- 改进现有文档的清晰度
- 添加使用示例
- 翻译文档到其他语言

---

## 🔧 开发流程

### 1. Fork 和 Clone

```bash
# Fork 仓库到你的账号
# 然后克隆你的fork
git clone https://github.com/your-username/cspj-algorithm-visualizer.git
cd cspj-algorithm-visualizer

# 添加上游仓库
git remote add upstream https://github.com/original-owner/cspj-algorithm-visualizer.git
```

### 2. 创建分支

```bash
# 从main分支创建新分支
git checkout -b feature/your-feature-name

# 或修复bug
git checkout -b fix/bug-description
```

**分支命名规范：**
- `feature/` - 新功能
- `fix/` - Bug修复
- `docs/` - 文档更新
- `refactor/` - 代码重构
- `test/` - 测试相关
- `chore/` - 构建/工具相关

### 3. 进行更改

```bash
# 进行你的更改
# 确保代码符合规范

# 运行测试
# 打开 test-runner.html 在浏览器中

# 提交更改
git add .
git commit -m "feat: add amazing feature"
```

### 4. 保持同步

```bash
# 定期同步上游更改
git fetch upstream
git rebase upstream/main
```

### 5. 推送和创建PR

```bash
# 推送到你的fork
git push origin feature/your-feature-name

# 在GitHub上创建Pull Request
```

---

## 📝 代码规范

### JavaScript规范

1. **使用ES6+语法**
```javascript
// ✅ 好
const data = [1, 2, 3];
const doubled = data.map(x => x * 2);

// ❌ 避免
var data = [1, 2, 3];
var doubled = [];
for (var i = 0; i < data.length; i++) {
    doubled.push(data[i] * 2);
}
```

2. **使用JSDoc注释**
```javascript
/**
 * 计算数组的平均值
 * @param {Array<number>} numbers - 数字数组
 * @returns {number} 平均值
 * @example
 * average([1, 2, 3, 4, 5]); // 返回 3
 */
function average(numbers) {
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}
```

3. **命名规范**
```javascript
// 类名：PascalCase
class AlgorithmVisualizer {}

// 函数/变量：camelCase
function calculateAverage() {}
const userName = 'John';

// 常量：UPPER_SNAKE_CASE
const MAX_SIZE = 100;

// 私有方法：_前缀
_privateMethod() {}
```

4. **错误处理**
```javascript
// ✅ 使用统一的错误处理
try {
    // 可能出错的代码
} catch (error) {
    if (window.ErrorHandler) {
        window.ErrorHandler.handle(error, 'Context');
    } else {
        console.error('Error:', error);
    }
}
```

### HTML/CSS规范

1. **使用语义化HTML**
```html
<!-- ✅ 好 -->
<article>
    <header>
        <h1>标题</h1>
    </header>
    <section>
        <p>内容</p>
    </section>
</article>

<!-- ❌ 避免 -->
<div>
    <div>
        <div>标题</div>
    </div>
    <div>
        <div>内容</div>
    </div>
</div>
```

2. **使用Tailwind CSS类**
```html
<!-- ✅ 优先使用Tailwind -->
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    按钮
</button>

<!-- 必要时使用自定义CSS -->
<style>
.custom-animation {
    animation: fadeIn 0.3s ease-in;
}
</style>
```

---

## 📋 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

### 提交类型

- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具相关

### 提交格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 示例

```bash
# 简单提交
git commit -m "feat: add bubble sort visualization"

# 详细提交
git commit -m "feat(visualizer): add step-by-step control

- Add stepForward() method
- Add stepBackward() method
- Update UI controls

Closes #123"
```

---

## 🧪 测试要求

### 运行测试

```bash
# 打开测试运行器
# 在浏览器中打开 test-runner.html
```

### 编写测试

```javascript
// 在 tests/ 目录下创建测试文件
testFramework.describe('新功能测试', (it) => {
    it('应该正确执行功能', () => {
        const result = yourFunction();
        assert.equal(result, expectedValue);
    });
    
    it('应该处理边界情况', () => {
        const result = yourFunction(edgeCase);
        assert.truthy(result);
    });
});
```

### 测试覆盖要求

- 新功能必须包含测试
- 修复Bug应添加回归测试
- 测试应覆盖正常情况和边界情况
- 保持测试简洁和可维护

---

## 📚 文档要求

### 代码文档

- 所有公共API必须有JSDoc注释
- 复杂逻辑需要行内注释
- 类和方法需要说明用途和参数

### 用户文档

- 新功能需要更新用户手册
- 添加使用示例
- 更新API参考文档
- 必要时添加截图或GIF

### 更新日志

- 在CHANGELOG.md中记录更改
- 遵循 [Keep a Changelog](https://keepachangelog.com/) 格式
- 分类记录（新增、改进、修复等）

---

## ✅ Pull Request检查清单

提交PR前，请确保：

- [ ] 代码通过所有测试
- [ ] 添加了必要的测试
- [ ] 更新了相关文档
- [ ] 遵循代码规范
- [ ] 提交信息符合规范
- [ ] 更新了CHANGELOG.md
- [ ] 没有合并冲突
- [ ] PR描述清晰完整

### PR模板

```markdown
## 描述
简要描述这个PR的目的和内容。

## 更改类型
- [ ] Bug修复
- [ ] 新功能
- [ ] 代码重构
- [ ] 文档更新
- [ ] 其他

## 相关Issue
Closes #(issue编号)

## 测试
描述你如何测试这些更改。

## 截图
如果适用，添加截图。

## 检查清单
- [ ] 代码通过测试
- [ ] 添加了文档
- [ ] 更新了CHANGELOG
```

---

## 🎯 开发建议

### 最佳实践

1. **小步提交**
   - 每次提交只做一件事
   - 提交信息要清晰
   - 经常提交，保持历史清晰

2. **代码审查**
   - 仔细审查自己的代码
   - 响应审查意见
   - 保持开放和友好的态度

3. **保持简单**
   - 优先考虑可读性
   - 避免过度设计
   - 遵循KISS原则

4. **性能考虑**
   - 避免不必要的DOM操作
   - 使用事件委托
   - 注意内存泄漏

### 常见问题

**Q: 我的PR多久会被审查？**
A: 通常在1-3个工作日内。复杂的PR可能需要更长时间。

**Q: 我可以同时提交多个PR吗？**
A: 可以，但建议每个PR专注于一个功能或修复。

**Q: 我的PR被拒绝了怎么办？**
A: 不要气馁！根据反馈进行修改，或在Issue中讨论。

**Q: 我不会写代码，还能贡献吗？**
A: 当然！你可以改进文档、报告Bug、提出建议等。

---

## 📞 获取帮助

遇到问题？我们随时准备帮助！

- 💬 [GitHub Discussions](https://github.com/your-username/cspj-algorithm-visualizer/discussions)
- 🐛 [GitHub Issues](https://github.com/your-username/cspj-algorithm-visualizer/issues)
- 📧 Email: your-email@example.com

---

## 🙏 感谢

感谢你花时间阅读本指南！

每一个贡献，无论大小，都让这个项目变得更好。💪

---

<div align="center">

**让我们一起打造更好的学习工具！** 🚀

</div>
