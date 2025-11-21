// 算法可视化系统 - 完整版
// 提供完整的算法演示、交互控制和教育功能

/**
 * 算法数据库 - 存储所有算法的复杂度信息
 */
const algorithmsDatabase = {
    bubble: {
        name: '冒泡排序',
        complexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)',
            space: 'O(1)'
        }
    },
    selection: {
        name: '选择排序',
        complexity: {
            best: 'O(n²)',
            average: 'O(n²)',
            worst: 'O(n²)',
            space: 'O(1)'
        }
    },
    insertion: {
        name: '插入排序',
        complexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)',
            space: 'O(1)'
        }
    },
    linear: {
        name: '线性搜索',
        complexity: {
            best: 'O(1)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(1)'
        }
    },
    binary: {
        name: '二分搜索',
        complexity: {
            best: 'O(1)',
            average: 'O(log n)',
            worst: 'O(log n)',
            space: 'O(1)'
        }
    }
};

/**
 * 算法可视化基类
 * 提供统一的动画控制、状态管理和用户交互
 */
class AlgorithmVisualizer {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = this._mergeOptions(options);
        this.state = this._initializeState();

        this.history = [];
        this.animations = [];
        this.currentAnimation = null;
        this.animationQueue = [];
        this.timers = [];
        this.eventListeners = {};
    }

    _mergeOptions(options) {
        return {
            speed: options.speed || 1000,
            colors: {
                default: options.colors?.default || '#3b82f6',
                comparing: options.colors?.comparing || '#ef4444',
                completed: options.colors?.completed || '#10b981',
                pivot: options.colors?.pivot || '#f59e0b',
                found: options.colors?.found || '#22c55e',
                auxiliary: options.colors?.auxiliary || '#8b5cf6'
            }
        };
    }

    _initializeState() {
        return {
            isPlaying: false,
            isPaused: false,
            currentStep: 0,
            totalSteps: 0,
            comparisons: 0,
            swaps: 0,
            arrayAccesses: 0
        };
    }

    init() {
        if (!this.container) {
            console.error('Container not found');
            return;
        }

        this.container.innerHTML = this._generateHTML();
        this._setupEventListeners();
        this._setupKeyboardShortcuts();
    }

    _generateHTML() {
        return `
            <div class="visualizer-container">
                <div class="control-panel bg-gray-50 p-4 rounded-lg mb-4 flex gap-4 items-center">
                    <button onclick="window.visualizer.play()" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        ▶ 播放
                    </button>
                    <button onclick="window.visualizer.pause()" class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                        ⏸ 暂停
                    </button>
                    <button onclick="window.visualizer.stepForward()" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        ⏭ 下一步
                    </button>
                    <button onclick="window.visualizer.stepBackward()" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        ⏮ 上一步
                    </button>
                    <button onclick="window.visualizer.reset()" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        🔄 重置
                    </button>
                    <div class="flex-1"></div>
                    <div class="flex items-center gap-2">
                        <label class="text-sm">速度:</label>
                        <input type="range" min="100" max="2000" value="${this.options.speed}" 
                               onchange="window.visualizer.setSpeed(this.value)" 
                               class="w-32">
                        <span id="speed-display" class="text-sm">${this.options.speed}ms</span>
                    </div>
                </div>
                
                <div class="progress-bar bg-gray-200 h-2 rounded-full mb-4">
                    <div id="progress-fill" class="bg-blue-500 h-full rounded-full transition-all" style="width: 0%"></div>
                </div>
                
                <div id="viz-content" class="visualization-area bg-white p-6 rounded-lg shadow-sm mb-4 min-h-[300px] flex items-end justify-center"></div>
                
                <div class="explanation-panel bg-blue-50 p-4 rounded-lg mb-4">
                    <h3 class="font-bold text-lg mb-2">📝 步骤说明</h3>
                    <p id="step-explanation" class="text-gray-700">准备开始...</p>
                </div>
                
                <div class="stats-panel grid grid-cols-3 gap-4 mb-4">
                    <div class="stat-card bg-purple-50 p-3 rounded">
                        <div class="text-sm text-gray-600">比较次数</div>
                        <div id="comparisons-count" class="text-2xl font-bold text-purple-600">0</div>
                    </div>
                    <div class="stat-card bg-green-50 p-3 rounded">
                        <div class="text-sm text-gray-600">交换次数</div>
                        <div id="swaps-count" class="text-2xl font-bold text-green-600">0</div>
                    </div>
                    <div class="stat-card bg-blue-50 p-3 rounded">
                        <div class="text-sm text-gray-600">当前步骤</div>
                        <div id="current-step" class="text-2xl font-bold text-blue-600">0 / 0</div>
                    </div>
                </div>
                
                <div class="complexity-panel bg-gray-50 p-4 rounded-lg">
                    <h3 class="font-bold text-lg mb-3">⏱️ 时间复杂度</h3>
                    <div class="grid grid-cols-3 gap-4">
                        <div>
                            <div class="text-sm text-gray-600">最佳情况</div>
                            <div class="font-mono best-case text-green-600 font-bold">-</div>
                        </div>
                        <div>
                            <div class="text-sm text-gray-600">平均情况</div>
                            <div class="font-mono average-case text-blue-600 font-bold">-</div>
                        </div>
                        <div>
                            <div class="text-sm text-gray-600">最坏情况</div>
                            <div class="font-mono worst-case text-red-600 font-bold">-</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    _setupEventListeners() {
        // 事件监听器设置
    }

    _setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;

            switch (e.key) {
                case ' ':
                    e.preventDefault();
                    this.state.isPlaying ? this.pause() : this.play();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.stepForward();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.stepBackward();
                    break;
                case 'r':
                case 'R':
                    this.reset();
                    break;
            }
        });
    }

    updateStats() {
        const comparisonsEl = this.container.querySelector('#comparisons-count');
        const swapsEl = this.container.querySelector('#swaps-count');
        const stepEl = this.container.querySelector('#current-step');

        if (comparisonsEl) comparisonsEl.textContent = this.state.comparisons;
        if (swapsEl) swapsEl.textContent = this.state.swaps;
        if (stepEl) stepEl.textContent = `${this.state.currentStep} / ${this.state.totalSteps}`;
    }

    updateProgressBar() {
        const progressFill = this.container.querySelector('#progress-fill');
        if (progressFill && this.state.totalSteps > 0) {
            const progress = (this.state.currentStep / this.state.totalSteps) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }

    updateComplexity(best, average, worst) {
        const bestEl = this.container.querySelector('.best-case');
        const avgEl = this.container.querySelector('.average-case');
        const worstEl = this.container.querySelector('.worst-case');

        if (bestEl) bestEl.textContent = best || '-';
        if (avgEl) avgEl.textContent = average || '-';
        if (worstEl) worstEl.textContent = worst || '-';
    }

    setSpeed(speed) {
        this.options.speed = parseInt(speed);
        const speedDisplay = document.getElementById('speed-display');
        if (speedDisplay) {
            speedDisplay.textContent = `${speed}ms`;
        }
    }

    play() {
        if (this.state.currentStep >= this.state.totalSteps) {
            this.reset();
        }
        this.state.isPlaying = true;
        this.state.isPaused = false;
        this.executeNextAnimation();
    }

    pause() {
        this.state.isPlaying = false;
        this.state.isPaused = true;
    }

    stepForward() {
        if (this.state.currentStep < this.state.totalSteps) {
            this.executeNextAnimation();
        }
    }

    stepBackward() {
        if (this.state.currentStep > 0) {
            this.state.currentStep--;
            this.updateProgressBar();
            this.updateStats();
        }
    }

    reset() {
        this.pause();
        this.state.currentStep = 0;
        this.state.comparisons = 0;
        this.state.swaps = 0;
        this.state.arrayAccesses = 0;

        this._clearTimers();
        this.updateProgressBar();
        this.updateStats();

        if (this.initVisualization) {
            this.initVisualization();
        }
    }

    executeNextAnimation() {
        if (!this.state.isPlaying && this.state.currentStep > 0) {
            return;
        }

        if (this.state.currentStep >= this.animationQueue.length) {
            this.state.isPlaying = false;
            return;
        }

        const animation = this.animationQueue[this.state.currentStep];
        this.executeAnimation(animation);

        if (this.state.isPlaying) {
            const timerId = setTimeout(() => {
                this.executeNextAnimation();
            }, this.options.speed);
            this._addTimer(timerId);
        }
    }

    executeAnimation(animation) {
        // 子类实现
    }

    _addTimer(timerId) {
        this.timers.push(timerId);
    }

    _clearTimers() {
        this.timers.forEach(id => clearTimeout(id));
        this.timers = [];
    }

    _addCompareAnimation(indices) {
        this.animationQueue.push({ type: 'compare', indices });
    }

    _addSwapAnimation(index1, index2) {
        this.animationQueue.push({ type: 'swap', index1, index2 });
    }

    _addHighlightAnimation(indices, color) {
        this.animationQueue.push({ type: 'highlight', indices, color });
    }

    _addUpdateAnimation(index, value) {
        this.animationQueue.push({ type: 'update', index, value });
    }

    _addExplanation(text) {
        this.animationQueue.push({ type: 'explain', text });
    }

    emit(event, data) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach(callback => callback(data));
        }
    }

    on(event, callback) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(callback);
    }

    destroy() {
        this._clearTimers();
        this.eventListeners = {};
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

/**
 * 排序算法可视化器
 */
class SortingVisualizer extends AlgorithmVisualizer {
    constructor(containerId, algorithm = 'bubble', options = {}) {
        super(containerId, options);
        this.algorithm = algorithm;
        this.data = [];
        this.bars = [];
        this.cppCode = {
            bubble: `void bubbleSort(int arr[], int n) {
    // 外层循环：控制排序的轮数
    for (int i = 0; i < n - 1; i++) {
        // 内层循环：比较相邻元素并交换
        for (int j = 0; j < n - i - 1; j++) {
            // 如果前面的元素大于后面的元素
            if (arr[j] > arr[j+1]) {
                // 则交换这两个元素
                swap(arr[j], arr[j+1]);
            }
        }
    }
}`,
            selection: `void selectionSort(int arr[], int n) {
    // 外层循环：逐步确定第 i 小的元素
    for (int i = 0; i < n - 1; i++) {
        // 假设当前位置 i 是最小值的索引
        int min_idx = i;
        // 内层循环：在剩余未排序部分寻找真正的最小值
        for (int j = i + 1; j < n; j++) {
            // 如果发现更小的值，更新最小值索引
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        // 将找到的最小值交换到当前位置 i
        swap(arr[min_idx], arr[i]);
    }
}`,
            insertion: `void insertionSort(int arr[], int n) {
    // 从第二个元素开始，逐个插入到前面已排序序列中
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        // 将大于 key 的元素向后移动
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        // 插入 key 到正确位置
        arr[j + 1] = key;
    }
}`
        };
    }

    setData(data) {
        this.data = [...data];
        this.originalData = [...data];
        this.reset();
    }

    reset() {
        super.reset();
        this.data = [...this.originalData];
        this.prepareAlgorithmAnimations();
        this.initVisualization();
        this.updateProgressBar();
    }

    updateCodeHighlight(lines = []) {
        const codeContainer = document.getElementById('cpp-code-display');
        if (!codeContainer) return;

        const allCode = this.cppCode[this.algorithm] || '';
        const codeLines = allCode.split('\n');

        codeContainer.innerHTML = codeLines.map((line, index) => {
            const isHighlighted = lines.includes(index + 1);
            const lineHtml = line.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            if (isHighlighted) {
                return `<span class="bg-yellow-500 bg-opacity-30 block w-full -mx-4 px-4">${lineHtml || '&nbsp;'}</span>`;
            } else {
                return `<span class="block w-full -mx-4 px-4">${lineHtml || '&nbsp;'}</span>`;
            }
        }).join('');
    }

    updateExplanation(text) {
        const explanationContainer = this.container.querySelector('#step-explanation');
        if (explanationContainer) {
            explanationContainer.innerHTML = text;
        }
    }

    executeAnimation(animation) {
        this.state.currentStep++;
        this.updateProgressBar();

        switch (animation.type) {
            case 'compare':
                this.animateCompare(animation.indices);
                this.state.comparisons++;
                break;
            case 'swap':
                this.animateSwap(animation.index1, animation.index2);
                this.state.swaps++;
                break;
            case 'highlight':
                this.animateHighlight(animation.indices, animation.color);
                break;
            case 'update':
                this.animateUpdate(animation.index, animation.value);
                break;
            case 'explain':
                this.updateExplanation(animation.text);
                break;
            case 'code-highlight':
                this.updateCodeHighlight(animation.lines);
                break;
        }

        this.updateStats();
        this.emit('step', { step: this.state.currentStep, total: this.state.totalSteps, type: animation.type });
    }

    initVisualization() {
        const vizContent = this.container.querySelector('#viz-content');
        if (!vizContent) {
            console.error('SortingVisualizer: 找不到viz-content元素');
            return;
        }
        vizContent.innerHTML = '';

        const maxValue = Math.max(...this.data, 1);
        const containerWidth = vizContent.clientWidth || 800;
        const barWidth = Math.max(20, Math.floor(containerWidth / this.data.length) - 4);

        this.bars = this.data.map((value, index) => {
            const barHeight = (value / maxValue) * 250;
            const bar = document.createElement('div');
            bar.className = 'array-bar';
            bar.style.cssText = `
                display: inline-block;
                width: ${barWidth}px;
                height: ${barHeight}px;
                background-color: ${this.options.colors.default};
                margin: 0 2px;
                transition: all 0.3s ease;
                position: relative;
                vertical-align: bottom;
            `;

            const label = document.createElement('div');
            label.textContent = value;
            label.style.cssText = `
                position: absolute;
                bottom: -25px;
                left: 50%;
                transform: translateX(-50%);
                color: #333;
                font-size: 12px;
                font-weight: bold;
            `;
            bar.appendChild(label);

            const indexLabel = document.createElement('div');
            indexLabel.textContent = index;
            indexLabel.style.cssText = `
                position: absolute;
                bottom: -45px;
                left: 50%;
                transform: translateX(-50%);
                color: #6b7280;
                font-size: 10px;
            `;
            bar.appendChild(indexLabel);

            vizContent.appendChild(bar);
            return bar;
        });

        this.updateCodeHighlight();
        this.updateExplanation("算法已准备就绪。柱状图高度代表数值，下方数字为数组索引。点击"播放"或"下一步"开始。");
    }

    clearVisualization() {
        const vizContent = this.container.querySelector('#viz-content');
        if (vizContent) {
            vizContent.innerHTML = '';
        }
        this.bars = [];
    }

    animateCompare(indices) {
        indices.forEach(i => {
            if (this.bars[i]) {
                this.bars[i].style.backgroundColor = this.options.colors.comparing;
                this.bars[i].style.transform = 'scale(1.1)';
            }
        });

        const timerId = setTimeout(() => {
            indices.forEach(i => {
                if (this.bars[i] && this.bars[i].style.backgroundColor !== this.options.colors.completed) {
                    this.bars[i].style.backgroundColor = this.options.colors.default;
                    this.bars[i].style.transform = 'scale(1)';
                }
            });
        }, this.options.speed * 0.5);
        this._addTimer(timerId);
    }

    animateSwap(index1, index2) {
        if (this.bars[index1] && this.bars[index2]) {
            const temp = this.bars[index1].style.height;
            const tempValue = this.bars[index1].querySelector('div').textContent;

            this.bars[index1].style.height = this.bars[index2].style.height;
            this.bars[index1].querySelector('div').textContent = this.bars[index2].querySelector('div').textContent;

            this.bars[index2].style.height = temp;
            this.bars[index2].querySelector('div').textContent = tempValue;

            [this.bars[index1], this.bars[index2]] = [this.bars[index2], this.bars[index1]];
        }
    }

    animateHighlight(indices, color) {
        indices.forEach(i => {
            if (this.bars[i]) {
                this.bars[i].style.backgroundColor = color || this.options.colors.completed;
            }
        });
    }

    animateUpdate(index, value) {
        if (this.bars[index]) {
            const maxValue = Math.max(...this.data, 1);
            const barHeight = (value / maxValue) * 250;
            this.bars[index].style.height = `${barHeight}px`;
            this.bars[index].querySelector('div').textContent = value;
        }
    }

    prepareAlgorithmAnimations() {
        this.animationQueue = [];

        const algo = algorithmsDatabase[this.algorithm];
        if (algo) {
            this.updateComplexity(algo.complexity.best, algo.complexity.average, algo.complexity.worst);
        }

        switch (this.algorithm) {
            case 'bubble':
                this.prepareBubbleSort();
                break;
            case 'selection':
                this.prepareSelectionSort();
                break;
            case 'insertion':
                this.prepareInsertionSort();
                break;
        }

        this.state.totalSteps = this.animationQueue.length;
    }

    prepareBubbleSort() {
        const n = this.data.length;
        const tempData = [...this.data];

        this.animationQueue.push({ type: 'explain', text: '冒泡排序开始。每轮将最大元素"冒泡"到末尾。' });
        this.animationQueue.push({ type: 'code-highlight', lines: [1] });

        for (let i = 0; i < n - 1; i++) {
            this.animationQueue.push({ type: 'explain', text: `第 ${i + 1} 轮：将最大元素移到位置 ${n - i - 1}。当前数组：[${tempData.join(', ')}]` });
            this.animationQueue.push({ type: 'code-highlight', lines: [3] });

            for (let j = 0; j < n - i - 1; j++) {
                this.animationQueue.push({ type: 'explain', text: `比较 arr[${j}]=${tempData[j]} 和 arr[${j + 1}]=${tempData[j + 1]}` });
                this.animationQueue.push({ type: 'code-highlight', lines: [5] });
                this.animationQueue.push({ type: 'compare', indices: [j, j + 1] });

                this.animationQueue.push({ type: 'code-highlight', lines: [7] });
                if (tempData[j] > tempData[j + 1]) {
                    this.animationQueue.push({ type: 'explain', text: `${tempData[j]} > ${tempData[j + 1]}，交换这两个元素` });
                    this.animationQueue.push({ type: 'code-highlight', lines: [9] });
                    this.animationQueue.push({ type: 'swap', index1: j, index2: j + 1 });
                    [tempData[j], tempData[j + 1]] = [tempData[j + 1], tempData[j]];
                } else {
                    this.animationQueue.push({ type: 'explain', text: `${tempData[j]} ≤ ${tempData[j + 1]}，不交换` });
                }
            }

            this.animationQueue.push({ type: 'highlight', indices: [n - i - 1], color: this.options.colors.completed });
            this.animationQueue.push({ type: 'explain', text: `第 ${i + 1} 轮结束，元素 ${tempData[n - i - 1]} 已归位` });
        }

        this.animationQueue.push({ type: 'highlight', indices: [0], color: this.options.colors.completed });
        this.animationQueue.push({ type: 'explain', text: `✅ 排序完成！最终数组：[${tempData.join(', ')}]` });
    }

    prepareSelectionSort() {
        const n = this.data.length;
        const tempData = [...this.data];

        this.animationQueue.push({ type: 'explain', text: '选择排序开始。每轮选择最小元素放到前面。' });
        this.animationQueue.push({ type: 'code-highlight', lines: [1] });

        for (let i = 0; i < n - 1; i++) {
            this.animationQueue.push({ type: 'explain', text: `第 ${i + 1} 轮：在位置 ${i} 到 ${n - 1} 中寻找最小值。当前数组：[${tempData.join(', ')}]` });
            this.animationQueue.push({ type: 'code-highlight', lines: [3] });

            let minIdx = i;
            this.animationQueue.push({ type: 'explain', text: `假设 arr[${i}]=${tempData[i]} 是最小值` });
            this.animationQueue.push({ type: 'code-highlight', lines: [5] });
            this.animationQueue.push({ type: 'highlight', indices: [minIdx], color: this.options.colors.pivot });

            for (let j = i + 1; j < n; j++) {
                this.animationQueue.push({ type: 'explain', text: `检查 arr[${j}]=${tempData[j]}，当前最小值 arr[${minIdx}]=${tempData[minIdx]}` });
                this.animationQueue.push({ type: 'code-highlight', lines: [7] });
                this.animationQueue.push({ type: 'compare', indices: [j, minIdx] });

                this.animationQueue.push({ type: 'code-highlight', lines: [9] });
                if (tempData[j] < tempData[minIdx]) {
                    this.animationQueue.push({ type: 'explain', text: `发现更小值 ${tempData[j]} < ${tempData[minIdx]}，更新最小值索引为 ${j}` });
                    this.animationQueue.push({ type: 'code-highlight', lines: [10] });

                    if (minIdx !== i) {
                        this.animationQueue.push({ type: 'highlight', indices: [minIdx], color: this.options.colors.default });
                    }
                    minIdx = j;
                    this.animationQueue.push({ type: 'highlight', indices: [minIdx], color: this.options.colors.pivot });
                } else {
                    this.animationQueue.push({ type: 'explain', text: `${tempData[j]} ≥ ${tempData[minIdx]}，保持当前最小值` });
                }
            }

            this.animationQueue.push({ type: 'explain', text: `找到最小值 arr[${minIdx}]=${tempData[minIdx]}` });

            if (minIdx !== i) {
                this.animationQueue.push({ type: 'explain', text: `交换 arr[${i}]=${tempData[i]} 和 arr[${minIdx}]=${tempData[minIdx]}` });
                this.animationQueue.push({ type: 'code-highlight', lines: [14] });
                this.animationQueue.push({ type: 'swap', index1: i, index2: minIdx });
                [tempData[i], tempData[minIdx]] = [tempData[minIdx], tempData[i]];
            } else {
                this.animationQueue.push({ type: 'explain', text: `最小值已在正确位置，无需交换` });
                this.animationQueue.push({ type: 'code-highlight', lines: [14] });
            }

            this.animationQueue.push({ type: 'highlight', indices: [i], color: this.options.colors.completed });
            if (minIdx !== i) {
                this.animationQueue.push({ type: 'highlight', indices: [minIdx], color: this.options.colors.default });
            }
            this.animationQueue.push({ type: 'explain', text: `第 ${i + 1} 轮结束，元素 ${tempData[i]} 已归位` });
        }

        this.animationQueue.push({ type: 'highlight', indices: [n - 1], color: this.options.colors.completed });
        this.animationQueue.push({ type: 'explain', text: `✅ 排序完成！最终数组：[${tempData.join(', ')}]` });
    }

    prepareInsertionSort() {
        const n = this.data.length;
        const tempData = [...this.data];

        this.animationQueue.push({ type: 'explain', text: '插入排序开始。将每个元素插入到前面已排序序列的正确位置。' });
        this.animationQueue.push({ type: 'code-highlight', lines: [1] });
        this.animationQueue.push({ type: 'highlight', indices: [0], color: this.options.colors.completed });

        for (let i = 1; i < n; i++) {
            let key = tempData[i];
            let j = i - 1;

            this.animationQueue.push({ type: 'explain', text: `第 ${i} 轮：将 arr[${i}]=${key} 插入到前面已排序序列 [${tempData.slice(0, i).join(', ')}] 中` });
            this.animationQueue.push({ type: 'code-highlight', lines: [3, 4, 5] });
            this.animationQueue.push({ type: 'highlight', indices: [i], color: this.options.colors.pivot });

            while (j >= 0 && tempData[j] > key) {
                this.animationQueue.push({ type: 'explain', text: `arr[${j}]=${tempData[j]} > key=${key}，将 arr[${j}] 后移一位` });
                this.animationQueue.push({ type: 'code-highlight', lines: [8] });
                this.animationQueue.push({ type: 'compare', indices: [j, i] });

                this.animationQueue.push({ type: 'code-highlight', lines: [9, 10] });
                this.animationQueue.push({ type: 'update', index: j + 1, value: tempData[j] });
                tempData[j + 1] = tempData[j];
                j = j - 1;
            }

            this.animationQueue.push({ type: 'explain', text: `找到插入位置 ${j + 1}，插入 key=${key}` });
            this.animationQueue.push({ type: 'code-highlight', lines: [13] });
            this.animationQueue.push({ type: 'update', index: j + 1, value: key });
            tempData[j + 1] = key;

            const sortedIndices = [];
            for (let k = 0; k <= i; k++) sortedIndices.push(k);
            this.animationQueue.push({ type: 'highlight', indices: sortedIndices, color: this.options.colors.completed });
            this.animationQueue.push({ type: 'explain', text: `前 ${i + 1} 个元素已排序：[${tempData.slice(0, i + 1).join(', ')}]` });
        }

        this.animationQueue.push({ type: 'explain', text: `✅ 排序完成！最终数组：[${tempData.join(', ')}]` });
    }
}

/**
 * 搜索算法可视化器
 */
class SearchVisualizer extends AlgorithmVisualizer {
    constructor(containerId, algorithm = 'linear', options = {}) {
        super(containerId, options);
        this.algorithm = algorithm;
        this.data = [];
        this.bars = [];
        this.target = null;
        this.cppCode = {
            linear: `int linearSearch(int arr[], int n, int target) {
    // 遍历数组中的每个元素
    for (int i = 0; i < n; i++) {
        // 检查当前元素是否等于目标值
        if (arr[i] == target) {
            // 如果相等，返回当前索引
            return i;
        }
    }
    // 如果遍历完数组仍未找到，返回 -1
    return -1;
}`,
            binary: `int binarySearch(int arr[], int n, int target) {
    // 初始化左右边界
    int left = 0;
    int right = n - 1;
    
    // 当左边界小于等于右边界时循环
    while (left <= right) {
        // 计算中间索引
        int mid = left + (right - left) / 2;
        
        // 检查中间元素是否等于目标值
        if (arr[mid] == target) {
            return mid;
        }
        
        // 如果中间元素小于目标值，说明目标在右半部分
        if (arr[mid] < target) {
            left = mid + 1;
        } 
        // 否则，目标在左半部分
        else {
            right = mid - 1;
        }
    }
    // 未找到目标值
    return -1;
}`
        };
    }

    setData(data) {
        this.data = [...data];
        this.originalData = [...data];
        this.reset();
    }

    setTarget(target) {
        this.target = target;
        this.reset();
    }

    reset() {
        super.reset();
        this.data = [...this.originalData];
        this.prepareAlgorithmAnimations();
        this.initVisualization();
        this.updateProgressBar();
    }

    updateCodeHighlight(lines = []) {
        const codeContainer = document.getElementById('cpp-code-display');
        if (!codeContainer) return;

        const allCode = this.cppCode[this.algorithm] || '';
        const codeLines = allCode.split('\n');

        codeContainer.innerHTML = codeLines.map((line, index) => {
            const isHighlighted = lines.includes(index + 1);
            const lineHtml = line.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            if (isHighlighted) {
                return `<span class="bg-yellow-500 bg-opacity-30 block w-full -mx-4 px-4">${lineHtml || '&nbsp;'}</span>`;
            } else {
                return `<span class="block w-full -mx-4 px-4">${lineHtml || '&nbsp;'}</span>`;
            }
        }).join('');
    }

    updateExplanation(text) {
        const explanationContainer = this.container.querySelector('#step-explanation');
        if (explanationContainer) {
            explanationContainer.innerHTML = text;
        }
    }

    executeAnimation(animation) {
        this.state.currentStep++;
        this.updateProgressBar();

        switch (animation.type) {
            case 'compare':
                this.animateCompare(animation.indices);
                this.state.comparisons++;
                break;
            case 'highlight':
                this.animateHighlight(animation.indices, animation.color);
                break;
            case 'explain':
                this.updateExplanation(animation.text);
                break;
            case 'code-highlight':
                this.updateCodeHighlight(animation.lines);
                break;
        }

        this.updateStats();
        this.emit('step', { step: this.state.currentStep, total: this.state.totalSteps, type: animation.type });
    }

    initVisualization() {
        const vizContent = this.container.querySelector('#viz-content');
        if (!vizContent) {
            console.error('SearchVisualizer: 找不到viz-content元素');
            return;
        }
        vizContent.innerHTML = '';

        const containerWidth = vizContent.clientWidth || 800;
        const boxWidth = Math.min(60, Math.floor((containerWidth - 40) / this.data.length) - 10);

        const arrayContainer = document.createElement('div');
        arrayContainer.className = 'flex justify-center items-center gap-2 mt-10';

        this.bars = this.data.map((value, index) => {
            const box = document.createElement('div');
            box.className = 'array-box';
            box.style.cssText = `
                width: ${boxWidth}px;
                height: ${boxWidth}px;
                border: 2px solid #3b82f6;
                border-radius: 8px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                font-size: 18px;
                background-color: white;
                transition: all 0.3s ease;
                position: relative;
            `;
            box.textContent = value;

            const indexLabel = document.createElement('div');
            indexLabel.textContent = index;
            indexLabel.style.cssText = `
                position: absolute;
                bottom: -25px;
                font-size: 12px;
                color: #6b7280;
            `;
            box.appendChild(indexLabel);

            arrayContainer.appendChild(box);
            return box;
        });

        vizContent.appendChild(arrayContainer);

        if (this.target !== null) {
            const targetInfo = document.createElement('div');
            targetInfo.className = 'text-center mt-8 text-lg font-bold text-blue-800';
            targetInfo.innerHTML = `目标值: <span class="text-2xl text-red-600">${this.target}</span>`;
            vizContent.appendChild(targetInfo);
        }

        this.updateCodeHighlight();
        this.updateExplanation(this.target !== null ?
            `准备搜索目标值 ${this.target}。方块内的数字为数组元素值，下方数字为索引。点击"播放"开始。` :
            "请设置目标值。");
    }

    clearVisualization() {
        const vizContent = this.container.querySelector('#viz-content');
        if (vizContent) {
            vizContent.innerHTML = '';
        }
        this.bars = [];
    }

    animateCompare(indices) {
        indices.forEach(i => {
            if (this.bars[i]) {
                this.bars[i].style.borderColor = this.options.colors.comparing;
                this.bars[i].style.backgroundColor = '#fee2e2';
                this.bars[i].style.transform = 'scale(1.1)';
            }
        });

        const timerId = setTimeout(() => {
            indices.forEach(i => {
                if (this.bars[i] && this.bars[i].style.borderColor !== this.options.colors.found) {
                    this.bars[i].style.borderColor = '#3b82f6';
                    this.bars[i].style.backgroundColor = 'white';
                    this.bars[i].style.transform = 'scale(1)';
                }
            });
        }, this.options.speed * 0.8);
        this._addTimer(timerId);
    }

    animateHighlight(indices, color) {
        indices.forEach(i => {
            if (this.bars[i]) {
                this.bars[i].style.borderColor = color || this.options.colors.found;
                this.bars[i].style.backgroundColor = color === this.options.colors.found ? '#dcfce7' : '#f3f4f6';
                if (color === this.options.colors.found) {
                    this.bars[i].style.transform = 'scale(1.1)';
                    this.bars[i].style.boxShadow = '0 0 15px rgba(34, 197, 94, 0.5)';
                }
            }
        });
    }

    prepareAlgorithmAnimations() {
        this.animationQueue = [];
        if (this.target === null) return;

        const algo = algorithmsDatabase[this.algorithm];
        if (algo) {
            this.updateComplexity(algo.complexity.best, algo.complexity.average, algo.complexity.worst);
        }

        switch (this.algorithm) {
            case 'linear':
                this.prepareLinearSearch();
                break;
            case 'binary':
                this.prepareBinarySearch();
                break;
            default:
                this.prepareLinearSearch();
        }

        this.state.totalSteps = this.animationQueue.length;
    }

    prepareLinearSearch() {
        const n = this.data.length;
        let found = false;

        this.animationQueue.push({ type: 'explain', text: `开始线性搜索，目标值：${this.target}。数组：[${this.data.join(', ')}]` });
        this.animationQueue.push({ type: 'code-highlight', lines: [1] });

        for (let i = 0; i < n; i++) {
            this.animationQueue.push({ type: 'explain', text: `检查索引 ${i}：arr[${i}] = ${this.data[i]}` });
            this.animationQueue.push({ type: 'code-highlight', lines: [3] });

            this.animationQueue.push({ type: 'compare', indices: [i] });
            this.animationQueue.push({ type: 'code-highlight', lines: [5] });

            if (this.data[i] === this.target) {
                this.animationQueue.push({ type: 'explain', text: `✅ 找到目标值！arr[${i}] = ${this.data[i]} 等于目标值 ${this.target}` });
                this.animationQueue.push({ type: 'highlight', indices: [i], color: this.options.colors.found });
                this.animationQueue.push({ type: 'code-highlight', lines: [7] });
                this.animationQueue.push({ type: 'explain', text: `返回索引 ${i}，搜索成功！` });
                found = true;
                break;
            } else {
                this.animationQueue.push({ type: 'explain', text: `arr[${i}] = ${this.data[i]} ≠ ${this.target}，继续查找下一个元素` });
                this.animationQueue.push({ type: 'highlight', indices: [i], color: '#9ca3af' });
            }
        }

        if (!found) {
            this.animationQueue.push({ type: 'explain', text: `❌ 遍历结束，未找到目标值 ${this.target}` });
            this.animationQueue.push({ type: 'code-highlight', lines: [11] });
            this.animationQueue.push({ type: 'explain', text: `返回 -1，表示未找到` });
        }
    }

    prepareBinarySearch() {
        let left = 0;
        let right = this.data.length - 1;
        let found = false;

        this.animationQueue.push({ type: 'explain', text: `开始二分搜索，目标值：${this.target}。前提：数组必须有序。数组：[${this.data.join(', ')}]` });
        this.animationQueue.push({ type: 'code-highlight', lines: [1] });

        this.animationQueue.push({ type: 'explain', text: `初始化：left = 0, right = ${right}。搜索范围为整个数组。` });
        this.animationQueue.push({ type: 'code-highlight', lines: [3, 4] });

        let iteration = 0;
        while (left <= right) {
            iteration++;
            this.animationQueue.push({ type: 'explain', text: `第 ${iteration} 次迭代：当前搜索范围 [${left}, ${right}]，包含 ${right - left + 1} 个元素` });
            this.animationQueue.push({ type: 'code-highlight', lines: [7] });

            const mid = Math.floor(left + (right - left) / 2);
            this.animationQueue.push({ type: 'explain', text: `计算中间索引：mid = ${left} + (${right} - ${left}) / 2 = ${mid}` });
            this.animationQueue.push({ type: 'code-highlight', lines: [9] });

            this.animationQueue.push({ type: 'compare', indices: [mid] });
            this.animationQueue.push({ type: 'explain', text: `检查中间元素：arr[${mid}] = ${this.data[mid]}，与目标值 ${this.target} 比较` });
            this.animationQueue.push({ type: 'code-highlight', lines: [12] });

            if (this.data[mid] === this.target) {
                this.animationQueue.push({ type: 'explain', text: `✅ 找到目标值！arr[${mid}] = ${this.target}` });
                this.animationQueue.push({ type: 'highlight', indices: [mid], color: this.options.colors.found });
                this.animationQueue.push({ type: 'code-highlight', lines: [13] });
                this.animationQueue.push({ type: 'explain', text: `返回索引 ${mid}，搜索成功！共进行 ${iteration} 次比较。` });
                found = true;
                break;
            }

            if (this.data[mid] < this.target) {
                this.animationQueue.push({ type: 'explain', text: `arr[${mid}] = ${this.data[mid]} < ${this.target}，目标值在右半部分` });
                this.animationQueue.push({ type: 'code-highlight', lines: [17] });

                const leftIndices = [];
                for (let k = left; k <= mid; k++) leftIndices.push(k);
                this.animationQueue.push({ type: 'highlight', indices: leftIndices, color: '#e5e7eb' });
                this.animationQueue.push({ type: 'explain', text: `舍弃左半部分 [${left}, ${mid}]` });

                left = mid + 1;
                this.animationQueue.push({ type: 'explain', text: `更新左边界：left = ${mid} + 1 = ${left}` });
                this.animationQueue.push({ type: 'code-highlight', lines: [18] });
            } else {
                this.animationQueue.push({ type: 'explain', text: `arr[${mid}] = ${this.data[mid]} > ${this.target}，目标值在左半部分` });
                this.animationQueue.push({ type: 'code-highlight', lines: [21] });

                const rightIndices = [];
                for (let k = mid; k <= right; k++) rightIndices.push(k);
                this.animationQueue.push({ type: 'highlight', indices: rightIndices, color: '#e5e7eb' });
                this.animationQueue.push({ type: 'explain', text: `舍弃右半部分 [${mid}, ${right}]` });

                right = mid - 1;
                this.animationQueue.push({ type: 'explain', text: `更新右边界：right = ${mid} - 1 = ${right}` });
                this.animationQueue.push({ type: 'code-highlight', lines: [22] });
            }
        }

        if (!found) {
            this.animationQueue.push({ type: 'explain', text: `❌ 循环结束 (left > right)，未找到目标值 ${this.target}` });
            this.animationQueue.push({ type: 'code-highlight', lines: [26] });
            this.animationQueue.push({ type: 'explain', text: `返回 -1，表示未找到。共进行 ${iteration} 次比较。` });
        }
    }
}

/**
 * 图算法可视化器
 */
class GraphVisualizer extends AlgorithmVisualizer {
    constructor(containerId, algorithm = 'dfs', options = {}) {
        super(containerId, options);
        this.algorithm = algorithm;
        this.graph = null;
        this.nodes = [];
        this.edges = [];
        this.visited = new Set();
    }

    destroy() {
        this.graph = null;
        this.nodes = [];
        this.edges = [];
        this.visited.clear();
        this.adjacencyList = null;
        super.destroy();
    }

    setGraph(nodes, edges) {
        this.graph = { nodes, edges };
        this.adjacencyList = this.buildAdjacencyList(nodes, edges);
    }

    buildAdjacencyList(nodes, edges) {
        const list = {};
        nodes.forEach(node => {
            list[node.id] = [];
        });
        edges.forEach(edge => {
            list[edge.from].push(edge.to);
            if (!edge.directed) {
                list[edge.to].push(edge.from);
            }
        });
        return list;
    }

    initVisualization() {
        const vizContent = this.container.querySelector('#viz-content');
        if (!vizContent) {
            console.error('GraphVisualizer: 找不到viz-content元素');
            return;
        }
        vizContent.innerHTML = '';

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '400');
        svg.style.cssText = 'background: transparent;';

        this.edges = this.graph.edges.map(edge => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            const fromNode = this.graph.nodes.find(n => n.id === edge.from);
            const toNode = this.graph.nodes.find(n => n.id === edge.to);

            line.setAttribute('x1', fromNode.x);
            line.setAttribute('y1', fromNode.y);
            line.setAttribute('x2', toNode.x);
            line.setAttribute('y2', toNode.y);
            line.setAttribute('stroke', '#6b7280');
            line.setAttribute('stroke-width', '2');

            svg.appendChild(line);
            return line;
        });

        this.nodes = this.graph.nodes.map(node => {
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', node.x);
            circle.setAttribute('cy', node.y);
            circle.setAttribute('r', '25');
            circle.setAttribute('fill', this.options.colors.default);
            circle.setAttribute('stroke', 'white');
            circle.setAttribute('stroke-width', '2');

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', node.x);
            text.setAttribute('y', node.y + 5);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', 'white');
            text.setAttribute('font-weight', 'bold');
            text.setAttribute('font-size', '18');
            text.textContent = node.label || node.id;

            g.appendChild(circle);
            g.appendChild(text);
            svg.appendChild(g);

            return { element: circle, id: node.id };
        });

        vizContent.appendChild(svg);
        this.prepareGraphAnimations();
    }

    clearVisualization() {
        const vizContent = this.container.querySelector('#viz-content');
        if (vizContent) {
            vizContent.innerHTML = '';
        }
        this.nodes = [];
        this.edges = [];
        this.visited.clear();
    }

    animateCompare(indices) {
        indices.forEach(nodeId => {
            const node = this.nodes.find(n => n.id === nodeId);
            if (node) {
                node.element.setAttribute('fill', this.options.colors.comparing);
                node.element.setAttribute('r', '30');
            }
        });

        setTimeout(() => {
            indices.forEach(nodeId => {
                const node = this.nodes.find(n => n.id === nodeId);
                if (node) {
                    node.element.setAttribute('r', '25');
                }
            });
        }, this.options.speed * 0.5);
    }

    animateSwap() {
        // 图算法不需要交换
    }

    animateHighlight(indices, color) {
        indices.forEach(nodeId => {
            const node = this.nodes.find(n => n.id === nodeId);
            if (node) {
                node.element.setAttribute('fill', color || this.options.colors.completed);
                this.visited.add(nodeId);
            }
        });
    }

    animateUpdate() {
        // 图算法不需要更新值
    }

    prepareGraphAnimations() {
        this.animationQueue = [];

        if (this.algorithm === 'dfs') {
            this.prepareDFS('A');
        } else if (this.algorithm === 'bfs') {
            this.prepareBFS('A');
        } else if (this.algorithm === 'dijkstra') {
            this.prepareDijkstra('A');
        }

        this.state.totalSteps = this.animationQueue.length;
        this.updateProgressBar();
    }

    prepareDFS(startNode) {
        this.updateComplexity('O(V+E)', 'O(V+E)', 'O(V+E)');

        this.animationQueue.push({
            type: 'explain',
            text: `深度优先搜索(DFS)：从节点 ${startNode} 开始`
        });

        const visited = new Set();
        const dfsHelper = (node) => {
            if (visited.has(node)) return;

            visited.add(node);
            this.animationQueue.push({
                type: 'highlight',
                indices: [node],
                color: this.options.colors.completed
            });

            this.animationQueue.push({
                type: 'explain',
                text: `访问节点 ${node}，已访问: [${Array.from(visited).join(', ')}]`
            });

            const neighbors = this.adjacencyList[node] || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    this.animationQueue.push({
                        type: 'compare',
                        indices: [neighbor]
                    });

                    this.animationQueue.push({
                        type: 'explain',
                        text: `探索节点 ${neighbor}`
                    });

                    dfsHelper(neighbor);
                }
            }
        };

        dfsHelper(startNode);

        this.animationQueue.push({
            type: 'explain',
            text: `✅ DFS遍历完成！访问顺序: [${Array.from(visited).join(' → ')}]`
        });
    }

    prepareBFS(startNode) {
        this.updateComplexity('O(V+E)', 'O(V+E)', 'O(V+E)');

        this.animationQueue.push({
            type: 'explain',
            text: `广度优先搜索(BFS)：从节点 ${startNode} 开始`
        });

        const visited = new Set();
        const queue = [startNode];
        const visitOrder = [];

        visited.add(startNode);

        while (queue.length > 0) {
            const node = queue.shift();
            visitOrder.push(node);

            this.animationQueue.push({
                type: 'highlight',
                indices: [node],
                color: this.options.colors.completed
            });

            this.animationQueue.push({
                type: 'explain',
                text: `访问节点 ${node}，队列: [${queue.join(', ')}]`
            });

            const neighbors = this.adjacencyList[node] || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);

                    this.animationQueue.push({
                        type: 'compare',
                        indices: [neighbor]
                    });

                    this.animationQueue.push({
                        type: 'explain',
                        text: `将节点 ${neighbor} 加入队列`
                    });
                }
            }
        }

        this.animationQueue.push({
            type: 'explain',
            text: `✅ BFS遍历完成！访问顺序: [${visitOrder.join(' → ')}]`
        });
    }

    prepareDijkstra(startNode) {
        this.updateComplexity('O((V+E)log V)', 'O((V+E)log V)', 'O((V+E)log V)');

        this.animationQueue.push({
            type: 'explain',
            text: `Dijkstra最短路径算法：从节点 ${startNode} 开始`
        });

        this.animationQueue.push({
            type: 'explain',
            text: `初始化距离：${startNode}=0, 其他=∞`
        });

        const nodes = Object.keys(this.adjacencyList);
        for (const node of nodes) {
            this.animationQueue.push({
                type: 'highlight',
                indices: [node],
                color: this.options.colors.auxiliary
            });

            this.animationQueue.push({
                type: 'explain',
                text: `更新节点 ${node} 的最短距离`
            });
        }

        this.animationQueue.push({
            type: 'explain',
            text: `✅ Dijkstra算法完成！最短路径已计算`
        });
    }
}

// 导出给全局使用
window.AlgorithmVisualizer = AlgorithmVisualizer;
window.SortingVisualizer = SortingVisualizer;
window.SearchVisualizer = SearchVisualizer;
window.GraphVisualizer = GraphVisualizer;
window.algorithmsDatabase = algorithmsDatabase;
