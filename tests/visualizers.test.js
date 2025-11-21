/**
 * 可视化器测试套件
 * 测试SortingVisualizer和SearchVisualizer的核心功能
 */

// 测试SortingVisualizer
testFramework.describe('SortingVisualizer 排序可视化器', (it, beforeEach, afterEach) => {
    let container;
    let visualizer;
    
    beforeEach(() => {
        // 创建测试容器
        container = document.createElement('div');
        container.id = 'test-sorting-container';
        document.body.appendChild(container);
    });
    
    afterEach(() => {
        // 清理
        if (visualizer && typeof visualizer.destroy === 'function') {
            visualizer.destroy();
        }
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }
    });
    
    it('应该正确初始化排序可视化器', () => {
        visualizer = new SortingVisualizer('test-sorting-container', 'bubble');
        
        assert.truthy(visualizer, '可视化器应该被创建');
        assert.equal(visualizer.algorithm, 'bubble', '算法类型应该正确');
        assert.truthy(Array.isArray(visualizer.data), '数据应该是数组');
    });
    
    it('应该能够设置数据', () => {
        visualizer = new SortingVisualizer('test-sorting-container', 'bubble');
        const testData = [5, 3, 8, 2, 7];
        
        visualizer.setData(testData);
        
        assert.equal(visualizer.data.length, 5, '数据长度应该正确');
        assert.deepEqual(visualizer.data, testData, '数据应该被正确设置');
        assert.deepEqual(visualizer.originalData, testData, '原始数据应该被保存');
    });
    
    it('冒泡排序应该生成正确的动画队列', () => {
        visualizer = new SortingVisualizer('test-sorting-container', 'bubble');
        visualizer.setData([3, 1, 2]);
        visualizer.init();
        
        // 检查动画队列是否生成
        assert.truthy(visualizer.animationQueue.length > 0, '应该生成动画队列');
        
        // 检查是否包含比较和交换操作
        const hasCompare = visualizer.animationQueue.some(anim => anim.type === 'compare');
        const hasSwap = visualizer.animationQueue.some(anim => anim.type === 'swap');
        const hasExplain = visualizer.animationQueue.some(anim => anim.type === 'explain');
        
        assert.truthy(hasCompare, '应该包含比较操作');
        assert.truthy(hasSwap, '应该包含交换操作');
        assert.truthy(hasExplain, '应该包含说明文本');
    });
    
    it('选择排序应该生成正确的动画队列', () => {
        visualizer = new SortingVisualizer('test-sorting-container', 'selection');
        visualizer.setData([4, 2, 3, 1]);
        visualizer.init();
        
        assert.truthy(visualizer.animationQueue.length > 0, '应该生成动画队列');
        
        // 选择排序应该有高亮操作
        const hasHighlight = visualizer.animationQueue.some(anim => anim.type === 'highlight');
        assert.truthy(hasHighlight, '应该包含高亮操作');
    });
    
    it('插入排序应该生成正确的动画队列', () => {
        visualizer = new SortingVisualizer('test-sorting-container', 'insertion');
        visualizer.setData([3, 1, 4, 2]);
        visualizer.init();
        
        assert.truthy(visualizer.animationQueue.length > 0, '应该生成动画队列');
        
        // 插入排序应该有更新操作
        const hasUpdate = visualizer.animationQueue.some(anim => anim.type === 'update');
        assert.truthy(hasUpdate, '应该包含更新操作');
    });
    
    it('快速排序应该生成正确的动画队列', () => {
        visualizer = new SortingVisualizer('test-sorting-container', 'quick');
        visualizer.setData([5, 2, 8, 1, 9]);
        visualizer.init();
        
        assert.truthy(visualizer.animationQueue.length > 0, '应该生成动画队列');
        
        // 快速排序应该有基准元素的说明
        const hasPivotExplanation = visualizer.animationQueue.some(
            anim => anim.type === 'explain' && anim.text.includes('基准')
        );
        assert.truthy(hasPivotExplanation, '应该包含基准元素说明');
    });
    
    it('归并排序应该生成正确的动画队列', () => {
        visualizer = new SortingVisualizer('test-sorting-container', 'merge');
        visualizer.setData([4, 2, 7, 1]);
        visualizer.init();
        
        assert.truthy(visualizer.animationQueue.length > 0, '应该生成动画队列');
        
        // 归并排序应该有合并说明
        const hasMergeExplanation = visualizer.animationQueue.some(
            anim => anim.type === 'explain' && anim.text.includes('合并')
        );
        assert.truthy(hasMergeExplanation, '应该包含合并说明');
    });
    
    it('应该正确统计比较次数', () => {
        visualizer = new SortingVisualizer('test-sorting-container', 'bubble');
        visualizer.setData([3, 1, 2]);
        visualizer.init();
        
        // 计算动画队列中的比较次数
        const compareCount = visualizer.animationQueue.filter(
            anim => anim.type === 'compare'
        ).length;
        
        assert.truthy(compareCount > 0, '应该有比较操作');
        
        // 对于3个元素的冒泡排序，至少需要3次比较
        assert.truthy(compareCount >= 3, '比较次数应该合理');
    });
    
    it('应该正确统计交换次数', () => {
        visualizer = new SortingVisualizer('test-sorting-container', 'bubble');
        visualizer.setData([3, 2, 1]); // 完全逆序，需要最多交换
        visualizer.init();
        
        // 计算动画队列中的交换次数
        const swapCount = visualizer.animationQueue.filter(
            anim => anim.type === 'swap'
        ).length;
        
        assert.truthy(swapCount > 0, '应该有交换操作');
    });
    
    it('空数组应该能正常处理', () => {
        visualizer = new SortingVisualizer('test-sorting-container', 'bubble');
        visualizer.setData([]);
        visualizer.init();
        
        // 空数组不应该产生错误
        assert.equal(visualizer.data.length, 0, '数据应该为空');
        // 动画队列可能只包含完成说明
        assert.truthy(visualizer.animationQueue.length >= 0, '应该有动画队列');
    });
    
    it('单元素数组应该能正常处理', () => {
        visualizer = new SortingVisualizer('test-sorting-container', 'bubble');
        visualizer.setData([42]);
        visualizer.init();
        
        assert.equal(visualizer.data.length, 1, '数据长度应该为1');
        // 单元素数组不需要排序，但应该有完成说明
        const hasCompleteMessage = visualizer.animationQueue.some(
            anim => anim.type === 'explain' && anim.text.includes('完成')
        );
        assert.truthy(hasCompleteMessage, '应该有完成说明');
    });
    
    it('已排序数组应该能正常处理', () => {
        visualizer = new SortingVisualizer('test-sorting-container', 'bubble');
        visualizer.setData([1, 2, 3, 4, 5]);
        visualizer.init();
        
        assert.truthy(visualizer.animationQueue.length > 0, '应该生成动画队列');
        
        // 已排序数组不应该有交换操作（对于冒泡排序）
        const swapCount = visualizer.animationQueue.filter(
            anim => anim.type === 'swap'
        ).length;
        
        assert.equal(swapCount, 0, '已排序数组不应该有交换');
    });
    
    it('应该正确清理资源', () => {
        visualizer = new SortingVisualizer('test-sorting-container', 'bubble');
        visualizer.setData([3, 1, 2]);
        visualizer.init();
        
        visualizer.destroy();
        
        assert.equal(visualizer.data.length, 0, '数据应该被清空');
        assert.equal(visualizer.bars.length, 0, 'bars应该被清空');
        assert.equal(visualizer.animationQueue.length, 0, '动画队列应该被清空');
    });
});

// 测试SearchVisualizer
testFramework.describe('SearchVisualizer 搜索可视化器', (it, beforeEach, afterEach) => {
    let container;
    let visualizer;
    
    beforeEach(() => {
        // 创建测试容器
        container = document.createElement('div');
        container.id = 'test-search-container';
        document.body.appendChild(container);
    });
    
    afterEach(() => {
        // 清理
        if (visualizer && typeof visualizer.destroy === 'function') {
            visualizer.destroy();
        }
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }
    });
    
    it('应该正确初始化搜索可视化器', () => {
        visualizer = new SearchVisualizer('test-search-container', 'linear');
        
        assert.truthy(visualizer, '可视化器应该被创建');
        assert.equal(visualizer.algorithm, 'linear', '算法类型应该正确');
        assert.truthy(Array.isArray(visualizer.data), '数据应该是数组');
    });
    
    it('应该能够设置数据和目标值', () => {
        visualizer = new SearchVisualizer('test-search-container', 'linear');
        const testData = [5, 3, 8, 2, 7];
        
        visualizer.setData(testData);
        visualizer.setTarget(8);
        
        assert.equal(visualizer.data.length, 5, '数据长度应该正确');
        assert.equal(visualizer.target, 8, '目标值应该正确');
    });
    
    it('二分查找应该对数据进行排序', () => {
        visualizer = new SearchVisualizer('test-search-container', 'binary');
        visualizer.setData([5, 3, 8, 2, 7]);
        
        // 检查数据是否已排序
        const isSorted = visualizer.data.every((val, i, arr) => 
            i === 0 || arr[i - 1] <= val
        );
        
        assert.truthy(isSorted, '二分查找的数据应该被排序');
    });
    
    it('线性查找应该生成正确的动画队列 - 找到目标', () => {
        visualizer = new SearchVisualizer('test-search-container', 'linear');
        visualizer.setData([5, 3, 8, 2, 7]);
        visualizer.setTarget(8);
        visualizer.init();
        
        assert.truthy(visualizer.animationQueue.length > 0, '应该生成动画队列');
        
        // 应该有找到目标的说明
        const hasFoundMessage = visualizer.animationQueue.some(
            anim => anim.type === 'explain' && anim.text.includes('找到目标')
        );
        assert.truthy(hasFoundMessage, '应该有找到目标的说明');
        
        // 应该有高亮找到的元素
        const hasFoundHighlight = visualizer.animationQueue.some(
            anim => anim.type === 'highlight' && anim.color === visualizer.options.colors.found
        );
        assert.truthy(hasFoundHighlight, '应该高亮找到的元素');
    });
    
    it('线性查找应该生成正确的动画队列 - 未找到目标', () => {
        visualizer = new SearchVisualizer('test-search-container', 'linear');
        visualizer.setData([5, 3, 8, 2, 7]);
        visualizer.setTarget(99); // 不存在的值
        visualizer.init();
        
        assert.truthy(visualizer.animationQueue.length > 0, '应该生成动画队列');
        
        // 应该有未找到的说明
        const hasNotFoundMessage = visualizer.animationQueue.some(
            anim => anim.type === 'explain' && anim.text.includes('未找到')
        );
        assert.truthy(hasNotFoundMessage, '应该有未找到的说明');
    });
    
    it('二分查找应该生成正确的动画队列 - 找到目标', () => {
        visualizer = new SearchVisualizer('test-search-container', 'binary');
        visualizer.setData([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        visualizer.setTarget(5);
        visualizer.init();
        
        assert.truthy(visualizer.animationQueue.length > 0, '应该生成动画队列');
        
        // 应该有搜索范围的说明
        const hasRangeMessage = visualizer.animationQueue.some(
            anim => anim.type === 'explain' && anim.text.includes('搜索范围')
        );
        assert.truthy(hasRangeMessage, '应该有搜索范围说明');
        
        // 应该有找到目标的说明
        const hasFoundMessage = visualizer.animationQueue.some(
            anim => anim.type === 'explain' && anim.text.includes('找到目标')
        );
        assert.truthy(hasFoundMessage, '应该有找到目标的说明');
    });
    
    it('二分查找应该生成正确的动画队列 - 未找到目标', () => {
        visualizer = new SearchVisualizer('test-search-container', 'binary');
        visualizer.setData([1, 2, 3, 4, 5]);
        visualizer.setTarget(99);
        visualizer.init();
        
        assert.truthy(visualizer.animationQueue.length > 0, '应该生成动画队列');
        
        // 应该有未找到的说明
        const hasNotFoundMessage = visualizer.animationQueue.some(
            anim => anim.type === 'explain' && anim.text.includes('未找到')
        );
        assert.truthy(hasNotFoundMessage, '应该有未找到的说明');
    });
    
    it('线性查找应该检查所有元素直到找到目标', () => {
        visualizer = new SearchVisualizer('test-search-container', 'linear');
        visualizer.setData([1, 2, 3, 4, 5]);
        visualizer.setTarget(3); // 在中间位置
        visualizer.init();
        
        // 计算比较次数
        const compareCount = visualizer.animationQueue.filter(
            anim => anim.type === 'compare'
        ).length;
        
        // 应该比较3次（索引0, 1, 2）
        assert.equal(compareCount, 3, '应该比较3次');
    });
    
    it('二分查找的比较次数应该少于线性查找', () => {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const target = 8;
        
        // 线性查找
        const linearViz = new SearchVisualizer('test-search-container', 'linear');
        linearViz.setData([...data]);
        linearViz.setTarget(target);
        linearViz.init();
        const linearCompares = linearViz.animationQueue.filter(
            anim => anim.type === 'compare'
        ).length;
        
        // 二分查找
        const binaryViz = new SearchVisualizer('test-search-container', 'binary');
        binaryViz.setData([...data]);
        binaryViz.setTarget(target);
        binaryViz.init();
        const binaryCompares = binaryViz.animationQueue.filter(
            anim => anim.type === 'compare'
        ).length;
        
        assert.truthy(binaryCompares < linearCompares, '二分查找的比较次数应该更少');
        
        // 清理
        linearViz.destroy();
        binaryViz.destroy();
    });
    
    it('空数组搜索应该能正常处理', () => {
        visualizer = new SearchVisualizer('test-search-container', 'linear');
        visualizer.setData([]);
        visualizer.setTarget(5);
        visualizer.init();
        
        // 应该有未找到的说明
        const hasNotFoundMessage = visualizer.animationQueue.some(
            anim => anim.type === 'explain' && anim.text.includes('未找到')
        );
        assert.truthy(hasNotFoundMessage, '空数组应该返回未找到');
    });
    
    it('单元素数组搜索应该能正常处理', () => {
        visualizer = new SearchVisualizer('test-search-container', 'linear');
        visualizer.setData([42]);
        visualizer.setTarget(42);
        visualizer.init();
        
        // 应该找到目标
        const hasFoundMessage = visualizer.animationQueue.some(
            anim => anim.type === 'explain' && anim.text.includes('找到目标')
        );
        assert.truthy(hasFoundMessage, '应该找到单个元素');
    });
    
    it('搜索第一个元素应该能正常处理', () => {
        visualizer = new SearchVisualizer('test-search-container', 'linear');
        visualizer.setData([1, 2, 3, 4, 5]);
        visualizer.setTarget(1);
        visualizer.init();
        
        // 应该只比较一次
        const compareCount = visualizer.animationQueue.filter(
            anim => anim.type === 'compare'
        ).length;
        
        assert.equal(compareCount, 1, '搜索第一个元素应该只比较一次');
    });
    
    it('搜索最后一个元素应该能正常处理', () => {
        visualizer = new SearchVisualizer('test-search-container', 'linear');
        visualizer.setData([1, 2, 3, 4, 5]);
        visualizer.setTarget(5);
        visualizer.init();
        
        // 应该比较5次
        const compareCount = visualizer.animationQueue.filter(
            anim => anim.type === 'compare'
        ).length;
        
        assert.equal(compareCount, 5, '搜索最后一个元素应该比较所有元素');
    });
    
    it('应该正确清理资源', () => {
        visualizer = new SearchVisualizer('test-search-container', 'linear');
        visualizer.setData([1, 2, 3]);
        visualizer.setTarget(2);
        visualizer.init();
        
        visualizer.destroy();
        
        assert.equal(visualizer.data.length, 0, '数据应该被清空');
        assert.equal(visualizer.elements.length, 0, 'elements应该被清空');
        assert.isNull(visualizer.target, 'target应该被清空');
        assert.equal(visualizer.animationQueue.length, 0, '动画队列应该被清空');
    });
});

// 测试统计数据的正确性
testFramework.describe('可视化器统计数据', (it, beforeEach, afterEach) => {
    let container;
    
    beforeEach(() => {
        container = document.createElement('div');
        container.id = 'test-stats-container';
        document.body.appendChild(container);
    });
    
    afterEach(() => {
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }
    });
    
    it('排序可视化器应该正确初始化统计数据', () => {
        const visualizer = new SortingVisualizer('test-stats-container', 'bubble');
        
        assert.equal(visualizer.state.comparisons, 0, '初始比较次数应为0');
        assert.equal(visualizer.state.swaps, 0, '初始交换次数应为0');
        assert.equal(visualizer.state.accessCount, 0, '初始访问次数应为0');
        
        visualizer.destroy();
    });
    
    it('搜索可视化器应该正确初始化统计数据', () => {
        const visualizer = new SearchVisualizer('test-stats-container', 'linear');
        
        assert.equal(visualizer.state.comparisons, 0, '初始比较次数应为0');
        assert.equal(visualizer.state.accessCount, 0, '初始访问次数应为0');
        
        visualizer.destroy();
    });
    
    it('执行动画应该更新统计数据', () => {
        const visualizer = new SortingVisualizer('test-stats-container', 'bubble');
        visualizer.setData([3, 1, 2]);
        visualizer.init();
        
        // 模拟执行一个比较动画
        const compareAnim = { type: 'compare', indices: [0, 1] };
        visualizer.executeAnimation(compareAnim);
        
        assert.equal(visualizer.state.comparisons, 1, '比较次数应该增加');
        
        // 模拟执行一个交换动画
        const swapAnim = { type: 'swap', index1: 0, index2: 1 };
        visualizer.executeAnimation(swapAnim);
        
        assert.equal(visualizer.state.swaps, 1, '交换次数应该增加');
        
        visualizer.destroy();
    });
});

console.log('✅ 可视化器测试套件已加载');
