/**
 * 可视化器工厂类
 * 提供统一的可视化器创建和管理接口
 * 
 * @class VisualizerFactory
 * @description 使用工厂模式管理所有可视化器类型，提供以下优势：
 * 1. 解耦创建逻辑和使用逻辑
 * 2. 统一管理所有可视化器类型
 * 3. 便于扩展新的可视化器
 * 4. 提供类型检查和错误处理
 * 
 * @example
 * // 注册可视化器
 * VisualizerFactory.register('bubble', BubbleSortVisualizer);
 * 
 * // 创建可视化器实例
 * const visualizer = VisualizerFactory.create('bubble', 'container-id', { speed: 500 });
 * 
 * // 获取所有可用类型
 * const types = VisualizerFactory.getAvailableTypes();
 */
class VisualizerFactory {
    /**
     * 存储所有已注册的可视化器类型
     * @private
     * @static
     */
    static registry = new Map();

    /**
     * 注册一个可视化器类型
     * @param {string} type - 可视化器类型标识符
     * @param {Class} visualizerClass - 可视化器类
     * @throws {Error} 如果类型已存在或参数无效
     * 
     * @example
     * VisualizerFactory.register('bubble', BubbleSortVisualizer);
     */
    static register(type, visualizerClass) {
        if (!type || typeof type !== 'string') {
            throw new Error('Visualizer type must be a non-empty string');
        }

        if (!visualizerClass || typeof visualizerClass !== 'function') {
            throw new Error('Visualizer class must be a constructor function');
        }

        if (this.registry.has(type)) {
            console.warn(`Visualizer type "${type}" is already registered. Overwriting...`);
        }

        this.registry.set(type, visualizerClass);
        console.log(`✅ Registered visualizer: ${type}`);
    }

    /**
     * 创建指定类型的可视化器实例
     * @param {string} type - 可视化器类型标识符
     * @param {string} containerId - 容器DOM元素ID
     * @param {Object} options - 可视化器配置选项
     * @returns {Object} 可视化器实例
     * @throws {Error} 如果类型未注册或创建失败
     * 
     * @example
     * const visualizer = VisualizerFactory.create('bubble', 'demo-container', { speed: 500 });
     */
    static create(type, containerId, options = {}) {
        if (!type || typeof type !== 'string') {
            throw new Error('Visualizer type must be a non-empty string');
        }

        if (!containerId || typeof containerId !== 'string') {
            throw new Error('Container ID must be a non-empty string');
        }

        const VisualizerClass = this.registry.get(type);
        
        if (!VisualizerClass) {
            const availableTypes = Array.from(this.registry.keys()).join(', ');
            throw new Error(
                `Unknown visualizer type: "${type}". ` +
                `Available types: ${availableTypes || 'none'}`
            );
        }

        try {
            const instance = new VisualizerClass(containerId, options);
            console.log(`✅ Created visualizer instance: ${type}`);
            return instance;
        } catch (error) {
            throw new Error(
                `Failed to create visualizer of type "${type}": ${error.message}`
            );
        }
    }

    /**
     * 获取所有已注册的可视化器类型
     * @returns {Array<string>} 可视化器类型数组
     * 
     * @example
     * const types = VisualizerFactory.getAvailableTypes();
     * console.log(types); // ['bubble', 'quick', 'linear', 'binary', ...]
     */
    static getAvailableTypes() {
        return Array.from(this.registry.keys());
    }

    /**
     * 检查指定类型是否已注册
     * @param {string} type - 可视化器类型标识符
     * @returns {boolean} 是否已注册
     * 
     * @example
     * if (VisualizerFactory.isRegistered('bubble')) {
     *     console.log('Bubble sort visualizer is available');
     * }
     */
    static isRegistered(type) {
        return this.registry.has(type);
    }

    /**
     * 取消注册指定类型的可视化器
     * @param {string} type - 可视化器类型标识符
     * @returns {boolean} 是否成功取消注册
     * 
     * @example
     * VisualizerFactory.unregister('bubble');
     */
    static unregister(type) {
        if (this.registry.has(type)) {
            this.registry.delete(type);
            console.log(`✅ Unregistered visualizer: ${type}`);
            return true;
        }
        return false;
    }

    /**
     * 清空所有已注册的可视化器
     * 主要用于测试或重置场景
     */
    static clear() {
        this.registry.clear();
        console.log('✅ Cleared all registered visualizers');
    }

    /**
     * 获取已注册可视化器的数量
     * @returns {number} 已注册的可视化器数量
     */
    static getRegisteredCount() {
        return this.registry.size;
    }

    /**
     * 批量注册多个可视化器
     * @param {Object} visualizers - 键值对对象，键为类型，值为类
     * 
     * @example
     * VisualizerFactory.registerBatch({
     *     'bubble': BubbleSortVisualizer,
     *     'quick': QuickSortVisualizer,
     *     'linear': LinearSearchVisualizer
     * });
     */
    static registerBatch(visualizers) {
        if (!visualizers || typeof visualizers !== 'object') {
            throw new Error('Visualizers must be an object');
        }

        let successCount = 0;
        let failCount = 0;

        for (const [type, visualizerClass] of Object.entries(visualizers)) {
            try {
                this.register(type, visualizerClass);
                successCount++;
            } catch (error) {
                console.error(`Failed to register "${type}":`, error.message);
                failCount++;
            }
        }

        console.log(`✅ Batch registration complete: ${successCount} succeeded, ${failCount} failed`);
    }
}

// 导出到全局作用域
if (typeof window !== 'undefined') {
    window.VisualizerFactory = VisualizerFactory;
}

// 支持模块化导出（如果需要）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VisualizerFactory;
}
