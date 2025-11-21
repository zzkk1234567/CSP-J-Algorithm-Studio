/**
 * 核心组件测试套件
 * 测试AlgorithmVisualizer基类、VisualizerFactory、ConfigManager和ErrorHandler
 */

// 测试AlgorithmVisualizer基类
testFramework.describe('AlgorithmVisualizer 基类', (it, beforeEach, afterEach) => {
    let container;
    let visualizer;
    
    beforeEach(() => {
        // 创建测试容器
        container = document.createElement('div');
        container.id = 'test-container';
        document.body.appendChild(container);
    });
    
    afterEach(() => {
        // 清理测试容器
        if (visualizer && typeof visualizer.destroy === 'function') {
            visualizer.destroy();
        }
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }
    });
    
    it('应该正确初始化基本属性', () => {
        visualizer = new AlgorithmVisualizer('test-container');
        
        assert.truthy(visualizer.container, '容器应该被正确设置');
        assert.truthy(visualizer.options, '选项应该被初始化');
        assert.truthy(visualizer.state, '状态应该被初始化');
        assert.truthy(Array.isArray(visualizer.animationQueue), '动画队列应该是数组');
        assert.equal(visualizer.animationQueue.length, 0, '动画队列初始应为空');
    });
    
    it('应该正确合并用户选项和默认选项', () => {
        visualizer = new AlgorithmVisualizer('test-container', { 
            speed: 500,
            colors: { default: '#ff0000' }
        });
        
        assert.equal(visualizer.options.speed, 500, '用户速度选项应该被应用');
        assert.equal(visualizer.options.colors.default, '#ff0000', '用户颜色选项应该被应用');
        assert.truthy(visualizer.options.colors.comparing, '默认颜色选项应该保留');
    });
    
    it('应该正确初始化状态对象', () => {
        visualizer = new AlgorithmVisualizer('test-container');
        
        assert.equal(visualizer.state.isPlaying, false, '初始播放状态应为false');
        assert.equal(visualizer.state.isPaused, false, '初始暂停状态应为false');
        assert.equal(visualizer.state.currentStep, 0, '初始步骤应为0');
        assert.equal(visualizer.state.comparisons, 0, '初始比较次数应为0');
        assert.equal(visualizer.state.swaps, 0, '初始交换次数应为0');
        assert.isNull(visualizer.state.startTime, '初始开始时间应为null');
    });
    
    it('应该支持事件系统 - 注册和触发事件', () => {
        visualizer = new AlgorithmVisualizer('test-container');
        let eventFired = false;
        let eventData = null;
        
        visualizer.on('test-event', (data) => {
            eventFired = true;
            eventData = data;
        });
        
        visualizer.emit('test-event', { value: 42 });
        
        assert.truthy(eventFired, '事件应该被触发');
        assert.equal(eventData.value, 42, '事件数据应该被正确传递');
    });
    
    it('应该支持多个事件监听器', () => {
        visualizer = new AlgorithmVisualizer('test-container');
        let count = 0;
        
        visualizer.on('test-event', () => count++);
        visualizer.on('test-event', () => count++);
        visualizer.on('test-event', () => count++);
        
        visualizer.emit('test-event');
        
        assert.equal(count, 3, '所有监听器都应该被调用');
    });
    
    it('应该正确清理资源', () => {
        visualizer = new AlgorithmVisualizer('test-container');
        visualizer.init();
        
        // 添加一些数据
        visualizer.animationQueue = [1, 2, 3];
        visualizer.on('test', () => {});
        
        visualizer.destroy();
        
        assert.equal(visualizer.animationQueue.length, 0, '动画队列应该被清空');
        assert.equal(Object.keys(visualizer.eventHandlers).length, 0, '事件处理器应该被清空');
        assert.equal(visualizer.timers.length, 0, '定时器应该被清空');
    });
    
    it('应该在destroy时清理DOM内容', () => {
        visualizer = new AlgorithmVisualizer('test-container');
        visualizer.init();
        
        const initialHTML = container.innerHTML;
        assert.truthy(initialHTML.length > 0, 'init后应该有内容');
        
        visualizer.destroy();
        
        assert.equal(container.innerHTML, '', 'destroy后容器应该被清空');
    });
});

// 测试VisualizerFactory
testFramework.describe('VisualizerFactory 工厂类', (it, beforeEach, afterEach) => {
    // 创建一个简单的测试可视化器类
    class TestVisualizer {
        constructor(containerId, options) {
            this.containerId = containerId;
            this.options = options;
            this.type = 'test';
        }
    }
    
    beforeEach(() => {
        // 清空注册表
        VisualizerFactory.clear();
    });
    
    afterEach(() => {
        // 清理
        VisualizerFactory.clear();
    });
    
    it('应该能够注册新的可视化器类型', () => {
        VisualizerFactory.register('test', TestVisualizer);
        
        assert.truthy(VisualizerFactory.isRegistered('test'), '类型应该被注册');
        assert.equal(VisualizerFactory.getRegisteredCount(), 1, '注册数量应为1');
    });
    
    it('应该能够创建已注册类型的实例', () => {
        VisualizerFactory.register('test', TestVisualizer);
        
        const instance = VisualizerFactory.create('test', 'container-id', { speed: 500 });
        
        assert.truthy(instance, '应该创建实例');
        assert.equal(instance.containerId, 'container-id', '容器ID应该正确');
        assert.equal(instance.options.speed, 500, '选项应该被传递');
        assert.equal(instance.type, 'test', '类型应该正确');
    });
    
    it('创建未注册类型时应该抛出错误', () => {
        assert.throws(
            () => VisualizerFactory.create('unknown', 'container-id'),
            'Unknown visualizer type',
            '应该抛出未知类型错误'
        );
    });
    
    it('应该返回所有已注册的类型', () => {
        class AnotherVisualizer {}
        
        VisualizerFactory.register('type1', TestVisualizer);
        VisualizerFactory.register('type2', AnotherVisualizer);
        
        const types = VisualizerFactory.getAvailableTypes();
        
        assert.equal(types.length, 2, '应该有2个类型');
        assert.includes(types, 'type1', '应该包含type1');
        assert.includes(types, 'type2', '应该包含type2');
    });
    
    it('应该能够取消注册类型', () => {
        VisualizerFactory.register('test', TestVisualizer);
        assert.truthy(VisualizerFactory.isRegistered('test'), '注册后应该存在');
        
        const result = VisualizerFactory.unregister('test');
        
        assert.truthy(result, '取消注册应该成功');
        assert.falsy(VisualizerFactory.isRegistered('test'), '取消注册后不应该存在');
    });
    
    it('应该能够批量注册多个可视化器', () => {
        class Viz1 {}
        class Viz2 {}
        class Viz3 {}
        
        VisualizerFactory.registerBatch({
            'viz1': Viz1,
            'viz2': Viz2,
            'viz3': Viz3
        });
        
        assert.equal(VisualizerFactory.getRegisteredCount(), 3, '应该注册3个类型');
        assert.truthy(VisualizerFactory.isRegistered('viz1'), 'viz1应该被注册');
        assert.truthy(VisualizerFactory.isRegistered('viz2'), 'viz2应该被注册');
        assert.truthy(VisualizerFactory.isRegistered('viz3'), 'viz3应该被注册');
    });
    
    it('注册时参数无效应该抛出错误', () => {
        assert.throws(
            () => VisualizerFactory.register('', TestVisualizer),
            'must be a non-empty string',
            '空类型名应该抛出错误'
        );
        
        assert.throws(
            () => VisualizerFactory.register('test', null),
            'must be a constructor function',
            'null类应该抛出错误'
        );
    });
    
    it('应该能够清空所有注册', () => {
        VisualizerFactory.register('test1', TestVisualizer);
        VisualizerFactory.register('test2', TestVisualizer);
        
        assert.equal(VisualizerFactory.getRegisteredCount(), 2, '注册前应该有2个');
        
        VisualizerFactory.clear();
        
        assert.equal(VisualizerFactory.getRegisteredCount(), 0, '清空后应该为0');
    });
});

// 测试ConfigManager
testFramework.describe('ConfigManager 配置管理', (it, beforeEach, afterEach) => {
    let configManager;
    let originalLocalStorage;
    
    beforeEach(() => {
        // 保存原始localStorage
        originalLocalStorage = localStorage.getItem('cspj-config');
        // 清除配置
        localStorage.removeItem('cspj-config');
        // 创建新实例
        configManager = new ConfigManager();
    });
    
    afterEach(() => {
        // 恢复原始localStorage
        if (originalLocalStorage) {
            localStorage.setItem('cspj-config', originalLocalStorage);
        } else {
            localStorage.removeItem('cspj-config');
        }
    });
    
    it('应该加载默认配置', () => {
        assert.equal(configManager.get('theme'), 'light', '默认主题应为light');
        assert.equal(configManager.get('language'), 'zh-CN', '默认语言应为zh-CN');
        assert.equal(configManager.get('animationSpeed'), 1000, '默认速度应为1000');
        assert.equal(configManager.get('enableSound'), false, '默认声音应为false');
        assert.equal(configManager.get('enableStats'), true, '默认统计应为true');
    });
    
    it('应该能够设置和获取配置项', () => {
        configManager.set('theme', 'dark');
        
        assert.equal(configManager.get('theme'), 'dark', '主题应该被更新');
    });
    
    it('应该能够保存配置到localStorage', () => {
        configManager.set('animationSpeed', 500);
        
        const saved = JSON.parse(localStorage.getItem('cspj-config'));
        assert.equal(saved.animationSpeed, 500, '配置应该被保存到localStorage');
    });
    
    it('应该能够从localStorage加载已保存的配置', () => {
        // 保存配置
        localStorage.setItem('cspj-config', JSON.stringify({
            theme: 'dark',
            language: 'en-US',
            animationSpeed: 2000
        }));
        
        // 创建新实例
        const newManager = new ConfigManager();
        
        assert.equal(newManager.get('theme'), 'dark', '应该加载保存的主题');
        assert.equal(newManager.get('language'), 'en-US', '应该加载保存的语言');
        assert.equal(newManager.get('animationSpeed'), 2000, '应该加载保存的速度');
    });
    
    it('应该支持配置变更监听器', () => {
        let notified = false;
        let notifiedConfig = null;
        
        configManager.onChange((config) => {
            notified = true;
            notifiedConfig = config;
        });
        
        configManager.set('theme', 'dark');
        
        assert.truthy(notified, '监听器应该被调用');
        assert.equal(notifiedConfig.theme, 'dark', '应该传递更新后的配置');
    });
    
    it('应该支持多个监听器', () => {
        let count = 0;
        
        configManager.onChange(() => count++);
        configManager.onChange(() => count++);
        configManager.onChange(() => count++);
        
        configManager.set('theme', 'dark');
        
        assert.equal(count, 3, '所有监听器都应该被调用');
    });
    
    it('应该能够获取所有配置', () => {
        const allConfig = configManager.getAll();
        
        assert.truthy(allConfig, '应该返回配置对象');
        assert.hasProperty(allConfig, 'theme', '应该包含theme属性');
        assert.hasProperty(allConfig, 'language', '应该包含language属性');
        assert.hasProperty(allConfig, 'animationSpeed', '应该包含animationSpeed属性');
    });
    
    it('应该能够重置为默认配置', () => {
        configManager.set('theme', 'dark');
        configManager.set('animationSpeed', 2000);
        
        configManager.reset();
        
        assert.equal(configManager.get('theme'), 'light', '主题应该被重置');
        assert.equal(configManager.get('animationSpeed'), 1000, '速度应该被重置');
    });
    
    it('应该能够添加最近使用的算法', () => {
        configManager.addRecentAlgorithm('bubble');
        configManager.addRecentAlgorithm('quick');
        
        const recent = configManager.get('recentAlgorithms');
        
        assert.equal(recent.length, 2, '应该有2个最近算法');
        assert.equal(recent[0], 'quick', '最新的应该在前面');
        assert.equal(recent[1], 'bubble', '旧的应该在后面');
    });
    
    it('最近算法列表应该去重', () => {
        configManager.addRecentAlgorithm('bubble');
        configManager.addRecentAlgorithm('quick');
        configManager.addRecentAlgorithm('bubble');
        
        const recent = configManager.get('recentAlgorithms');
        
        assert.equal(recent.length, 2, '应该只有2个算法（去重）');
        assert.equal(recent[0], 'bubble', 'bubble应该移到最前');
    });
    
    it('应该能够切换收藏状态', () => {
        const isFavorite1 = configManager.toggleFavorite('bubble');
        assert.truthy(isFavorite1, '第一次切换应该返回true（已收藏）');
        
        const isFavorite2 = configManager.toggleFavorite('bubble');
        assert.falsy(isFavorite2, '第二次切换应该返回false（取消收藏）');
    });
    
    it('应该能够检查收藏状态', () => {
        assert.falsy(configManager.isFavorite('bubble'), '初始应该未收藏');
        
        configManager.toggleFavorite('bubble');
        
        assert.truthy(configManager.isFavorite('bubble'), '收藏后应该返回true');
    });
});

// 测试ErrorHandler
testFramework.describe('ErrorHandler 错误处理', (it, beforeEach, afterEach) => {
    let originalErrorLog;
    
    beforeEach(() => {
        // 保存原始错误日志
        originalErrorLog = localStorage.getItem('cspj-error-log');
        // 清除错误日志
        ErrorHandler.clearErrorLogs();
    });
    
    afterEach(() => {
        // 恢复原始错误日志
        if (originalErrorLog) {
            localStorage.setItem('cspj-error-log', originalErrorLog);
        } else {
            localStorage.removeItem('cspj-error-log');
        }
        
        // 清理Toast容器
        const toastContainer = document.getElementById('error-toast-container');
        if (toastContainer) {
            toastContainer.remove();
        }
    });
    
    it('应该能够记录错误到本地存储', () => {
        const error = new TypeError('测试错误');
        ErrorHandler.handle(error, '测试上下文');
        
        const logs = ErrorHandler.getErrorLogs();
        
        assert.equal(logs.length, 1, '应该有1条错误日志');
        assert.equal(logs[0].message, '测试错误', '错误消息应该正确');
        assert.equal(logs[0].context, '测试上下文', '上下文应该正确');
        assert.equal(logs[0].type, 'TypeError', '错误类型应该正确');
    });
    
    it('应该限制错误日志数量为100条', () => {
        // 添加101条错误
        for (let i = 0; i < 101; i++) {
            ErrorHandler.handle(new Error(`错误 ${i}`), `上下文 ${i}`);
        }
        
        const logs = ErrorHandler.getErrorLogs();
        
        assert.equal(logs.length, 100, '应该只保留100条日志');
        assert.equal(logs[0].message, '错误 1', '最旧的日志应该被删除');
    });
    
    it('应该为不同错误类型返回用户友好消息', () => {
        const typeError = new TypeError('类型错误');
        const refError = new ReferenceError('引用错误');
        const rangeError = new RangeError('范围错误');
        
        const typeMsg = ErrorHandler.getUserFriendlyMessage(typeError);
        const refMsg = ErrorHandler.getUserFriendlyMessage(refError);
        const rangeMsg = ErrorHandler.getUserFriendlyMessage(rangeError);
        
        assert.truthy(typeMsg.includes('数据类型'), 'TypeError应该返回类型相关消息');
        assert.truthy(refMsg.includes('引用错误'), 'ReferenceError应该返回引用相关消息');
        assert.truthy(rangeMsg.includes('数值超出'), 'RangeError应该返回范围相关消息');
    });
    
    it('未知错误类型应该返回通用消息', () => {
        const unknownError = new Error('未知错误');
        unknownError.name = 'UnknownError';
        
        const message = ErrorHandler.getUserFriendlyMessage(unknownError);
        
        assert.truthy(message.includes('发生了一个错误'), '应该返回通用错误消息');
    });
    
    it('应该能够获取所有错误日志', () => {
        ErrorHandler.handle(new Error('错误1'), '上下文1');
        ErrorHandler.handle(new Error('错误2'), '上下文2');
        
        const logs = ErrorHandler.getErrorLogs();
        
        assert.equal(logs.length, 2, '应该有2条日志');
        assert.truthy(Array.isArray(logs), '应该返回数组');
    });
    
    it('应该能够清除所有错误日志', () => {
        ErrorHandler.handle(new Error('错误1'), '上下文1');
        ErrorHandler.handle(new Error('错误2'), '上下文2');
        
        const result = ErrorHandler.clearErrorLogs();
        const logs = ErrorHandler.getErrorLogs();
        
        assert.truthy(result, '清除应该成功');
        assert.equal(logs.length, 0, '日志应该被清空');
    });
    
    it('应该能够导出错误日志为文本', () => {
        ErrorHandler.handle(new TypeError('测试错误'), '测试上下文');
        
        const exportText = ErrorHandler.exportErrorLogs();
        
        assert.truthy(exportText.includes('CSP-J'), '应该包含标题');
        assert.truthy(exportText.includes('测试错误'), '应该包含错误消息');
        assert.truthy(exportText.includes('TypeError'), '应该包含错误类型');
        assert.truthy(exportText.includes('测试上下文'), '应该包含上下文');
    });
    
    it('空日志导出应该返回提示消息', () => {
        const exportText = ErrorHandler.exportErrorLogs();
        
        assert.equal(exportText, '暂无错误日志', '空日志应该返回提示');
    });
    
    it('应该显示错误Toast UI', () => {
        const error = new Error('测试Toast');
        ErrorHandler.showUserMessage(error);
        
        // 检查Toast容器是否被创建
        const toastContainer = document.getElementById('error-toast-container');
        assert.truthy(toastContainer, 'Toast容器应该被创建');
        
        // 检查Toast内容
        const toast = toastContainer.querySelector('.error-toast');
        assert.truthy(toast, 'Toast元素应该存在');
        
        const message = toast.querySelector('.error-message');
        assert.truthy(message, '错误消息元素应该存在');
    });
});

console.log('✅ 核心组件测试套件已加载');
