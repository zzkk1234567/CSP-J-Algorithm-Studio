/**
 * 算法目录管理系统
 * 提供算法分类、搜索、筛选和收藏功能
 */
class AlgorithmCatalog {
    constructor() {
        this.algorithms = this._initializeAlgorithms();
        this.categories = this._extractCategories();
        this.configManager = window.configManager;
    }

    /**
     * 初始化算法数据
     * @private
     */
    _initializeAlgorithms() {
        return [
            // 排序算法
            {
                id: 'bubble-sort',
                name: '冒泡排序',
                nameEn: 'Bubble Sort',
                category: 'sorting',
                difficulty: 'easy',
                description: '通过重复遍历数组，比较相邻元素并交换位置',
                icon: '🫧',
                complexity: { time: 'O(n²)', space: 'O(1)' }
            },
            {
                id: 'selection-sort',
                name: '选择排序',
                nameEn: 'Selection Sort',
                category: 'sorting',
                difficulty: 'easy',
                description: '每次从未排序部分选择最小元素放到已排序部分末尾',
                icon: '🎯',
                complexity: { time: 'O(n²)', space: 'O(1)' }
            },
            {
                id: 'insertion-sort',
                name: '插入排序',
                nameEn: 'Insertion Sort',
                category: 'sorting',
                difficulty: 'easy',
                description: '将元素逐个插入到已排序序列的正确位置',
                icon: '📌',
                complexity: { time: 'O(n²)', space: 'O(1)' }
            },
            {
                id: 'quick-sort',
                name: '快速排序',
                nameEn: 'Quick Sort',
                category: 'sorting',
                difficulty: 'medium',
                description: '使用分治策略，选择基准元素进行分区排序',
                icon: '⚡',
                complexity: { time: 'O(n log n)', space: 'O(log n)' }
            },
            {
                id: 'merge-sort',
                name: '归并排序',
                nameEn: 'Merge Sort',
                category: 'sorting',
                difficulty: 'medium',
                description: '将数组分成两半，递归排序后合并',
                icon: '🔀',
                complexity: { time: 'O(n log n)', space: 'O(n)' }
            },
            {
                id: 'heap-sort',
                name: '堆排序',
                nameEn: 'Heap Sort',
                category: 'sorting',
                difficulty: 'hard',
                description: '利用堆数据结构进行排序',
                icon: '🏔️',
                complexity: { time: 'O(n log n)', space: 'O(1)' }
            },
            
            // 搜索算法
            {
                id: 'linear-search',
                name: '线性查找',
                nameEn: 'Linear Search',
                category: 'searching',
                difficulty: 'easy',
                description: '从头到尾逐个检查每个元素',
                icon: '🔍',
                complexity: { time: 'O(n)', space: 'O(1)' }
            },
            {
                id: 'binary-search',
                name: '二分查找',
                nameEn: 'Binary Search',
                category: 'searching',
                difficulty: 'medium',
                description: '在有序数组中通过折半查找目标元素',
                icon: '🎲',
                complexity: { time: 'O(log n)', space: 'O(1)' }
            },
            
            // 图算法
            {
                id: 'dfs',
                name: '深度优先搜索',
                nameEn: 'DFS',
                category: 'graph',
                difficulty: 'medium',
                description: '沿着图的深度遍历，使用栈或递归实现',
                icon: '🌊',
                complexity: { time: 'O(V+E)', space: 'O(V)' }
            },
            {
                id: 'bfs',
                name: '广度优先搜索',
                nameEn: 'BFS',
                category: 'graph',
                difficulty: 'medium',
                description: '按层次遍历图，使用队列实现',
                icon: '🌐',
                complexity: { time: 'O(V+E)', space: 'O(V)' }
            },
            {
                id: 'dijkstra',
                name: 'Dijkstra最短路径',
                nameEn: 'Dijkstra',
                category: 'graph',
                difficulty: 'hard',
                description: '计算单源最短路径，适用于非负权重图',
                icon: '🛣️',
                complexity: { time: 'O(V²)', space: 'O(V)' }
            },
            
            // 动态规划
            {
                id: 'fibonacci',
                name: '斐波那契数列',
                nameEn: 'Fibonacci',
                category: 'dynamic-programming',
                difficulty: 'easy',
                description: '使用动态规划优化递归计算',
                icon: '🔢',
                complexity: { time: 'O(n)', space: 'O(n)' }
            },
            {
                id: 'knapsack',
                name: '背包问题',
                nameEn: 'Knapsack',
                category: 'dynamic-programming',
                difficulty: 'hard',
                description: '在限制条件下选择物品以最大化价值',
                icon: '🎒',
                complexity: { time: 'O(nW)', space: 'O(nW)' }
            },
            {
                id: 'lcs',
                name: '最长公共子序列',
                nameEn: 'LCS',
                category: 'dynamic-programming',
                difficulty: 'medium',
                description: '找出两个序列的最长公共子序列',
                icon: '📏',
                complexity: { time: 'O(mn)', space: 'O(mn)' }
            },
            
            // 其他算法
            {
                id: 'factorial',
                name: '递归阶乘',
                nameEn: 'Factorial',
                category: 'recursion',
                difficulty: 'easy',
                description: '使用递归计算阶乘',
                icon: '🔄',
                complexity: { time: 'O(n)', space: 'O(n)' }
            }
        ];
    }

    /**
     * 提取所有类别
     * @private
     */
    _extractCategories() {
        const categoryMap = {
            'sorting': { name: '排序算法', nameEn: 'Sorting', icon: '🔢', color: 'blue' },
            'searching': { name: '搜索算法', nameEn: 'Searching', icon: '🔍', color: 'green' },
            'graph': { name: '图算法', nameEn: 'Graph', icon: '🌐', color: 'purple' },
            'dynamic-programming': { name: '动态规划', nameEn: 'Dynamic Programming', icon: '💡', color: 'orange' },
            'recursion': { name: '递归算法', nameEn: 'Recursion', icon: '🔄', color: 'pink' }
        };
        
        return categoryMap;
    }

    /**
     * 获取所有算法
     */
    getAllAlgorithms() {
        return this.algorithms;
    }

    /**
     * 按类别获取算法
     */
    getAlgorithmsByCategory(category) {
        return this.algorithms.filter(algo => algo.category === category);
    }

    /**
     * 搜索算法
     */
    searchAlgorithms(query) {
        if (!query || query.trim() === '') {
            return this.algorithms;
        }
        
        const lowerQuery = query.toLowerCase();
        return this.algorithms.filter(algo => 
            algo.name.toLowerCase().includes(lowerQuery) ||
            algo.nameEn.toLowerCase().includes(lowerQuery) ||
            algo.description.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * 按难度筛选算法
     */
    filterByDifficulty(difficulty) {
        if (!difficulty || difficulty === 'all') {
            return this.algorithms;
        }
        return this.algorithms.filter(algo => algo.difficulty === difficulty);
    }

    /**
     * 获取收藏的算法
     */
    getFavorites() {
        const favorites = this.configManager.get('favorites') || [];
        return this.algorithms.filter(algo => favorites.includes(algo.id));
    }

    /**
     * 切换收藏状态
     */
    toggleFavorite(algorithmId) {
        let favorites = this.configManager.get('favorites') || [];
        
        if (favorites.includes(algorithmId)) {
            favorites = favorites.filter(id => id !== algorithmId);
        } else {
            favorites.push(algorithmId);
        }
        
        this.configManager.set('favorites', favorites);
        return favorites.includes(algorithmId);
    }

    /**
     * 检查是否已收藏
     */
    isFavorite(algorithmId) {
        const favorites = this.configManager.get('favorites') || [];
        return favorites.includes(algorithmId);
    }

    /**
     * 获取最近使用的算法
     */
    getRecentAlgorithms(limit = 5) {
        const recent = this.configManager.get('recentAlgorithms') || [];
        return recent
            .slice(0, limit)
            .map(id => this.algorithms.find(algo => algo.id === id))
            .filter(algo => algo !== undefined);
    }

    /**
     * 记录算法使用
     */
    recordAlgorithmUsage(algorithmId) {
        let recent = this.configManager.get('recentAlgorithms') || [];
        
        // 移除已存在的记录
        recent = recent.filter(id => id !== algorithmId);
        
        // 添加到开头
        recent.unshift(algorithmId);
        
        // 只保留最近10个
        recent = recent.slice(0, 10);
        
        this.configManager.set('recentAlgorithms', recent);
    }

    /**
     * 渲染算法目录
     */
    render(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        const {
            searchQuery = '',
            categoryFilter = 'all',
            difficultyFilter = 'all',
            showFavorites = false
        } = options;

        // 获取要显示的算法
        let algorithms = this.algorithms;
        
        if (showFavorites) {
            algorithms = this.getFavorites();
        } else {
            if (searchQuery) {
                algorithms = this.searchAlgorithms(searchQuery);
            }
            if (categoryFilter !== 'all') {
                algorithms = algorithms.filter(algo => algo.category === categoryFilter);
            }
            if (difficultyFilter !== 'all') {
                algorithms = algorithms.filter(algo => algo.difficulty === difficultyFilter);
            }
        }

        // 按类别分组
        const grouped = {};
        algorithms.forEach(algo => {
            if (!grouped[algo.category]) {
                grouped[algo.category] = [];
            }
            grouped[algo.category].push(algo);
        });

        // 渲染HTML
        let html = '';
        
        // 最近使用
        const recentAlgorithms = this.getRecentAlgorithms();
        if (recentAlgorithms.length > 0 && !showFavorites && !searchQuery) {
            html += this._renderSection('recent', '⏱️ 最近使用', recentAlgorithms);
        }

        // 按类别渲染
        Object.keys(grouped).forEach(categoryKey => {
            const category = this.categories[categoryKey];
            const categoryAlgos = grouped[categoryKey];
            html += this._renderSection(categoryKey, `${category.icon} ${category.name}`, categoryAlgos);
        });

        if (algorithms.length === 0) {
            html = `
                <div class="text-center py-12">
                    <div class="text-6xl mb-4">🔍</div>
                    <p class="text-gray-600 text-lg">未找到匹配的算法</p>
                    <p class="text-gray-500 text-sm mt-2">尝试调整搜索条件或筛选器</p>
                </div>
            `;
        }

        container.innerHTML = html;
    }

    /**
     * 渲染一个分类区域
     * @private
     */
    _renderSection(categoryKey, title, algorithms) {
        const cards = algorithms.map(algo => this._renderCard(algo)).join('');
        
        return `
            <div class="algorithm-section mb-8" data-category="${categoryKey}">
                <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    ${title}
                    <span class="ml-2 text-sm font-normal text-gray-500">(${algorithms.length})</span>
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${cards}
                </div>
            </div>
        `;
    }

    /**
     * 渲染算法卡片
     * @private
     */
    _renderCard(algo) {
        const isFav = this.isFavorite(algo.id);
        const difficultyColors = {
            'easy': 'bg-green-100 text-green-800',
            'medium': 'bg-yellow-100 text-yellow-800',
            'hard': 'bg-red-100 text-red-800'
        };
        const difficultyLabels = {
            'easy': '简单',
            'medium': '中等',
            'hard': '困难'
        };

        return `
            <div class="algorithm-card bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                 data-algorithm-id="${algo.id}"
                 onclick="selectAlgorithm('${algo.id}')">
                <div class="p-5">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center">
                            <span class="text-3xl mr-3">${algo.icon}</span>
                            <div>
                                <h4 class="font-bold text-gray-800 text-lg">${algo.name}</h4>
                                <p class="text-xs text-gray-500">${algo.nameEn}</p>
                            </div>
                        </div>
                        <button onclick="event.stopPropagation(); toggleFavorite('${algo.id}')" 
                                class="favorite-btn text-2xl hover:scale-110 transition-transform"
                                data-algorithm-id="${algo.id}">
                            ${isFav ? '⭐' : '☆'}
                        </button>
                    </div>
                    
                    <p class="text-sm text-gray-600 mb-3 line-clamp-2">${algo.description}</p>
                    
                    <div class="flex items-center justify-between">
                        <span class="px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[algo.difficulty]}">
                            ${difficultyLabels[algo.difficulty]}
                        </span>
                        <div class="text-xs text-gray-500">
                            <span class="font-mono">${algo.complexity.time}</span>
                        </div>
                    </div>
                </div>
                <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-1"></div>
            </div>
        `;
    }
}

// 创建全局实例
window.algorithmCatalog = new AlgorithmCatalog();
