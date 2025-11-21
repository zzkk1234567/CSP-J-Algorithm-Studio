// 完整的代码模板库
const codeTemplates = {
    hello: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, CSP-J!" << endl;
    return 0;
}`,

    input: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cout << "请输入两个数：";
    cin >> a >> b;
    cout << "你输入的数是：" << a << " 和 " << b << endl;
    return 0;
}`,

    array: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {64, 34, 25, 12, 22};
    int n = 5;
    
    cout << "原始数组：";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    // 找最大值
    int max_val = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max_val) {
            max_val = arr[i];
        }
    }
    cout << "最大值：" << max_val << endl;
    
    return 0;
}`,

    function: `#include <iostream>
using namespace std;

// 函数声明
int add(int a, int b);
int multiply(int a, int b);
int factorial(int n);

int main() {
    int x = 10, y = 20;
    
    cout << x << " + " << y << " = " << add(x, y) << endl;
    cout << x << " * " << y << " = " << multiply(x, y) << endl;
    cout << "5! = " << factorial(5) << endl;
    
    return 0;
}

// 加法函数
int add(int a, int b) {
    return a + b;
}

// 乘法函数  
int multiply(int a, int b) {
    return a * b;
}

// 阶乘函数（递归）
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,

    recursion: `#include <iostream>
using namespace std;

// 递归计算斐波那契数列
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 递归计算最大公约数
int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

// 汉诺塔问题
void hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        cout << "Move disk 1 from " << from << " to " << to << endl;
        return;
    }
    hanoi(n-1, from, aux, to);
    cout << "Move disk " << n << " from " << from << " to " << to << endl;
    hanoi(n-1, aux, to, from);
}

int main() {
    cout << "斐波那契数列前10项：";
    for (int i = 0; i < 10; i++) {
        cout << fibonacci(i) << " ";
    }
    cout << endl;
    
    cout << "gcd(48, 18) = " << gcd(48, 18) << endl;
    
    cout << "汉诺塔移动步骤（3层）：" << endl;
    hanoi(3, 'A', 'C', 'B');
    
    return 0;
}`,

    file_io: `#include <iostream>
#include <fstream>
#include <cstdio>
using namespace std;

int main() {
    // 方法1：使用freopen重定向（推荐）
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);
    
    int n, sum = 0;
    cin >> n;
    
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    
    cout << "1到" << n << "的和为：" << sum << endl;
    
    /* 方法2：使用文件流
    ifstream fin("input.txt");
    ofstream fout("output.txt");
    
    int n, sum = 0;
    fin >> n;
    
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    
    fout << "1到" << n << "的和为：" << sum << endl;
    
    fin.close();
    fout.close();
    */
    
    return 0;
}`,

    binary_search: `#include <iostream>
#include <algorithm>
using namespace std;

// 二分查找函数
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;  // 找到目标，返回索引
        }
        else if (arr[mid] < target) {
            left = mid + 1;  // 在右半部分搜索
        }
        else {
            right = mid - 1;  // 在左半部分搜索
        }
    }
    
    return -1;  // 未找到
}

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    int n = 10;
    int target = 7;
    
    cout << "数组：";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    int result = binarySearch(arr, n, target);
    
    if (result != -1) {
        cout << "找到 " << target << "，位置：" << result << endl;
    } else {
        cout << "未找到 " << target << endl;
    }
    
    // 使用STL的二分查找
    bool found = binary_search(arr, arr + n, target);
    cout << "使用STL结果：" << (found ? "找到" : "未找到") << endl;
    
    return 0;
}`,

    bubble_sort: `#include <iostream>
using namespace std;

// 冒泡排序函数
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;  // 优化：检测是否有交换
        
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换元素
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        
        // 如果没有交换，说明已经有序
        if (!swapped) break;
    }
}

// 选择排序函数
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        
        // 找到最小元素的索引
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        
        // 交换最小元素到正确位置
        if (min_idx != i) {
            int temp = arr[i];
            arr[i] = arr[min_idx];
            arr[min_idx] = temp;
        }
    }
}

// 打印数组函数
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr1[] = {64, 34, 25, 12, 22, 11, 90};
    int arr2[] = {64, 34, 25, 12, 22, 11, 90};
    int n = 7;
    
    cout << "原始数组：";
    printArray(arr1, n);
    
    // 冒泡排序
    bubbleSort(arr1, n);
    cout << "冒泡排序后：";
    printArray(arr1, n);
    
    // 选择排序
    cout << "原始数组：";
    printArray(arr2, n);
    selectionSort(arr2, n);
    cout << "选择排序后：";
    printArray(arr2, n);
    
    return 0;
}`,

    data_types: `#include <iostream>
#include <climits>
#include <cfloat>
using namespace std;

int main() {
    // 整数类型
    cout << "=== 整数类型 ===" << endl;
    int a = 100;
    long long b = 1000000000000LL;
    short c = 32000;
    
    cout << "int: " << a << ", 范围: " << INT_MIN << " 到 " << INT_MAX << endl;
    cout << "long long: " << b << endl;
    cout << "short: " << c << endl;
    cout << "sizeof(int): " << sizeof(int) << " bytes" << endl;
    cout << "sizeof(long long): " << sizeof(long long) << " bytes" << endl;
    
    // 浮点类型
    cout << "\n=== 浮点类型 ===" << endl;
    float pi_f = 3.14159f;
    double pi_d = 3.141592653589793;
    
    cout << "float: " << pi_f << ", 精度: " << FLT_DIG << " 位" << endl;
    cout << "double: " << pi_d << ", 精度: " << DBL_DIG << " 位" << endl;
    
    // 字符类型
    cout << "\n=== 字符类型 ===" << endl;
    char grade = 'A';
    cout << "字符: " << grade << ", ASCII码: " << (int)grade << endl;
    
    // 布尔类型
    cout << "\n=== 布尔类型 ===" << endl;
    bool flag1 = true;
    bool flag2 = false;
    cout << "bool true: " << flag1 << endl;
    cout << "bool false: " << flag2 << endl;
    
    // 常量
    cout << "\n=== 常量 ===" << endl;
    const int MAX_SIZE = 1000;
    cout << "常量 MAX_SIZE: " << MAX_SIZE << endl;
    
    return 0;
}`,

    control_structures: `#include <iostream>
using namespace std;

int main() {
    int choice;
    cout << "请选择演示类型（1-4）：";
    cin >> choice;
    
    // if-else 条件语句演示
    if (choice == 1) {
        cout << "=== 条件语句演示 ===" << endl;
        int score;
        cout << "请输入成绩：";
        cin >> score;
        
        if (score >= 90) {
            cout << "优秀！" << endl;
        } else if (score >= 80) {
            cout << "良好！" << endl;
        } else if (score >= 60) {
            cout << "及格！" << endl;
        } else {
            cout << "不及格！" << endl;
        }
    }
    
    // for 循环演示
    else if (choice == 2) {
        cout << "=== for循环演示 ===" << endl;
        cout << "九九乘法表：" << endl;
        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j <= i; j++) {
                cout << j << "*" << i << "=" << i*j << "\\t";
            }
            cout << endl;
        }
    }
    
    // while 循环演示
    else if (choice == 3) {
        cout << "=== while循环演示 ===" << endl;
        int n;
        cout << "请输入一个正整数：";
        cin >> n;
        
        int sum = 0, i = 1;
        while (i <= n) {
            sum += i;
            i++;
        }
        cout << "1到" << n << "的和为：" << sum << endl;
        
        // do-while演示
        cout << "do-while演示（至少执行一次）：" << endl;
        int num;
        do {
            cout << "请输入一个数（输入0退出）：";
            cin >> num;
            cout << "你输入的是：" << num << endl;
        } while (num != 0);
    }
    
    // switch 语句演示
    else if (choice == 4) {
        cout << "=== switch语句演示 ===" << endl;
        char op;
        double a, b;
        cout << "请输入两个数和运算符（如：5 3 +）：";
        cin >> a >> b >> op;
        
        switch (op) {
            case '+':
                cout << a << " + " << b << " = " << (a + b) << endl;
                break;
            case '-':
                cout << a << " - " << b << " = " << (a - b) << endl;
                break;
            case '*':
                cout << a << " * " << b << " = " << (a * b) << endl;
                break;
            case '/':
                if (b != 0) {
                    cout << a << " / " << b << " = " << (a / b) << endl;
                } else {
                    cout << "错误：除数不能为0！" << endl;
                }
                break;
            default:
                cout << "未知运算符！" << endl;
        }
    }
    
    else {
        cout << "无效选择！" << endl;
    }
    
    return 0;
}`
};

// 历年真题数据库
const examQuestions = [
    {
        id: 1,
        year: 2023,
        type: "SCP-J1",
        question: "今年是CCF（中国计算机学会）第（）次举办CSP-J/S认证？",
        options: ["A. 27", "B. 28", "C. 5", "D. 4"],
        answer: 2,
        explanation: "2023年CCF是第5次举办CSP-J/S认证。",
        topic: "竞赛简介"
    },
    {
        id: 2,
        year: 2021,
        type: "LGR-SCP",
        question: "1946年，（）提出了存储程序原理，奠定了现代电子计算机基本结构？",
        options: ["A. 艾伦·麦席森·图灵", "B. 约翰·冯·诺依曼", "C. 克劳德·艾尔伍德·香农", "D. 罗伯特·塔扬"],
        answer: 1,
        explanation: "1946年，约翰·冯·诺依曼提出了存储程序原理。",
        topic: "计算机历史"
    },
    {
        id: 3,
        year: 2021,
        type: "LGR-SCP",
        question: "以补码存储的8位有符号整数10110111的十进制表示为（）",
        options: ["A. -73", "B. 183", "C. 72", "D. -72"],
        answer: 0,
        explanation: "最高位为1表示负数，补码10110111减1得10110110，按位取反得01001001=73，所以原数为-73。",
        topic: "数据表示"
    },
    {
        id: 4,
        year: 2021,
        type: "CSP-J1",
        question: "二进制数101.11对应的十进制数是（）",
        options: ["A. 6.5", "B. 5.5", "C. 5.75", "D. 5.25"],
        answer: 2,
        explanation: "101₂ = 1×2² + 0×2¹ + 1×2⁰ = 5，.11₂ = 1×2⁻¹ + 1×2⁻² = 0.75，所以101.11₂ = 5.75₁₀。",
        topic: "进制转换"
    },
    {
        id: 5,
        year: 2023,
        type: "SCP-J1",
        question: "数101010₂和166₈的和为（）",
        options: ["A. 10110000₂", "B. 236₈", "C. 158₁₀", "D. A0₁₆"],
        answer: 0,
        explanation: "101010₂ = 42₁₀，166₈ = 118₁₀，42+118=160₁₀ = 10100000₂",
        topic: "进制运算"
    },
    {
        id: 6,
        year: 2023,
        type: "SCP-J1",
        question: "已知a=1010001010₂，b=1110100110₂，则(a&b)^(a|b)的值为（）",
        options: ["A. 0011011010₂", "B. 0100101100₂", "C. 0011010010₂", "D. 0100101000₂"],
        answer: 1,
        explanation: "按位计算：a&b=1010000010，a|b=1110101110，异或得0100101100。",
        topic: "逻辑运算"
    },
    {
        id: 7,
        year: 2019,
        type: "CCF-CSP-J1",
        question: "链表不具有的特点是（）",
        options: ["A. 插入删除不需要移动元素", "B. 不必事先存储连续空间", "C. 所需空间与线性表长度成正比", "D. 可随机访问任一元素"],
        answer: 3,
        explanation: "链表无法随机访问，必须从头开始遍历。随机访问是数组的特点。",
        topic: "数据结构"
    },
    {
        id: 8,
        year: 2021,
        type: "CSP-J1",
        question: "入栈顺序为a,b,c,d,e，下列哪个不是合法的出栈序列？",
        options: ["A. a,b,c,d,e", "B. e,d,c,b,a", "C. b,a,c,d,e", "D. c,d,a,e,b"],
        answer: 3,
        explanation: "序列c,d,a,e,b违反了LIFO原则，当a要出栈时，b应该先出栈。",
        topic: "栈操作"
    },
    {
        id: 9,
        year: 2022,
        type: "CSP-J1",
        question: "链表和数组的区别包括（）",
        options: ["A. 数组不能排序，链表可以", "B. 链表比数组能存储更多的信息", "C. 数组大小固定，链表大小可动态调整", "D. 以上均正确"],
        answer: 2,
        explanation: "数组大小固定，链表大小可动态调整是两者的主要区别。",
        topic: "数据结构对比"
    },
    {
        id: 10,
        year: 2021,
        type: "CSP-J1",
        question: "以下奖项与计算机领域最相关的是（）",
        options: ["A. 奥斯卡奖", "B. 图灵奖", "C. 诺贝尔奖", "D. 普利策奖"],
        answer: 1,
        explanation: "图灵奖是计算机领域最相关的奖项之一。",
        topic: "计算机常识"
    },
    {
        id: 11,
        year: 2021,
        type: "CSP-J1",
        question: "目前主流的计算机储存数据最终都是转换成（）数据进行储存",
        options: ["A. 二进制", "B. 十进制", "C. 八进制", "D. 十六进制"],
        answer: 0,
        explanation: "主流计算机存储数据最终都转换为二进制数据。",
        topic: "数据存储"
    },
    {
        id: 12,
        year: 2022,
        type: "CSP-J1",
        question: "以下哪个是C++程序的正确入口函数？",
        options: ["A. void main()", "B. int main()", "C. main()", "D. start()"],
        answer: 1,
        explanation: "C++程序的标准入口函数是int main()。",
        topic: "C++基础"
    },
    {
        id: 13,
        year: 2022,
        type: "CSP-J1",
        question: "在C++中，以下哪个关键字用于定义常量？",
        options: ["A. var", "B. const", "C. final", "D. static"],
        answer: 1,
        explanation: "在C++中，const关键字用于定义常量。",
        topic: "C++语法"
    },
    {
        id: 14,
        year: 2022,
        type: "CSP-J1",
        question: "以下哪个循环语句会至少执行一次？",
        options: ["A. for", "B. while", "C. do-while", "D. 以上都不是"],
        answer: 2,
        explanation: "do-while循环会先执行循环体，再检查条件，所以至少执行一次。",
        topic: "控制结构"
    },
    {
        id: 15,
        year: 2022,
        type: "CSP-J1",
        question: "二分查找算法的时间复杂度是？",
        options: ["A. O(1)", "B. O(log n)", "C. O(n)", "D. O(n²)"],
        answer: 1,
        explanation: "二分查找每次都能将查找范围减半，所以时间复杂度为O(log n)。",
        topic: "算法复杂度"
    }
];