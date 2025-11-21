"""
安全更新 csp-j-studio-simple.html 的算法数组
使用字符串定位而非正则，确保结构完整
"""

print("=" * 60)
print("  安全更新算法数组到12个")
print("=" * 60)

# 读取文件
file_path = r"d:\CSPJ\csp-j-studio-simple.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 定义新的算法数组内容 (不包含 algorithms: [ 和 ])
new_algorithms_content = '''
                {
                    id: 'bubble',
                    name: '冒泡排序',
                    type: 'sort',
                    difficulty: '⭐⭐',
                    desc: '💡 像气泡上浮一样,每次将最大元素"冒泡"到末尾 | ⏱️ O(n²) 💾 O(1) | 🏷️ 稳定排序、入门级',
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
                    type: 'sort',
                    difficulty: '⭐⭐',
                    desc: '🎯 每轮选出最小值放到已排序区域末尾 | ⏱️ O(n²) 💾 O(1) | 🏷️ 不稳定、交换次数少',
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
                    type: 'sort',
                    difficulty: '⭐⭐',
                    desc: '🃏 像整理扑克牌一样,将元素插入到已排序序列的正确位置 | ⏱️ O(n²) 💾 O(1) | 🏷️ 稳定排序',
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
                    type: 'sort',
                    difficulty: '⭐⭐⭐⭐',
                    desc: '🚀 分治策略经典应用,选基准分区递归排序 | ⏱️ O(n log n) 💾 O(log n) | 🏷️ 不稳定、平均最优',
                    code: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr[i], arr[j]);
            }
        }
        swap(arr[i + 1], arr[high]);
        int pi = i + 1;
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
                },
                {
                    id: 'merge',
                    name: '归并排序',
                    type: 'sort',
                    difficulty: '⭐⭐⭐⭐',
                    desc: '🔀 分治策略,分解递归合并 | ⏱️ O(n log n) 💾 O(n) | 🏷️ 稳定排序、性能稳定',
                    code: `void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`
                },
                {
                    id: 'linear',
                    name: '线性查找',
                    type: 'search',
                    difficulty: '⭐',
                    desc: '🔍 从头到尾逐个检查,最简单直接的查找方法 | ⏱️ O(n) 💾 O(1) | 🏷️ 无序数据适用',
                    code: `int linearSearch(int arr[], int n, int x) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == x) {
            return i;
        }
    }
    return -1;
}`
                },
                {
                    id: 'binary',
                    name: '二分查找',
                    type: 'search',
                    difficulty: '⭐⭐⭐',
                    desc: '⚡ 在有序数组中每次排除一半元素,快速定位目标 | ⏱️ O(log n) 💾 O(1) | 🏷️ 有序数据、效率极高',
                    code: `int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) return m;
        if (arr[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`
                },
                {
                    id: 'recursion',
                    name: '递归算法',
                    type: 'basic',
                    difficulty: '⭐⭐',
                    desc: '🔄 函数调用自身解决问题,计算阶乘 | ⏱️ O(n) 💾 O(n) | 🏷️ 递归基础、数学计算',
                    code: `int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`
                },
                {
                    id: 'iteration',
                    name: '递推算法',
                    type: 'basic',
                    difficulty: '⭐⭐⭐',
                    desc: '➡️ 从已知推导未知,F(n) = F(n-1) + F(n-2) | ⏱️ O(n) 💾 O(1) | 🏷️ DP基础',
                    code: `int fibonacci(int n) {
    if (n <= 1) return n;
    int prev2 = 0, prev1 = 1, current;
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
                    type: 'basic',
                    difficulty: '⭐⭐⭐',
                    desc: '💰 每步选择当前最优解,用最少硬币数找零 | ⏱️ O(n) 💾 O(1) | 🏷️ 局部最优',
                    code: `int coinChange(int coins[], int n, int amount) {
    int count = 0;
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
                    type: 'basic',
                    difficulty: '⭐⭐⭐',
                    desc: '⚡ 预处理前缀和,快速计算任意区间和 | ⏱️ O(1)查询 💾 O(n) | 🏷️ 区间查询优化',
                    code: `void buildPrefixSum(int arr[], int prefix[], int n) {
    prefix[0] = arr[0];
    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i-1] + arr[i];
    }
}

int rangeSum(int prefix[], int l, int r) {
    if (l == 0) return prefix[r];
    return prefix[r] - prefix[l-1];
}`
                },
                {
                    id: 'simple_dp',
                    name: '简单动态规划',
                    type: 'dp',
                    difficulty: '⭐⭐⭐',
                    desc: '🪜 爬楼梯问题,dp[i] = dp[i-1] + dp[i-2] | ⏱️ O(n) 💾 O(1) | 🏷️ DP入门',
                    code: `int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2, current;
    for (int i = 3; i <= n; i++) {
        current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return current;
}`
                }'''

# 1. 找到 algorithms: [
start_marker = "algorithms: ["
start_idx = content.find(start_marker)

if start_idx == -1:
    print("❌ 错误：未找到 'algorithms: ['")
    exit(1)

# 2. 找到 init() {
end_marker = "init() {"
end_idx = content.find(end_marker, start_idx)

if end_idx == -1:
    print("❌ 错误：未找到 'init() {'")
    exit(1)

# 3. 在 init() 之前找到最近的 ],
# 我们从 end_idx 往前找
array_end_idx = content.rfind("],", start_idx, end_idx)

if array_end_idx == -1:
    print("❌ 错误：未找到算法数组结束标记 '],'")
    exit(1)

print(f"📍 定位成功:")
print(f"   开始位置: {start_idx}")
print(f"   结束位置: {array_end_idx}")

# 4. 构造新内容
# 保留 algorithms: [
# 插入新内容
# 保留 ], 及其后面的内容
new_file_content = content[:start_idx + len(start_marker)] + new_algorithms_content + content[array_end_idx:]

# 5. 更新版本号
new_file_content = new_file_content.replace('v2.1.1', 'v3.0.0')

# 6. 写入文件
with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_file_content)

print("✅ 成功更新算法列表！")
print("   算法数量: 12")
print("   文件结构: 保持完整")
