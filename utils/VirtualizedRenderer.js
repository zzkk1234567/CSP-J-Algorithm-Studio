/**
 * 虚拟化渲染器
 * 用于处理大数据集的高效渲染，只渲染可见元素
 */
class VirtualizedRenderer {
    /**
     * 创建虚拟化渲染器实例
     * @param {HTMLElement} container - 容器元素
     * @param {number} itemHeight - 每个项目的高度（像素）
     */
    constructor(container, itemHeight = 40) {
        this.container = container;
        this.itemHeight = itemHeight;
        this.data = [];
        this.visibleItems = [];
        this.scrollTop = 0;
        this.containerHeight = 0;
        this.renderCallback = null;
        
        // 设置容器样式
        this._setupContainer();
        
        // 绑定滚动事件
        this._bindScrollEvent();
    }

    /**
     * 设置容器样式
     * @private
     */
    _setupContainer() {
        if (this.container) {
            this.container.style.overflowY = 'auto';
            this.container.style.position = 'relative';
        }
    }

    /**
     * 绑定滚动事件
     * @private
     */
    _bindScrollEvent() {
        if (this.container) {
            this.container.addEventListener('scroll', () => {
                this.onScroll(this.container.scrollTop);
            });
        }
    }

    /**
     * 渲染数据
     * @param {Array} data - 要渲染的数据数组
     * @param {Function} renderCallback - 渲染单个项目的回调函数
     */
    render(data, renderCallback) {
        this.data = data;
        this.renderCallback = renderCallback;
        this.containerHeight = this.container.clientHeight;
        
        // 计算可见范围
        const startIndex = Math.floor(this.scrollTop / this.itemHeight);
        const visibleCount = Math.ceil(this.containerHeight / this.itemHeight) + 2; // 额外渲染2个以平滑滚动
        const endIndex = Math.min(startIndex + visibleCount, data.length);
        
        // 提取可见项目
        this.visibleItems = data.slice(startIndex, endIndex);
        
        // 渲染可见项目
        this._renderVisibleItems(startIndex);
        
        // 设置容器总高度（用于滚动条）
        this._setTotalHeight();
    }

    /**
     * 渲染可见项目
     * @private
     * @param {number} startIndex - 起始索引
     */
    _renderVisibleItems(startIndex) {
        // 清空容器
        this.container.innerHTML = '';
        
        // 创建文档片段以提高性能
        const fragment = document.createDocumentFragment();
        
        // 创建占位符（用于保持滚动位置）
        const spacer = document.createElement('div');
        spacer.style.height = `${startIndex * this.itemHeight}px`;
        fragment.appendChild(spacer);
        
        // 渲染每个可见项目
        this.visibleItems.forEach((item, index) => {
            const actualIndex = startIndex + index;
            const element = this._createItemElement(item, actualIndex);
            fragment.appendChild(element);
        });
        
        // 添加底部占位符
        const remainingHeight = (this.data.length - startIndex - this.visibleItems.length) * this.itemHeight;
        if (remainingHeight > 0) {
            const bottomSpacer = document.createElement('div');
            bottomSpacer.style.height = `${remainingHeight}px`;
            fragment.appendChild(bottomSpacer);
        }
        
        // 一次性添加到DOM
        this.container.appendChild(fragment);
    }

    /**
     * 创建单个项目元素
     * @private
     * @param {*} item - 项目数据
     * @param {number} index - 项目索引
     * @returns {HTMLElement} 创建的元素
     */
    _createItemElement(item, index) {
        if (this.renderCallback) {
            // 使用自定义渲染回调
            return this.renderCallback(item, index);
        } else {
            // 默认渲染
            const div = document.createElement('div');
            div.className = 'virtual-item';
            div.style.cssText = `
                height: ${this.itemHeight}px;
                line-height: ${this.itemHeight}px;
                padding: 0 10px;
                border-bottom: 1px solid #e5e7eb;
                background: white;
            `;
            div.textContent = item;
            return div;
        }
    }

    /**
     * 设置容器总高度
     * @private
     */
    _setTotalHeight() {
        // 通过占位符实现，已在 _renderVisibleItems 中处理
    }

    /**
     * 滚动事件处理
     * @param {number} scrollTop - 滚动位置
     */
    onScroll(scrollTop) {
        this.scrollTop = scrollTop;
        
        // 重新渲染可见项目
        if (this.data.length > 0 && this.renderCallback) {
            this.render(this.data, this.renderCallback);
        }
    }

    /**
     * 更新数据
     * @param {Array} data - 新数据
     */
    updateData(data) {
        this.data = data;
        if (this.renderCallback) {
            this.render(data, this.renderCallback);
        }
    }

    /**
     * 销毁渲染器
     */
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
            this.container.removeEventListener('scroll', this.onScroll);
        }
        this.data = [];
        this.visibleItems = [];
        this.renderCallback = null;
    }
}

// 导出到全局
if (typeof window !== 'undefined') {
    window.VirtualizedRenderer = VirtualizedRenderer;
}
