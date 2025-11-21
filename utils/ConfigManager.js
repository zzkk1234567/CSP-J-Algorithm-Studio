/**
 * ConfigManager - 配置管理类
 * 负责管理用户配置的加载、保存和变更通知
 * 
 * @class ConfigManager
 * @description 提供完整的配置管理功能：
 * - 配置的持久化存储（localStorage）
 * - 配置变更监听和通知
 * - 最近使用算法记录
 * - 收藏功能管理
 * 
 * @example
 * const config = new ConfigManager();
 * 
 * // 获取配置
 * const theme = config.get('theme');
 * 
 * // 设置配置
 * config.set('theme', 'dark');
 * 
 * // 监听配置变更
 * config.onChange((newConfig) => {
 *     console.log('配置已更新:', newConfig);
 * });
 * 
 * // 添加最近使用的算法
 * config.addRecentAlgorithm('bubble-sort');
 * 
 * // 切换收藏
 * config.toggleFavorite('quick-sort');
 */
class ConfigManager {
    /**
     * 创建配置管理器实例
     * 自动从localStorage加载已保存的配置
     */
    constructor() {
        this.config = this._loadConfig();
        this.listeners = [];
    }
    
    /**
     * 从localStorage加载配置，如果不存在则使用默认配置
     * @private
     * @returns {Object} 配置对象
     */
    _loadConfig() {
        const defaultConfig = {
            theme: 'light',
            language: 'zh-CN',
            animationSpeed: 1000,
            enableSound: false,
            enableStats: true,
            mobileOptimization: 'auto',
            recentAlgorithms: [],
            favorites: []
        };
        
        try {
            const savedConfig = localStorage.getItem('cspj-config');
            if (savedConfig) {
                const parsed = JSON.parse(savedConfig);
                return { ...defaultConfig, ...parsed };
            }
        } catch (error) {
            console.warn('配置加载失败，使用默认配置:', error);
        }
        
        return defaultConfig;
    }
    
    /**
     * 保存配置到localStorage并通知所有监听器
     */
    save() {
        try {
            localStorage.setItem('cspj-config', JSON.stringify(this.config));
            this._notifyListeners();
        } catch (error) {
            console.error('配置保存失败:', error);
        }
    }
    
    /**
     * 获取配置项的值
     * @param {string} key - 配置项键名
     * @returns {*} 配置项的值
     */
    get(key) {
        return this.config[key];
    }
    
    /**
     * 设置配置项的值并保存
     * @param {string} key - 配置项键名
     * @param {*} value - 配置项的值
     */
    set(key, value) {
        this.config[key] = value;
        this.save();
    }
    
    /**
     * 注册配置变更监听器
     * @param {Function} listener - 监听器函数，接收配置对象作为参数
     */
    onChange(listener) {
        if (typeof listener === 'function') {
            this.listeners.push(listener);
        }
    }
    
    /**
     * 通知所有监听器配置已变更
     * @private
     */
    _notifyListeners() {
        this.listeners.forEach(listener => {
            try {
                listener(this.config);
            } catch (error) {
                console.error('配置监听器执行失败:', error);
            }
        });
    }
    
    /**
     * 获取所有配置
     * @returns {Object} 配置对象的副本
     * 
     * @example
     * const allConfig = config.getAll();
     * console.log(allConfig);
     */
    getAll() {
        return { ...this.config };
    }
    
    /**
     * 重置为默认配置
     * 清除所有自定义设置，恢复到初始状态
     * 
     * @returns {void}
     * 
     * @example
     * config.reset();
     */
    reset() {
        this.config = {
            theme: 'light',
            language: 'zh-CN',
            animationSpeed: 1000,
            enableSound: false,
            enableStats: true,
            mobileOptimization: 'auto',
            recentAlgorithms: [],
            favorites: []
        };
        this.save();
    }
    
    /**
     * 添加最近使用的算法
     * 将算法添加到最近使用列表的开头，自动去重并限制为最多10个
     * 
     * @param {string} algorithmId - 算法ID
     * @returns {void}
     * 
     * @example
     * config.addRecentAlgorithm('bubble-sort');
     */
    addRecentAlgorithm(algorithmId) {
        const recent = this.config.recentAlgorithms || [];
        // 移除已存在的相同算法
        const filtered = recent.filter(id => id !== algorithmId);
        // 添加到开头
        filtered.unshift(algorithmId);
        // 只保留最近10个
        this.config.recentAlgorithms = filtered.slice(0, 10);
        this.save();
    }
    
    /**
     * 切换收藏状态
     * 如果已收藏则取消收藏，如果未收藏则添加收藏
     * 
     * @param {string} algorithmId - 算法ID
     * @returns {boolean} 切换后的收藏状态（true=已收藏，false=未收藏）
     * 
     * @example
     * const isFavorited = config.toggleFavorite('quick-sort');
     * console.log(isFavorited ? '已添加收藏' : '已取消收藏');
     */
    toggleFavorite(algorithmId) {
        const favorites = this.config.favorites || [];
        const index = favorites.indexOf(algorithmId);
        
        if (index > -1) {
            favorites.splice(index, 1);
            this.config.favorites = favorites;
            this.save();
            return false;
        } else {
            favorites.push(algorithmId);
            this.config.favorites = favorites;
            this.save();
            return true;
        }
    }
    
    /**
     * 检查算法是否已收藏
     * 
     * @param {string} algorithmId - 算法ID
     * @returns {boolean} 是否已收藏
     * 
     * @example
     * if (config.isFavorite('merge-sort')) {
     *     console.log('归并排序已收藏');
     * }
     */
    isFavorite(algorithmId) {
        const favorites = this.config.favorites || [];
        return favorites.includes(algorithmId);
    }
}

// 创建全局实例
if (typeof window !== 'undefined') {
    window.configManager = new ConfigManager();
    console.log('✅ ConfigManager 已初始化');
}
