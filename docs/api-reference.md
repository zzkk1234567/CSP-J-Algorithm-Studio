# CSP-J 算法可视化系统 - API 参考文档

## 目录

- [核心类](#核心类)
  - [AlgorithmVisualizer](#algorithmvisualizer)
  - [VisualizerFactory](#visualizerfactory)
- [工具类](#工具类)
  - [ConfigManager](#configmanager)
  - [ErrorHandler](#errorhandler)
  - [PerformanceMonitor](#performancemonitor)
  - [VirtualizedRenderer](#virtualizedrenderer)
- [配置选项](#配置选项)
- [事件系统](#事件系统)

---

## 核心类

### AlgorithmVisualizer

算法可视化基类，所有具体算法可视化器的父类。提供统一的动画控制、状态管理和用户交互接口。

#### 构造函数

```javascript
new AlgorithmVisualizer(containerId, options)
```

**参数：**
- `containerId` (string): DOM容器的ID
- `options` (Object, 可选): 配置选项对象

**示例：**
```javascript
const visualizer = new AlgorithmVisualizer('demo-container', {
    speed: 1000,
    colors: {
        default: '#3b82f6',
        comparing: '#ef4444',
        completed: '#10b981'
    }
});
```

#### 公共方法

##### init()

初始化可视化器，创建UI元素和控制面板。

```javascript
visualizer.init()
```

**返回值：** 无

**示例：**
```javascript
const visualizer = new BubbleSortVisualizer('container');
visualizer.init();
```

---

##### play()

开始播放动画队列。

```javascript
visualizer.play()
```

**返回值：** 无

**触发事件：** `animation-start`, `step-change`

**示例：**
```javascript
visualizer.play();
```

---

##### pause()

暂停当前播放的动画。

```javascript
visualizer.pause()
```

**返回值：** 无

**触发事件：** `animation-pause`

**示例：**
```javascript
visualizer.pause();
```

---

##### stepForward()

执行下一个动画步骤。

```javascript
visualizer.stepForward()
```

**返回值：** 无

**触发事件：** `step-change`

**示例：**
```javascript
visualizer.stepForward();
```

---

##### stepBackward()

返回上一个动画步骤。

```javascript
visualizer.stepBackward()
```

**返回值：** 无

**触发事件：** `step-change`

**示例：**
```javascript
visualizer.stepBackward();
```

---

##### reset()

重置可视化器到初始状态。

```javascript
visualizer.reset()
```

**返回值：** 无

**触发事件：** `animation-reset`

**示例：**
```javascript
visualizer.reset();
```

---

##### setSpeed(speed)

设置动画播放速度。

```javascript
visualizer.setSpeed(speed)
```

**参数：**
- `speed` (number): 动画速度（毫秒），范围100-3000

**返回值：** 无

**示例：**
```javascript
visualizer.setSpeed(500); // 设置为500ms每步
```

---

##### setData(data)

设置要可视化的数据。

```javascript
visualizer.setData(data)
```

**参数：**
- `data` (Array): 数据数组

**返回值：** 无

**示例：**
```javascript
visualizer.setData([5, 2, 8, 1, 9]);
```

---

##### on(eventName, handler)

注册事件监听器。

```javascript
visualizer.on(eventName, handler)
```

**参数：**
- `eventName` (string): 事件名称
- `handler` (Function): 事件处理函数

**返回值：** 无

**示例：**
```javascript
visualizer.on('animation-complete', (data) => {
    console.log('动画完成！', data);
});
```

---

##### emit(eventName, data)

触发事件。

```javascript
visualizer.emit(eventName, data)
```

**参数：**
- `eventName` (string): 事件名称
- `data` (any): 传递给事件处理器的数据

**返回值：** 无

**示例：**
```javascript
visualizer.emit('custom-event', { message: 'Hello' });
```

---

##### destroy()

清理资源，防止内存泄漏。销毁可视化器时必须调用。

```javascript
visualizer.destroy()
```

**返回值：** 无

**示例：**
```javascript
// 切换算法前清理旧实例
if (currentVisualizer) {
    currentVisualizer.destroy();
}
currentVisualizer = new QuickSortVisualizer('container');
```

---

#### 受保护方法（子类可重写）

##### _mergeOptions(options)

合并用户选项和默认选项。

```javascript
_mergeOptions(options)
```

**参数：**
- `options` (Object): 用户提供的选项

**返回值：** (Object) 合并后的选项对象

---

##### _initializeState()

初始化状态对象。

```javascript
_initializeState()
```

**返回值：** (Object) 初始状态对象

---

##### generateAnimationQueue()

生成动画队列。子类必须实现此方法。

```javascript
generateAnimationQueue()
```

**返回值：** 无

**示例（子类实现）：**
```javascript
class BubbleSortVisualizer extends AlgorithmVisualizer {
    generateAnimationQueue() {
        const arr = [...this.data];
        const n = arr.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // 添加比较步骤
                this.animationQueue.push({
                    type: 'compare',
                    indices: [j, j + 1],
                    explanation: `比较 ${arr[j]} 和 ${arr[j + 1]}`
                });
                
                if (arr[j] > arr[j + 1]) {
                    // 添加交换步骤
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    this.animationQueue.push({
                        type: 'swap',
                        indices: [j, j + 1],
                        explanation: `交换 ${arr[j + 1]} 和 ${arr[j]}`
                    });
                }
            }
        }
    }
}
```

---

### VisualizerFactory

可视化器工厂类，用于注册和创建算法可视化器实例。

#### 静态方法

##### register(type, visualizerClass)

注册可视化器类型。

```javascript
VisualizerFactory.register(type, visualizerClass)
```

**参数：**
- `type` (string): 可视化器类型标识
- `visualizerClass` (Class): 可视化器类

**返回值：** 无

**示例：**
```javascript
VisualizerFactory.register('bubble', BubbleSortVisualizer);
VisualizerFactory.register('quick', QuickSortVisualizer);
VisualizerFactory.register('dfs', DFSVisualizer);
```

---

##### create(type, containerId, options)

创建可视化器实例。

```javascript
VisualizerFactory.create(type, containerId, options)
```

**参数：**
- `type` (string): 可视化器类型标识
- `containerId` (string): DOM容器ID
- `options` (Object, 可选): 配置选项

**返回值：** (AlgorithmVisualizer) 可视化器实例

**抛出：** 如果类型未注册，抛出Error

**示例：**
```javascript
const visualizer = VisualizerFactory.create('bubble', 'demo-container', {
    speed: 800
});
visualizer.init();
```

---

##### getAvailableTypes()

获取所有已注册的可视化器类型。

```javascript
VisualizerFactory.getAvailableTypes()
```

**返回值：** (Array<string>) 类型标识数组

**示例：**
```javascript
const types = VisualizerFactory.getAvailableTypes();
console.log(types); // ['bubble', 'quick', 'dfs', ...]
```

---

## 工具类

### ConfigManager

配置管理器，处理用户配置的加载、保存和监听。

#### 构造函数

```javascript
new ConfigManager()
```

**示例：**
```javascript
const configManager = new ConfigManager();
```

#### 公共方法

##### get(key)

获取配置值。

```javascript
configManager.get(key)
```

**参数：**
- `key` (string): 配置键名

**返回值：** (any) 配置值

**示例：**
```javascript
const theme = configManager.get('theme');
const speed = configManager.get('animationSpeed');
```

---

##### set(key, value)

设置配置值并自动保存。

```javascript
configManager.set(key, value)
```

**参数：**
- `key` (string): 配置键名
- `value` (any): 配置值

**返回值：** 无

**示例：**
```javascript
configManager.set('theme', 'dark');
configManager.set('animationSpeed', 1500);
```

---

##### save()

手动保存配置到localStorage。

```javascript
configManager.save()
```

**返回值：** 无

**示例：**
```javascript
configManager.config.theme = 'dark';
configManager.config.language = 'en-US';
configManager.save();
```

---

##### onChange(listener)

注册配置变更监听器。

```javascript
configManager.onChange(listener)
```

**参数：**
- `listener` (Function): 监听器函数，接收完整配置对象作为参数

**返回值：** 无

**示例：**
```javascript
configManager.onChange((config) => {
    console.log('配置已更新:', config);
    if (config.theme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});
```

---

### ErrorHandler

统一错误处理器，提供错误捕获、日志记录和用户提示功能。

#### 静态方法

##### handle(error, context)

处理错误。

```javascript
ErrorHandler.handle(error, context)
```

**参数：**
- `error` (Error): 错误对象
- `context` (string, 可选): 错误上下文描述

**返回值：** 无

**示例：**
```javascript
try {
    // 可能出错的代码
    visualizer.play();
} catch (error) {
    ErrorHandler.handle(error, 'Algorithm Playback');
}
```

---

##### log(errorInfo)

记录错误到本地存储。

```javascript
ErrorHandler.log(errorInfo)
```

**参数：**
- `errorInfo` (Object): 错误信息对象
  - `message` (string): 错误消息
  - `stack` (string): 堆栈跟踪
  - `context` (string): 上下文
  - `timestamp` (string): 时间戳

**返回值：** 无

**示例：**
```javascript
ErrorHandler.log({
    message: 'Invalid data format',
    stack: error.stack,
    context: 'Data Input',
    timestamp: new Date().toISOString()
});
```

---

##### showUserMessage(error)

显示用户友好的错误提示。

```javascript
ErrorHandler.showUserMessage(error)
```

**参数：**
- `error` (Error): 错误对象

**返回值：** 无

**示例：**
```javascript
ErrorHandler.showUserMessage(new TypeError('Invalid input'));
```

---

##### getUserFriendlyMessage(error)

获取用户友好的错误消息。

```javascript
ErrorHandler.getUserFriendlyMessage(error)
```

**参数：**
- `error` (Error): 错误对象

**返回值：** (string) 用户友好的错误消息

**示例：**
```javascript
const message = ErrorHandler.getUserFriendlyMessage(error);
alert(message);
```

---

### PerformanceMonitor

性能监控器，跟踪FPS、内存使用和渲染时间。

#### 构造函数

```javascript
new PerformanceMonitor()
```

**示例：**
```javascript
const monitor = new PerformanceMonitor();
```

#### 公共方法

##### startFrame()

标记帧开始。

```javascript
monitor.startFrame()
```

**返回值：** 无

**示例：**
```javascript
function animate() {
    monitor.startFrame();
    
    // 渲染代码
    render();
    
    monitor.endFrame();
    requestAnimationFrame(animate);
}
```

---

##### endFrame()

标记帧结束并计算指标。

```javascript
monitor.endFrame()
```

**返回值：** 无

---

##### getMetrics()

获取当前性能指标。

```javascript
monitor.getMetrics()
```

**返回值：** (Object) 性能指标对象
- `fps` (number): 每秒帧数
- `memory` (number): 内存使用（MB）
- `renderTime` (number): 渲染时间（ms）

**示例：**
```javascript
const metrics = monitor.getMetrics();
console.log(`FPS: ${metrics.fps}, 内存: ${metrics.memory}MB`);
```

---

##### displayMetrics(container)

在指定容器中显示性能指标。

```javascript
monitor.displayMetrics(container)
```

**参数：**
- `container` (HTMLElement): 显示容器元素

**返回值：** 无

**示例：**
```javascript
const container = document.getElementById('performance-panel');
monitor.displayMetrics(container);
```

---

### VirtualizedRenderer

虚拟化渲染器，用于高效渲染大数据集。

#### 构造函数

```javascript
new VirtualizedRenderer(container, itemHeight)
```

**参数：**
- `container` (HTMLElement): 容器元素
- `itemHeight` (number, 可选): 每项高度（像素），默认40

**示例：**
```javascript
const container = document.getElementById('list-container');
const renderer = new VirtualizedRenderer(container, 50);
```

#### 公共方法

##### render(data)

渲染数据。

```javascript
renderer.render(data)
```

**参数：**
- `data` (Array): 要渲染的数据数组

**返回值：** 无

**示例：**
```javascript
const largeDataset = Array.from({ length: 1000 }, (_, i) => i);
renderer.render(largeDataset);
```

---

##### onScroll(scrollTop)

处理滚动事件。

```javascript
renderer.onScroll(scrollTop)
```

**参数：**
- `scrollTop` (number): 滚动位置

**返回值：** 无

**示例：**
```javascript
container.addEventListener('scroll', (e) => {
    renderer.onScroll(e.target.scrollTop);
});
```

---

## 配置选项

### AlgorithmVisualizer 配置选项

```javascript
{
    // 动画速度（毫秒）
    speed: 1000,
    
    // 颜色配置
    colors: {
        default: '#3b82f6',      // 默认颜色
        comparing: '#ef4444',    // 比较时的颜色
        completed: '#10b981',    // 完成时的颜色
        pivot: '#f59e0b',        // 基准元素颜色
        auxiliary: '#8b5cf6',    // 辅助元素颜色
        found: '#22c55e',        // 找到目标的颜色
        current: '#fbbf24'       // 当前元素颜色
    },
    
    // 启用声音效果
    enableSound: false,
    
    // 显示统计信息
    enableStats: true,
    
    // 自动播放
    autoPlay: false,
    
    // 循环播放
    loop: false
}
```

### ConfigManager 默认配置

```javascript
{
    // 主题：'light' 或 'dark'
    theme: 'light',
    
    // 语言：'zh-CN' 或 'en-US'
    language: 'zh-CN',
    
    // 动画速度（毫秒）
    animationSpeed: 1000,
    
    // 启用声音
    enableSound: false,
    
    // 显示统计信息
    enableStats: true,
    
    // 移动端优化：'auto', 'enabled', 'disabled'
    mobileOptimization: 'auto',
    
    // 最近使用的算法
    recentAlgorithms: [],
    
    // 收藏的算法
    favorites: []
}
```

---

## 事件系统

### 可用事件

#### animation-start

动画开始播放时触发。

**数据：** 无

**示例：**
```javascript
visualizer.on('animation-start', () => {
    console.log('动画开始');
});
```

---

#### animation-pause

动画暂停时触发。

**数据：** 无

**示例：**
```javascript
visualizer.on('animation-pause', () => {
    console.log('动画暂停');
});
```

---

#### animation-complete

动画完成时触发。

**数据：** (Object) 统计信息
- `comparisons` (number): 比较次数
- `swaps` (number): 交换次数
- `duration` (number): 执行时间（ms）

**示例：**
```javascript
visualizer.on('animation-complete', (stats) => {
    console.log(`完成！比较: ${stats.comparisons}, 交换: ${stats.swaps}`);
});
```

---

#### animation-reset

动画重置时触发。

**数据：** 无

**示例：**
```javascript
visualizer.on('animation-reset', () => {
    console.log('动画已重置');
});
```

---

#### step-change

步骤变化时触发。

**数据：** (Object) 步骤信息
- `currentStep` (number): 当前步骤
- `totalSteps` (number): 总步骤数
- `explanation` (string): 步骤说明

**示例：**
```javascript
visualizer.on('step-change', (data) => {
    console.log(`步骤 ${data.currentStep}/${data.totalSteps}: ${data.explanation}`);
});
```

---

#### speed-change

速度变化时触发。

**数据：** (number) 新速度值

**示例：**
```javascript
visualizer.on('speed-change', (speed) => {
    console.log(`速度已更改为 ${speed}ms`);
});
```

---

#### mobile-swipe-left

移动端左滑手势时触发。

**数据：** 无

**示例：**
```javascript
document.addEventListener('mobile-swipe-left', () => {
    visualizer.stepForward();
});
```

---

#### mobile-swipe-right

移动端右滑手势时触发。

**数据：** 无

**示例：**
```javascript
document.addEventListener('mobile-swipe-right', () => {
    visualizer.stepBackward();
});
```

---

## 完整使用示例

### 创建和使用可视化器

```javascript
// 1. 注册可视化器类型
VisualizerFactory.register('bubble', BubbleSortVisualizer);

// 2. 创建实例
const visualizer = VisualizerFactory.create('bubble', 'demo-container', {
    speed: 800,
    colors: {
        comparing: '#ff0000',
        completed: '#00ff00'
    }
});

// 3. 注册事件监听
visualizer.on('animation-complete', (stats) => {
    alert(`排序完成！比较了 ${stats.comparisons} 次`);
});

visualizer.on('step-change', (data) => {
    document.getElementById('step-info').textContent = data.explanation;
});

// 4. 初始化
visualizer.init();

// 5. 设置数据
visualizer.setData([5, 2, 8, 1, 9, 3]);

// 6. 播放动画
visualizer.play();

// 7. 清理（切换算法时）
// visualizer.destroy();
```

### 配置管理

```javascript
// 获取全局配置管理器
const config = window.configManager;

// 读取配置
const theme = config.get('theme');
const speed = config.get('animationSpeed');

// 更新配置
config.set('theme', 'dark');
config.set('animationSpeed', 1500);

// 监听配置变化
config.onChange((newConfig) => {
    // 应用主题
    if (newConfig.theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    
    // 更新所有可视化器的速度
    if (currentVisualizer) {
        currentVisualizer.setSpeed(newConfig.animationSpeed);
    }
});
```

### 错误处理

```javascript
// 全局错误捕获（已自动设置）
window.addEventListener('error', (event) => {
    ErrorHandler.handle(event.error, 'Global Error');
});

// 在代码中使用
try {
    const data = parseUserInput(input);
    visualizer.setData(data);
} catch (error) {
    ErrorHandler.handle(error, 'Data Input Validation');
}
```

### 性能监控

```javascript
// 创建监控器
const monitor = new PerformanceMonitor();

// 在动画循环中使用
function animationLoop() {
    monitor.startFrame();
    
    // 执行渲染
    visualizer.render();
    
    monitor.endFrame();
    
    // 显示指标
    const metrics = monitor.getMetrics();
    console.log(`FPS: ${metrics.fps}`);
    
    requestAnimationFrame(animationLoop);
}

// 在UI中显示
const perfContainer = document.getElementById('performance-panel');
setInterval(() => {
    monitor.displayMetrics(perfContainer);
}, 1000);
```

---

## 扩展开发

### 创建自定义可视化器

```javascript
class CustomSortVisualizer extends AlgorithmVisualizer {
    constructor(containerId, options) {
        super(containerId, options);
    }
    
    // 必须实现：生成动画队列
    generateAnimationQueue() {
        // 实现您的算法逻辑
        const arr = [...this.data];
        
        // 添加动画步骤
        this.animationQueue.push({
            type: 'compare',
            indices: [0, 1],
            explanation: '比较第一个和第二个元素'
        });
        
        // ... 更多步骤
    }
    
    // 可选：自定义渲染
    render() {
        // 自定义渲染逻辑
    }
}

// 注册自定义可视化器
VisualizerFactory.register('custom', CustomSortVisualizer);
```

---

## 版本信息

- **当前版本**: 2.0.0
- **最后更新**: 2024-01-15
- **兼容性**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

## 技术支持

如有问题或建议，请通过以下方式联系：
- 查看用户使用手册
- 查看错误日志
- 使用系统内置反馈功能
