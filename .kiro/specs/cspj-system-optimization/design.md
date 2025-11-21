# Design Document

## Overview

本设计文档描述了CSP-J算法可视化学习系统的优化方案。系统采用模块化架构，基于面向对象设计原则，使用原生JavaScript实现，无需外部框架依赖。优化重点包括代码重构、性能提升、用户体验改善和功能扩展。

## Architecture

### 系统架构图

```
┌─────────────────────────────────────────────────────────────┐
│                     用户界面层 (UI Layer)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  主控制面板   │  │  算法选择器   │  │  演示控制器   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   核心可视化层 (Core Layer)                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         AlgorithmVisualizer (基类)                    │   │
│  │  - 动画队列管理                                        │   │
│  │  - 状态管理                                           │   │
│  │  - 播放控制                                           │   │
│  └──────────────────────────────────────────────────────┘   │
│           │                    │                    │         │
│  ┌────────────┐      ┌────────────┐      ┌────────────┐    │
│  │ Sorting    │      │ Searching  │      │ Graph      │    │
│  │ Visualizer │      │ Visualizer │      │ Visualizer │    │
│  └────────────┘      └────────────┘      └────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   功能增强层 (Enhancement Layer)               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  互动教程     │  │  性能对比     │  │  移动端优化   │      │
│  │  系统        │  │  系统        │  │  系统        │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   工具和服务层 (Utility Layer)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  测试套件     │  │  配置管理     │  │  日志系统     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### 模块职责

**用户界面层**
- 负责所有用户交互和视觉呈现
- 响应用户操作并调用核心层API
- 实现响应式布局和移动端适配

**核心可视化层**
- 实现算法可视化的核心逻辑
- 管理动画队列和状态机
- 提供统一的可视化器接口

**功能增强层**
- 提供额外的教学和分析功能
- 独立模块，可选加载
- 增强用户学习体验

**工具和服务层**
- 提供系统级支持功能
- 测试、配置、日志等基础设施
- 支持系统维护和调试

## Components and Interfaces

### 1. 核心可视化器重构

#### AlgorithmVisualizer 基类优化

```javascript
class AlgorithmVisualizer {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.container = null;
        this.options = this._mergeOptions(options);
        this.state = this._initializeState();
        this.animationQueue = [];
        this.currentStep = 0;
        this.isPlaying = false;
        this.animationTimer = null;
        this.eventHandlers = new Map();
    }

    // 核心方法
    init() { /* 初始化容器和UI */ }
    play() { /* 播放动画 */ }
    pause() { /* 暂停动画 */ }
    stepForward() { /* 单步执行 */ }
    reset() { /* 重置状态 */ }
    
    // 新增：资源管理
    destroy() { 
        this._clearAnimationTimer();
        this._removeEventListeners();
        this._clearContainer();
        this.animationQueue = [];
        this.state = null;
    }
    
    // 新增：事件系统
    on(event, handler) {
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, []);
        }
        this.eventHandlers.get(event).push(handler);
    }
    
    emit(event, data) {
        const handlers = this.eventHandlers.get(event) || [];
        handlers.forEach(handler => handler(data));
    }
    
    // 新增：配置合并
    _mergeOptions(options) {
        const defaults = {
            speed: 1000,
            colors: {
                default: '#3b82f6',
                comparing: '#ef4444',
                completed: '#10b981',
                pivot: '#f59e0b'
            },
            enableSound: false,
            enableStats: true
        };
        return { ...defaults, ...options };
    }
    
    // 新增：状态初始化
    _initializeState() {
        return {
            data: [],
            comparisons: 0,
            swaps: 0,
            accessCount: 0,
            startTime: null,
            endTime: null,
            isPaused: false
        };
    }
}
```

#### 统一的可视化器工厂

```javascript
class VisualizerFactory {
    static registry = new Map();
    
    static register(type, visualizerClass) {
        this.registry.set(type, visualizerClass);
    }
    
    static create(type, containerId, options) {
        const VisualizerClass = this.registry.get(type);
        if (!VisualizerClass) {
            throw new Error(`Unknown visualizer type: ${type}`);
        }
        return new VisualizerClass(containerId, options);
    }
    
    static getAvailableTypes() {
        return Array.from(this.registry.keys());
    }
}

// 注册所有可视化器
VisualizerFactory.register('bubble', BubbleSortVisualizer);
VisualizerFactory.register('quick', QuickSortVisualizer);
VisualizerFactory.register('dfs', DFSVisualizer);
// ... 其他算法
```

### 2. 配置管理系统

```javascript
class ConfigManager {
    constructor() {
        this.config = this._loadConfig();
        this.listeners = [];
    }
    
    _loadConfig() {
        const defaultConfig = {
            theme: 'light',
            language: 'zh-CN',
            animationSpeed: 1000,
            enableSound: false,
            enableStats: true,
            mobileOptimization: 'auto',
            recentAlgorithms: []
        };
        
        const savedConfig = localStorage.getItem('cspj-config');
        return savedConfig ? 
            { ...defaultConfig, ...JSON.parse(savedConfig) } : 
            defaultConfig;
    }
    
    save() {
        localStorage.setItem('cspj-config', JSON.stringify(this.config));
        this._notifyListeners();
    }
    
    get(key) {
        return this.config[key];
    }
    
    set(key, value) {
        this.config[key] = value;
        this.save();
    }
    
    onChange(listener) {
        this.listeners.push(listener);
    }
    
    _notifyListeners() {
        this.listeners.forEach(listener => listener(this.config));
    }
}

// 全局配置实例
window.configManager = new ConfigManager();
```

### 3. 性能优化模块

#### 虚拟化渲染器

```javascript
class VirtualizedRenderer {
    constructor(container, itemHeight = 40) {
        this.container = container;
        this.itemHeight = itemHeight;
        this.visibleItems = [];
        this.scrollTop = 0;
        this.containerHeight = 0;
    }
    
    render(data) {
        this.data = data;
        this.containerHeight = this.container.clientHeight;
        
        const startIndex = Math.floor(this.scrollTop / this.itemHeight);
        const endIndex = Math.min(
            startIndex + Math.ceil(this.containerHeight / this.itemHeight) + 1,
            data.length
        );
        
        this.visibleItems = data.slice(startIndex, endIndex);
        this._renderVisibleItems(startIndex);
    }
    
    _renderVisibleItems(startIndex) {
        const fragment = document.createDocumentFragment();
        
        this.visibleItems.forEach((item, index) => {
            const element = this._createItemElement(item, startIndex + index);
            fragment.appendChild(element);
        });
        
        this.container.innerHTML = '';
        this.container.appendChild(fragment);
    }
    
    _createItemElement(item, index) {
        const div = document.createElement('div');
        div.className = 'virtual-item';
        div.style.height = `${this.itemHeight}px`;
        div.style.transform = `translateY(${index * this.itemHeight}px)`;
        div.textContent = item;
        return div;
    }
    
    onScroll(scrollTop) {
        this.scrollTop = scrollTop;
        this.render(this.data);
    }
}
```

#### 性能监控器

```javascript
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: 0,
            memory: 0,
            renderTime: 0,
            animationTime: 0
        };
        this.frameCount = 0;
        this.lastTime = performance.now();
    }
    
    startFrame() {
        this.frameStartTime = performance.now();
    }
    
    endFrame() {
        const now = performance.now();
        this.frameCount++;
        
        // 计算FPS
        if (now - this.lastTime >= 1000) {
            this.metrics.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = now;
        }
        
        // 计算渲染时间
        this.metrics.renderTime = now - this.frameStartTime;
        
        // 获取内存使用（如果可用）
        if (performance.memory) {
            this.metrics.memory = performance.memory.usedJSHeapSize / 1048576; // MB
        }
    }
    
    getMetrics() {
        return { ...this.metrics };
    }
    
    displayMetrics(container) {
        container.innerHTML = `
            <div class="performance-metrics">
                <div>FPS: ${this.metrics.fps}</div>
                <div>渲染时间: ${this.metrics.renderTime.toFixed(2)}ms</div>
                <div>内存: ${this.metrics.memory.toFixed(2)}MB</div>
            </div>
        `;
    }
}
```

### 4. 移动端优化增强

```javascript
class EnhancedMobileOptimization {
    constructor() {
        this.isMobile = this._detectMobile();
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.isInitialized = false;
    }
    
    init() {
        if (this.isInitialized) return;
        
        if (this.isMobile) {
            this._applyMobileStyles();
            this._setupTouchGestures();
            this._optimizePerformance();
            this._setupViewport();
        }
        
        this.isInitialized = true;
    }
    
    _detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        ) || window.innerWidth < 768;
    }
    
    _applyMobileStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .algorithm-card {
                    padding: 1rem;
                    margin: 0.5rem;
                }
                
                .control-button {
                    min-height: 44px;
                    min-width: 44px;
                    font-size: 1rem;
                }
                
                .visualization-container {
                    height: 300px;
                    overflow-x: auto;
                }
                
                .step-explanation {
                    font-size: 0.875rem;
                    padding: 0.75rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    _setupTouchGestures() {
        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const deltaX = touchEndX - this.touchStartX;
            const deltaY = touchEndY - this.touchStartY;
            
            // 检测滑动手势
            if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 30) {
                if (deltaX > 0) {
                    this._handleSwipeRight();
                } else {
                    this._handleSwipeLeft();
                }
            }
        }, { passive: true });
    }
    
    _handleSwipeRight() {
        // 触发"上一步"操作
        const event = new CustomEvent('mobile-swipe-right');
        document.dispatchEvent(event);
    }
    
    _handleSwipeLeft() {
        // 触发"下一步"操作
        const event = new CustomEvent('mobile-swipe-left');
        document.dispatchEvent(event);
    }
    
    _optimizePerformance() {
        // 禁用不必要的动画
        if (this.isMobile) {
            document.body.classList.add('mobile-optimized');
        }
    }
    
    _setupViewport() {
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            document.head.appendChild(viewport);
        }
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    }
}
```

### 5. 测试框架增强

```javascript
class TestFramework {
    constructor() {
        this.tests = [];
        this.results = [];
    }
    
    describe(suiteName, testFn) {
        const suite = {
            name: suiteName,
            tests: []
        };
        
        const it = (testName, testFn) => {
            suite.tests.push({ name: testName, fn: testFn });
        };
        
        testFn(it);
        this.tests.push(suite);
    }
    
    async run() {
        console.log('🧪 开始运行测试...\n');
        
        for (const suite of this.tests) {
            console.log(`📦 测试套件: ${suite.name}`);
            
            for (const test of suite.tests) {
                try {
                    await test.fn();
                    console.log(`  ✅ ${test.name}`);
                    this.results.push({ suite: suite.name, test: test.name, passed: true });
                } catch (error) {
                    console.error(`  ❌ ${test.name}`);
                    console.error(`     错误: ${error.message}`);
                    this.results.push({ 
                        suite: suite.name, 
                        test: test.name, 
                        passed: false, 
                        error: error.message 
                    });
                }
            }
            console.log('');
        }
        
        this._printSummary();
    }
    
    _printSummary() {
        const total = this.results.length;
        const passed = this.results.filter(r => r.passed).length;
        const failed = total - passed;
        
        console.log('📊 测试总结');
        console.log(`总计: ${total} | 通过: ${passed} | 失败: ${failed}`);
        console.log(`通过率: ${((passed / total) * 100).toFixed(2)}%`);
    }
}

// 断言函数
const assert = {
    equal(actual, expected, message) {
        if (actual !== expected) {
            throw new Error(message || `期望 ${expected}，实际 ${actual}`);
        }
    },
    
    notEqual(actual, expected, message) {
        if (actual === expected) {
            throw new Error(message || `不应该等于 ${expected}`);
        }
    },
    
    truthy(value, message) {
        if (!value) {
            throw new Error(message || `期望真值，实际 ${value}`);
        }
    },
    
    falsy(value, message) {
        if (value) {
            throw new Error(message || `期望假值，实际 ${value}`);
        }
    },
    
    throws(fn, message) {
        try {
            fn();
            throw new Error(message || '期望抛出异常，但没有');
        } catch (error) {
            if (error.message === message) {
                throw error;
            }
        }
    }
};
```

## Data Models

### 算法配置模型

```javascript
const AlgorithmConfig = {
    id: String,              // 算法唯一标识
    name: String,            // 算法名称
    category: String,        // 算法类别
    description: String,     // 算法描述
    complexity: {
        time: {
            best: String,    // 最佳时间复杂度
            average: String, // 平均时间复杂度
            worst: String    // 最坏时间复杂度
        },
        space: String        // 空间复杂度
    },
    visualizerClass: Class,  // 可视化器类
    defaultData: Array,      // 默认数据
    options: Object          // 可选配置
};
```

### 动画步骤模型

```javascript
const AnimationStep = {
    type: String,            // 步骤类型: 'compare', 'swap', 'highlight', 'explain'
    indices: Array,          // 涉及的索引
    values: Array,           // 涉及的值
    explanation: String,     // 步骤说明
    metadata: Object         // 额外元数据
};
```

### 用户配置模型

```javascript
const UserConfig = {
    theme: String,           // 主题: 'light', 'dark'
    language: String,        // 语言: 'zh-CN', 'en-US'
    animationSpeed: Number,  // 动画速度 (ms)
    enableSound: Boolean,    // 启用声音
    enableStats: Boolean,    // 显示统计
    mobileOptimization: String, // 'auto', 'enabled', 'disabled'
    recentAlgorithms: Array, // 最近使用的算法
    favorites: Array         // 收藏的算法
};
```

## Error Handling

### 统一错误处理系统

```javascript
class ErrorHandler {
    static handle(error, context = '') {
        const errorInfo = {
            message: error.message,
            stack: error.stack,
            context: context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        // 记录错误
        this.log(errorInfo);
        
        // 显示用户友好的错误消息
        this.showUserMessage(error);
        
        // 发送错误报告（如果配置）
        if (window.configManager.get('enableErrorReporting')) {
            this.report(errorInfo);
        }
    }
    
    static log(errorInfo) {
        console.error('❌ 错误:', errorInfo);
        
        // 保存到本地存储
        const errors = JSON.parse(localStorage.getItem('error-log') || '[]');
        errors.push(errorInfo);
        
        // 只保留最近100条错误
        if (errors.length > 100) {
            errors.shift();
        }
        
        localStorage.setItem('error-log', JSON.stringify(errors));
    }
    
    static showUserMessage(error) {
        const message = this.getUserFriendlyMessage(error);
        
        // 创建错误提示
        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.innerHTML = `
            <div class="error-icon">⚠️</div>
            <div class="error-message">${message}</div>
            <button class="error-close">×</button>
        `;
        
        document.body.appendChild(toast);
        
        // 自动关闭
        setTimeout(() => {
            toast.remove();
        }, 5000);
        
        // 手动关闭
        toast.querySelector('.error-close').onclick = () => {
            toast.remove();
        };
    }
    
    static getUserFriendlyMessage(error) {
        const messages = {
            'TypeError': '数据类型错误，请检查输入',
            'ReferenceError': '引用错误，某些功能可能未正确加载',
            'RangeError': '数值超出范围，请调整输入',
            'NetworkError': '网络错误，请检查连接'
        };
        
        return messages[error.name] || '发生了一个错误，请刷新页面重试';
    }
    
    static report(errorInfo) {
        // 发送错误报告到服务器（如果需要）
        // fetch('/api/error-report', {
        //     method: 'POST',
        //     body: JSON.stringify(errorInfo)
        // });
    }
}

// 全局错误捕获
window.addEventListener('error', (event) => {
    ErrorHandler.handle(event.error, 'Global Error');
});

window.addEventListener('unhandledrejection', (event) => {
    ErrorHandler.handle(event.reason, 'Unhandled Promise Rejection');
});
```

## Testing Strategy

### 测试层次

1. **单元测试**
   - 测试每个算法可视化器的核心方法
   - 测试工具函数和辅助类
   - 测试配置管理和状态管理

2. **集成测试**
   - 测试可视化器与UI的集成
   - 测试动画队列的执行流程
   - 测试事件系统的通信

3. **端到端测试**
   - 测试完整的用户操作流程
   - 测试不同设备和浏览器的兼容性
   - 测试性能和资源使用

4. **性能测试**
   - 测试大数据集的处理能力
   - 测试动画流畅度
   - 测试内存泄漏

### 测试用例示例

```javascript
const testFramework = new TestFramework();

testFramework.describe('AlgorithmVisualizer 基类', (it) => {
    it('应该正确初始化', () => {
        const viz = new AlgorithmVisualizer('test-container');
        assert.truthy(viz.containerId);
        assert.truthy(viz.state);
        assert.equal(viz.animationQueue.length, 0);
    });
    
    it('应该正确合并配置', () => {
        const viz = new AlgorithmVisualizer('test', { speed: 500 });
        assert.equal(viz.options.speed, 500);
        assert.truthy(viz.options.colors);
    });
    
    it('应该正确清理资源', () => {
        const viz = new AlgorithmVisualizer('test');
        viz.init();
        viz.destroy();
        assert.equal(viz.animationQueue.length, 0);
        assert.falsy(viz.state);
    });
});

testFramework.describe('冒泡排序可视化器', (it) => {
    it('应该生成正确的动画队列', () => {
        const viz = new BubbleSortVisualizer('test');
        viz.setData([3, 1, 2]);
        viz.generateAnimationQueue();
        assert.truthy(viz.animationQueue.length > 0);
    });
    
    it('应该正确统计比较和交换次数', () => {
        const viz = new BubbleSortVisualizer('test');
        viz.setData([3, 2, 1]);
        viz.generateAnimationQueue();
        viz.play();
        // 等待动画完成后验证
    });
});

testFramework.run();
```

## Implementation Notes

### 代码组织

```
src/
├── core/
│   ├── AlgorithmVisualizer.js      # 基类
│   ├── VisualizerFactory.js        # 工厂类
│   └── AnimationQueue.js           # 动画队列
├── visualizers/
│   ├── sorting/
│   │   ├── BubbleSort.js
│   │   ├── QuickSort.js
│   │   └── ...
│   ├── searching/
│   │   ├── LinearSearch.js
│   │   └── BinarySearch.js
│   └── graph/
│       ├── DFS.js
│       ├── BFS.js
│       └── Dijkstra.js
├── utils/
│   ├── ConfigManager.js
│   ├── ErrorHandler.js
│   ├── PerformanceMonitor.js
│   └── VirtualizedRenderer.js
├── enhancements/
│   ├── MobileOptimization.js
│   ├── TutorialSystem.js
│   └── PerformanceComparison.js
└── tests/
    ├── TestFramework.js
    └── test-suites/
        ├── core.test.js
        ├── visualizers.test.js
        └── utils.test.js
```

### 性能优化策略

1. **延迟加载**: 只在需要时加载特定算法的可视化器
2. **虚拟化渲染**: 大数据集只渲染可见部分
3. **防抖和节流**: 优化频繁触发的事件处理
4. **资源清理**: 确保组件销毁时释放所有资源
5. **缓存策略**: 缓存计算结果和DOM查询

### 浏览器兼容性

- 支持现代浏览器（Chrome, Firefox, Safari, Edge）
- 使用Babel转译ES6+代码以支持旧版浏览器
- 提供polyfill支持缺失的API
- 渐进增强策略，核心功能在所有浏览器可用

### 国际化支持

```javascript
class I18n {
    constructor(locale = 'zh-CN') {
        this.locale = locale;
        this.messages = {};
        this.loadMessages(locale);
    }
    
    loadMessages(locale) {
        // 加载语言文件
        const messages = {
            'zh-CN': {
                'algorithm.bubble': '冒泡排序',
                'algorithm.quick': '快速排序',
                'control.play': '播放',
                'control.pause': '暂停'
            },
            'en-US': {
                'algorithm.bubble': 'Bubble Sort',
                'algorithm.quick': 'Quick Sort',
                'control.play': 'Play',
                'control.pause': 'Pause'
            }
        };
        
        this.messages = messages[locale] || messages['zh-CN'];
    }
    
    t(key, params = {}) {
        let message = this.messages[key] || key;
        
        // 替换参数
        Object.keys(params).forEach(param => {
            message = message.replace(`{${param}}`, params[param]);
        });
        
        return message;
    }
}

window.i18n = new I18n(window.configManager.get('language'));
```
