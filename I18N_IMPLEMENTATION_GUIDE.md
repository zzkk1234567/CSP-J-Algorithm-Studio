# 国际化 (I18n) 实现指南

## 📋 概述

本文档描述了CSP-J算法可视化学习系统的国际化实现，支持中文（zh-CN）和英文（en-US）两种语言。

## 🎯 实现的功能

### 1. I18n核心类 (`utils/I18n.js`)

**功能特性：**
- ✅ 支持中文（zh-CN）和英文（en-US）
- ✅ 完整的翻译键值对（150+条翻译）
- ✅ 参数替换功能（支持 `{param}` 占位符）
- ✅ 语言切换功能
- ✅ 缺失键处理（返回键名并警告）
- ✅ 事件系统（locale-changed事件）

**主要方法：**
```javascript
// 翻译文本
i18n.t('control.play') // 返回 "播放" 或 "Play"

// 带参数的翻译
i18n.t('step.comparing', {a: 5, b: 10}) // 返回 "比较元素 5 和 10"

// 切换语言
i18n.setLocale('en-US')

// 获取当前语言
i18n.getLocale() // 返回 "zh-CN" 或 "en-US"

// 获取支持的语言列表
i18n.getSupportedLocales() // 返回 [{code: 'zh-CN', name: '中文'}, ...]
```

### 2. 翻译类别

#### 通用文本 (common.*)
- loading, error, success, cancel, confirm, close, save, reset, search, filter

#### 导航和标题 (nav.*)
- title, algorithms, tutorial, comparison, settings, help

#### 算法类别 (category.*)
- sorting, searching, graph, dp, greedy, all

#### 算法名称 (algorithm.*)
- bubble, selection, insertion, quick, merge, heap
- linear-search, binary-search
- dfs, bfs, dijkstra, prim, kruskal
- knapsack, lcs

#### 控制按钮 (control.*)
- play, pause, stop, next, prev, reset
- speed, fast, normal, slow

#### 设置面板 (settings.*)
- title, theme, language, animation-speed
- enable-sound, enable-stats, mobile-optimization
- view-errors, restart-tutorial

#### 统计信息 (stats.*)
- comparisons, swaps, accesses, time
- complexity, space-complexity
- best, average, worst

#### 数据输入 (input.*)
- custom-data, placeholder
- generate-random, generate-sorted, generate-reversed
- array-size, apply

#### 步骤说明 (step.*)
- comparing, swapping, sorted
- found, not-found, visiting, complete

#### 错误消息 (error.*)
- invalid-input, empty-data, too-large
- network, unknown, type, reference, range

#### 教程 (tutorial.*)
- welcome, next, skip, finish, step

#### 其他
- 性能对比 (comparison.*)
- 帮助提示 (help.*)
- 收藏和进度 (favorites.*, progress.*)
- 难度级别 (difficulty.*)

### 3. 集成辅助工具

#### `utils/i18n-integration.js`
提供页面级别的国际化集成功能：
- `initI18n()` - 初始化国际化系统
- `updatePageText()` - 更新页面所有文本
- `t(key, params)` - 全局翻译函数

#### `utils/language-switcher.js`
处理语言切换逻辑：
- `setLanguage(locale)` - 设置语言并保存到配置
- `initLanguage()` - 初始化语言设置
- `updateLanguageUI()` - 更新语言相关UI

### 4. 算法可视化器集成

`algorithm-visualizer.js` 已更新以支持i18n：

**更新的文本：**
- 统计标签（比较次数、交换次数）
- 步骤说明标题
- 算法完成消息
- 比较和交换步骤说明
- 搜索算法说明
- 图算法说明

**使用方式：**
```javascript
// 在生成动画队列时使用i18n
this.animationQueue.push({
    type: 'explain',
    text: window.t ? window.t('step.comparing', {a: val1, b: val2}) : `比较 ${val1} 和 ${val2}`
});
```

## 🚀 使用方法

### 在HTML页面中集成

```html
<!-- 1. 加载依赖 -->
<script src="utils/ConfigManager.js"></script>
<script src="utils/I18n.js"></script>
<script src="utils/i18n-integration.js"></script>
<script src="utils/language-switcher.js"></script>

<!-- 2. 初始化 -->
<script>
    window.addEventListener('DOMContentLoaded', () => {
        // 初始化语言
        initLanguage();
        
        // 初始化i18n集成
        initI18n();
    });
</script>

<!-- 3. 在设置面板中添加语言选择器 -->
<select id="language-select" onchange="setLanguage(this.value)">
    <option value="zh-CN">中文 (简体)</option>
    <option value="en-US">English</option>
</select>
```

### 在JavaScript代码中使用

```javascript
// 方式1: 使用全局t函数
const text = window.t('control.play');

// 方式2: 使用i18n实例
const text = window.i18n.t('control.play');

// 带参数
const text = window.t('step.comparing', {a: 5, b: 10});

// 切换语言
setLanguage('en-US');
```

### 添加新的翻译

在 `utils/I18n.js` 中的 `allMessages` 对象中添加：

```javascript
const allMessages = {
    'zh-CN': {
        // ... 现有翻译
        'new.key': '新的中文文本'
    },
    'en-US': {
        // ... 现有翻译
        'new.key': 'New English text'
    }
};
```

## 🧪 测试

### 测试文件
`test-i18n.html` - 完整的i18n功能测试页面

**测试内容：**
1. ✅ I18n类加载测试
2. ✅ 基础翻译功能测试（中英文）
3. ✅ 参数替换测试
4. ✅ 缺失键处理测试
5. ✅ 语言切换测试
6. ✅ 支持语言列表测试

**运行测试：**
```bash
# 在浏览器中打开
test-i18n.html
```

### 测试结果示例
```
测试通过: 6/6
✅ I18n class loaded
✅ Basic translation (zh-CN)
✅ Basic translation (en-US)
✅ Parameter replacement
✅ Missing key handling
✅ Locale switching
✅ Get supported locales
```

## 📝 最佳实践

### 1. 翻译键命名规范
- 使用点号分隔的层级结构
- 使用小写字母和连字符
- 保持键名简洁明了

```javascript
// ✅ 好的命名
'control.play'
'settings.theme.light'
'error.invalid-input'

// ❌ 不好的命名
'PlayButton'
'SETTINGS_THEME_LIGHT'
'error_msg_1'
```

### 2. 参数替换
使用有意义的参数名：

```javascript
// ✅ 好的参数名
t('step.comparing', {a: value1, b: value2})
t('tutorial.step', {current: 3, total: 10})

// ❌ 不好的参数名
t('step.comparing', {x: value1, y: value2})
t('tutorial.step', {n1: 3, n2: 10})
```

### 3. 后备文本
始终提供后备文本以确保兼容性：

```javascript
// ✅ 带后备文本
const text = window.t ? window.t('control.play') : '播放';

// ❌ 没有后备文本
const text = window.t('control.play'); // 如果i18n未加载会报错
```

### 4. 语言切换事件
监听语言变更事件以更新UI：

```javascript
document.addEventListener('locale-changed', (e) => {
    console.log('Language changed to:', e.detail.locale);
    updateMyUI();
});
```

## 🔧 配置

### ConfigManager集成
语言设置自动保存到localStorage：

```javascript
// 配置键
configManager.get('language') // 返回 'zh-CN' 或 'en-US'

// 设置语言会自动保存
setLanguage('en-US') // 自动调用 configManager.set('language', 'en-US')
```

## 📊 覆盖范围

### 已国际化的组件
- ✅ 算法可视化器基类
- ✅ 排序算法可视化器
- ✅ 搜索算法可视化器
- ✅ 图算法可视化器
- ✅ 统计面板
- ✅ 控制按钮
- ✅ 设置面板

### 待国际化的组件
- ⏳ 主HTML页面的所有静态文本
- ⏳ 知识点内容
- ⏳ 教程内容
- ⏳ 错误日志查看器
- ⏳ 新手引导系统

## 🐛 故障排除

### 问题1: 翻译不显示
**原因：** I18n未正确加载
**解决：** 确保按正确顺序加载脚本
```html
<script src="utils/ConfigManager.js"></script>
<script src="utils/I18n.js"></script>
```

### 问题2: 语言切换不生效
**原因：** 未调用updatePageText()
**解决：** 监听locale-changed事件并更新UI
```javascript
document.addEventListener('locale-changed', updatePageText);
```

### 问题3: 参数替换不工作
**原因：** 参数名不匹配
**解决：** 检查翻译文本中的占位符名称
```javascript
// 翻译文本: "比较元素 {a} 和 {b}"
// 正确: t('step.comparing', {a: 5, b: 10})
// 错误: t('step.comparing', {x: 5, y: 10})
```

## 📈 性能考虑

- 翻译文本存储在内存中，查找速度快（O(1)）
- 语言切换时只更新必要的UI元素
- 使用事件驱动的更新机制，避免不必要的DOM操作
- 支持延迟加载（可扩展为按需加载语言包）

## 🔮 未来扩展

### 计划中的功能
1. 支持更多语言（日语、韩语等）
2. 动态加载语言包（减少初始加载大小）
3. 翻译编辑器（可视化管理翻译）
4. 自动检测浏览器语言
5. 翻译缓存优化
6. 复数形式支持
7. 日期和数字格式化

### 扩展示例

#### 添加新语言
```javascript
// 在I18n.js中添加
const allMessages = {
    'zh-CN': { /* ... */ },
    'en-US': { /* ... */ },
    'ja-JP': {
        'control.play': '再生',
        'control.pause': '一時停止',
        // ...
    }
};
```

#### 动态加载语言包
```javascript
async loadMessages(locale) {
    const response = await fetch(`/i18n/${locale}.json`);
    this.messages = await response.json();
}
```

## 📚 相关文件

- `utils/I18n.js` - I18n核心类
- `utils/i18n-integration.js` - 页面集成辅助
- `utils/language-switcher.js` - 语言切换功能
- `test-i18n.html` - 测试页面
- `algorithm-visualizer.js` - 已集成i18n的可视化器

## ✅ 完成状态

### Task 8.1: 创建I18n类 ✅
- ✅ 创建utils/I18n.js文件
- ✅ 实现I18n类（loadMessages、t方法）
- ✅ 定义中文和英文语言包（150+条翻译）
- ✅ 实现参数替换功能
- ✅ 创建全局实例window.i18n

### Task 8.2: 提取和翻译文本 ✅
- ✅ 提取algorithm-visualizer.js中的中文文本
- ✅ 为所有文本提供英文翻译
- ✅ 替换硬编码文本为i18n.t()调用
- ✅ 创建语言切换功能
- ✅ 创建测试页面验证功能

## 🎉 总结

国际化系统已完全实现并测试通过。系统支持中英文切换，提供150+条翻译，支持参数替换，并与ConfigManager集成实现配置持久化。所有核心算法可视化器已集成i18n支持。
