/**
 * 算法对比模式
 * 提供并排对比两个算法的执行过程和性能指标
 */
class AlgorithmComparison {
    constructor() {
        this.visualizer1 = null;
        this.visualizer2 = null;
        this.isComparing = false;
        this.syncEnabled = true;
        this.comparisonData = {
            algorithm1: { name: '', comparisons: 0, swaps: 0, duration: 0, accessCount: 0 },
            algorithm2: { name: '', comparisons: 0, swaps: 0, duration: 0, accessCount: 0 }
        };
    }

    /**
     * 初始化对比模式界面
     */
    init() {
        // 创建对比模式容器
        const comparisonContainer = document.createElement('div');
        comparisonContainer.id = 'comparison-mode-container';
        comparisonContainer.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center';
        comparisonContainer.style.cssText = 'animation: fadeIn 0.3s ease-out;';
        
        comparisonContainer.innerHTML = `
            <div class="bg-white rounded-lg shadow-2xl w-full max-w-7xl mx-4 max-h-[95vh] overflow-y-auto">
                <!-- 头部 -->
                <div class="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-lg">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <span class="text-4xl">⚖️</span>
                            <div>
                                <h2 class="text-2xl font-bold">算法对比模式</h2>
                                <p class="text-sm text-purple-100">并排对比两个算法的执行过程和性能</p>
                            </div>
                        </div>
                        <button onclick="algorithmComparison.close()" 
                                class="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- 算法选择区 -->
                <div class="p-6 bg-gray-50 border-b">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- 算法1选择 -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                🔵 算法 1
                            </label>
                            <select id="algorithm-1-select" 
                                    onchange="algorithmComparison.selectAlgorithm(1, this.value)"
                                    class="w-full p-3 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none">
                                <option value="">选择算法...</option>
                                <option value="bubble">冒泡排序</option>
                                <option value="selection">选择排序</option>
                                <option value="insertion">插入排序</option>
                                <option value="quick">快速排序</option>
                                <option value="merge">归并排序</option>
                                <option value="linear-search">线性搜索</option>
                                <option value="binary-search">二分搜索</option>
                            </select>
                        </div>

                        <!-- 算法2选择 -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                🟢 算法 2
                            </label>
                            <select id="algorithm-2-select" 
                                    onchange="algorithmComparison.selectAlgorithm(2, this.value)"
                                    class="w-full p-3 border-2 border-green-300 rounded-lg focus:border-green-500 focus:outline-none">
                                <option value="">选择算法...</option>
                                <option value="bubble">冒泡排序</option>
                                <option value="selection">选择排序</option>
                                <option value="insertion">插入排序</option>
                                <option value="quick">快速排序</option>
                                <option value="merge">归并排序</option>
                                <option value="linear-search">线性搜索</option>
                                <option value="binary-search">二分搜索</option>
                            </select>
                        </div>
                    </div>

                    <!-- 数据输入 -->
                    <div class="mt-4">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            📊 测试数据
                        </label>
                        <div class="flex gap-2">
                            <input type="text" 
                                   id="comparison-data-input" 
                                   placeholder="输入数据 (逗号分隔，如: 5,3,8,2,7)"
                                   class="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none">
                            <button onclick="algorithmComparison.applyData()" 
                                    class="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium">
                                应用数据
                            </button>
                            <button onclick="algorithmComparison.generateRandomData()" 
                                    class="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium">
                                随机生成
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 同步控制面板 -->
                <div class="p-6 bg-white border-b">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <button onclick="algorithmComparison.syncPlay()" 
                                    class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 font-medium flex items-center gap-2">
                                <span class="text-xl">▶️</span>
                                <span>同步播放</span>
                            </button>
                            <button onclick="algorithmComparison.syncPause()" 
                                    class="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all transform hover:scale-105 font-medium flex items-center gap-2">
                                <span class="text-xl">⏸️</span>
                                <span>暂停</span>
                            </button>
                            <button onclick="algorithmComparison.syncReset()" 
                                    class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all transform hover:scale-105 font-medium flex items-center gap-2">
                                <span class="text-xl">🔄</span>
                                <span>重置</span>
                            </button>
                        </div>

                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" 
                                       id="sync-toggle" 
                                       checked 
                                       onchange="algorithmComparison.toggleSync(this.checked)"
                                       class="w-5 h-5">
                                <span class="text-sm font-medium text-gray-700">同步执行</span>
                            </label>
                            <div class="flex items-center gap-2">
                                <label class="text-sm font-medium text-gray-700">速度:</label>
                                <input type="range" 
                                       id="comparison-speed" 
                                       min="100" 
                                       max="2000" 
                                       step="100" 
                                       value="1000"
                                       onchange="algorithmComparison.setSpeed(this.value)"
                                       class="w-32">
                                <span class="text-sm font-bold text-blue-600 min-w-[60px]" id="comparison-speed-display">1000ms</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 双栏可视化区域 -->
                <div class="p-6 bg-gray-100">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- 算法1可视化 -->
                        <div class="bg-white rounded-lg shadow-lg p-4 border-4 border-blue-300">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-lg font-bold text-blue-600 flex items-center gap-2">
                                    <span>🔵</span>
                                    <span id="algorithm-1-name">算法 1</span>
                                </h3>
                                <span class="text-sm text-gray-500" id="algorithm-1-status">等待选择</span>
                            </div>
                            <div id="visualizer-1-container" class="min-h-[300px]"></div>
                        </div>

                        <!-- 算法2可视化 -->
                        <div class="bg-white rounded-lg shadow-lg p-4 border-4 border-green-300">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-lg font-bold text-green-600 flex items-center gap-2">
                                    <span>🟢</span>
                                    <span id="algorithm-2-name">算法 2</span>
                                </h3>
                                <span class="text-sm text-gray-500" id="algorithm-2-status">等待选择</span>
                            </div>
                            <div id="visualizer-2-container" class="min-h-[300px]"></div>
                        </div>
                    </div>
                </div>

                <!-- 性能对比表格 -->
                <div class="p-6 bg-white">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span>📊</span>
                        <span>性能对比统计</span>
                    </h3>
                    <div class="overflow-x-auto">
                        <table class="w-full border-collapse">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">指标</th>
                                    <th class="border border-gray-300 px-4 py-3 text-center font-semibold text-blue-600">🔵 算法 1</th>
                                    <th class="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">🟢 算法 2</th>
                                    <th class="border border-gray-300 px-4 py-3 text-center font-semibold text-purple-600">差异</th>
                                </tr>
                            </thead>
                            <tbody id="comparison-stats-body">
                                <tr>
                                    <td class="border border-gray-300 px-4 py-3 font-medium">比较次数</td>
                                    <td class="border border-gray-300 px-4 py-3 text-center" id="stat-1-comparisons">-</td>
                                    <td class="border border-gray-300 px-4 py-3 text-center" id="stat-2-comparisons">-</td>
                                    <td class="border border-gray-300 px-4 py-3 text-center" id="stat-diff-comparisons">-</td>
                                </tr>
                                <tr class="bg-gray-50">
                                    <td class="border border-gray-300 px-4 py-3 font-medium">交换次数</td>
                                    <td class="border border-gray-300 px-4 py-3 text-center" id="stat-1-swaps">-</td>
                                    <td class="border border-gray-300 px-4 py-3 text-center" id="stat-2-swaps">-</td>
                                    <td class="border border-gray-300 px-4 py-3 text-center" id="stat-diff-swaps">-</td>
                                </tr>
                                <tr>
                                    <td class="border border-gray-300 px-4 py-3 font-medium">访问次数</td>
                                    <td class="border border-gray-300 px-4 py-3 text-center" id="stat-1-access">-</td>
                                    <td class="border border-gray-300 px-4 py-3 text-center" id="stat-2-access">-</td>
                                    <td class="border border-gray-300 px-4 py-3 text-center" id="stat-diff-access">-</td>
                                </tr>
                                <tr class="bg-gray-50">
                                    <td class="border border-gray-300 px-4 py-3 font-medium">执行时间</td>
                                    <td class="border border-gray-300 px-4 py-3 text-center" id="stat-1-duration">-</td>
                                    <td class="border border-gray-300 px-4 py-3 text-center" id="stat-2-duration">-</td>
                                    <td class="border border-gray-300 px-4 py-3 text-center" id="stat-diff-duration">-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- 性能分析 -->
                    <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h4 class="font-bold text-blue-900 mb-2">💡 性能分析</h4>
                        <div id="performance-analysis" class="text-sm text-blue-800">
                            选择两个算法并运行以查看性能分析...
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(comparisonContainer);
    }

    /**
     * 打开对比模式
     */
    open() {
        const container = document.getElementById('comparison-mode-container');
        if (container) {
            container.classList.remove('hidden');
            this.isComparing = true;
        }
    }

    /**
     * 关闭对比模式
     */
    close() {
        const container = document.getElementById('comparison-mode-container');
        if (container) {
            container.classList.add('hidden');
            this.isComparing = false;
            
            // 清理可视化器
            if (this.visualizer1) {
                this.visualizer1.destroy();
                this.visualizer1 = null;
            }
            if (this.visualizer2) {
                this.visualizer2.destroy();
                this.visualizer2 = null;
            }
        }
    }

    /**
     * 选择算法
     * @param {number} slot - 1 或 2
     * @param {string} algorithmType - 算法类型
     */
    selectAlgorithm(slot, algorithmType) {
        if (!algorithmType) return;

        const containerId = `visualizer-${slot}-container`;
        const nameElement = document.getElementById(`algorithm-${slot}-name`);
        const statusElement = document.getElementById(`algorithm-${slot}-status`);

        // 清理旧的可视化器
        if (slot === 1 && this.visualizer1) {
            this.visualizer1.destroy();
        } else if (slot === 2 && this.visualizer2) {
            this.visualizer2.destroy();
        }

        // 创建新的可视化器
        try {
            const visualizer = window.VisualizerFactory.create(algorithmType, containerId, {
                speed: parseInt(document.getElementById('comparison-speed')?.value || 1000)
            });

            if (slot === 1) {
                this.visualizer1 = visualizer;
                this.comparisonData.algorithm1.name = this._getAlgorithmName(algorithmType);
            } else {
                this.visualizer2 = visualizer;
                this.comparisonData.algorithm2.name = this._getAlgorithmName(algorithmType);
            }

            // 更新UI
            if (nameElement) {
                nameElement.textContent = this._getAlgorithmName(algorithmType);
            }
            if (statusElement) {
                statusElement.textContent = '已选择';
                statusElement.className = 'text-sm text-green-600 font-medium';
            }

            // 初始化可视化器
            visualizer.init();

            // 监听事件以更新统计
            this._setupVisualizerListeners(visualizer, slot);

        } catch (error) {
            console.error(`Error creating visualizer for slot ${slot}:`, error);
            if (statusElement) {
                statusElement.textContent = '创建失败';
                statusElement.className = 'text-sm text-red-600 font-medium';
            }
        }
    }

    /**
     * 设置可视化器事件监听
     * @private
     */
    _setupVisualizerListeners(visualizer, slot) {
        visualizer.on('complete', (data) => {
            const algorithmData = slot === 1 ? this.comparisonData.algorithm1 : this.comparisonData.algorithm2;
            algorithmData.comparisons = data.comparisons || 0;
            algorithmData.swaps = data.swaps || 0;
            algorithmData.duration = data.duration || 0;
            algorithmData.accessCount = visualizer.state?.accessCount || 0;
            
            this.updateComparisonStats();
        });

        visualizer.on('step', () => {
            this.updateComparisonStats();
        });
    }

    /**
     * 获取算法名称
     * @private
     */
    _getAlgorithmName(type) {
        const names = {
            'bubble': '冒泡排序',
            'selection': '选择排序',
            'insertion': '插入排序',
            'quick': '快速排序',
            'merge': '归并排序',
            'linear-search': '线性搜索',
            'binary-search': '二分搜索'
        };
        return names[type] || type;
    }

    /**
     * 应用数据到两个可视化器
     */
    applyData() {
        const input = document.getElementById('comparison-data-input');
        if (!input || !input.value) return;

        const data = input.value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
        if (data.length === 0) return;

        if (this.visualizer1) {
            this.visualizer1.setData(data);
            this.visualizer1.reset();
        }
        if (this.visualizer2) {
            this.visualizer2.setData(data);
            this.visualizer2.reset();
        }

        this.resetComparisonStats();
    }

    /**
     * 生成随机数据
     */
    generateRandomData() {
        const size = 10;
        const min = 1;
        const max = 100;
        const data = [];
        
        for (let i = 0; i < size; i++) {
            data.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }

        const input = document.getElementById('comparison-data-input');
        if (input) {
            input.value = data.join(',');
        }

        this.applyData();
    }

    /**
     * 同步播放
     */
    syncPlay() {
        if (this.visualizer1) {
            this.visualizer1.play();
        }
        if (this.visualizer2) {
            this.visualizer2.play();
        }
    }

    /**
     * 同步暂停
     */
    syncPause() {
        if (this.visualizer1) {
            this.visualizer1.pause();
        }
        if (this.visualizer2) {
            this.visualizer2.pause();
        }
    }

    /**
     * 同步重置
     */
    syncReset() {
        if (this.visualizer1) {
            this.visualizer1.reset();
        }
        if (this.visualizer2) {
            this.visualizer2.reset();
        }
        this.resetComparisonStats();
    }

    /**
     * 切换同步模式
     */
    toggleSync(enabled) {
        this.syncEnabled = enabled;
    }

    /**
     * 设置速度
     */
    setSpeed(speed) {
        const speedValue = parseInt(speed);
        
        if (this.visualizer1) {
            this.visualizer1.setSpeed(speedValue);
        }
        if (this.visualizer2) {
            this.visualizer2.setSpeed(speedValue);
        }

        const display = document.getElementById('comparison-speed-display');
        if (display) {
            display.textContent = `${speedValue}ms`;
        }
    }

    /**
     * 更新对比统计
     */
    updateComparisonStats() {
        // 更新算法1统计
        if (this.visualizer1 && this.visualizer1.state) {
            this.comparisonData.algorithm1.comparisons = this.visualizer1.state.comparisons || 0;
            this.comparisonData.algorithm1.swaps = this.visualizer1.state.swaps || 0;
            this.comparisonData.algorithm1.accessCount = this.visualizer1.state.accessCount || 0;
            if (this.visualizer1.state.startTime && this.visualizer1.state.endTime) {
                this.comparisonData.algorithm1.duration = this.visualizer1.state.endTime - this.visualizer1.state.startTime;
            }
        }

        // 更新算法2统计
        if (this.visualizer2 && this.visualizer2.state) {
            this.comparisonData.algorithm2.comparisons = this.visualizer2.state.comparisons || 0;
            this.comparisonData.algorithm2.swaps = this.visualizer2.state.swaps || 0;
            this.comparisonData.algorithm2.accessCount = this.visualizer2.state.accessCount || 0;
            if (this.visualizer2.state.startTime && this.visualizer2.state.endTime) {
                this.comparisonData.algorithm2.duration = this.visualizer2.state.endTime - this.visualizer2.state.startTime;
            }
        }

        // 更新表格
        this._updateStatsTable();
        this._updatePerformanceAnalysis();
    }

    /**
     * 更新统计表格
     * @private
     */
    _updateStatsTable() {
        const data1 = this.comparisonData.algorithm1;
        const data2 = this.comparisonData.algorithm2;

        // 比较次数
        document.getElementById('stat-1-comparisons').textContent = data1.comparisons;
        document.getElementById('stat-2-comparisons').textContent = data2.comparisons;
        document.getElementById('stat-diff-comparisons').textContent = 
            this._formatDifference(data1.comparisons, data2.comparisons);

        // 交换次数
        document.getElementById('stat-1-swaps').textContent = data1.swaps;
        document.getElementById('stat-2-swaps').textContent = data2.swaps;
        document.getElementById('stat-diff-swaps').textContent = 
            this._formatDifference(data1.swaps, data2.swaps);

        // 访问次数
        document.getElementById('stat-1-access').textContent = data1.accessCount;
        document.getElementById('stat-2-access').textContent = data2.accessCount;
        document.getElementById('stat-diff-access').textContent = 
            this._formatDifference(data1.accessCount, data2.accessCount);

        // 执行时间
        document.getElementById('stat-1-duration').textContent = `${data1.duration}ms`;
        document.getElementById('stat-2-duration').textContent = `${data2.duration}ms`;
        document.getElementById('stat-diff-duration').textContent = 
            this._formatDifference(data1.duration, data2.duration, 'ms');
    }

    /**
     * 格式化差异显示
     * @private
     */
    _formatDifference(val1, val2, unit = '') {
        if (val1 === 0 && val2 === 0) return '-';
        
        const diff = val1 - val2;
        if (diff === 0) return '相同';
        
        const percentage = val2 !== 0 ? ((diff / val2) * 100).toFixed(1) : '∞';
        const sign = diff > 0 ? '+' : '';
        const color = diff > 0 ? 'text-red-600' : 'text-green-600';
        
        return `<span class="${color} font-bold">${sign}${diff}${unit} (${sign}${percentage}%)</span>`;
    }

    /**
     * 更新性能分析
     * @private
     */
    _updatePerformanceAnalysis() {
        const data1 = this.comparisonData.algorithm1;
        const data2 = this.comparisonData.algorithm2;
        const analysisElement = document.getElementById('performance-analysis');

        if (!data1.name || !data2.name || (data1.comparisons === 0 && data2.comparisons === 0)) {
            analysisElement.innerHTML = '选择两个算法并运行以查看性能分析...';
            return;
        }

        let analysis = `<div class="space-y-2">`;

        // 比较次数分析
        if (data1.comparisons !== data2.comparisons) {
            const winner = data1.comparisons < data2.comparisons ? data1.name : data2.name;
            const diff = Math.abs(data1.comparisons - data2.comparisons);
            analysis += `<p>• <strong>${winner}</strong> 在比较次数上更优，少了 <strong>${diff}</strong> 次比较。</p>`;
        } else {
            analysis += `<p>• 两个算法的比较次数相同。</p>`;
        }

        // 交换次数分析
        if (data1.swaps !== data2.swaps) {
            const winner = data1.swaps < data2.swaps ? data1.name : data2.name;
            const diff = Math.abs(data1.swaps - data2.swaps);
            analysis += `<p>• <strong>${winner}</strong> 在交换次数上更优，少了 <strong>${diff}</strong> 次交换。</p>`;
        } else {
            analysis += `<p>• 两个算法的交换次数相同。</p>`;
        }

        // 总体性能评估
        const score1 = data1.comparisons + data1.swaps * 2; // 交换操作权重更高
        const score2 = data2.comparisons + data2.swaps * 2;
        
        if (score1 < score2) {
            const improvement = (((score2 - score1) / score2) * 100).toFixed(1);
            analysis += `<p class="font-bold text-blue-700">📈 综合评估：<strong>${data1.name}</strong> 性能更优，效率提升约 <strong>${improvement}%</strong></p>`;
        } else if (score2 < score1) {
            const improvement = (((score1 - score2) / score1) * 100).toFixed(1);
            analysis += `<p class="font-bold text-green-700">📈 综合评估：<strong>${data2.name}</strong> 性能更优，效率提升约 <strong>${improvement}%</strong></p>`;
        } else {
            analysis += `<p class="font-bold text-gray-700">📊 综合评估：两个算法性能相当</p>`;
        }

        analysis += `</div>`;
        analysisElement.innerHTML = analysis;
    }

    /**
     * 重置对比统计
     */
    resetComparisonStats() {
        this.comparisonData.algorithm1 = { name: this.comparisonData.algorithm1.name, comparisons: 0, swaps: 0, duration: 0, accessCount: 0 };
        this.comparisonData.algorithm2 = { name: this.comparisonData.algorithm2.name, comparisons: 0, swaps: 0, duration: 0, accessCount: 0 };
        this._updateStatsTable();
        this._updatePerformanceAnalysis();
    }
}

// 创建全局实例
if (typeof window !== 'undefined') {
    window.algorithmComparison = new AlgorithmComparison();
    
    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.algorithmComparison.init();
        });
    } else {
        window.algorithmComparison.init();
    }
}
