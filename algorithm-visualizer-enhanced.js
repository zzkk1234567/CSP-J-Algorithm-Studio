// 增强版算法可视化系统 - 补充缺失的算法实现
// 扩展原有系统，添加更多CSP-J常见算法

/**
 * 扩展的搜索算法可视化器
 * 添加插值查找、跳跃搜索、指数搜索等
 */
class EnhancedSearchVisualizer extends SearchVisualizer {
    constructor(containerId, algorithm = 'linear', options = {}) {
        super(containerId, algorithm, options);
    }

    prepareSearchAnimations() {
        this.animationQueue = [];
        
        switch (this.algorithm) {
            case 'linear':
                this.prepareLinearSearch();
                break;
            case 'binary':
                this.prepareBinarySearch();
                break;
            case 'interpolation':
                this.prepareInterpolationSearch();
                break;
            case 'jump':
                this.prepareJumpSearch();
                break;
            case 'exponential':
                this.prepareExponentialSearch();
                break;
            default:
                this.prepareLinearSearch();
        }
    }

    /**
     * 插值查找算法
     * 适用于均匀分布的有序数组
     */
    prepareInterpolationSearch() {
        this.updateComplexity('O(1)', 'O(log log n)', 'O(n)');
        
        this.animationQueue.push({
            type: 'explain',
            text: `插值查找：在均匀分布的有序数组中查找 ${this.target}`
        });
        
        let left = 0;
        let right = this.data.length - 1;
        let found = false;
        
        while (left <= right && this.target >= this.data[left] && this.target <= this.data[right]) {
            // 计算插值位置
            const pos = left + Math.floor(((this.target - this.data[left]) / (this.data[right] - this.data[left])) * (right - left));
            
            // 高亮当前搜索范围
            const rangeIndices = [];
            for (let i = left; i <= right; i++) {
                rangeIndices.push(i);
            }
            this.animationQueue.push({
                type: 'highlight',
                indices: rangeIndices,
                color: this.options.colors.auxiliary
            });
            
            // 高亮插值位置
            this.animationQueue.push({
                type: 'compare',
                indices: [pos]
            });
            
            this.animationQueue.push({
                type: 'explain',
                text: `插值计算位置 ${pos}，值为 ${this.data[pos]}`
            });
            
            if (this.data[pos] === this.target) {
                this.animationQueue.push({
                    type: 'highlight',
                    indices: [pos],
                    color: this.options.colors.found
                });
                
                this.animationQueue.push({
                    type: 'explain',
                    text: `✅ 找到目标！目标 ${this.target} 在位置 ${pos}`
                });
                
                found = true;
                break;
            } else if (this.data[pos] < this.target) {
                this.animationQueue.push({
                    type: 'explain',
                    text: `${this.data[pos]} < ${this.target}，搜索右半部分`
                });
                left = pos + 1;
            } else {
                this.animationQueue.push({
                    type: 'explain',
                    text: `${this.data[pos]} > ${this.target}，搜索左半部分`
                });
                right = pos - 1;
            }
        }
        
        if (!found) {
            this.animationQueue.push({
                type: 'explain',
                text: `❌ 未找到目标值 ${this.target}`
            });
        }
    }

    /**
     * 跳跃搜索算法
     * 通过跳跃步长快速定位区间
     */
    prepareJumpSearch() {
        this.updateComplexity('O(√n)', 'O(√n)', 'O(√n)');
        
        const n = this.data.length;
        const step = Math.floor(Math.sqrt(n));
        
        this.animationQueue.push({
            type: 'explain',
            text: `跳跃搜索：步长为 ${step}，查找 ${this.target}`
        });
        
        let prev = 0;
        let found = false;
        
        // 跳跃阶段
        while (this.data[Math.min(step, n) - 1] < this.target) {
            this.animationQueue.push({
                type: 'compare',
                indices: [Math.min(step, n) - 1]
            });
            
            this.animationQueue.push({
                type: 'explain',
                text: `检查位置 ${Math.min(step, n) - 1}，值为 ${this.data[Math.min(step, n) - 1]}`
            });
            
            prev = step;
            step += Math.floor(Math.sqrt(n));
            
            if (prev >= n) {
                this.animationQueue.push({
                    type: 'explain',
                    text: `❌ 未找到目标值 ${this.target}`
                });
                return;
            }
        }
        
        // 线性搜索阶段
        this.animationQueue.push({
            type: 'explain',
            text: `在区间 [${prev}, ${Math.min(step, n) - 1}] 中线性搜索`
        });
        
        while (this.data[prev] < this.target) {
            this.animationQueue.push({
                type: 'compare',
                indices: [prev]
            });
            
            prev++;
            
            if (prev === Math.min(step, n)) {
                this.animationQueue.push({
                    type: 'explain',
                    text: `❌ 未找到目标值 ${this.target}`
                });
                return;
            }
        }
        
        if (this.data[prev] === this.target) {
            this.animationQueue.push({
                type: 'highlight',
                indices: [prev],
                color: this.options.colors.found
            });
            
            this.animationQueue.push({
                type: 'explain',
                text: `✅ 找到目标！目标 ${this.target} 在位置 ${prev}`
            });
        } else {
            this.animationQueue.push({
                type: 'explain',
                text: `❌ 未找到目标值 ${this.target}`
            });
        }
    }

    /**
     * 指数搜索算法
     * 先找到范围，再进行二分查找
     */
    prepareExponentialSearch() {
        this.updateComplexity('O(log n)', 'O(log n)', 'O(log n)');
        
        this.animationQueue.push({
            type: 'explain',
            text: `指数搜索：查找 ${this.target}`
        });
        
        const n = this.data.length;
        
        // 如果目标在第一个位置
        if (this.data[0] === this.target) {
            this.animationQueue.push({
                type: 'highlight',
                indices: [0],
                color: this.options.colors.found
            });
            
            this.animationQueue.push({
                type: 'explain',
                text: `✅ 找到目标！目标 ${this.target} 在位置 0`
            });
            return;
        }
        
        // 找到范围
        let i = 1;
        while (i < n && this.data[i] <= this.target) {
            this.animationQueue.push({
                type: 'compare',
                indices: [i]
            });
            
            this.animationQueue.push({
                type: 'explain',
                text: `检查位置 ${i}，值为 ${this.data[i]}，扩大搜索范围`
            });
            
            i *= 2;
        }
        
        // 在找到的范围内进行二分查找
        const left = Math.floor(i / 2);
        const right = Math.min(i, n - 1);
        
        this.animationQueue.push({
            type: 'explain',
            text: `在范围 [${left}, ${right}] 中进行二分查找`
        });
        
        this.binarySearchInRange(left, right);
    }

    /**
     * 在指定范围内进行二分查找
     */
    binarySearchInRange(left, right) {
        let found = false;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            this.animationQueue.push({
                type: 'compare',
                indices: [mid]
            });
            
            this.animationQueue.push({
                type: 'explain',
                text: `二分查找：中间位置 ${mid}，值为 ${this.data[mid]}`
            });
            
            if (this.data[mid] === this.target) {
                this.animationQueue.push({
                    type: 'highlight',
                    indices: [mid],
                    color: this.options.colors.found
                });
                
                this.animationQueue.push({
                    type: 'explain',
                    text: `✅ 找到目标！目标 ${this.target} 在位置 ${mid}`
                });
                
                found = true;
                break;
            } else if (this.data[mid] < this.target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        if (!found) {
            this.animationQueue.push({
                type: 'explain',
                text: `❌ 未找到目标值 ${this.target}`
            });
        }
    }
}

/**
 * 扩展的排序算法可视化器
 * 添加堆排序、计数排序、基数排序等
 */
class EnhancedSortingVisualizer extends SortingVisualizer {
    constructor(containerId, algorithm = 'bubble', options = {}) {
        super(containerId, algorithm, options);
    }

    prepareAlgorithmAnimations() {
        this.animationQueue = [];
        
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
            case 'quick':
                this.prepareQuickSort(0, this.data.length - 1);
                break;
            case 'merge':
                this.prepareMergeSort(0, this.data.length - 1);
                break;
            case 'heap':
                this.prepareHeapSort();
                break;
            case 'counting':
                this.prepareCountingSort();
                break;
            case 'radix':
                this.prepareRadixSort();
                break;
            default:
                this.prepareBubbleSort();
        }
        
        // 最后高亮所有元素表示完成
        const finalIndices = this.data.map((_, i) => i);
        this.animationQueue.push({
            type: 'highlight',
            indices: finalIndices,
            color: this.options.colors.completed
        });
        
        this.animationQueue.push({
            type: 'explain',
            text: '✅ 排序完成！数组已经有序。'
        });
    }

    /**
     * 堆排序算法
     */
    prepareHeapSort() {
        this.updateComplexity('O(n log n)', 'O(n log n)', 'O(n log n)');
        
        const n = this.data.length;
        const tempData = [...this.data];
        
        this.animationQueue.push({
            type: 'explain',
            text: '堆排序：首先构建最大堆'
        });
        
        // 构建最大堆
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(tempData, n, i);
        }
        
        this.animationQueue.push({
            type: 'explain',
            text: '最大堆构建完成，开始排序'
        });
        
        // 逐个提取元素
        for (let i = n - 1; i > 0; i--) {
            // 将当前最大元素移到末尾
            [tempData[0], tempData[i]] = [tempData[i], tempData[0]];
            this.animationQueue.push({
                type: 'swap',
                index1: 0,
                index2: i
            });
            
            this.animationQueue.push({
                type: 'explain',
                text: `将最大元素 ${tempData[i]} 移到位置 ${i}`
            });
            
            // 标记已排序元素
            this.animationQueue.push({
                type: 'highlight',
                indices: [i],
                color: this.options.colors.completed
            });
            
            // 重新调整堆
            this.heapify(tempData, i, 0);
        }
    }

    /**
     * 堆化操作
     */
    heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        if (largest !== i) {
            this.animationQueue.push({
                type: 'compare',
                indices: [i, largest]
            });
            
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            this.animationQueue.push({
                type: 'swap',
                index1: i,
                index2: largest
            });
            
            this.heapify(arr, n, largest);
        }
    }

    /**
     * 计数排序算法
     */
    prepareCountingSort() {
        this.updateComplexity('O(n+k)', 'O(n+k)', 'O(n+k)');
        
        const tempData = [...this.data];
        const max = Math.max(...tempData);
        const min = Math.min(...tempData);
        const range = max - min + 1;
        
        this.animationQueue.push({
            type: 'explain',
            text: `计数排序：数据范围 [${min}, ${max}]，创建计数数组`
        });
        
        // 创建计数数组
        const count = new Array(range).fill(0);
        
        // 统计每个元素出现次数
        for (let i = 0; i < tempData.length; i++) {
            this.animationQueue.push({
                type: 'compare',
                indices: [i]
            });
            
            count[tempData[i] - min]++;
            
            this.animationQueue.push({
                type: 'explain',
                text: `统计元素 ${tempData[i]} 的出现次数`
            });
        }
        
        // 重构数组
        let index = 0;
        for (let i = 0; i < range; i++) {
            while (count[i] > 0) {
                tempData[index] = i + min;
                
                this.animationQueue.push({
                    type: 'update',
                    index: index,
                    value: i + min
                });
                
                this.animationQueue.push({
                    type: 'explain',
                    text: `将元素 ${i + min} 放到位置 ${index}`
                });
                
                index++;
                count[i]--;
            }
        }
    }

    /**
     * 基数排序算法
     */
    prepareRadixSort() {
        this.updateComplexity('O(d(n+k))', 'O(d(n+k))', 'O(d(n+k))');
        
        const tempData = [...this.data];
        const max = Math.max(...tempData);
        
        this.animationQueue.push({
            type: 'explain',
            text: `基数排序：最大值为 ${max}，按位数排序`
        });
        
        // 对每一位进行计数排序
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            this.animationQueue.push({
                type: 'explain',
                text: `按第 ${Math.log10(exp) + 1} 位进行排序`
            });
            
            this.countingSortByDigit(tempData, exp);
        }
    }

    /**
     * 按指定位数进行计数排序
     */
    countingSortByDigit(arr, exp) {
        const n = arr.length;
        const output = new Array(n);
        const count = new Array(10).fill(0);
        
        // 统计每个数字出现次数
        for (let i = 0; i < n; i++) {
            const digit = Math.floor(arr[i] / exp) % 10;
            count[digit]++;
            
            this.animationQueue.push({
                type: 'compare',
                indices: [i]
            });
            
            this.animationQueue.push({
                type: 'explain',
                text: `元素 ${arr[i]} 的当前位数字为 ${digit}`
            });
        }
        
        // 计算累积计数
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        
        // 构建输出数组
        for (let i = n - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
            
            this.animationQueue.push({
                type: 'update',
                index: count[digit],
                value: arr[i]
            });
        }
        
        // 复制回原数组
        for (let i = 0; i < n; i++) {
            arr[i] = output[i];
        }
    }
}

/**
 * 扩展的图算法可视化器
 * 添加Kruskal最小生成树、拓扑排序等
 */
class EnhancedGraphVisualizer extends GraphVisualizer {
    constructor(containerId, algorithm = 'dfs', options = {}) {
        super(containerId, algorithm, options);
        this.edges = [];
        this.mstEdges = [];
    }

    setGraph(nodes, edges) {
        super.setGraph(nodes, edges);
        this.edges = edges.map(edge => ({
            ...edge,
            weight: edge.weight || Math.floor(Math.random() * 10) + 1
        }));
    }

    prepareGraphAnimations() {
        this.animationQueue = [];
        
        switch (this.algorithm) {
            case 'dfs':
                this.prepareDFS('A');
                break;
            case 'bfs':
                this.prepareBFS('A');
                break;
            case 'dijkstra':
                this.prepareDijkstra('A');
                break;
            case 'kruskal':
                this.prepareKruskal();
                break;
            case 'topological':
                this.prepareTopologicalSort();
                break;
            default:
                this.prepareDFS('A');
        }
    }

    /**
     * Kruskal最小生成树算法
     */
    prepareKruskal() {
        this.updateComplexity('O(E log E)', 'O(E log E)', 'O(E log E)');
        
        this.animationQueue.push({
            type: 'explain',
            text: 'Kruskal算法：构建最小生成树'
        });
        
        // 按权重排序边
        const sortedEdges = [...this.edges].sort((a, b) => a.weight - b.weight);
        
        this.animationQueue.push({
            type: 'explain',
            text: '步骤1：按权重对所有边进行排序'
        });
        
        // 并查集初始化
        const parent = {};
        const rank = {};
        
        Object.keys(this.adjacencyList).forEach(node => {
            parent[node] = node;
            rank[node] = 0;
        });
        
        const find = (x) => {
            if (parent[x] !== x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        };
        
        const union = (x, y) => {
            const rootX = find(x);
            const rootY = find(y);
            
            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
        };
        
        let edgeCount = 0;
        const totalNodes = Object.keys(this.adjacencyList).length;
        
        for (const edge of sortedEdges) {
            if (edgeCount === totalNodes - 1) break;
            
            this.animationQueue.push({
                type: 'explain',
                text: `检查边 ${edge.from}-${edge.to}，权重: ${edge.weight}`
            });
            
            const rootFrom = find(edge.from);
            const rootTo = find(edge.to);
            
            if (rootFrom !== rootTo) {
                this.animationQueue.push({
                    type: 'highlight',
                    indices: [edge.from, edge.to],
                    color: this.options.colors.completed
                });
                
                this.animationQueue.push({
                    type: 'explain',
                    text: `添加边 ${edge.from}-${edge.to} 到最小生成树`
                });
                
                union(edge.from, edge.to);
                this.mstEdges.push(edge);
                edgeCount++;
            } else {
                this.animationQueue.push({
                    type: 'explain',
                    text: `边 ${edge.from}-${edge.to} 会形成环，跳过`
                });
            }
        }
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ 最小生成树构建完成！包含 ${edgeCount} 条边`
        });
    }

    /**
     * 拓扑排序算法
     */
    prepareTopologicalSort() {
        this.updateComplexity('O(V+E)', 'O(V+E)', 'O(V+E)');
        
        this.animationQueue.push({
            type: 'explain',
            text: '拓扑排序：对有向无环图进行线性排序'
        });
        
        // 计算入度
        const inDegree = {};
        Object.keys(this.adjacencyList).forEach(node => {
            inDegree[node] = 0;
        });
        
        this.edges.forEach(edge => {
            if (edge.directed !== false) {
                inDegree[edge.to]++;
            }
        });
        
        // 找到入度为0的节点
        const queue = [];
        const result = [];
        
        Object.keys(inDegree).forEach(node => {
            if (inDegree[node] === 0) {
                queue.push(node);
            }
        });
        
        this.animationQueue.push({
            type: 'explain',
            text: `初始入度为0的节点: [${queue.join(', ')}]`
        });
        
        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node);
            
            this.animationQueue.push({
                type: 'highlight',
                indices: [node],
                color: this.options.colors.completed
            });
            
            this.animationQueue.push({
                type: 'explain',
                text: `访问节点 ${node}，当前排序: [${result.join(' → ')}]`
            });
            
            // 更新相邻节点的入度
            const neighbors = this.adjacencyList[node] || [];
            for (const neighbor of neighbors) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) {
                    queue.push(neighbor);
                }
            }
        }
        
        if (result.length === Object.keys(this.adjacencyList).length) {
            this.animationQueue.push({
                type: 'explain',
                text: `✅ 拓扑排序完成！排序结果: [${result.join(' → ')}]`
            });
        } else {
            this.animationQueue.push({
                type: 'explain',
                text: `❌ 图中存在环，无法进行拓扑排序`
            });
        }
    }
}

// 导出增强版可视化器
window.EnhancedSearchVisualizer = EnhancedSearchVisualizer;
window.EnhancedSortingVisualizer = EnhancedSortingVisualizer;
window.EnhancedGraphVisualizer = EnhancedGraphVisualizer;