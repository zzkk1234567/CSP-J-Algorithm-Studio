# 页面跳动问题修复报告 v2.1.1

## 问题描述
用户报告在算法可视化过程中,整个浏览器窗口会发生跳动,而不仅仅是代码容器内部滚动。

## 根本原因
`scrollIntoView({ behavior: 'smooth', block: 'center' })` 在某些情况下会导致整个浏览器视口移动,而不仅仅是滚动代码容器。

## 修复方案

### 1. CSS修改
**目标**: 为 `.code-line` 添加透明边框,防止高亮时布局偏移
```css
.code-line {
    /* ... 其他属性 ... */
    border-left: 3px solid transparent;  /* 新增 */
}

.code-line.active {
    background-color: #264f78;
    border-left-color: #e51400;  /* 只改变颜色,不改变宽度 */
}
```

### 2. JavaScript修改
**目标**: 用手动滚动替代 `scrollIntoView`,确保只滚动代码容器

**修改前**:
```javascript
highlightCode(lineIndex) {
    const lines = this.codeDisplay.querySelectorAll('.code-line');
    lines.forEach((line, idx) => {
        if (idx === lineIndex) {
            line.classList.add('active');
            line.scrollIntoView({ behavior: 'smooth', block: 'center' });  // 会导致页面跳动
        } else {
            line.classList.remove('active');
        }
    });
}
```

**修改后**:
```javascript
highlightCode(lineIndex) {
    const lines = this.codeDisplay.querySelectorAll('.code-line');
    lines.forEach((line, idx) => {
        if (idx === lineIndex) {
            line.classList.add('active');
            
            // Manual scroll to prevent page viewport jump
            const container = this.codeDisplay;
            const lineTop = line.offsetTop;
            const lineHeight = line.offsetHeight;
            const containerHeight = container.clientHeight;
            const scrollTop = container.scrollTop;
            
            // Calculate if line is out of visible area
            const lineBottom = lineTop + lineHeight;
            const visibleTop = scrollTop;
            const visibleBottom = scrollTop + containerHeight;
            
            // Only scroll if line is not fully visible
            if (lineTop < visibleTop || lineBottom > visibleBottom) {
                // Scroll to center the line in container
                const targetScroll = lineTop - (containerHeight / 2) + (lineHeight / 2);
                container.scrollTop = targetScroll;  // 直接设置scrollTop,不影响页面
            }
        } else {
            line.classList.remove('active');
        }
    });
}
```

## 修复效果

### ✅ 已实现
1. **手动滚动控制**: 通过直接设置 `container.scrollTop` 而非使用 `scrollIntoView`,确保只有代码容器滚动
2. **智能滚动**: 只在代码行不可见时才滚动,避免不必要的移动
3. **居中显示**: 将高亮行滚动到容器中心,提供最佳视觉体验
4. **零布局偏移**: 透明边框确保高亮时不会改变元素宽度

### 🎯 预期效果
- ✅ 代码高亮时,只有右侧代码容器内部滚动
- ✅ 浏览器窗口视口保持不动
- ✅ 动画流畅,无闪烁
- ✅ 用户体验显著提升

## 版本信息
- **修复版本**: v2.1.1
- **修复日期**: 2025-11-21
- **修复文件**: `csp-j-studio-simple.html`

## 测试建议
1. 打开 `csp-j-studio-simple.html`
2. 选择任意排序算法(如冒泡排序)
3. 点击"运行"按钮
4. 观察代码高亮变化时,页面是否保持稳定
5. 确认只有代码容器内部滚动,浏览器窗口不移动

---
**状态**: ✅ 修复完成,等待用户验证
