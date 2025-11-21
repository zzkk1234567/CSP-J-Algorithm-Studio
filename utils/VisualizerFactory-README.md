# VisualizerFactory 使用文档

## 概述

`VisualizerFactory` 是一个工厂模式实现，用于统一管理和创建算法可视化器实例。它提供了类型注册、实例创建、类型查询等功能，简化了可视化器的使用和扩展。

## 核心优势

1. **解耦创建逻辑**：将可视化器的创建逻辑与使用逻辑分离
2. **统一管理**：集中管理所有可视化器类型
3. **易于扩展**：添加新的可视化器类型无需修改核心代码
4. **类型安全**：提供类型检查和错误处理
5. **资源管理**：支持可视化器的销毁和清理

## 快速开始

### 1. 引入脚本

```html
<!-- 先引入基础可视化器类 -->
<script src="algorithm-visualizer.js"></script>

<!-- 再引入工厂类 -->
<script src="utils/VisualizerFactory.js"></script>
```

### 2. 注册可视化器类型

```javascript
// 单个注册
VisualizerFactory.register('bubble', SortingVisualizer);

// 批量注册
VisualizerFactory.registerBatch({
    'bubble': SortingVisualizer,
    'quick': SortingVisualizer,
    'linear': SearchVisualizer,
    'binary': SearchVisualizer,
    'dfs': GraphVisualizer,
    'bfs': GraphVisualizer
});
```

### 3. 创建可视化器实例

```javascript
// 创建排序可视化器
const sortVisualizer = VisualizerFactory.create('bubble', 'container-id', {
    algorithm: 'bubble',
    speed: 1000
});

// 设置数据并初始化
sortVisualizer.setData([64, 34, 25, 12, 22, 11, 90]);
sortVisualizer.init();
sortVisualizer.initVisualization();
```

### 4. 清理资源

```javascript
// 使用完毕后清理
if (sortVisualizer && typeof sortVisualizer.destroy === 'function') {
    sortVisualizer.destroy();
}
```

## API 文档

### 静态方法

#### `register(type, visualizerClass)`

注册一个可视化器类型。

**参数：**
- `type` (string): 可视化器类型标识符
- `visualizerClass` (Class): 可视化器类构造函数

**示例：**
```javascript
VisualizerFactory.register('bubble', SortingVisualizer);
```

**异常：**
- 如果 `type` 不是非空字符串，抛出错误
- 如果 `visualizerClass` 不是构造函数，抛出错误

---

#### `create(type, containerId, options)`

创建指定类型的可视化器实例。

**参数：**
- `type` (string): 可视化器类型标识符
- `containerId` (string): 容器DOM元素ID
- `options` (Object): 可视化器配置选项（可选）

**返回值：**
- 可视化器实例对象

**示例：**
```javascript
const visualizer = VisualizerFactory.create('bubble', 'demo-container', {
    algorithm: 'bubble',
    speed: 500,
    colors: {
        default: '#3b82f6',
        comparing: '#ef4444'
    }
});
```

**异常：**
- 如果类型未注册，抛出错误并列出可用类型
- 如果创建失败，抛出详细错误信息

---

#### `getAvailableTypes()`

获取所有已注册的可视化器类型。

**返回值：**
- Array<string>: 可视化器类型数组

**示例：**
```javascript
const types = VisualizerFactory.getAvailableTypes();
console.log(types); // ['bubble', 'quick', 'linear', 'binary', ...]
```

---

#### `isRegistered(type)`

检查指定类型是否已注册。

**参数：**
- `type` (string): 可视化器类型标识符

**返回值：**
- boolean: 是否已注册

**示例：**
```javascript
if (VisualizerFactory.isRegistered('bubble')) {
    console.log('Bubble sort visualizer is available');
}
```

---

#### `unregister(type)`

取消注册指定类型的可视化器。

**参数：**
- `type` (string): 可视化器类型标识符

**返回值：**
- boolean: 是否成功取消注册

**示例：**
```javascript
VisualizerFactory.unregister('bubble');
```

---

#### `clear()`

清空所有已注册的可视化器。主要用于测试或重置场景。

**示例：**
```javascript
VisualizerFactory.clear();
```

---

#### `getRegisteredCount()`

获取已注册可视化器的数量。

**返回值：**
- number: 已注册的可视化器数量

**示例：**
```javascript
const count = VisualizerFactory.getRegisteredCount();
console.log(`已注册 ${count} 个可视化器`);
```

---

#### `registerBatch(visualizers)`

批量注册多个可视化器。

**参数：**
- `visualizers` (Object): 键值对对象，键为类型，值为类

**示例：**
```javascript
VisualizerFactory.registerBatch({
    'bubble': SortingVisualizer,
    'quick': SortingVisualizer,
    'linear': SearchVisualizer
});
```

## 完整使用示例

### 示例 1：基础排序可视化

```html
<!DOCTYPE html>
<html>
<head>
    <title>排序可视化</title>
</head>
<body>
    <div id="sort-demo"></div>
    
    <script src="algorithm-visualizer.js"></script>
    <script src="utils/VisualizerFactory.js"></script>
    
    <script>
        // 注册可视化器
        VisualizerFactory.register('bubble', SortingVisualizer);
        
        // 创建实例
        const visualizer = VisualizerFactory.create('bubble', 'sort-demo', {
            algorithm: 'bubble',
            speed: 1000
        });
        
        // 设置数据并运行
        visualizer.setData([64, 34, 25, 12, 22, 11, 90]);
        visualizer.init();
        visualizer.initVisualization();
        visualizer.play();
    </script>
</body>
</html>
```

### 示例 2：动态切换算法

```javascript
let currentVisualizer = null;

function switchAlgorithm(algorithmType) {
    // 清理旧的可视化器
    if (currentVisualizer && typeof currentVisualizer.destroy === 'function') {
        currentVisualizer.destroy();
    }
    
    // 创建新的可视化器
    try {
        currentVisualizer = VisualizerFactory.create(
            algorithmType, 
            'demo-container',
            { algorithm: algorithmType }
        );
        
        currentVisualizer.setData([64, 34, 25, 12, 22, 11, 90]);
        currentVisualizer.init();
        currentVisualizer.initVisualization();
    } catch (error) {
        console.error('创建可视化器失败:', error);
        alert(`无法创建 ${algorithmType} 可视化器: ${error.message}`);
    }
}

// 使用
switchAlgorithm('bubble');  // 切换到冒泡排序
switchAlgorithm('quick');   // 切换到快速排序
```

### 示例 3：批量注册所有可视化器

```javascript
// 在页面加载时注册所有可视化器
document.addEventListener('DOMContentLoaded', () => {
    VisualizerFactory.registerBatch({
        // 排序算法
        'bubble': SortingVisualizer,
        'selection': SortingVisualizer,
        'insertion': SortingVisualizer,
        'quick': SortingVisualizer,
        'merge': SortingVisualizer,
        'heap': EnhancedSortingVisualizer,
        'counting': EnhancedSortingVisualizer,
        'radix': EnhancedSortingVisualizer,
        
        // 搜索算法
        'linear': SearchVisualizer,
        'binary': SearchVisualizer,
        'interpolation': EnhancedSearchVisualizer,
        'jump': EnhancedSearchVisualizer,
        
        // 图算法
        'dfs': GraphVisualizer,
        'bfs': GraphVisualizer,
        'dijkstra': GraphVisualizer,
        'kruskal': EnhancedGraphVisualizer,
        
        // 动态规划
        'dp-fibonacci': DynamicProgrammingVisualizer,
        'dp-knapsack': DynamicProgrammingVisualizer,
        
        // 贪心算法
        'greedy-activity': GreedyAlgorithmVisualizer,
        'greedy-coin': GreedyAlgorithmVisualizer,
        
        // CSP-J真题
        'cspj-prime-sieve': CSPJExamAlgorithmVisualizer,
        'cspj-prefix-sum': CSPJExamAlgorithmVisualizer,
        
        // 数学算法
        'math-gcd': MathAlgorithmVisualizer,
        'math-prime': MathAlgorithmVisualizer
    });
    
    console.log('✅ 已注册', VisualizerFactory.getRegisteredCount(), '个可视化器');
});
```

## 错误处理

工厂模式提供了完善的错误处理机制：

```javascript
try {
    const visualizer = VisualizerFactory.create('unknown-type', 'container');
} catch (error) {
    // 错误信息会包含可用的类型列表
    console.error(error.message);
    // 输出: Unknown visualizer type: "unknown-type". Available types: bubble, quick, linear, ...
}

try {
    VisualizerFactory.create('', 'container');
} catch (error) {
    console.error(error.message);
    // 输出: Visualizer type must be a non-empty string
}

try {
    VisualizerFactory.create('bubble', '');
} catch (error) {
    console.error(error.message);
    // 输出: Container ID must be a non-empty string
}
```

## 最佳实践

### 1. 资源管理

始终在不再需要可视化器时调用 `destroy()` 方法：

```javascript
let visualizer = VisualizerFactory.create('bubble', 'container');

// 使用可视化器...

// 清理
if (visualizer && typeof visualizer.destroy === 'function') {
    visualizer.destroy();
    visualizer = null;
}
```

### 2. 类型检查

在创建可视化器前检查类型是否已注册：

```javascript
const algorithmType = getUserSelectedAlgorithm();

if (VisualizerFactory.isRegistered(algorithmType)) {
    const visualizer = VisualizerFactory.create(algorithmType, 'container');
    // ...
} else {
    console.warn(`算法类型 ${algorithmType} 未注册`);
    showAvailableAlgorithms();
}
```

### 3. 集中注册

在应用启动时集中注册所有可视化器：

```javascript
// app-init.js
function initializeVisualizers() {
    VisualizerFactory.registerBatch({
        // 所有可视化器类型
    });
    
    console.log('可视化器初始化完成');
}

document.addEventListener('DOMContentLoaded', initializeVisualizers);
```

### 4. 错误处理

使用 try-catch 处理创建失败的情况：

```javascript
function createVisualizerSafely(type, containerId, options) {
    try {
        return VisualizerFactory.create(type, containerId, options);
    } catch (error) {
        console.error('创建可视化器失败:', error);
        showErrorMessage(`无法创建 ${type} 可视化器`);
        return null;
    }
}
```

## 测试

运行测试文件验证工厂功能：

```bash
# 在浏览器中打开测试文件
test-visualizer-factory.html
```

测试覆盖：
- ✅ 工厂类加载
- ✅ 方法存在性
- ✅ 单个注册
- ✅ 批量注册
- ✅ 类型检查
- ✅ 实例创建
- ✅ 错误处理
- ✅ 资源清理

## 常见问题

### Q: 如何添加新的可视化器类型？

A: 只需注册新类型即可：

```javascript
VisualizerFactory.register('my-new-algorithm', MyNewVisualizer);
```

### Q: 可以覆盖已注册的类型吗？

A: 可以，重新注册会覆盖旧的类型，并在控制台显示警告。

### Q: 如何获取所有可用的算法类型？

A: 使用 `getAvailableTypes()` 方法：

```javascript
const types = VisualizerFactory.getAvailableTypes();
console.log('可用算法:', types);
```

### Q: 工厂模式对性能有影响吗？

A: 几乎没有。工厂只是一个轻量级的注册表，创建实例的开销与直接使用 `new` 相同。

## 版本历史

### v1.0.0 (2024)
- ✅ 初始版本
- ✅ 支持注册、创建、查询功能
- ✅ 批量注册支持
- ✅ 完善的错误处理
- ✅ 资源管理支持

## 许可证

本项目遵循 MIT 许可证。

## 贡献

欢迎提交问题和改进建议！
