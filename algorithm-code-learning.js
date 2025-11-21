// 算法代码学习系统 - 提供详细的代码步骤说明和交互式练习
// 专为CSP-J考试设计的代码教学工具

/**
 * 算法代码学习管理器
 * 提供代码高亮、步骤说明、交互练习等功能
 */
class AlgorithmCodeLearning {
    constructor() {
        this.algorithms = this.initAlgorithmsData();
        this.currentAlgorithm = null;
        this.currentStep = 0;
        this.userCode = '';
        this.exercises = this.initExercises();
    }

    /**
     * 初始化算法数据，包含详细的步骤说明
     */
    initAlgorithmsData() {
        return {
            'bubble_sort': {
                name: '冒泡排序',
                description: '通过相邻元素比较和交换，将最大元素"冒泡"到末尾',
                code: `#include <iostream>
using namespace std;

// 冒泡排序函数
void bubbleSort(int arr[], int n) {
    // 外层循环：控制排序轮数
    for (int i = 0; i < n-1; i++) {
        // 内层循环：进行相邻元素比较
        for (int j = 0; j < n-i-1; j++) {
            // 如果前面的元素大于后面的元素，交换它们
            if (arr[j] > arr[j+1]) {
                // 交换 arr[j] 和 arr[j+1]
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr)/sizeof(arr[0]);
    
    cout << "排序前: ";
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
    cout << endl;
    
    bubbleSort(arr, n);
    
    cout << "排序后: ";
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
    cout << endl;
    
    return 0;
}`,
                steps: [
                    {
                        line: [1, 2],
                        explanation: '引入输入输出流库，使用标准命名空间',
                        code: '#include <iostream>\nusing namespace std;',
                        detail: '这是C++程序的标准开头，iostream提供cin和cout功能'
                    },
                    {
                        line: [5],
                        explanation: '定义冒泡排序函数，接受数组和大小作为参数',
                        code: 'void bubbleSort(int arr[], int n)',
                        detail: 'void表示函数不返回值，arr[]是待排序数组，n是数组大小'
                    },
                    {
                        line: [7],
                        explanation: '外层循环控制排序轮数，需要n-1轮',
                        code: 'for (int i = 0; i < n-1; i++)',
                        detail: '每一轮会将一个最大值放到正确位置，所以需要n-1轮'
                    },
                    {
                        line: [9],
                        explanation: '内层循环进行相邻元素比较',
                        code: 'for (int j = 0; j < n-i-1; j++)',
                        detail: 'n-i-1是因为：每轮结束后，末尾i个元素已排序，不需要再比较'
                    },
                    {
                        line: [11],
                        explanation: '比较相邻元素，如果顺序错误则交换',
                        code: 'if (arr[j] > arr[j+1])',
                        detail: '这是升序排序的条件，如果要降序，改为 arr[j] < arr[j+1]'
                    },
                    {
                        line: [13, 14, 15],
                        explanation: '使用临时变量完成两个元素的交换',
                        code: 'int temp = arr[j];\narr[j] = arr[j+1];\narr[j+1] = temp;',
                        detail: '经典的三步交换法：1.保存第一个值 2.第二个值覆盖第一个 3.临时值赋给第二个'
                    }
                ],
                trace: {
                    input: [64, 34, 25, 12, 22, 11, 90],
                    rounds: [
                        {
                            round: 1,
                            description: '第1轮：将最大元素90移到末尾',
                            comparisons: [
                                { compare: [64, 34], swap: true, result: [34, 64, 25, 12, 22, 11, 90] },
                                { compare: [64, 25], swap: true, result: [34, 25, 64, 12, 22, 11, 90] },
                                { compare: [64, 12], swap: true, result: [34, 25, 12, 64, 22, 11, 90] },
                                { compare: [64, 22], swap: true, result: [34, 25, 12, 22, 64, 11, 90] },
                                { compare: [64, 11], swap: true, result: [34, 25, 12, 22, 11, 64, 90] },
                                { compare: [64, 90], swap: false, result: [34, 25, 12, 22, 11, 64, 90] }
                            ]
                        },
                        {
                            round: 2,
                            description: '第2轮：将次大元素64移到倒数第二位',
                            comparisons: [
                                { compare: [34, 25], swap: true, result: [25, 34, 12, 22, 11, 64, 90] },
                                { compare: [34, 12], swap: true, result: [25, 12, 34, 22, 11, 64, 90] },
                                { compare: [34, 22], swap: true, result: [25, 12, 22, 34, 11, 64, 90] },
                                { compare: [34, 11], swap: true, result: [25, 12, 22, 11, 34, 64, 90] },
                                { compare: [34, 64], swap: false, result: [25, 12, 22, 11, 34, 64, 90] }
                            ]
                        }
                    ]
                },
                complexity: {
                    time: {
                        best: 'O(n) - 当数组已经有序时，可以优化到O(n)',
                        average: 'O(n²) - 平均需要n²/2次比较和n²/4次交换',
                        worst: 'O(n²) - 当数组完全逆序时'
                    },
                    space: 'O(1) - 只需要一个临时变量用于交换'
                },
                optimization: `// 优化版本：添加提前结束标志
void optimizedBubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        bool swapped = false;  // 标记是否发生交换
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
                swapped = true;  // 发生了交换
            }
        }
        // 如果这一轮没有交换，说明已经有序
        if (!swapped) break;
    }
}`
            },
            
            'selection_sort': {
                name: '选择排序',
                description: '每轮选择最小元素放到正确位置',
                code: `#include <iostream>
using namespace std;

// 选择排序函数
void selectionSort(int arr[], int n) {
    // 外层循环：确定每个位置的元素
    for (int i = 0; i < n-1; i++) {
        // 假设当前位置是最小值
        int minIndex = i;
        
        // 在剩余元素中寻找最小值
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;  // 更新最小值索引
            }
        }
        
        // 将找到的最小值交换到当前位置
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr)/sizeof(arr[0]);
    
    selectionSort(arr, n);
    
    cout << "排序后: ";
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
    
    return 0;
}`,
                steps: [
                    {
                        line: [7],
                        explanation: '外层循环遍历每个位置',
                        code: 'for (int i = 0; i < n-1; i++)',
                        detail: '从第0个位置到倒数第二个位置，为每个位置选择正确的元素'
                    },
                    {
                        line: [9],
                        explanation: '假设当前位置的元素是最小的',
                        code: 'int minIndex = i;',
                        detail: '记录最小元素的索引，初始化为当前位置'
                    },
                    {
                        line: [12, 13, 14, 15],
                        explanation: '在未排序部分寻找真正的最小值',
                        code: 'for (int j = i+1; j < n; j++)\n    if (arr[j] < arr[minIndex])\n        minIndex = j;',
                        detail: '从i+1开始遍历，如果找到更小的元素，更新minIndex'
                    },
                    {
                        line: [19, 20, 21, 22],
                        explanation: '将最小值交换到当前位置',
                        code: 'if (minIndex != i) {\n    swap(arr[i], arr[minIndex]);\n}',
                        detail: '只有当最小值不在当前位置时才需要交换'
                    }
                ],
                trace: {
                    input: [64, 25, 12, 22, 11],
                    rounds: [
                        {
                            round: 1,
                            description: '第1轮：为位置0选择最小元素',
                            search: [64, 25, 12, 22, 11],
                            minFound: 11,
                            swap: [0, 4],
                            result: [11, 25, 12, 22, 64]
                        },
                        {
                            round: 2,
                            description: '第2轮：为位置1选择最小元素',
                            search: [25, 12, 22, 64],
                            minFound: 12,
                            swap: [1, 2],
                            result: [11, 12, 25, 22, 64]
                        }
                    ]
                },
                complexity: {
                    time: {
                        best: 'O(n²) - 即使数组有序，仍需要完整比较',
                        average: 'O(n²) - 总是需要n(n-1)/2次比较',
                        worst: 'O(n²) - 时间复杂度固定'
                    },
                    space: 'O(1) - 只需要常数额外空间'
                }
            },

            'insertion_sort': {
                name: '插入排序',
                description: '将元素插入到已排序部分的正确位置',
                code: `#include <iostream>
using namespace std;

// 插入排序函数
void insertionSort(int arr[], int n) {
    // 从第二个元素开始（第一个元素默认有序）
    for (int i = 1; i < n; i++) {
        // 保存当前要插入的元素
        int key = arr[i];
        int j = i - 1;
        
        // 将大于key的元素向右移动
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        
        // 将key插入到正确位置
        arr[j + 1] = key;
    }
}

// 二分插入排序（优化版本）
void binaryInsertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int left = 0;
        int right = i - 1;
        
        // 使用二分查找找到插入位置
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] > key)
                right = mid - 1;
            else
                left = mid + 1;
        }
        
        // 移动元素并插入
        for (int j = i - 1; j >= left; j--)
            arr[j + 1] = arr[j];
        arr[left] = key;
    }
}`,
                steps: [
                    {
                        line: [7],
                        explanation: '从第二个元素开始遍历',
                        code: 'for (int i = 1; i < n; i++)',
                        detail: '第一个元素单独看作已排序部分，从第二个元素开始插入'
                    },
                    {
                        line: [9, 10],
                        explanation: '保存当前要插入的元素',
                        code: 'int key = arr[i];\nint j = i - 1;',
                        detail: 'key是要插入的元素，j指向已排序部分的最后一个元素'
                    },
                    {
                        line: [13, 14, 15, 16],
                        explanation: '寻找插入位置，同时移动元素',
                        code: 'while (j >= 0 && arr[j] > key) {\n    arr[j + 1] = arr[j];\n    j = j - 1;\n}',
                        detail: '从后向前扫描，将大于key的元素都向右移动一位'
                    },
                    {
                        line: [19],
                        explanation: '将key插入到找到的位置',
                        code: 'arr[j + 1] = key;',
                        detail: 'j+1就是key应该插入的位置'
                    }
                ],
                complexity: {
                    time: {
                        best: 'O(n) - 当数组已经有序时，每个元素只需比较一次',
                        average: 'O(n²) - 平均每个元素需要移动n/4个位置',
                        worst: 'O(n²) - 当数组完全逆序时'
                    },
                    space: 'O(1) - 原地排序'
                }
            },

            'binary_search': {
                name: '二分查找',
                description: '在有序数组中高效查找目标值',
                code: `#include <iostream>
using namespace std;

// 递归版本的二分查找
int binarySearchRecursive(int arr[], int left, int right, int target) {
    // 基础情况：范围无效
    if (left > right)
        return -1;
    
    // 计算中间位置（防止溢出）
    int mid = left + (right - left) / 2;
    
    // 找到目标值
    if (arr[mid] == target)
        return mid;
    
    // 目标在左半部分
    if (arr[mid] > target)
        return binarySearchRecursive(arr, left, mid - 1, target);
    
    // 目标在右半部分
    return binarySearchRecursive(arr, mid + 1, right, target);
}

// 迭代版本的二分查找
int binarySearchIterative(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    
    while (left <= right) {
        // 防止溢出的中间值计算
        int mid = left + (right - left) / 2;
        
        // 检查中间元素
        if (arr[mid] == target)
            return mid;
        
        // 如果目标小于中间值，搜索左半部分
        if (arr[mid] > target)
            right = mid - 1;
        else  // 否则搜索右半部分
            left = mid + 1;
    }
    
    // 未找到目标
    return -1;
}

// 查找第一个等于目标值的位置
int findFirst(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    int result = -1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            result = mid;  // 记录位置
            right = mid - 1;  // 继续在左边查找
        } else if (arr[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return result;
}`,
                steps: [
                    {
                        line: [11],
                        explanation: '计算中间位置，使用防溢出写法',
                        code: 'int mid = left + (right - left) / 2;',
                        detail: '不使用(left+right)/2是为了防止left+right超出int范围'
                    },
                    {
                        line: [14, 15],
                        explanation: '检查中间元素是否为目标值',
                        code: 'if (arr[mid] == target)\n    return mid;',
                        detail: '如果找到目标，直接返回索引'
                    },
                    {
                        line: [18, 19],
                        explanation: '目标在左半部分，更新右边界',
                        code: 'if (arr[mid] > target)\n    return binarySearchRecursive(arr, left, mid - 1, target);',
                        detail: '中间值大于目标，说明目标在左边，递归搜索[left, mid-1]'
                    },
                    {
                        line: [22],
                        explanation: '目标在右半部分，更新左边界',
                        code: 'return binarySearchRecursive(arr, mid + 1, right, target);',
                        detail: '中间值小于目标，说明目标在右边，递归搜索[mid+1, right]'
                    }
                ],
                trace: {
                    input: [11, 12, 22, 25, 34, 64, 90],
                    target: 25,
                    steps: [
                        {
                            step: 1,
                            left: 0,
                            right: 6,
                            mid: 3,
                            midValue: 25,
                            comparison: 'arr[3]=25 == target',
                            action: '找到目标，返回索引3'
                        }
                    ],
                    targetNotFound: 26,
                    stepsNotFound: [
                        {
                            step: 1,
                            left: 0,
                            right: 6,
                            mid: 3,
                            midValue: 25,
                            comparison: 'arr[3]=25 < 26',
                            action: '搜索右半部分'
                        },
                        {
                            step: 2,
                            left: 4,
                            right: 6,
                            mid: 5,
                            midValue: 64,
                            comparison: 'arr[5]=64 > 26',
                            action: '搜索左半部分'
                        },
                        {
                            step: 3,
                            left: 4,
                            right: 4,
                            mid: 4,
                            midValue: 34,
                            comparison: 'arr[4]=34 > 26',
                            action: '搜索左半部分'
                        },
                        {
                            step: 4,
                            left: 4,
                            right: 3,
                            comparison: 'left > right',
                            action: '范围无效，返回-1'
                        }
                    ]
                },
                complexity: {
                    time: {
                        best: 'O(1) - 第一次比较就找到',
                        average: 'O(log n) - 每次排除一半元素',
                        worst: 'O(log n) - 最多需要log₂n次比较'
                    },
                    space: {
                        iterative: 'O(1) - 只需要几个变量',
                        recursive: 'O(log n) - 递归调用栈深度'
                    }
                }
            },

            'quick_sort': {
                name: '快速排序',
                description: '使用分治策略的高效排序算法',
                code: `#include <iostream>
using namespace std;

// 分区函数：将数组分为小于基准和大于基准两部分
int partition(int arr[], int low, int high) {
    // 选择最右边的元素作为基准
    int pivot = arr[high];
    
    // i指向小于基准的最后一个元素
    int i = low - 1;
    
    // 遍历数组，将小于基准的元素移到左边
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;  // 扩展小于基准的区域
            swap(arr[i], arr[j]);
        }
    }
    
    // 将基准放到正确的位置
    swap(arr[i + 1], arr[high]);
    return i + 1;  // 返回基准的位置
}

// 快速排序主函数
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        // 获取分区位置
        int pi = partition(arr, low, high);
        
        // 递归排序左右两部分
        quickSort(arr, low, pi - 1);  // 排序左边
        quickSort(arr, pi + 1, high);  // 排序右边
    }
}

// 三路快排（处理重复元素）
void quickSort3Way(int arr[], int low, int high) {
    if (low >= high) return;
    
    int lt = low;      // arr[low..lt-1] < pivot
    int gt = high;     // arr[gt+1..high] > pivot
    int i = low + 1;   // arr[lt..i-1] == pivot
    int pivot = arr[low];
    
    while (i <= gt) {
        if (arr[i] < pivot) {
            swap(arr[lt++], arr[i++]);
        } else if (arr[i] > pivot) {
            swap(arr[i], arr[gt--]);
        } else {
            i++;
        }
    }
    
    quickSort3Way(arr, low, lt - 1);
    quickSort3Way(arr, gt + 1, high);
}`,
                steps: [
                    {
                        line: [7],
                        explanation: '选择基准元素（pivot）',
                        code: 'int pivot = arr[high];',
                        detail: '这里选择最后一个元素作为基准，也可以选择其他策略'
                    },
                    {
                        line: [10],
                        explanation: '初始化分区指针',
                        code: 'int i = low - 1;',
                        detail: 'i指向小于基准部分的最后一个元素，初始为low-1'
                    },
                    {
                        line: [13, 14, 15, 16, 17],
                        explanation: '分区过程：将小于基准的元素移到左边',
                        code: 'for (int j = low; j < high; j++) {\n    if (arr[j] < pivot) {\n        i++;\n        swap(arr[i], arr[j]);\n    }\n}',
                        detail: '遍历数组，遇到小于基准的元素就交换到左边区域'
                    },
                    {
                        line: [21],
                        explanation: '将基准放到最终位置',
                        code: 'swap(arr[i + 1], arr[high]);',
                        detail: 'i+1的位置就是基准应该在的位置，左边都小于它，右边都大于它'
                    }
                ],
                complexity: {
                    time: {
                        best: 'O(n log n) - 每次分区均匀',
                        average: 'O(n log n) - 平均情况下分区较均匀',
                        worst: 'O(n²) - 每次选到最大或最小元素作为基准'
                    },
                    space: 'O(log n) - 递归调用栈的深度'
                },
                optimization: '1. 随机选择基准\n2. 三数取中法选择基准\n3. 小数组使用插入排序\n4. 三路快排处理重复元素'
            }
        };
    }

    /**
     * 初始化交互式练习题
     */
    initExercises() {
        return {
            'bubble_sort_exercise': {
                title: '冒泡排序练习',
                description: '完成冒泡排序的关键代码',
                template: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < ____; j++) {  // 填空1：内层循环条件
            if (arr[j] ____ arr[j+1]) {   // 填空2：比较条件
                // 填空3：完成交换操作
                ____________________;
                ____________________;
                ____________________;
            }
        }
    }
}`,
                blanks: [
                    {
                        id: 'blank1',
                        answer: 'n-i-1',
                        hint: '考虑已排序的元素个数',
                        explanation: '每轮排序后，末尾i个元素已经有序'
                    },
                    {
                        id: 'blank2',
                        answer: '>',
                        hint: '升序排序时的比较条件',
                        explanation: '前面元素大于后面元素时需要交换'
                    },
                    {
                        id: 'blank3',
                        answer: ['int temp = arr[j]', 'arr[j] = arr[j+1]', 'arr[j+1] = temp'],
                        hint: '使用临时变量交换两个元素',
                        explanation: '经典的三步交换法'
                    }
                ],
                testCases: [
                    {
                        input: [3, 1, 2],
                        expected: [1, 2, 3]
                    },
                    {
                        input: [5, 2, 8, 1],
                        expected: [1, 2, 5, 8]
                    }
                ]
            },

            'binary_search_exercise': {
                title: '二分查找练习',
                description: '实现二分查找算法',
                template: `int binarySearch(int arr[], int n, int target) {
    int left = 0;
    int right = ______;  // 填空1：右边界初始值
    
    while (_____) {      // 填空2：循环条件
        int mid = _________________;  // 填空3：计算中间位置
        
        if (arr[mid] == target)
            return mid;
        
        if (arr[mid] > target)
            _____________;  // 填空4：更新右边界
        else
            _____________;  // 填空5：更新左边界
    }
    
    return -1;
}`,
                blanks: [
                    {
                        id: 'blank1',
                        answer: 'n - 1',
                        hint: '数组的最后一个有效索引'
                    },
                    {
                        id: 'blank2',
                        answer: 'left <= right',
                        hint: '当搜索范围有效时继续'
                    },
                    {
                        id: 'blank3',
                        answer: 'left + (right - left) / 2',
                        hint: '防止溢出的中间值计算'
                    },
                    {
                        id: 'blank4',
                        answer: 'right = mid - 1',
                        hint: '目标在左半部分'
                    },
                    {
                        id: 'blank5',
                        answer: 'left = mid + 1',
                        hint: '目标在右半部分'
                    }
                ],
                testCases: [
                    {
                        input: { arr: [1, 3, 5, 7, 9], target: 5 },
                        expected: 2
                    },
                    {
                        input: { arr: [1, 3, 5, 7, 9], target: 6 },
                        expected: -1
                    }
                ]
            },

            'complexity_exercise': {
                title: '复杂度分析练习',
                type: 'quiz',
                questions: [
                    {
                        question: '以下哪个排序算法的最坏时间复杂度是O(n log n)?',
                        options: ['冒泡排序', '选择排序', '归并排序', '插入排序'],
                        answer: 2,
                        explanation: '归并排序在所有情况下都是O(n log n)，其他三个最坏都是O(n²)'
                    },
                    {
                        question: '对于几乎有序的数组，哪个排序算法效率最高？',
                        options: ['快速排序', '选择排序', '插入排序', '堆排序'],
                        answer: 2,
                        explanation: '插入排序对几乎有序的数组只需要O(n)时间'
                    },
                    {
                        question: '二分查找的前提条件是什么？',
                        options: ['数组必须有序', '数组元素不重复', '数组长度是2的幂', '数组元素都是正数'],
                        answer: 0,
                        explanation: '二分查找要求数组必须是有序的'
                    }
                ]
            },

            'code_trace_exercise': {
                title: '代码追踪练习',
                description: '追踪以下代码的执行过程',
                code: `void mystery(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int minIdx = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[minIdx])
                minIdx = j;
        }
        swap(arr[i], arr[minIdx]);
    }
}`,
                question: '给定数组 [3, 1, 4, 2]，执行mystery函数后的结果是？',
                trace: [
                    {
                        step: 'i=0, minIdx=1 (找到1), 交换arr[0]和arr[1]',
                        array: [1, 3, 4, 2]
                    },
                    {
                        step: 'i=1, minIdx=3 (找到2), 交换arr[1]和arr[3]',
                        array: [1, 2, 4, 3]
                    },
                    {
                        step: 'i=2, minIdx=3 (找到3), 交换arr[2]和arr[3]',
                        array: [1, 2, 3, 4]
                    }
                ],
                answer: [1, 2, 3, 4],
                hint: '这是哪种排序算法？'
            }
        };
    }

    /**
     * 生成带行号和高亮的代码
     */
    generateCodeWithLineNumbers(code, highlightLines = []) {
        const lines = code.split('\n');
        let html = '<div class="code-with-lines">';
        
        lines.forEach((line, index) => {
            const lineNum = index + 1;
            const isHighlighted = highlightLines.includes(lineNum);
            const highlightClass = isHighlighted ? 'highlighted-line' : '';
            
            html += `
                <div class="code-line ${highlightClass}" data-line="${lineNum}">
                    <span class="line-number">${lineNum}</span>
                    <span class="code-content">${this.escapeHtml(line)}</span>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }

    /**
     * 生成步骤解释面板
     */
    generateStepExplanation(step) {
        return `
            <div class="step-explanation">
                <div class="step-header">
                    <span class="step-line">行 ${Array.isArray(step.line) ? step.line.join('-') : step.line}</span>
                    <span class="step-title">${step.explanation}</span>
                </div>
                <div class="step-code">
                    <pre><code>${step.code}</code></pre>
                </div>
                <div class="step-detail">
                    <p>${step.detail}</p>
                </div>
            </div>
        `;
    }

    /**
     * 生成执行追踪动画
     */
    generateTraceAnimation(trace) {
        let html = '<div class="trace-animation">';
        
        if (trace.rounds) {
            // 排序算法的轮次追踪
            trace.rounds.forEach(round => {
                html += `
                    <div class="trace-round">
                        <h4>${round.description}</h4>
                        <div class="trace-comparisons">
                `;
                
                round.comparisons.forEach(comp => {
                    html += `
                        <div class="comparison-step">
                            <span>比较: ${comp.compare.join(' 和 ')}</span>
                            <span>${comp.swap ? '交换' : '不交换'}</span>
                            <span>结果: [${comp.result.join(', ')}]</span>
                        </div>
                    `;
                });
                
                html += '</div></div>';
            });
        } else if (trace.steps) {
            // 搜索算法的步骤追踪
            trace.steps.forEach(step => {
                html += `
                    <div class="search-step">
                        <h5>步骤 ${step.step}</h5>
                        <p>left=${step.left}, right=${step.right}, mid=${step.mid}</p>
                        <p>${step.comparison}</p>
                        <p>动作: ${step.action}</p>
                    </div>
                `;
            });
        }
        
        html += '</div>';
        return html;
    }

    /**
     * 生成交互式练习
     */
    generateExercise(exerciseId) {
        const exercise = this.exercises[exerciseId];
        if (!exercise) return '';
        
        let html = `
            <div class="exercise-container">
                <h3>${exercise.title}</h3>
                <p>${exercise.description}</p>
        `;
        
        if (exercise.type === 'quiz') {
            // 选择题练习
            html += '<div class="quiz-questions">';
            exercise.questions.forEach((q, index) => {
                html += `
                    <div class="quiz-question" data-question="${index}">
                        <p class="question-text">${index + 1}. ${q.question}</p>
                        <div class="options">
                `;
                q.options.forEach((opt, optIndex) => {
                    html += `
                        <label class="option">
                            <input type="radio" name="q${index}" value="${optIndex}">
                            <span>${opt}</span>
                        </label>
                    `;
                });
                html += `
                        </div>
                        <div class="explanation hidden">${q.explanation}</div>
                    </div>
                `;
            });
            html += '</div>';
            html += '<button onclick="checkQuizAnswers()">检查答案</button>';
        } else if (exercise.template) {
            // 代码填空练习
            html += `
                <div class="code-template">
                    <pre><code>${exercise.template}</code></pre>
                </div>
                <div class="blanks-input">
            `;
            
            exercise.blanks.forEach(blank => {
                html += `
                    <div class="blank-input">
                        <label>${blank.id}: ${blank.hint}</label>
                        <input type="text" id="${blank.id}" placeholder="输入答案">
                        <button onclick="showHint('${blank.id}')">提示</button>
                    </div>
                `;
            });
            
            html += `
                </div>
                <button onclick="checkCodeAnswers('${exerciseId}')">检查代码</button>
                <button onclick="runTestCases('${exerciseId}')">运行测试</button>
            `;
        } else if (exercise.code) {
            // 代码追踪练习
            html += `
                <div class="trace-exercise">
                    <pre><code>${exercise.code}</code></pre>
                    <p class="trace-question">${exercise.question}</p>
                    <input type="text" id="trace-answer" placeholder="输入结果，如: 1,2,3,4">
                    <button onclick="checkTraceAnswer('${exerciseId}')">检查答案</button>
                    <button onclick="showTraceSteps('${exerciseId}')">显示执行过程</button>
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    }

    /**
     * 检查填空答案
     */
    checkCodeAnswers(exerciseId) {
        const exercise = this.exercises[exerciseId];
        let allCorrect = true;
        
        exercise.blanks.forEach(blank => {
            const input = document.getElementById(blank.id);
            const userAnswer = input.value.trim();
            const correctAnswer = Array.isArray(blank.answer) 
                ? blank.answer.join('; ') 
                : blank.answer;
            
            if (userAnswer === correctAnswer) {
                input.style.backgroundColor = '#d4edda';
            } else {
                input.style.backgroundColor = '#f8d7da';
                allCorrect = false;
            }
        });
        
        if (allCorrect) {
            alert('恭喜！所有答案正确！');
        } else {
            alert('有些答案不正确，请再试试！');
        }
    }

    /**
     * 运行测试用例
     */
    runTestCases(exerciseId) {
        const exercise = this.exercises[exerciseId];
        console.log('运行测试用例...');
        
        exercise.testCases.forEach((testCase, index) => {
            console.log(`测试用例 ${index + 1}:`);
            console.log(`输入: ${JSON.stringify(testCase.input)}`);
            console.log(`期望输出: ${JSON.stringify(testCase.expected)}`);
        });
    }

    /**
     * 转义HTML特殊字符
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// 导出给全局使用
window.AlgorithmCodeLearning = AlgorithmCodeLearning;
