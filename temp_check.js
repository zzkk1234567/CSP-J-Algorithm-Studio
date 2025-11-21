
        // 全局状态管理
        let gameState = {
            currentTab: 'knowledge',
            progress: {
                masteredTopics: new Set(),
                completedPractices: 0,
                correctAnswers: 0,
                totalAnswers: 0,
                studyStartTime: Date.now(),
                totalStudyTime: 0
            },
            achievements: [],
            currentTest: null,
            codeEditor: null
        };

        // 知识点数据
        const knowledgeData = {
            'basics': {
                title: '🏁 入门基础',
                content: `
                    <h3>计算机基础知识</h3>
                    <p>了解计算机的基本组成和工作原理是学习编程的第一步。</p>
                    
                    <h4>🎯 重要知识点：</h4>
                    <ul class="list-disc pl-6 space-y-2">
                        <li><strong>CCF 简介</strong>：中国计算机学会成立于1962年</li>
                        <li><strong>CSP-J/S</strong>：非专业级软件能力认证</li>
                        <li><strong>考试规则</strong>：禁止携带电子设备，允许指定资料</li>
                        <li><strong>历史人物</strong>：冯·诺依曼提出存储程序原理(1946)</li>
                        <li><strong>图灵奖</strong>：计算机领域最高奖项</li>
                    </ul>

                    <h4>💡 经典例题：</h4>
                    <div class="bg-gray-100 p-4 rounded-md mt-4">
                        <p><strong>题目：</strong>今年是CCF第（）次举办CSP-J/S认证？</p>
                        <p><strong>A.</strong> 27 <strong>B.</strong> 28 <strong>C.</strong> 5 <strong>D.</strong> 4</p>
                        <p class="mt-2 text-green-600"><strong>答案：C</strong></p>
                        <p class="text-sm text-gray-600">解析：2023年是CCF第5次举办CSP-J/S认证。</p>
                    </div>
                `
            },
            'logic-operations': {
                title: '🔀 逻辑运算',
                content: `
                    <h3>逻辑运算基础</h3>
                    <p>逻辑运算是计算机处理布尔值的重要工具，掌握运算规则和优先级很关键。</p>
                    
                    <h4>🎯 基本运算：</h4>
                    <ul class="list-disc pl-6 space-y-2">
                        <li><strong>与运算 (&)</strong>：只有都为真时结果才为真</li>
                        <li><strong>或运算 (|)</strong>：有一个为真结果就为真</li>
                        <li><strong>异或运算 (^)</strong>：两个不同时结果为真</li>
                        <li><strong>优先级</strong>：括号 > & > | ，同级从左到右</li>
                    </ul>

                    <h4>💻 运算表：</h4>
                    <pre><code class="language-cpp">// 与运算 &
0 & 0 = 0    0 & 1 = 0
1 & 0 = 0    1 & 1 = 1

// 或运算 |
0 | 0 = 0    0 | 1 = 1
1 | 0 = 1    1 | 1 = 1

// 异或运算 ^
0 ^ 0 = 0    0 ^ 1 = 1
1 ^ 0 = 1    1 ^ 1 = 0</code></pre>

                    <h4>⚡ 短路策略：</h4>
                    <div class="bg-blue-50 p-4 rounded-md mt-4 border-l-4 border-blue-400">
                        <p><strong>与运算短路：</strong>如果a为0，则a&b不需要计算b</p>
                        <p><strong>或运算短路：</strong>如果a为1，则a|b不需要计算b</p>
                    </div>

                    <h4>💡 练习题：</h4>
                    <div class="bg-gray-100 p-4 rounded-md mt-4">
                        <p><strong>题目：</strong>计算 0&(1|0)|(1|1|1&0) 的值</p>
                        <p><strong>解析：</strong></p>
                        <p>1. 0&(1|0) → 0（&运算短路1次）</p>
                        <p>2. (1|1) → 1（|运算短路1次）</p>
                        <p>3. 1|(1&0) → 1（|运算短路1次）</p>
                        <p>4. 最终：0|1 = 1</p>
                        <p class="mt-2 text-green-600"><strong>答案：1，短路次数：&运算1次，|运算2次</strong></p>
                    </div>
                `
            },
            'data-structures': {
                title: '📊 数据结构基础',
                content: `
                    <h3>基本数据结构</h3>
                    <p>数据结构是组织和存储数据的方式，直接影响算法效率。</p>
                    
                    <h4>🎯 数组特点：</h4>
                    <ul class="list-disc pl-6 space-y-2">
                        <li><strong>大小固定</strong>：创建后大小不能改变</li>
                        <li><strong>连续存储</strong>：元素在内存中连续排列</li>
                        <li><strong>随机访问</strong>：可通过下标O(1)时间访问</li>
                        <li><strong>插入删除</strong>：需要移动元素，效率较低</li>
                    </ul>

                    <h4>🔗 链表特点：</h4>
                    <ul class="list-disc pl-6 space-y-2">
                        <li><strong>动态大小</strong>：可以动态增删节点</li>
                        <li><strong>不连续存储</strong>：通过指针连接</li>
                        <li><strong>顺序访问</strong>：必须从头开始遍历</li>
                        <li><strong>插入删除</strong>：只需修改指针，效率高</li>
                    </ul>

                    <h4>📚 栈 (Stack)：</h4>
                    <div class="bg-yellow-50 p-4 rounded-md mt-4 border-l-4 border-yellow-400">
                        <p><strong>LIFO原则：</strong>后进先出 (Last In First Out)</p>
                        <p><strong>基本操作：</strong>push(压栈)、pop(弹栈)</p>
                        <p><strong>应用：</strong>函数调用、DFS深度优先搜索</p>
                    </div>

                    <h4>🎰 队列 (Queue)：</h4>
                    <div class="bg-green-50 p-4 rounded-md mt-4 border-l-4 border-green-400">
                        <p><strong>FIFO原则：</strong>先进先出 (First In First Out)</p>
                        <p><strong>基本操作：</strong>enqueue(入队)、dequeue(出队)</p>
                        <p><strong>应用：</strong>BFS广度优先搜索、任务调度</p>
                    </div>

                    <h4>💡 经典例题：</h4>
                    <div class="bg-gray-100 p-4 rounded-md mt-4">
                        <p><strong>题目：</strong>链表不具有的特点是？</p>
                        <p><strong>A.</strong> 插入删除不需要移动元素</p>
                        <p><strong>B.</strong> 不必事先存储连续空间</p>
                        <p><strong>C.</strong> 所需空间与长度成正比</p>
                        <p><strong>D.</strong> 可随机访问任一元素</p>
                        <p class="mt-2 text-green-600"><strong>答案：D</strong></p>
                        <p class="text-sm text-gray-600">解析：链表无法随机访问，必须顺序遍历。</p>
                    </div>
                `
            },
            'number-systems': {
                title: '🔢 进制与数据表示',
                content: `
                    <h3>数制转换与数据表示</h3>
                    <p>计算机使用二进制存储和处理所有数据，掌握进制转换是基础技能。</p>
                    
                    <h4>🎯 重要概念：</h4>
                    <ul class="list-disc pl-6 space-y-2">
                        <li><strong>二进制</strong>：以0b开头，如0b1010</li>
                        <li><strong>八进制</strong>：以0开头，如0123</li>
                        <li><strong>十六进制</strong>：以0x开头，如0xFF</li>
                        <li><strong>补码</strong>：表示有符号整数的方法</li>
                    </ul>

                    <h4>💻 代码示例：</h4>
                    <pre><code class="language-cpp">#include &lt;iostream&gt;
using namespace std;

int main() {
    int binary = 0b1010;      // 二进制
    int octal = 012;          // 八进制
    int hex = 0xA;            // 十六进制
    
    cout << "二进制1010 = " << binary << endl;
    cout << "八进制12 = " << octal << endl;
    cout << "十六进制A = " << hex << endl;
    
    return 0;
}</code></pre>

                    <h4>💡 练习题：</h4>
                    <div class="bg-gray-100 p-4 rounded-md mt-4">
                        <p><strong>题目：</strong>二进制数101.11对应的十进制数是？</p>
                        <p><strong>解析：</strong></p>
                        <p>整数部分：101₂ = 1×2² + 0×2¹ + 1×2⁰ = 4 + 0 + 1 = 5</p>
                        <p>小数部分：0.11₂ = 1×2⁻¹ + 1×2⁻² = 0.5 + 0.25 = 0.75</p>
                        <p class="text-green-600"><strong>答案：5.75</strong></p>
                    </div>
                `
            },
            'cpp-basics': {
                title: '⚡ C++ 语言基础',
                content: `
                    <h3>C++ 程序设计基础</h3>
                    <p>C++是CSP-J竞赛的主要编程语言，掌握基本语法是关键。</p>
                    
                    <h4>🎯 基础语法：</h4>
                    <ul class="list-disc pl-6 space-y-2">
                        <li><strong>头文件</strong>：#include &lt;iostream&gt;</li>
                        <li><strong>命名空间</strong>：using namespace std;</li>
                        <li><strong>主函数</strong>：int main() { return 0; }</li>
                        <li><strong>输入输出</strong>：cin >> x; cout << x;</li>
                        <li><strong>变量声明</strong>：int, char, double, bool</li>
                    </ul>

                    <h4>💻 完整程序结构：</h4>
                    <pre><code class="language-cpp">#include &lt;iostream&gt;
using namespace std;

int main() {
    // 变量声明
    int a, b;
    
    // 输入
    cout << "请输入两个数：";
    cin >> a >> b;
    
    // 计算
    int sum = a + b;
    
    // 输出
    cout << "和为：" << sum << endl;
    
    return 0;
}</code></pre>

                    <h4>⚠️ 常见错误：</h4>
                    <div class="bg-red-50 p-4 rounded-md mt-4 border-l-4 border-red-400">
                        <ul class="list-disc pl-6 space-y-1">
                            <li>忘记包含头文件</li>
                            <li>缺少分号结尾</li>
                            <li>变量未声明就使用</li>
                            <li>括号不匹配</li>
                        </ul>
                    </div>
                `
            },
            'control-flow': {
                title: '🔄 控制结构',
                content: `
                    <h3>程序控制流程</h3>
                    <p>掌握条件判断和循环是编程的核心技能。</p>
                    
                    <h4>🎯 条件语句：</h4>
                    <pre><code class="language-cpp">// if-else 语句
if (condition) {
    // 条件为真时执行
} else if (condition2) {
    // 条件2为真时执行
} else {
    // 其他情况执行
}

// switch 语句
switch(variable) {
    case 1:
        // 执行代码
        break;
    case 2:
        // 执行代码
        break;
    default:
        // 默认执行
}</code></pre>

                    <h4>🔁 循环语句：</h4>
                    <pre><code class="language-cpp">// for 循环
for (int i = 0; i < n; i++) {
    // 循环体
}

// while 循环
while (condition) {
    // 循环体
}

// do-while 循环
do {
    // 循环体
} while (condition);</code></pre>

                    <h4>💡 实战例题：</h4>
                    <div class="bg-gray-100 p-4 rounded-md mt-4">
                        <p><strong>问题：</strong>输入一个正整数n，输出1到n的累加和</p>
                        <pre><code class="language-cpp">#include &lt;iostream&gt;
using namespace std;

int main() {
    int n, sum = 0;
    cin >> n;
    
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    
    cout << sum << endl;
    return 0;
}</code></pre>
                    </div>
                `
            },
            'arrays': {
                title: '📊 数组与字符串',
                content: `
                    <h3>数组和字符串操作</h3>
                    <p>数组是存储多个相同类型数据的重要数据结构。</p>
                    
                    <h4>🎯 一维数组：</h4>
                    <pre><code class="language-cpp">// 数组声明和初始化
int arr[100];              // 声明大小为100的数组
int nums[] = {1, 2, 3, 4}; // 初始化数组
int size = 4;

// 数组遍历
for (int i = 0; i < size; i++) {
    cout << nums[i] << " ";
}</code></pre>

                    <h4>🔤 字符串处理：</h4>
                    <pre><code class="language-cpp">#include &lt;string&gt;
using namespace std;

string str = "Hello";
char cstr[100] = "World";

// 字符串操作
str.length();        // 获取长度
str + " World";      // 字符串连接
str.substr(1, 3);    // 子字符串</code></pre>

                    <h4>💻 经典算法：</h4>
                    <div class="bg-blue-50 p-4 rounded-md mt-4 border-l-4 border-blue-400">
                        <h5><strong>数组最大值查找：</strong></h5>
                        <pre><code class="language-cpp">int findMax(int arr[], int n) {
    int maxVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    return maxVal;
}</code></pre>
                    </div>
                `
            },
            'functions': {
                title: '🔧 函数与递归',
                content: `
                    <h3>函数设计与递归思维</h3>
                    <p>函数是代码复用和模块化编程的基础，递归是重要的编程思想。</p>
                    
                    <h4>🎯 函数基础：</h4>
                    <pre><code class="language-cpp">// 函数声明
return_type function_name(parameters) {
    // 函数体
    return value;
}

// 示例：计算两数之和
int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(3, 5);
    cout << result << endl;
    return 0;
}</code></pre>

                    <h4>🔄 递归函数：</h4>
                    <pre><code class="language-cpp">// 阶乘函数
long long factorial(int n) {
    if (n <= 1) {
        return 1;  // 递归终止条件
    }
    return n * factorial(n - 1);  // 递归调用
}

// 斐波那契数列
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}</code></pre>

                    <h4>💡 递归思维训练：</h4>
                    <div class="bg-green-50 p-4 rounded-md mt-4 border-l-4 border-green-400">
                        <h5><strong>汉诺塔问题：</strong></h5>
                        <pre><code class="language-cpp">void hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        cout << "Move disk 1 from " << from << " to " << to << endl;
        return;
    }
    
    hanoi(n-1, from, aux, to);
    cout << "Move disk " << n << " from " << from << " to " << to << endl;
    hanoi(n-1, aux, to, from);
}</code></pre>
                    </div>
                `
            },
            'algorithms': {
                title: '🏃 常用算法',
                content: `
                    <h3>基本算法思想</h3>
                    <p>掌握常用算法思想是CSP-J竞赛的核心要求，包括排序、搜索、递归等。</p>
                    
                    <h4>🔄 排序算法：</h4>
                    <ul class="list-disc pl-6 space-y-2">
                        <li><strong>冒泡排序</strong>：相邻元素比較交换，时间复杂度O(n²)</li>
                        <li><strong>选择排序</strong>：每次选择最小元素，时间复杂度O(n²)</li>
                        <li><strong>插入排序</strong>：按顺序插入元素，时间复杂度O(n²)</li>
                        <li><strong>快速排序</strong>：分治思想，平均时间复杂度O(n log n)</li>
                    </ul>

                    <h4>🔍 搜索算法：</h4>
                    <pre><code class="language-cpp">// 二分搜索（需要有序数组）
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    
    while (left <= right) {
        int mid = (left + right) / 2;
        
        if (arr[mid] == target) {
            return mid;  // 找到目标
        } else if (arr[mid] < target) {
            left = mid + 1;  // 在右半部分搜索
        } else {
            right = mid - 1;  // 在左半部分搜索
        }
    }
    
    return -1;  // 未找到
}</code></pre>

                    <h4>🎤 递归算法：</h4>
                    <div class="bg-blue-50 p-4 rounded-md mt-4 border-l-4 border-blue-400">
                        <h5><strong>最大公约数(GCD)：</strong></h5>
                        <pre><code class="language-cpp">int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}</code></pre>
                        <h5><strong>全排列生成：</strong></h5>
                        <pre><code class="language-cpp">void permute(vector<int>& nums, int start) {
    if (start == nums.size()) {
        // 输出当前排列
        return;
    }
    
    for (int i = start; i < nums.size(); i++) {
        swap(nums[start], nums[i]);
        permute(nums, start + 1);
        swap(nums[start], nums[i]);  // 回溯
    }
}</code></pre>
                    </div>

                    <h4>💡 时间复杂度分析：</h4>
                    <div class="bg-gray-100 p-4 rounded-md mt-4">
                        <p><strong>O(1)</strong>：常数时间 - 数组访问</p>
                        <p><strong>O(log n)</strong>：对数时间 - 二分搜索</p>
                        <p><strong>O(n)</strong>：线性时间 - 遍历数组</p>
                        <p><strong>O(n log n)</strong>：分治时间 - 快速排序</p>
                        <p><strong>O(n²)</strong>：平方时间 - 冒泡排序</p>
                    </div>
                `
            },
            'file-operations': {
                title: '📁 文件操作',
                content: `
                    <h3>文件输入输出</h3>
                    <p>在CSP-J竞赛中，很多题目需要从文件读取数据并输出到文件。</p>
                    
                    <h4>🎯 文件输入输出基础：</h4>
                    <pre><code class="language-cpp">#include <fstream>
using namespace std;

int main() {
    // 打开输入文件
    ifstream fin("input.txt");
    // 打开输出文件
    ofstream fout("output.txt");
    
    int n;
    fin >> n;  // 从文件读取
    
    // 处理数据
    int result = n * 2;
    
    fout << result << endl;  // 写入文件
    
    fin.close();
    fout.close();
    return 0;
}</code></pre>

                    <h4>📝 常用文件操作：</h4>
                    <ul class="list-disc pl-6 space-y-2">
                        <li><strong>ifstream</strong>：输入文件流，用于读取数据</li>
                        <li><strong>ofstream</strong>：输出文件流，用于写入数据</li>
                        <li><strong>getline()</strong>：读取整行字符串</li>
                        <li><strong>eof()</strong>：检查是否到达文件末尾</li>
                    </ul>

                    <h4>🏆 典型模板：</h4>
                    <div class="bg-green-50 p-4 rounded-md mt-4 border-l-4 border-green-400">
                        <pre><code class="language-cpp">#include <iostream>
#include <fstream>
using namespace std;

int main() {
    // 重定向标准输入输出到文件
    freopen("data.in", "r", stdin);
    freopen("data.out", "w", stdout);
    
    // 现在可以用cin/cout操作文件
    int n;
    cin >> n;
    cout << n * 2 << endl;
    
    return 0;
}</code></pre>
                    </div>

                    <h4>💡 注意事项：</h4>
                    <div class="bg-yellow-50 p-4 rounded-md mt-4 border-l-4 border-yellow-400">
                        <ul class="list-disc pl-6 space-y-1">
                            <li>检查文件是否成功打开</li>
                            <li>及时关闭文件流</li>
                            <li>注意文件路径和文件名</li>
                            <li>freopen适用于OJ系统</li>
                        </ul>
                    </div>
                `
            }
        };

        // 代码模板
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
            loop: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "请输入n：";
    cin >> n;
    
    for (int i = 1; i <= n; i++) {
        cout << i << " ";
    }
    cout << endl;
    return 0;
}`,
            array: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    
    cout << "数组元素：";
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    return 0;
}`,
            function: `#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

int main() {
    int x = 10, y = 20;
    int sum = add(x, y);
    cout << "和为：" << sum << endl;
    return 0;
}`,
            factorial: `#include <iostream>
using namespace std;

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    int n = 5;
    cout << n << "! = " << factorial(n) << endl;
    return 0;
}`,
            file_io: `#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ifstream fin("input.txt");
    ofstream fout("output.txt");
    
    int n;
    fin >> n;
    fout << n * 2 << endl;
    
    fin.close();
    fout.close();
    return 0;
}`,
            binary_search: `#include <iostream>
using namespace std;

int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    int arr[] = {1, 3, 5, 7, 9};
    int result = binarySearch(arr, 5, 7);
    cout << "查找结果：" << result << endl;
    return 0;
}`
        };

        // 测试题目数据
        const testQuestions = [
            {
                id: 1,
                question: "CCF（中国计算机学会）成立于哪一年？",
                options: ["A. 1960", "B. 1962", "C. 1965", "D. 1970"],
                answer: 1,
                explanation: "中国计算机学会成立于1962年。"
            },
            {
                id: 2,
                question: "以下哪个是C++程序的正确入口函数？",
                options: ["A. void main()", "B. int main()", "C. main()", "D. start()"],
                answer: 1,
                explanation: "C++程序的标准入口函数是 int main()。"
            },
            {
                id: 3,
                question: "二进制数1011转换为十进制是多少？",
                options: ["A. 11", "B. 12", "C. 13", "D. 10"],
                answer: 0,
                explanation: "1011₂ = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11"
            },
            {
                id: 4,
                question: "在C++中，以下哪个关键字用于定义常量？",
                options: ["A. var", "B. const", "C. final", "D. static"],
                answer: 1,
                explanation: "在C++中，const关键字用于定义常量。"
            },
            {
                id: 5,
                question: "以下哪个循环语句会至少执行一次？",
                options: ["A. for", "B. while", "C. do-while", "D. 以上都不是"],
                answer: 2,
                explanation: "do-while循环会先执行循环体，再检查条件，所以至少执行一次。"
            },
            {
                id: 6,
                question: "逻辑表达式 0&(1|0)|(1|1|1&0) 的值是？",
                options: ["A. 0", "B. 1", "C. 2", "D. 3"],
                answer: 1,
                explanation: "按照优先级和短路策略，最终结果为1。"
            },
            {
                id: 7,
                question: "链表不具有的特点是？",
                options: ["A. 插入删除不需要移动元素", "B. 不必事先存储连续空间", "C. 所需空间与长度成正比", "D. 可随机访问任一元素"],
                answer: 3,
                explanation: "链表无法随机访问，必须从头开始顺序遍历。"
            },
            {
                id: 8,
                question: "对于入栈顺序为a,b,c,d,e的序列，以下哪个不是合法的出栈序列？",
                options: ["A. a,b,c,d,e", "B. e,d,c,b,a", "C. b,a,c,d,e", "D. c,d,a,e,b"],
                answer: 3,
                explanation: "按照栈的LIFO原则，c,d,a,e,b不是合法的出栈序列。"
            },
            {
                id: 9,
                question: "二分查找算法的时间复杂度是？",
                options: ["A. O(1)", "B. O(log n)", "C. O(n)", "D. O(n²)"],
                answer: 1,
                explanation: "二分查找每次都能将查找范围减半，所以时间复杂度为O(log n)。"
            },
            {
                id: 10,
                question: "在C++中，用于文件输入的流类型是？",
                options: ["A. iostream", "B. ifstream", "C. ofstream", "D. fstream"],
                answer: 1,
                explanation: "ifstream用于从文件读取数据（输入流）。"
            }
        ];

        // 初始化
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM Content Loaded, initializing app...');
            try {
                initializeApp();
                console.log('App initialized successfully');
            } catch (error) {
                console.error('Error during app initialization:', error);
                // 显示错误信息给用户
                updateDetectiveMessage('初始化遇到问题，请刷新页面重试！🔧');
            }
        });

        // 备用初始化（如果DOMContentLoaded已经错过）
        if (document.readyState === 'loading') {
            // 文档还在加载中，等待DOMContentLoaded事件
        } else {
            // 文档已经加载完成，直接初始化
            setTimeout(function() {
                if (!window.appInitialized) {
                    console.log('Fallback initialization...');
                    try {
                        initializeApp();
                        console.log('Fallback initialization successful');
                    } catch (error) {
                        console.error('Fallback initialization error:', error);
                    }
                }
            }, 100);
        }

        function initializeApp() {
            console.log('Starting app initialization...');
            window.appInitialized = true;
            
            try {
                // 检查关键元素是否存在
                console.log('Checking critical elements...');
                const knowledgeNav = document.getElementById('knowledge-nav');
                const codeEditor = document.getElementById('code-editor');
                const algorithmViz = document.getElementById('algorithm-visualization');
                const testArea = document.getElementById('test-area');
                const codeBlocks = document.getElementById('code-blocks');
                
                console.log('Elements found:');
                console.log('- knowledge-nav:', !!knowledgeNav);
                console.log('- code-editor:', !!codeEditor);
                console.log('- algorithm-visualization:', !!algorithmViz);
                console.log('- test-area:', !!testArea);
                console.log('- code-blocks:', !!codeBlocks);
                
                // 初始化代码编辑器
                console.log('Initializing code editor...');
                initCodeEditor();
                
                // 加载保存的进度
                console.log('Loading progress...');
                loadProgress();
                
                // 生成知识点导航 (在加载进度后)
                console.log('Generating knowledge navigation...');
                generateKnowledgeNav();
                
                // 初始化学习统计
                console.log('Updating stats...');
                updateStats();
                
                // 生成成就徽章
                console.log('Generating achievements...');
                generateAchievements();
                
                // 初始化拖拽练习
                console.log('Initializing drag drop practice...');
                initDragDropPractice();
                
                // 开始计时
                console.log('Starting study timer...');
                startStudyTimer();
                
                console.log('App initialization completed successfully!');
                updateDetectiveMessage('🎯 欢迎来到CSP-J学习世界！我是你的代码小侦探，让我们一起探索编程的奥秘吧！');
                
            } catch (error) {
                console.error('Error in initializeApp:', error);
                throw error;
            }
        }

        function initCodeEditor() {
            try {
                const textarea = document.getElementById('code-editor');
                if (textarea && typeof CodeMirror !== 'undefined') {
                    gameState.codeEditor = CodeMirror.fromTextArea(textarea, {
                        mode: 'text/x-c++src',
                        theme: 'monokai',
                        lineNumbers: true,
                        indentUnit: 4,
                        smartIndent: true,
                        matchBrackets: true,
                        autoCloseBrackets: true
                    });
                    console.log('CodeMirror editor initialized successfully');
                } else {
                    console.warn('CodeMirror not loaded or textarea not found, using fallback');
                    // 如果 CodeMirror 加载失败，显示警告但继续运行
                }
            } catch (error) {
                console.error('Error initializing CodeMirror:', error);
                updateDetectiveMessage('代码编辑器初始化遇到问题，但其他功能正常！');
            }
        }

        function generateKnowledgeNav() {
            try {
                console.log('Generating knowledge navigation...');
                const navContainer = document.getElementById('knowledge-nav');
                if (!navContainer) {
                    console.error('Knowledge nav container not found!');
                    return;
                }
                
                navContainer.innerHTML = '';
                
                console.log('Knowledge data keys:', Object.keys(knowledgeData));
                
                Object.keys(knowledgeData).forEach(key => {
                    const topic = knowledgeData[key];
                    const isCompleted = gameState.progress.masteredTopics.has(key);
                    
                    const navItem = document.createElement('div');
                    navItem.className = `p-3 rounded-md cursor-pointer transition-all ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-gray-100 hover:bg-gray-200'}`;
                    navItem.innerHTML = `
                        <div class="flex items-center justify-between">
                            <span>${topic.title}</span>
                            ${isCompleted ? '<span class="text-green-600">✓</span>' : '<span class="text-gray-400">○</span>'}
                        </div>
                    `;
                    navItem.onclick = () => showKnowledge(key);
                    navContainer.appendChild(navItem);
                });
                
                console.log(`Generated ${Object.keys(knowledgeData).length} knowledge nav items`);
            } catch (error) {
                console.error('Error generating knowledge nav:', error);
            }
        }

        function showKnowledge(topicKey) {
            const topic = knowledgeData[topicKey];
            const contentContainer = document.getElementById('knowledge-content');
            
            contentContainer.innerHTML = `
                <h2 class="text-2xl font-bold text-gray-800 mb-4">${topic.title}</h2>
                <div class="prose max-w-none">${topic.content}</div>
                <div class="mt-6">
                    <button onclick="markTopicCompleted('${topicKey}')" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                        ✅ 标记为已掌握
                    </button>
                </div>
            `;
            
            // 高亮代码
            Prism.highlightAll();
            
            // 更新侦探提示
            updateDetectiveMessage("很好！继续深入学习这个知识点吧！🎯");
        }

        function markTopicCompleted(topicKey) {
            gameState.progress.masteredTopics.add(topicKey);
            generateKnowledgeNav();
            updateStats();
            checkAchievements();
            saveProgress();
            
            updateDetectiveMessage("太棒了！又掌握了一个知识点！🏆");
        }

        function switchTab(tabName) {
            // 更新tab样式
            document.querySelectorAll('[id^="tab-"]').forEach(tab => {
                tab.className = tab.className.replace('tab-active', '');
                tab.className += ' hover:bg-gray-50';
            });
            document.getElementById(`tab-${tabName}`).className = 'tab-active px-6 py-3 font-medium flex-1 transition-all';
            
            // 显示对应内容
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(`content-${tabName}`).classList.remove('hidden');
            
            gameState.currentTab = tabName;
            
            // 更新侦探提示
            const messages = {
                knowledge: "让我们一起探索知识的海洋！📚",
                practice: "动手编码才能真正掌握技能！💻",
                interactive: "互动学习让编程更有趣！🎮",
                test: "检验学习成果的时候到了！📝"
            };
            updateDetectiveMessage(messages[tabName]);
        }

        function loadCodeTemplate() {
            const select = document.getElementById('code-template');
            const template = codeTemplates[select.value];
            if (template) {
                if (gameState.codeEditor) {
                    gameState.codeEditor.setValue(template);
                } else {
                    // 回退到普通textarea
                    const textarea = document.getElementById('code-editor');
                    if (textarea) {
                        textarea.value = template;
                    }
                }
                updateDetectiveMessage("模板加载完成！试试运行这段代码吧！⚡");
            }
        }

        function runCode() {
            let code;
            if (gameState.codeEditor) {
                code = gameState.codeEditor.getValue();
            } else {
                // 回退到普通textarea
                const textarea = document.getElementById('code-editor');
                code = textarea ? textarea.value : '';
            }
            
            const outputDiv = document.getElementById('code-output');
            const errorDiv = document.getElementById('code-error');
            
            // 隐藏错误信息
            errorDiv.classList.add('hidden');
            
            if (!code.trim()) {
                outputDiv.textContent = '请输入代码后再运行！';
                updateDetectiveMessage("先写点代码吧！💻");
                return;
            }
            
            // 模拟代码执行
            try {
                let output = simulateCodeExecution(code);
                outputDiv.textContent = output;
                
                // 更新统计
                gameState.progress.completedPractices++;
                updateStats();
                checkAchievements();
                saveProgress();
                
                updateDetectiveMessage("代码运行成功！继续加油！🚀");
            } catch (error) {
                errorDiv.textContent = error.message;
                errorDiv.classList.remove('hidden');
                updateDetectiveMessage("别灰心，调试是程序员的必修课！🔧");
            }
        }

        function simulateCodeExecution(code) {
            // 简单的代码模拟执行
            if (code.includes('cout') && code.includes('Hello')) {
                return 'Hello, CSP-J!';
            } else if (code.includes('cout') && code.includes('cin')) {
                return '请输入两个数：\n你输入的数是：10 和 20';
            } else if (code.includes('for') && code.includes('i++')) {
                return '1 2 3 4 5';
            } else if (code.includes('arr[')) {
                return '数组元素：1 2 3 4 5';
            } else if (code.includes('add(')) {
                return '和为：30';
            } else if (code.includes('factorial') || code.includes('factorial')) {
                return '阶乘结果：120';
            } else if (code.includes('gcd')) {
                return '最大公约数：6';
            } else if (code.includes('ifstream') || code.includes('freopen')) {
                return '从文件读取成功\n结果已输出到文件';
            } else if (code.includes('sort')) {
                return '排序后：1 2 3 4 5';
            } else if (code.includes('binarySearch')) {
                return '查找结果：3';
            } else {
                return '程序执行完成';
            }
        }

        function clearCode() {
            if (gameState.codeEditor) {
                gameState.codeEditor.setValue('');
            } else {
                // 回退到普通textarea
                const textarea = document.getElementById('code-editor');
                if (textarea) {
                    textarea.value = '';
                }
            }
            document.getElementById('code-output').textContent = '点击"运行代码"查看结果...';
            document.getElementById('code-error').classList.add('hidden');
            updateDetectiveMessage("编辑器已清空，准备写新代码吧！✨");
        }

        function showAlgorithmViz() {
            const select = document.getElementById('algorithm-select');
            const vizArea = document.getElementById('algorithm-visualization');
            
            switch(select.value) {
                case 'bubble-sort':
                    vizArea.innerHTML = `
                        <div class="text-center mb-4">
                            <h4 class="text-lg font-bold mb-2">冒泡排序可视化</h4>
                            <p class="text-sm text-gray-300">比较相邻元素，大的向后"冒泡"</p>
                        </div>
                        <div id="sort-array" class="text-center">
                            ${[64, 34, 25, 12, 22, 11, 90].map((num, i) => 
                                `<div class="array-bar" style="height: ${num}px; background-color: #3b82f6;" id="bar-${i}">${num}</div>`
                            ).join('')}
                        </div>
                    `;
                    break;
                case 'binary-search':
                    vizArea.innerHTML = `
                        <div class="text-center mb-4">
                            <h4 class="text-lg font-bold mb-2">二分查找可视化</h4>
                            <p class="text-sm text-gray-300">在有序数组中查找目标值</p>
                        </div>
                        <div id="search-array" class="text-center">
                            ${[1, 3, 5, 7, 9, 11, 13, 15].map((num, i) => 
                                `<div class="array-bar" style="height: 40px; background-color: #10b981;" id="search-${i}">${num}</div>`
                            ).join('')}
                        </div>
                        <div class="mt-4 text-center">
                            <p class="text-sm">查找目标：<span class="font-bold text-yellow-400">9</span></p>
                        </div>
                    `;
                    break;
                case 'factorial':
                    vizArea.innerHTML = `
                        <div class="text-center mb-4">
                            <h4 class="text-lg font-bold mb-2">递归阶乘可视化</h4>
                            <p class="text-sm text-gray-300">factorial(n) = n × factorial(n-1)</p>
                        </div>
                        <div id="recursion-stack" class="space-y-2">
                            <div class="text-center text-yellow-400">点击开始演示递归过程</div>
                        </div>
                    `;
                    break;
                case 'selection-sort':
                    vizArea.innerHTML = `
                        <div class="text-center mb-4">
                            <h4 class="text-lg font-bold mb-2">选择排序可视化</h4>
                            <p class="text-sm text-gray-300">每次选择最小元素放到前面</p>
                        </div>
                        <div id="selection-array" class="text-center">
                            ${[64, 25, 12, 22, 11].map((num, i) => 
                                `<div class="array-bar" style="height: ${num}px; background-color: #8b5cf6;" id="sel-${i}">${num}</div>`
                            ).join('')}
                        </div>
                    `;
                    break;
                case 'linear-search':
                    vizArea.innerHTML = `
                        <div class="text-center mb-4">
                            <h4 class="text-lg font-bold mb-2">线性查找可视化</h4>
                            <p class="text-sm text-gray-300">从左到右顺序查找目标元素</p>
                        </div>
                        <div id="linear-array" class="text-center">
                            ${[3, 7, 1, 9, 4, 6, 8].map((num, i) => 
                                `<div class="array-bar" style="height: 40px; background-color: #f97316;" id="linear-${i}">${num}</div>`
                            ).join('')}
                        </div>
                        <div class="mt-4 text-center">
                            <p class="text-sm">查找目标：<span class="font-bold text-yellow-400">6</span></p>
                        </div>
                    `;
                    break;
                default:
                    vizArea.innerHTML = '选择算法查看可视化演示...';
            }
        }

        function startVisualization() {
            const select = document.getElementById('algorithm-select');
            
            switch(select.value) {
                case 'bubble-sort':
                    animateBubbleSort();
                    break;
                case 'binary-search':
                    animateBinarySearch();
                    break;
                case 'factorial':
                    animateFactorial();
                    break;
                case 'selection-sort':
                    animateSelectionSort();
                    break;
                case 'linear-search':
                    animateLinearSearch();
                    break;
                default:
                    updateDetectiveMessage("请先选择一个算法哦！🤔");
            }
        }

        function animateBubbleSort() {
            const bars = document.querySelectorAll('#sort-array .array-bar');
            let i = 0, j = 0;
            const arr = [64, 34, 25, 12, 22, 11, 90];
            
            const step = () => {
                if (i < arr.length - 1) {
                    if (j < arr.length - i - 1) {
                        // 高亮当前比较的元素
                        bars[j].style.backgroundColor = '#ef4444';
                        bars[j + 1].style.backgroundColor = '#ef4444';
                        
                        setTimeout(() => {
                            if (arr[j] > arr[j + 1]) {
                                // 交换
                                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                                bars[j].textContent = arr[j];
                                bars[j].style.height = arr[j] + 'px';
                                bars[j + 1].textContent = arr[j + 1];
                                bars[j + 1].style.height = arr[j + 1] + 'px';
                            }
                            
                            bars[j].style.backgroundColor = '#3b82f6';
                            bars[j + 1].style.backgroundColor = '#3b82f6';
                            j++;
                            setTimeout(step, 500);
                        }, 300);
                    } else {
                        bars[arr.length - i - 1].style.backgroundColor = '#10b981';
                        j = 0;
                        i++;
                        setTimeout(step, 500);
                    }
                } else {
                    bars[0].style.backgroundColor = '#10b981';
                    updateDetectiveMessage("冒泡排序完成！看到大数字是怎么"冒泡"到后面的吗？🫧");
                }
            };
            
            step();
        }

        function animateBinarySearch() {
            const bars = document.querySelectorAll('#search-array .array-bar');
            const target = 9;
            let left = 0, right = bars.length - 1;
            
            const step = () => {
                if (left <= right) {
                    const mid = Math.floor((left + right) / 2);
                    
                    // 高亮搜索范围
                    bars.forEach((bar, i) => {
                        if (i < left || i > right) {
                            bar.style.backgroundColor = '#6b7280';
                        } else if (i === mid) {
                            bar.style.backgroundColor = '#f59e0b';
                        } else {
                            bar.style.backgroundColor = '#10b981';
                        }
                    });
                    
                    const midValue = parseInt(bars[mid].textContent);
                    
                    setTimeout(() => {
                        if (midValue === target) {
                            bars[mid].style.backgroundColor = '#ef4444';
                            updateDetectiveMessage(`找到了！目标值 ${target} 在位置 ${mid}！🎯`);
                            return;
                        } else if (midValue < target) {
                            left = mid + 1;
                        } else {
                            right = mid - 1;
                        }
                        setTimeout(step, 1000);
                    }, 800);
                } else {
                    updateDetectiveMessage("没有找到目标值！二分查找完成。🔍");
                }
            };
            
            step();
        }

        function animateFactorial() {
            const stackDiv = document.getElementById('recursion-stack');
            const n = 5;
            let callStack = [];
            
            const addCall = (value, depth) => {
                const callDiv = document.createElement('div');
                callDiv.className = `p-2 bg-blue-600 rounded text-center transform`;
                callDiv.style.marginLeft = `${depth * 20}px`;
                callDiv.innerHTML = `factorial(${value})`;
                callDiv.id = `call-${depth}`;
                stackDiv.appendChild(callDiv);
                callStack.push({value, depth});
            };
            
            const removeCall = (depth, result) => {
                const callDiv = document.getElementById(`call-${depth}`);
                if (callDiv) {
                    callDiv.innerHTML = `factorial(${callStack.find(c => c.depth === depth).value}) = ${result}`;
                    callDiv.className += ' bg-green-600';
                }
            };
            
            stackDiv.innerHTML = '';
            
            // 模拟递归调用
            let currentDepth = 0;
            const simulate = (value, depth) => {
                addCall(value, depth);
                
                setTimeout(() => {
                    if (value <= 1) {
                        removeCall(depth, 1);
                        if (depth === 0) {
                            updateDetectiveMessage(`递归完成！${n}! = ${factorial(n)}`);
                        }
                    } else {
                        setTimeout(() => {
                            simulate(value - 1, depth + 1);
                            setTimeout(() => {
                                removeCall(depth, factorial(value));
                            }, (n - value + 1) * 1000);
                        }, 500);
                    }
                }, 500);
            };
            
            simulate(n, 0);
        }

        function factorial(n) {
            return n <= 1 ? 1 : n * factorial(n - 1);
        }

        function animateSelectionSort() {
            const bars = document.querySelectorAll('#selection-array .array-bar');
            const arr = [64, 25, 12, 22, 11];
            let i = 0;
            
            const step = () => {
                if (i < arr.length - 1) {
                    let minIdx = i;
                    let j = i + 1;
                    
                    const findMin = () => {
                        if (j < arr.length) {
                            // 高亮当前比较的元素
                            bars.forEach((bar, idx) => {
                                if (idx < i) {
                                    bar.style.backgroundColor = '#10b981'; // 已排序
                                } else if (idx === minIdx) {
                                    bar.style.backgroundColor = '#ef4444'; // 当前最小值
                                } else if (idx === j) {
                                    bar.style.backgroundColor = '#f59e0b'; // 当前比较
                                } else {
                                    bar.style.backgroundColor = '#8b5cf6'; // 未排序
                                }
                            });
                            
                            if (arr[j] < arr[minIdx]) {
                                minIdx = j;
                            }
                            
                            j++;
                            setTimeout(findMin, 500);
                        } else {
                            // 交换元素
                            if (minIdx !== i) {
                                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                                bars[i].textContent = arr[i];
                                bars[i].style.height = arr[i] + 'px';
                                bars[minIdx].textContent = arr[minIdx];
                                bars[minIdx].style.height = arr[minIdx] + 'px';
                            }
                            
                            bars[i].style.backgroundColor = '#10b981'; // 标记为已排序
                            i++;
                            setTimeout(step, 800);
                        }
                    };
                    
                    findMin();
                } else {
                    bars[i].style.backgroundColor = '#10b981';
                    updateDetectiveMessage("选择排序完成！每次都找到最小值放到前面！🎯");
                }
            };
            
            step();
        }

        function animateLinearSearch() {
            const bars = document.querySelectorAll('#linear-array .array-bar');
            const target = 6;
            let i = 0;
            
            const step = () => {
                if (i < bars.length) {
                    // 重置所有颜色
                    bars.forEach((bar, idx) => {
                        if (idx < i) {
                            bar.style.backgroundColor = '#6b7280'; // 已检查
                        } else if (idx === i) {
                            bar.style.backgroundColor = '#f59e0b'; // 当前检查
                        } else {
                            bar.style.backgroundColor = '#f97316'; // 未检查
                        }
                    });
                    
                    const currentValue = parseInt(bars[i].textContent);
                    
                    setTimeout(() => {
                        if (currentValue === target) {
                            bars[i].style.backgroundColor = '#ef4444'; // 找到目标
                            updateDetectiveMessage(`找到了！目标值 ${target} 在位置 ${i}！🎯`);
                            return;
                        } else {
                            bars[i].style.backgroundColor = '#6b7280'; // 标记为已检查
                            i++;
                            setTimeout(step, 600);
                        }
                    }, 400);
                } else {
                    updateDetectiveMessage("没有找到目标值！线性查找完成。🔍");
                }
            };
            
            step();
        }

        function resetVisualization() {
            showAlgorithmViz();
            updateDetectiveMessage("可视化演示已重置！🔄");
        }

        function initDragDropPractice() {
            const codeBlocks = [
                '#include <iostream>',
                'using namespace std;',
                'int main() {',
                '    cout << "Hello World" << endl;',
                '    return 0;',
                '}'
            ];
            
            const blocksContainer = document.getElementById('code-blocks');
            blocksContainer.innerHTML = '';
            
            // 随机打乱代码块顺序
            const shuffledBlocks = [...codeBlocks].sort(() => Math.random() - 0.5);
            
            shuffledBlocks.forEach((block, index) => {
                const blockDiv = document.createElement('div');
                blockDiv.className = 'bg-blue-100 p-2 rounded cursor-move border border-blue-300 code-font text-sm';
                blockDiv.textContent = block;
                blockDiv.draggable = true;
                blockDiv.setAttribute('data-original-index', codeBlocks.indexOf(block));
                
                blockDiv.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', block);
                    e.dataTransfer.setData('data-index', codeBlocks.indexOf(block));
                });
                
                blocksContainer.appendChild(blockDiv);
            });
            
            // 设置拖拽区域
            const dropArea = document.getElementById('drag-drop-area');
            dropArea.innerHTML = '<div class="text-center text-gray-500 py-8">将代码块拖拽到这里</div>';
            dropArea.droppedBlocks = [];
            
            dropArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropArea.classList.add('border-blue-400', 'bg-blue-50');
            });
            
            dropArea.addEventListener('dragleave', (e) => {
                dropArea.classList.remove('border-blue-400', 'bg-blue-50');
            });
            
            dropArea.addEventListener('drop', (e) => {
                e.preventDefault();
                dropArea.classList.remove('border-blue-400', 'bg-blue-50');
                
                const blockText = e.dataTransfer.getData('text/plain');
                const originalIndex = parseInt(e.dataTransfer.getData('data-index'));
                
                // 添加到拖拽区域
                if (dropArea.children[0] && dropArea.children[0].classList.contains('text-center')) {
                    dropArea.innerHTML = '';
                }
                
                const droppedBlock = document.createElement('div');
                droppedBlock.className = 'bg-green-100 p-2 rounded border border-green-300 code-font text-sm mb-2';
                droppedBlock.textContent = blockText;
                
                dropArea.appendChild(droppedBlock);
                dropArea.droppedBlocks.push(originalIndex);
                
                // 从原容器中移除
                const originalBlock = [...blocksContainer.children].find(block => 
                    block.textContent === blockText
                );
                if (originalBlock) {
                    originalBlock.remove();
                }
            });
        }

        function checkCodeOrder() {
            const dropArea = document.getElementById('drag-drop-area');
            const correctOrder = [0, 1, 2, 3, 4, 5]; // 正确的代码顺序
            
            const isCorrect = dropArea.droppedBlocks.length === correctOrder.length &&
                            dropArea.droppedBlocks.every((block, index) => block === correctOrder[index]);
            
            if (isCorrect) {
                updateDetectiveMessage("太棒了！代码块顺序完全正确！🎉");
                gameState.progress.correctAnswers++;
            } else {
                updateDetectiveMessage("顺序不太对哦，再试试看！提示：程序从头文件开始... 🤔");
            }
            
            gameState.progress.totalAnswers++;
            updateStats();
            checkAchievements();
            saveProgress();
        }

        function startTest() {
            gameState.currentTest = {
                questions: [...testQuestions].sort(() => Math.random() - 0.5).slice(0, 5),
                currentQuestionIndex: 0,
                answers: [],
                startTime: Date.now(),
                timeLimit: 15 * 60 * 1000 // 15分钟
            };
            
            showTestQuestion();
            startTestTimer();
        }

        function showTestQuestion() {
            const test = gameState.currentTest;
            const question = test.questions[test.currentQuestionIndex];
            const testArea = document.getElementById('test-area');
            
            testArea.innerHTML = `
                <div class="mb-6">
                    <div class="flex justify-between items-center mb-4">
                        <h4 class="text-lg font-semibold">第 ${test.currentQuestionIndex + 1} 题 / 共 ${test.questions.length} 题</h4>
                        <div class="text-sm text-gray-500">题目ID: ${question.id}</div>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg mb-6">
                        <p class="text-lg mb-4">${question.question}</p>
                        <div class="space-y-2">
                            ${question.options.map((option, index) => `
                                <label class="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
                                    <input type="radio" name="question-${question.id}" value="${index}" class="w-4 h-4">
                                    <span>${option}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="flex justify-between">
                        <button onclick="prevQuestion()" ${test.currentQuestionIndex === 0 ? 'disabled' : ''} 
                                class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
                            上一题
                        </button>
                        
                        <button onclick="nextQuestion()" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            ${test.currentQuestionIndex === test.questions.length - 1 ? '提交答案' : '下一题'}
                        </button>
                    </div>
                </div>
            `;
            
            // 恢复之前的答案
            if (test.answers[test.currentQuestionIndex] !== undefined) {
                const radio = testArea.querySelector(`input[value="${test.answers[test.currentQuestionIndex]}"]`);
                if (radio) radio.checked = true;
            }
        }

        function nextQuestion() {
            const test = gameState.currentTest;
            const selectedAnswer = document.querySelector(`input[name="question-${test.questions[test.currentQuestionIndex].id}"]:checked`);
            
            if (selectedAnswer) {
                test.answers[test.currentQuestionIndex] = parseInt(selectedAnswer.value);
            }
            
            if (test.currentQuestionIndex === test.questions.length - 1) {
                finishTest();
            } else {
                test.currentQuestionIndex++;
                showTestQuestion();
            }
        }

        function prevQuestion() {
            const test = gameState.currentTest;
            const selectedAnswer = document.querySelector(`input[name="question-${test.questions[test.currentQuestionIndex].id}"]:checked`);
            
            if (selectedAnswer) {
                test.answers[test.currentQuestionIndex] = parseInt(selectedAnswer.value);
            }
            
            if (test.currentQuestionIndex > 0) {
                test.currentQuestionIndex--;
                showTestQuestion();
            }
        }

        function finishTest() {
            const test = gameState.currentTest;
            let score = 0;
            
            const results = test.questions.map((question, index) => {
                const userAnswer = test.answers[index];
                const isCorrect = userAnswer === question.answer;
                if (isCorrect) score++;
                
                return {
                    question: question.question,
                    userAnswer: userAnswer !== undefined ? question.options[userAnswer] : "未作答",
                    correctAnswer: question.options[question.answer],
                    isCorrect,
                    explanation: question.explanation
                };
            });
            
            const testArea = document.getElementById('test-area');
            testArea.innerHTML = `
                <div class="text-center mb-8">
                    <h3 class="text-2xl font-bold mb-4">测试完成！</h3>
                    <div class="text-6xl font-bold ${score >= 4 ? 'text-green-600' : score >= 3 ? 'text-yellow-600' : 'text-red-600'} mb-2">
                        ${score}/${test.questions.length}
                    </div>
                    <p class="text-lg text-gray-600">
                        正确率：${Math.round(score / test.questions.length * 100)}%
                    </p>
                </div>
                
                <div class="space-y-4">
                    ${results.map((result, index) => `
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <div class="flex items-center mb-2">
                                <span class="font-semibold mr-2">第${index + 1}题:</span>
                                <span class="${result.isCorrect ? 'text-green-600' : 'text-red-600'}">
                                    ${result.isCorrect ? '✓ 正确' : '✗ 错误'}
                                </span>
                            </div>
                            <p class="mb-2">${result.question}</p>
                            <p class="text-sm">
                                <span class="font-medium">你的答案：</span>
                                <span class="${result.isCorrect ? 'text-green-600' : 'text-red-600'}">${result.userAnswer}</span>
                            </p>
                            <p class="text-sm">
                                <span class="font-medium">正确答案：</span>
                                <span class="text-green-600">${result.correctAnswer}</span>
                            </p>
                            <p class="text-sm text-gray-600 mt-2">
                                <span class="font-medium">解析：</span>${result.explanation}
                            </p>
                        </div>
                    `).join('')}
                </div>
                
                <div class="text-center mt-8">
                    <button onclick="resetTest()" class="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
                        重新测试
                    </button>
                </div>
            `;
            
            // 更新统计
            gameState.progress.correctAnswers += score;
            gameState.progress.totalAnswers += test.questions.length;
            updateStats();
            checkAchievements();
            saveProgress();
            
            // 停止计时器
            clearInterval(gameState.testTimer);
            
            const message = score >= 4 ? "优秀！你已经掌握了大部分知识点！🏆" :
                           score >= 3 ? "不错！继续加强练习！💪" :
                           "需要更多练习哦，加油！📚";
            updateDetectiveMessage(message);
        }

        function resetTest() {
            gameState.currentTest = null;
            const testArea = document.getElementById('test-area');
            testArea.innerHTML = `
                <div class="text-center py-8">
                    <p class="text-gray-600 mb-4">准备好参加CSP-J模拟测试了吗？</p>
                    <button onclick="startTest()" class="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors">
                        🚀 开始测试
                    </button>
                </div>
            `;
            document.getElementById('test-timer').textContent = '15:00';
        }

        function startTestTimer() {
            const timerElement = document.getElementById('test-timer');
            const endTime = gameState.currentTest.startTime + gameState.currentTest.timeLimit;
            
            gameState.testTimer = setInterval(() => {
                const remaining = endTime - Date.now();
                
                if (remaining <= 0) {
                    clearInterval(gameState.testTimer);
                    finishTest();
                    return;
                }
                
                const minutes = Math.floor(remaining / 60000);
                const seconds = Math.floor((remaining % 60000) / 1000);
                timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                
                // 最后一分钟变红
                if (remaining <= 60000) {
                    timerElement.className = 'text-2xl font-bold text-red-600';
                }
            }, 1000);
        }

        function updateStats() {
            try {
                const masteredCount = document.getElementById('mastered-count');
                if (masteredCount) masteredCount.textContent = gameState.progress.masteredTopics.size;
                
                const practiceCount = document.getElementById('practice-count');
                if (practiceCount) practiceCount.textContent = gameState.progress.completedPractices;
                
                const accuracy = gameState.progress.totalAnswers > 0 ? 
                    Math.round((gameState.progress.correctAnswers / gameState.progress.totalAnswers) * 100) : 0;
                const accuracyRate = document.getElementById('accuracy-rate');
                if (accuracyRate) accuracyRate.textContent = accuracy + '%';
                
                const studyTime = Math.floor((Date.now() - gameState.progress.studyStartTime + gameState.progress.totalStudyTime) / 60000);
                const studyTimeElement = document.getElementById('study-time');
                if (studyTimeElement) studyTimeElement.textContent = studyTime;
                
                const totalKnowledgePoints = Object.keys(knowledgeData).length;
                const progress = Math.round((gameState.progress.masteredTopics.size / totalKnowledgePoints) * 100);
                const overallProgress = document.getElementById('overall-progress');
                if (overallProgress) overallProgress.textContent = progress + '%';
            } catch (error) {
                console.error('Error updating stats:', error);
            }
        }

        function generateAchievements() {
            const achievementContainer = document.getElementById('achievements');
            const achievements = [
                { id: 'first-topic', icon: '🎯', title: '初学者', condition: () => gameState.progress.masteredTopics.size >= 1 },
                { id: 'knowledge-master', icon: '📚', title: '知识达人', condition: () => gameState.progress.masteredTopics.size >= 3 },
                { id: 'code-runner', icon: '⚡', title: '代码执行者', condition: () => gameState.progress.completedPractices >= 5 },
                { id: 'test-taker', icon: '📝', title: '考试高手', condition: () => gameState.progress.totalAnswers >= 5 },
                { id: 'accuracy-expert', icon: '🎯', title: '精准射手', condition: () => gameState.progress.totalAnswers >= 10 && (gameState.progress.correctAnswers / gameState.progress.totalAnswers) >= 0.8 },
                { id: 'time-master', icon: '⏰', title: '时间管理', condition: () => (Date.now() - gameState.progress.studyStartTime + gameState.progress.totalStudyTime) >= 30 * 60 * 1000 }
            ];
            
            achievementContainer.innerHTML = '';
            achievements.forEach(achievement => {
                const earned = achievement.condition();
                const badgeDiv = document.createElement('div');
                badgeDiv.className = `achievement-badge ${earned ? 'opacity-100' : 'opacity-30 grayscale'}`;
                badgeDiv.innerHTML = achievement.icon;
                badgeDiv.title = achievement.title;
                achievementContainer.appendChild(badgeDiv);
                
                if (earned && !gameState.achievements.includes(achievement.id)) {
                    gameState.achievements.push(achievement.id);
                    // 显示成就通知
                    showAchievementNotification(achievement);
                }
            });
        }

        function showAchievementNotification(achievement) {
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-yellow-400 text-black p-4 rounded-lg shadow-lg z-50 transform translate-x-full';
            notification.innerHTML = `
                <div class="flex items-center space-x-2">
                    <span class="text-2xl">${achievement.icon}</span>
                    <div>
                        <div class="font-bold">成就解锁！</div>
                        <div class="text-sm">${achievement.title}</div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // 动画效果
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(full)';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        function checkAchievements() {
            generateAchievements();
        }

        function updateDetectiveMessage(message) {
            try {
                const messageElement = document.getElementById('detective-message');
                if (!messageElement) {
                    console.warn('Detective message element not found');
                    return;
                }
                messageElement.style.opacity = '0';
                setTimeout(() => {
                    messageElement.textContent = message;
                    messageElement.style.opacity = '1';
                }, 200);
            } catch (error) {
                console.error('Error updating detective message:', error);
            }
        }

        function startStudyTimer() {
            setInterval(() => {
                updateStats();
            }, 60000); // 每分钟更新一次
        }

        function saveProgress() {
            const progressData = {
                ...gameState.progress,
                masteredTopics: Array.from(gameState.progress.masteredTopics),
                achievements: gameState.achievements
            };
            localStorage.setItem('csp-j-progress', JSON.stringify(progressData));
        }

        function loadProgress() {
            try {
                const savedProgress = localStorage.getItem('csp-j-progress');
                if (savedProgress) {
                    const data = JSON.parse(savedProgress);
                    gameState.progress = {
                        ...gameState.progress,
                        ...data,
                        masteredTopics: new Set(data.masteredTopics || [])
                    };
                    gameState.achievements = data.achievements || [];
                    console.log('Progress loaded successfully');
                }
            } catch (error) {
                console.error('Error loading progress:', error);
            }
        }

        // 页面卸载时保存进度
        window.addEventListener('beforeunload', saveProgress);

        // 确保所有函数都在全局作用域中可用
        window.switchTab = switchTab;
        window.showKnowledge = showKnowledge;
        window.markTopicCompleted = markTopicCompleted;
        window.loadCodeTemplate = loadCodeTemplate;
        window.runCode = runCode;
        window.clearCode = clearCode;
        window.showAlgorithmViz = showAlgorithmViz;
        window.startVisualization = startVisualization;
        window.resetVisualization = resetVisualization;
        window.checkCodeOrder = checkCodeOrder;
        window.startTest = startTest;
        window.nextQuestion = nextQuestion;
        window.prevQuestion = prevQuestion;
        window.resetTest = resetTest;

    