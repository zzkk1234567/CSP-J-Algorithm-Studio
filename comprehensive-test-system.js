/**
 * 算法性能对比系统
 */
class AlgorithmPerformanceComparison {
    constructor() {
        this.benchmarkResults = {};
        this.init();
    }

    init() {
        this.createComparisonInterface();
    }

    /**
     * 创建性能对比界面
     */
    createComparisonInterface() {
        const compareButton = document.createElement('button');
        compareButton.innerHTML = '📊 性能对比';
        compareButton.className = 'performance-compare-button';
        compareButton.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: #8b5cf6;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transition: all 0.3s ease;
        `;

        compareButton.addEventListener('click', () => {
            this.showComparisonModal();
        });

        document.body.appendChild(compareButton);
    }

    /**
     * 显示性能对比模态框
     */
    showComparisonModal() {
        const modal = document.createElement('div');
        modal.id = 'performance-comparison-modal';
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 12px;
            max-width: 900px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;

        content.innerHTML = `
            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #1f2937;">📊 算法性能对比分析</h2>
                <button onclick="document.getElementById('performance-comparison-modal').remove()" 
                        style="background: none; border: none; font-size: 20px; cursor: pointer;">✖️</button>
            </div>
            
            <div class="comparison-controls" style="margin-bottom: 20px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">算法类型：</label>
                        <select id="algorithm-type" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #d1d5db;">
                            <option value="sorting">排序算法</option>
                            <option value="searching">搜索算法</option>
                        </select>
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">数据规模：</label>
                        <select id="data-size" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #d1d5db;">
                            <option value="100">100元素</option>
                            <option value="500">500元素</option>
                            <option value="1000" selected>1000元素</option>
                        </select>
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">数据类型：</label>
                        <select id="data-type" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #d1d5db;">
                            <option value="random">随机数据</option>
                            <option value="sorted">已排序</option>
                            <option value="reverse">逆序</option>
                        </select>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button onclick="window.performanceComparison.runBenchmark()" 
                            style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                        🚀 开始性能测试
                    </button>
                    <button onclick="window.performanceComparison.clearResults()" 
                            style="background: #6b7280; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                        🗑️ 清空结果
                    </button>
                </div>
            </div>
            
            <div id="benchmark-progress" style="display: none; margin-bottom: 20px;">
                <div style="background: #e5e7eb; height: 6px; border-radius: 3px;">
                    <div id="progress-bar" style="background: #3b82f6; height: 100%; width: 0%; border-radius: 3px; transition: width 0.3s ease;"></div>
                </div>
                <p id="progress-status" style="margin: 10px 0 0 0; color: #6b7280; text-align: center;">准备中...</p>
            </div>
            
            <div id="comparison-results">
                <div style="text-align: center; color: #6b7280; padding: 40px;">
                    📊 选择算法类型和参数，点击"开始性能测试"开始对比
                </div>
            </div>
        `;

        modal.appendChild(content);
        document.body.appendChild(modal);
        
        // 保存对比器实例到全局变量
        window.performanceComparison = this;
    }

    /**
     * 运行性能测试
     */
    async runBenchmark() {
        const algorithmType = document.getElementById('algorithm-type').value;
        const dataSize = parseInt(document.getElementById('data-size').value);
        const dataType = document.getElementById('data-type').value;
        
        // 显示进度条
        const progressContainer = document.getElementById('benchmark-progress');
        const progressBar = document.getElementById('progress-bar');
        const progressStatus = document.getElementById('progress-status');
        
        progressContainer.style.display = 'block';
        
        const algorithms = this.getAlgorithmsForType(algorithmType);
        const testData = this.generateTestData(dataSize, dataType);
        const results = [];
        
        for (let i = 0; i < algorithms.length; i++) {
            const algorithm = algorithms[i];
            const progress = ((i + 1) / algorithms.length) * 100;
            
            progressBar.style.width = `${progress}%`;
            progressStatus.textContent = `正在测试 ${algorithm.name}...`;
            
            const metrics = await this.benchmarkAlgorithm(algorithm, [...testData]);
            results.push({
                name: algorithm.name,
                ...metrics
            });
            
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        progressContainer.style.display = 'none';
        this.displayComparisonResults(results, { algorithmType, dataSize, dataType });
    }

    /**
     * 获取指定类型的算法列表
     */
    getAlgorithmsForType(type) {
        const algorithmMap = {
            sorting: [
                { name: '冒泡排序', id: 'bubble', complexity: 'O(n²)' },
                { name: '选择排序', id: 'selection', complexity: 'O(n²)' },
                { name: '插入排序', id: 'insertion', complexity: 'O(n²)' },
                { name: '快速排序', id: 'quick', complexity: 'O(n log n)' },
                { name: '归并排序', id: 'merge', complexity: 'O(n log n)' }
            ],
            searching: [
                { name: '线性搜索', id: 'linear', complexity: 'O(n)' },
                { name: '二分搜索', id: 'binary', complexity: 'O(log n)' }
            ]
        };
        
        return algorithmMap[type] || [];
    }

    /**
     * 生成测试数据
     */
    generateTestData(size, type) {
        let data = [];
        
        switch (type) {
            case 'random':
                for (let i = 0; i < size; i++) {
                    data.push(Math.floor(Math.random() * 1000));
                }
                break;
            case 'sorted':
                for (let i = 0; i < size; i++) {
                    data.push(i);
                }
                break;
            case 'reverse':
                for (let i = size; i > 0; i--) {
                    data.push(i);
                }
                break;
        }
        
        return data;
    }

    /**
     * 测试单个算法性能
     */
    async benchmarkAlgorithm(algorithm, testData) {
        const startTime = performance.now();
        let comparisons = 0;
        let swaps = 0;
        
        switch (algorithm.id) {
            case 'bubble':
                ({ comparisons, swaps } = this.benchmarkBubbleSort(testData));
                break;
            case 'selection':
                ({ comparisons, swaps } = this.benchmarkSelectionSort(testData));
                break;
            case 'insertion':
                ({ comparisons, swaps } = this.benchmarkInsertionSort(testData));
                break;
            case 'quick':
                ({ comparisons, swaps } = this.benchmarkQuickSort(testData));
                break;
            case 'merge':
                ({ comparisons, swaps } = this.benchmarkMergeSort(testData));
                break;
            case 'linear':
                ({ comparisons } = this.benchmarkLinearSearch(testData));
                break;
            case 'binary':
                ({ comparisons } = this.benchmarkBinarySearch(testData));
                break;
        }
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        return {
            duration: Math.round(duration * 100) / 100,
            comparisons: comparisons,
            swaps: swaps || 0,
            complexity: algorithm.complexity
        };
    }

    // 排序算法基准测试实现...
    benchmarkBubbleSort(arr) {
        let comparisons = 0;
        let swaps = 0;
        const n = arr.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                comparisons++;
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    swaps++;
                }
            }
        }
        return { comparisons, swaps };
    }

    benchmarkSelectionSort(arr) {
        let comparisons = 0;
        let swaps = 0;
        const n = arr.length;
        
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                comparisons++;
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                swaps++;
            }
        }
        return { comparisons, swaps };
    }

    benchmarkInsertionSort(arr) {
        let comparisons = 0;
        let swaps = 0;
        
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0) {
                comparisons++;
                if (arr[j] > key) {
                    arr[j + 1] = arr[j];
                    swaps++;
                    j--;
                } else {
                    break;
                }
            }
            arr[j + 1] = key;
        }
        return { comparisons, swaps };
    }

    benchmarkQuickSort(arr) {
        let comparisons = 0;
        let swaps = 0;
        
        const quickSort = (arr, low, high) => {
            if (low < high) {
                const pi = partition(arr, low, high);
                quickSort(arr, low, pi - 1);
                quickSort(arr, pi + 1, high);
            }
        };
        
        const partition = (arr, low, high) => {
            const pivot = arr[high];
            let i = low - 1;
            
            for (let j = low; j < high; j++) {
                comparisons++;
                if (arr[j] < pivot) {
                    i++;
                    if (i !== j) {
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                        swaps++;
                    }
                }
            }
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            swaps++;
            return i + 1;
        };
        
        quickSort(arr, 0, arr.length - 1);
        return { comparisons, swaps };
    }

    benchmarkMergeSort(arr) {
        let comparisons = 0;
        let swaps = 0;
        
        const mergeSort = (arr, left, right) => {
            if (left < right) {
                const mid = Math.floor((left + right) / 2);
                mergeSort(arr, left, mid);
                mergeSort(arr, mid + 1, right);
                merge(arr, left, mid, right);
            }
        };
        
        const merge = (arr, left, mid, right) => {
            const leftArr = arr.slice(left, mid + 1);
            const rightArr = arr.slice(mid + 1, right + 1);
            let i = 0, j = 0, k = left;
            
            while (i < leftArr.length && j < rightArr.length) {
                comparisons++;
                if (leftArr[i] <= rightArr[j]) {
                    arr[k] = leftArr[i];
                    i++;
                } else {
                    arr[k] = rightArr[j];
                    j++;
                }
                swaps++;
                k++;
            }
            
            while (i < leftArr.length) {
                arr[k] = leftArr[i];
                i++; k++; swaps++;
            }
            while (j < rightArr.length) {
                arr[k] = rightArr[j];
                j++; k++; swaps++;
            }
        };
        
        mergeSort(arr, 0, arr.length - 1);
        return { comparisons, swaps };
    }

    benchmarkLinearSearch(arr) {
        const target = arr[Math.floor(Math.random() * arr.length)];
        let comparisons = 0;
        
        for (let i = 0; i < arr.length; i++) {
            comparisons++;
            if (arr[i] === target) break;
        }
        return { comparisons };
    }

    benchmarkBinarySearch(arr) {
        arr.sort((a, b) => a - b);
        const target = arr[Math.floor(Math.random() * arr.length)];
        let comparisons = 0;
        let left = 0, right = arr.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            comparisons++;
            if (arr[mid] === target) break;
            else if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return { comparisons };
    }

    /**
     * 显示对比结果
     */
    displayComparisonResults(results, testConfig) {
        const resultsContainer = document.getElementById('comparison-results');
        results.sort((a, b) => a.duration - b.duration);
        
        const tableRows = results.map((result, index) => {
            const rankIcon = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`;
            return `
                <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 12px; text-align: center;">${rankIcon}</td>
                    <td style="padding: 12px; font-weight: bold;">${result.name}</td>
                    <td style="padding: 12px; text-align: center; color: ${index === 0 ? '#10b981' : '#6b7280'};">${result.duration}ms</td>
                    <td style="padding: 12px; text-align: center;">${result.comparisons}</td>
                    <td style="padding: 12px; text-align: center;">${result.swaps}</td>
                    <td style="padding: 12px; text-align: center; font-family: monospace;">${result.complexity}</td>
                </tr>
            `;
        }).join('');
        
        resultsContainer.innerHTML = `
            <div style="margin-bottom: 20px;">
                <h3 style="color: #1f2937; margin-bottom: 10px;">📈 性能测试结果</h3>
                <p style="color: #6b7280; margin: 0;">
                    算法类型：${testConfig.algorithmType === 'sorting' ? '排序算法' : '搜索算法'} | 
                    数据规模：${testConfig.dataSize}元素 | 
                    数据类型：${testConfig.dataType === 'random' ? '随机' : testConfig.dataType === 'sorted' ? '已排序' : '逆序'}
                </p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <thead style="background: #f3f4f6;">
                    <tr>
                        <th style="padding: 12px; text-align: center;">排名</th>
                        <th style="padding: 12px; text-align: left;">算法名称</th>
                        <th style="padding: 12px; text-align: center;">执行时间</th>
                        <th style="padding: 12px; text-align: center;">比较次数</th>
                        <th style="padding: 12px; text-align: center;">交换次数</th>
                        <th style="padding: 12px; text-align: center;">时间复杂度</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
            
            <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <h4 style="margin: 0 0 10px 0; color: #1e40af;">📊 性能分析</h4>
                <p style="margin: 5px 0; color: #1e40af;">
                    • 最快算法：${results[0].name} (${results[0].duration}ms)
                </p>
                <p style="margin: 5px 0; color: #1e40af;">
                    • 最少比较：${results.reduce((min, r) => r.comparisons < min.comparisons ? r : min).name} (${results.reduce((min, r) => r.comparisons < min.comparisons ? r : min).comparisons}次)
                </p>
                <p style="margin: 5px 0; color: #1e40af;">
                    • 理论最优：O(n log n)级别的算法在大数据集上通常表现更好
                </p>
            </div>
        `;
    }

    /**
     * 清空结果
     */
    clearResults() {
        const resultsContainer = document.getElementById('comparison-results');
        resultsContainer.innerHTML = `
            <div style="text-align: center; color: #6b7280; padding: 40px;">
                📊 选择算法类型和参数，点击"开始性能测试"开始对比
            </div>
        `;
    }
}

// 自动初始化性能对比系统
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        new AlgorithmPerformanceComparison();
    });
}

/**
 * 综合测试和验证系统 - 算法测试套件
 */
class AlgorithmTestSuite {
    constructor() {
        this.testResults = [];
        this.performanceMetrics = {};
        this.init();
    }

    init() {
        this.createTestInterface();
        this.setupPerformanceMonitoring();
    }

    /**
     * 创建测试界面
     */
    createTestInterface() {
        const testButton = document.createElement('button');
        testButton.innerHTML = '🧪 运行测试';
        testButton.className = 'test-suite-button';
        testButton.style.cssText = `
            position: fixed;
            bottom: 140px;
            right: 20px;
            background: #dc2626;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transition: all 0.3s ease;
        `;

        testButton.addEventListener('click', () => {
            this.runComprehensiveTests();
        });

        document.body.appendChild(testButton);
    }

    /**
     * 运行综合测试
     */
    async runComprehensiveTests() {
        this.showTestModal();
        this.testResults = [];
        
        // 测试各个组件
        await this.testAlgorithmVisualizers();
        await this.testUIComponents();
        await this.testPerformance();
        await this.testCompatibility();
        
        this.displayTestResults();
    }

    /**
     * 显示测试模态框
     */
    showTestModal() {
        const modal = document.createElement('div');
        modal.id = 'test-modal';
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 12px;
            max-width: 800px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;

        content.innerHTML = `
            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 20px;">
                <h3 style="margin: 0; color: #1f2937;">🧪 算法系统测试套件</h3>
                <button onclick="document.getElementById('test-modal').remove()" 
                        style="background: none; border: none; font-size: 20px; cursor: pointer;">✖️</button>
            </div>
            <div id="test-progress" style="margin-bottom: 20px;">
                <div style="background: #e5e7eb; height: 6px; border-radius: 3px;">
                    <div id="progress-bar" style="background: #3b82f6; height: 100%; width: 0%; border-radius: 3px; transition: width 0.3s ease;"></div>
                </div>
                <p id="test-status" style="margin: 10px 0 0 0; color: #6b7280;">准备开始测试...</p>
            </div>
            <div id="test-results-container" style="min-height: 200px;"></div>
        `;

        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    /**
     * 更新测试进度
     */
    updateTestProgress(progress, status) {
        const progressBar = document.getElementById('progress-bar');
        const statusText = document.getElementById('test-status');
        
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (statusText) statusText.textContent = status;
    }

    /**
     * 测试算法可视化器
     */
    async testAlgorithmVisualizers() {
        this.updateTestProgress(10, '测试算法可视化器...');
        
        const tests = [
            {
                name: '基础可视化器类',
                test: () => typeof AlgorithmVisualizer !== 'undefined'
            },
            {
                name: '排序可视化器',
                test: () => {
                    if (typeof SortingVisualizer === 'undefined') return false;
                    try {
                        const testContainer = document.createElement('div');
                        testContainer.id = 'test-viz-container';
                        testContainer.style.display = 'none';
                        document.body.appendChild(testContainer);
                        
                        const sorter = new SortingVisualizer('test-viz-container', 'bubble');
                        sorter.setData([5, 3, 8, 1]);
                        
                        document.body.removeChild(testContainer);
                        return true;
                    } catch (e) {
                        return false;
                    }
                }
            },
            {
                name: '搜索可视化器',
                test: () => {
                    if (typeof SearchVisualizer === 'undefined') return false;
                    try {
                        const testContainer = document.createElement('div');
                        testContainer.id = 'test-search-container';
                        testContainer.style.display = 'none';
                        document.body.appendChild(testContainer);
                        
                        const searcher = new SearchVisualizer('test-search-container', 'linear');
                        searcher.setData([1, 3, 5, 7]);
                        searcher.setTarget(5);
                        
                        document.body.removeChild(testContainer);
                        return true;
                    } catch (e) {
                        return false;
                    }
                }
            },
            {
                name: '图可视化器',
                test: () => {
                    if (typeof GraphVisualizer === 'undefined') return false;
                    try {
                        const testContainer = document.createElement('div');
                        testContainer.id = 'test-graph-container';
                        testContainer.style.display = 'none';
                        document.body.appendChild(testContainer);
                        
                        const grapher = new GraphVisualizer('test-graph-container', 'dfs');
                        const nodes = [{ id: 'A', x: 100, y: 100 }];
                        const edges = [];
                        grapher.setGraph(nodes, edges);
                        
                        document.body.removeChild(testContainer);
                        return true;
                    } catch (e) {
                        return false;
                    }
                }
            }
        ];

        for (const test of tests) {
            const result = test.test();
            this.testResults.push({
                category: '可视化器',
                name: test.name,
                passed: result,
                timestamp: new Date().toISOString()
            });
        }

        await this.delay(500);
    }

    /**
     * 测试UI组件
     */
    async testUIComponents() {
        this.updateTestProgress(40, '测试UI组件...');
        
        const tests = [
            {
                name: 'DOM元素存在性',
                test: () => {
                    const requiredElements = [
                        'visualization-container',
                        'algorithm-selector',
                        'specific-algorithm'
                    ];
                    return requiredElements.every(id => document.getElementById(id) !== null);
                }
            },
            {
                name: '样式加载',
                test: () => {
                    const testElement = document.createElement('div');
                    testElement.className = 'glass-effect';
                    document.body.appendChild(testElement);
                    
                    const styles = window.getComputedStyle(testElement);
                    const hasGlassEffect = styles.backdropFilter && styles.backdropFilter !== 'none';
                    
                    document.body.removeChild(testElement);
                    return hasGlassEffect || styles.background.includes('rgba');
                }
            },
            {
                name: '事件处理',
                test: () => {
                    try {
                        // 测试算法选择函数
                        if (typeof selectAlgorithm === 'function') {
                            return true;
                        }
                        return false;
                    } catch (e) {
                        return false;
                    }
                }
            }
        ];

        for (const test of tests) {
            const result = test.test();
            this.testResults.push({
                category: 'UI组件',
                name: test.name,
                passed: result,
                timestamp: new Date().toISOString()
            });
        }

        await this.delay(500);
    }

    /**
     * 测试性能
     */
    async testPerformance() {
        this.updateTestProgress(70, '测试性能指标...');
        
        const performanceTests = [
            {
                name: '页面加载时间',
                test: () => {
                    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                    this.performanceMetrics.pageLoadTime = loadTime;
                    return loadTime < 5000; // 5秒内加载完成
                }
            },
            {
                name: '内存使用',
                test: () => {
                    if (performance.memory) {
                        const memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
                        this.performanceMetrics.memoryUsage = memoryUsage;
                        return memoryUsage < 50; // 小于50MB
                    }
                    return true; // 如果不支持memory API，认为通过
                }
            },
            {
                name: '动画帧率',
                test: () => {
                    return new Promise((resolve) => {
                        let frameCount = 0;
                        const startTime = performance.now();
                        
                        const countFrames = () => {
                            frameCount++;
                            if (performance.now() - startTime < 1000) {
                                requestAnimationFrame(countFrames);
                            } else {
                                const fps = frameCount;
                                this.performanceMetrics.fps = fps;
                                resolve(fps > 30); // 大于30FPS
                            }
                        };
                        
                        requestAnimationFrame(countFrames);
                    });
                }
            }
        ];

        for (const test of performanceTests) {
            const result = await test.test();
            this.testResults.push({
                category: '性能',
                name: test.name,
                passed: result,
                timestamp: new Date().toISOString()
            });
        }

        await this.delay(500);
    }

    /**
     * 测试兼容性
     */
    async testCompatibility() {
        this.updateTestProgress(90, '测试浏览器兼容性...');
        
        const compatibilityTests = [
            {
                name: 'ES6支持',
                test: () => {
                    try {
                        // 测试箭头函数、模板字符串、const/let
                        const testArrow = () => true;
                        const testTemplate = `test ${1 + 1}`;
                        const testConst = 'const';
                        return testArrow() && testTemplate.includes('2') && testConst === 'const';
                    } catch (e) {
                        return false;
                    }
                }
            },
            {
                name: 'CSS3支持',
                test: () => {
                    const testElement = document.createElement('div');
                    const style = testElement.style;
                    
                    // 测试关键CSS3特性
                    const features = [
                        'transform',
                        'transition',
                        'borderRadius',
                        'boxShadow'
                    ];
                    
                    return features.every(feature => feature in style);
                }
            },
            {
                name: 'Canvas支持',
                test: () => {
                    const canvas = document.createElement('canvas');
                    return !!(canvas.getContext && canvas.getContext('2d'));
                }
            },
            {
                name: 'SVG支持',
                test: () => {
                    return !!(document.createElementNS && 
                             document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);
                }
            }
        ];

        for (const test of compatibilityTests) {
            const result = test.test();
            this.testResults.push({
                category: '兼容性',
                name: test.name,
                passed: result,
                timestamp: new Date().toISOString()
            });
        }

        await this.delay(500);
    }

    /**
     * 显示测试结果
     */
    displayTestResults() {
        this.updateTestProgress(100, '测试完成！');
        
        const container = document.getElementById('test-results-container');
        if (!container) return;

        const passedTests = this.testResults.filter(test => test.passed).length;
        const totalTests = this.testResults.length;
        const successRate = Math.round((passedTests / totalTests) * 100);

        // 按类别分组结果
        const groupedResults = this.testResults.reduce((groups, test) => {
            if (!groups[test.category]) {
                groups[test.category] = [];
            }
            groups[test.category].push(test);
            return groups;
        }, {});

        container.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px; padding: 20px; background: ${successRate >= 80 ? '#dcfce7' : successRate >= 60 ? '#fef3c7' : '#fecaca'}; border-radius: 8px;">
                <h4 style="margin: 0 0 10px 0; color: ${successRate >= 80 ? '#15803d' : successRate >= 60 ? '#d97706' : '#dc2626'};">
                    测试完成！成功率: ${successRate}%
                </h4>
                <p style="margin: 0; color: #374151;">
                    通过 ${passedTests} / ${totalTests} 项测试
                </p>
            </div>

            ${Object.entries(groupedResults).map(([category, tests]) => `
                <div style="margin-bottom: 20px;">
                    <h5 style="margin: 0 0 10px 0; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">
                        ${category} (${tests.filter(t => t.passed).length}/${tests.length})
                    </h5>
                    <div style="display: grid; gap: 8px;">
                        ${tests.map(test => `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: ${test.passed ? '#f0fdf4' : '#fef2f2'}; border-radius: 4px; border-left: 3px solid ${test.passed ? '#22c55e' : '#ef4444'};">
                                <span style="color: #374151;">${test.name}</span>
                                <span style="color: ${test.passed ? '#15803d' : '#dc2626'}; font-weight: bold;">
                                    ${test.passed ? '✅ 通过' : '❌ 失败'}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}

            ${Object.keys(this.performanceMetrics).length > 0 ? `
                <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 8px;">
                    <h5 style="margin: 0 0 10px 0; color: #1f2937;">📊 性能指标</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
                        ${Object.entries(this.performanceMetrics).map(([key, value]) => `
                            <div style="text-align: center; padding: 8px; background: white; border-radius: 4px;">
                                <div style="font-size: 18px; font-weight: bold; color: #3b82f6;">
                                    ${typeof value === 'number' ? value.toFixed(1) : value}
                                </div>
                                <div style="font-size: 12px; color: #6b7280;">
                                    ${this.getMetricLabel(key)}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <div style="margin-top: 20px; text-align: center;">
                <button onclick="window.testSuite.exportTestReport()" 
                        style="margin-right: 10px; padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    📄 导出报告
                </button>
                <button onclick="window.testSuite.runComprehensiveTests()" 
                        style="padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    🔄 重新测试
                </button>
            </div>
        `;
    }

    /**
     * 获取指标标签
     */
    getMetricLabel(key) {
        const labels = {
            pageLoadTime: '页面加载(ms)',
            memoryUsage: '内存使用(MB)',
            fps: '帧率(FPS)'
        };
        return labels[key] || key;
    }

    /**
     * 导出测试报告
     */
    exportTestReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalTests: this.testResults.length,
                passedTests: this.testResults.filter(test => test.passed).length,
                successRate: Math.round((this.testResults.filter(test => test.passed).length / this.testResults.length) * 100)
            },
            results: this.testResults,
            performance: this.performanceMetrics,
            environment: {
                userAgent: navigator.userAgent,
                viewport: `${window.innerWidth}x${window.innerHeight}`,
                language: navigator.language
            }
        };

        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `algorithm-test-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * 设置性能监控
     */
    setupPerformanceMonitoring() {
        // 监控错误
        window.addEventListener('error', (event) => {
            console.error('JavaScript Error:', event.error);
            this.logError('JavaScript Error', event.error.message, event.filename, event.lineno);
        });

        // 监控未处理的Promise拒绝
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled Promise Rejection:', event.reason);
            this.logError('Promise Rejection', event.reason);
        });
    }

    /**
     * 记录错误
     */
    logError(type, message, filename = '', lineno = 0) {
        const error = {
            type,
            message,
            filename,
            lineno,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        // 存储到本地存储
        const errors = JSON.parse(localStorage.getItem('algorithm-system-errors') || '[]');
        errors.push(error);
        localStorage.setItem('algorithm-system-errors', JSON.stringify(errors.slice(-50))); // 只保留最近50个错误
    }

    /**
     * 延迟函数
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 初始化测试系统
document.addEventListener('DOMContentLoaded', () => {
    window.testSuite = new AlgorithmTestSuite();
});

// 将所有类暴露到全局作用域
if (typeof window !== 'undefined') {
    window.AlgorithmPerformanceComparison = AlgorithmPerformanceComparison;
    window.AlgorithmTestSuite = AlgorithmTestSuite;
    
    console.log('✅ 综合测试系统已加载并暴露到全局作用域:');
    console.log('  - AlgorithmPerformanceComparison (算法性能对比)');
    console.log('  - AlgorithmTestSuite (算法测试套件)');
}

// 导出测试系统
window.AlgorithmTestSuite = AlgorithmTestSuite;