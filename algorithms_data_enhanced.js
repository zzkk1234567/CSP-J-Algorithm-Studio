// CSP-J 算法工作室 - 优化后的算法数据
// 使用方法:复制此数组,替换 csp-j-studio-simple.html 中的 algorithms 数组

const algorithmsData = [
    // ========== 排序算法 ==========
    {
        id: 'bubble',
        name: '冒泡排序',
        nameEn: 'Bubble Sort',
        type: 'sort',
        difficulty: '⭐⭐',
        desc: '💡 像气泡上浮一样,每次将最大元素"冒泡"到末尾 | ⏱️ O(n²) 💾 O(1) | 🏷️ 稳定排序、入门级、小数据适用',
        code: `void bubbleSort(int arr[], int n) {
    // 外层循环控制排序轮数
    for (int i = 0; i < n - 1; i++) {
        // 内层循环进行相邻元素比较
        for (int j = 0; j < n - i - 1; j++) {
            // 如果前一个元素大于后一个
            if (arr[j] > arr[j + 1]) {
                // 交换两个元素
                swap(arr[j], arr[j + 1]);
            }
        }
        // 第 i 轮结束后，最大的元素已归位
    }
}`
    },
    {
        id: 'selection',
        name: '选择排序',
        nameEn: 'Selection Sort',
        type: 'sort',
        difficulty: '⭐⭐',
        desc: '🎯 每轮选出最小值放到已排序区域末尾 | ⏱️ O(n²) 💾 O(1) | 🏷️ 不稳定、交换次数少、入门级',
        code: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // 假设当前位置 i 是最小值索引
        int min_idx = i;
        
        // 在未排序部分寻找真正的最小值
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        
        // 将找到的最小值交换到位置 i
        swap(arr[min_idx], arr[i]);
    }
}`
    },
    {
        id: 'insertion',
        name: '插入排序',
        nameEn: 'Insertion Sort',
        type: 'sort',
        difficulty: '⭐⭐',
        desc: '🃏 像整理扑克牌一样,将元素插入到已排序序列的正确位置 | ⏱️ O(n²) 💾 O(1) | 🏷️ 稳定排序、基本有序数据高效',
        code: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i]; // 待插入元素
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
    },
    {
        id: 'quick',
        name: '快速排序',
        nameEn: 'Quick Sort',
        type: 'sort',
        difficulty: '⭐⭐⭐⭐',
        desc: '🚀 分治策略经典应用,选基准分区递归排序 | ⏱️ O(n log n) 💾 O(log n) | 🏷️ 不稳定、平均最优、大数据适用',
        code: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        // 选择基准元素(这里选最后一个)
        int pivot = arr[high];
        int i = low - 1;
        
        // 分区操作
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr[i], arr[j]);
            }
        }
        swap(arr[i + 1], arr[high]);
        int pi = i + 1;
        
        // 递归排序左右两部分
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
    },
    {
        id: 'merge',
        name: '归并排序',
        nameEn: 'Merge Sort',
        type: 'sort',
        difficulty: '⭐⭐⭐⭐',
        desc: '🔀 分治策略,分解递归合并 | ⏱️ O(n log n) 💾 O(n) | 🏷️ 稳定排序、性能稳定、需额外空间',
        code: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int L[n1], R[n2];
    
    // 复制数据到临时数组
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    
    // 合并两个有序数组
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`
    },

    // ========== 查找算法 ==========
    {
        id: 'linear',
        name: '线性查找',
        nameEn: 'Linear Search',
        type: 'search',
        difficulty: '⭐',
        desc: '🔍 从头到尾逐个检查,最简单直接的查找方法 | ⏱️ O(n) 💾 O(1) | 🏷️ 无序数据、小规模、实现简单',
        code: `int linearSearch(int arr[], int n, int x) {
    // 遍历数组每个元素
    for (int i = 0; i < n; i++) {
        // 检查当前元素是否等于目标值
        if (arr[i] == x) {
            return i; // 找到目标，返回索引
        }
    }
    return -1; // 未找到
}`
    },
    {
        id: 'binary',
        name: '二分查找',
        nameEn: 'Binary Search',
        type: 'search',
        difficulty: '⭐⭐⭐',
        desc: '⚡ 在有序数组中每次排除一半元素,快速定位目标 | ⏱️ O(log n) 💾 O(1) | 🏷️ 有序数据、大规模、效率极高',
        code: `int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        // 计算中间索引
        int m = l + (r - l) / 2;
        
        // 检查中间元素是否是目标值
        if (arr[m] == x) 
            return m;
            
        // 如果目标值更大，忽略左半部分
        if (arr[m] < x) 
            l = m + 1;
            
        // 如果目标值更小，忽略右半部分
        else 
            r = m - 1;
    }
    return -1; // 未找到
}`
    },

    // ========== 基础算法 ==========
    {
        id: 'recursion',
        name: '递归算法',
        nameEn: 'Recursion',
        type: 'basic',
        difficulty: '⭐⭐',
        desc: '🔄 函数调用自身解决问题,计算阶乘 n! = n × (n-1)! | ⏱️ O(n) 💾 O(n) | 🏷️ 数学计算、递归基础',
        code: `int factorial(int n) {
    // 基准情况:0! = 1, 1! = 1
    if (n <= 1) {
        return 1;
    }
    // 递归调用:n! = n × (n-1)!
    return n * factorial(n - 1);
}

// 斐波那契数列(递归版)
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`
    },
    {
        id: 'iteration',
        name: '递推算法',
        nameEn: 'Iteration',
        type: 'basic',
        difficulty: '⭐⭐⭐',
        desc: '➡️ 从已知推导未知,F(n) = F(n-1) + F(n-2) | ⏱️ O(n) 💾 O(1) | 🏷️ 数列计算、DP基础',
        code: `int fibonacci(int n) {
    if (n <= 1) return n;
    
    int prev2 = 0, prev1 = 1;
    int current;
    
    // 迭代计算
    for (int i = 2; i <= n; i++) {
        current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return current;
}`
    },
    {
        id: 'greedy',
        name: '贪心算法',
        nameEn: 'Greedy Algorithm',
        type: 'basic',
        difficulty: '⭐⭐⭐',
        desc: '💰 每步选择当前最优解,用最少硬币数找零 | ⏱️ O(n) 💾 O(1) | 🏷️ 最优化问题、局部最优',
        code: `int coinChange(int coins[], int n, int amount) {
    int count = 0;
    
    // 从大到小贪心选择硬币
    for (int i = n - 1; i >= 0; i--) {
        while (amount >= coins[i]) {
            amount -= coins[i];
            count++;
        }
    }
    
    return (amount == 0) ? count : -1;
}`
    },
    {
        id: 'prefix_sum',
        name: '前缀和',
        nameEn: 'Prefix Sum',
        type: 'basic',
        difficulty: '⭐⭐⭐',
        desc: '⚡ 预处理前缀和,快速计算任意区间和 | ⏱️ O(1)查询 💾 O(n) | 🏷️ 区间查询、空间换时间',
        code: `void buildPrefixSum(int arr[], int prefix[], int n) {
    prefix[0] = arr[0];
    // 构建前缀和数组
    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i-1] + arr[i];
    }
}

int rangeSum(int prefix[], int l, int r) {
    // 计算区间[l, r]的和
    if (l == 0) return prefix[r];
    return prefix[r] - prefix[l-1];
}`
    },
    {
        id: 'simple_dp',
        name: '简单动态规划',
        nameEn: 'Simple DP',
        type: 'dp',
        difficulty: '⭐⭐⭐',
        desc: '🪜 爬楼梯问题,dp[i] = dp[i-1] + dp[i-2] | ⏱️ O(n) 💾 O(1) | 🏷️ DP入门、最优子结构',
        code: `int climbStairs(int n) {
    if (n <= 2) return n;
    
    int prev2 = 1, prev1 = 2;
    int current;
    
    // 状态转移:dp[i] = dp[i-1] + dp[i-2]
    for (int i = 3; i <= n; i++) {
        current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return current;
}`
    }
];

// 使用说明:
// 1. 打开 csp-j-studio-simple.html
// 2. 找到 algorithms: [ ... ] 数组
// 3. 用上面的 algorithmsData 替换
// 4. 保存文件
// 5. 刷新浏览器查看效果
