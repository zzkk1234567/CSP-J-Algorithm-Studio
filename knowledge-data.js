// CSP-J 完整知识体系数据
const knowledgeData = {
    'competition-intro': {
        title: '🏁 竞赛与CCF简介',
        content: `
            <h3>计算机竞赛与CCF简介</h3>
            <p>了解所参与的竞赛体系是学习的第一步，包括竞赛的基本情况、规则以及计算机科学发展中的重要里程碑。</p>
            
            <h4>🎯 CSP-J/S 非专业级软件能力认证：</h4>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>基本概况</strong>：中国计算机学会（CCF）举办的面向非专业级选手的软件能力认证</li>
                <li><strong>级别</strong>：分为入门级（J）和提高级（S）两个级别</li>
                <li><strong>轮次</strong>：包含第一轮（初赛）和第二轮（复赛）</li>
                <li><strong>CCF成立年份</strong>：中国计算机学会成立于 <strong>1962年</strong></li>
                <li><strong>举办次数</strong>：2023年是CCF第<strong>5次</strong>举办CSP-J/S认证</li>
            </ul>

            <h4>📋 考试规则：</h4>
            <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <ul class="list-disc pl-6 space-y-1">
                    <li>试题纸与答题纸分离，答案需写在答题纸上</li>
                    <li><strong>禁止携带</strong>任何电子设备（计算器、手机、电子词典等）</li>
                    <li><strong>禁止携带</strong>发声机械键盘、具有拍照功能的游标卡尺</li>
                    <li><strong>允许携带</strong>：写有签名的《深入浅出程序设计竞赛 基础篇》封皮、印有指定照片的文化衫T恤</li>
                </ul>
            </div>

            <h4>👨‍💻 计算机科学重要人物：</h4>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>约翰·冯·诺依曼</strong>：1946年提出存储程序原理，奠定现代电子计算机基本结构</li>
                <li><strong>图灵奖</strong>：计算机领域最相关的奖项之一</li>
            </ul>

            <h4>💡 经典例题：</h4>
            <div class="bg-gray-100 p-4 rounded-md mt-4">
                <p><strong>2023 SCP-J1 题15：</strong>今年是CCF第（）次举办CSP-J/S认证？</p>
                <p><strong>A.</strong> 27 <strong>B.</strong> 28 <strong>C.</strong> 5 <strong>D.</strong> 4</p>
                <p class="mt-2 text-green-600"><strong>答案：C</strong></p>
                <p class="text-sm text-gray-600">解析：2023年CCF是第5次举办CSP-J/S认证。</p>
            </div>

            <div class="bg-gray-100 p-4 rounded-md mt-4">
                <p><strong>2021 LGR SCP 题14：</strong>1946年，（）提出了存储程序原理？</p>
                <p><strong>A.</strong> 艾伦·图灵 <strong>B.</strong> 约翰·冯·诺依曼 <strong>C.</strong> 克劳德·香农 <strong>D.</strong> 罗伯特·塔扬</p>
                <p class="mt-2 text-green-600"><strong>答案：B</strong></p>
                <p class="text-sm text-gray-600">解析：1946年，约翰·冯·诺依曼提出了存储程序原理。</p>
            </div>
        `
    },

    'data-representation': {
        title: '🔢 数据表示与进制',
        content: `
            <h3>计算机数据表示基础</h3>
            <p>计算机是二进制机器，所有信息最终都以二进制形式存储和处理。掌握进制转换是基础技能。</p>
            
            <h4>🎯 数据存储形式：</h4>
            <ul class="list-disc pl-6 space-y-2">
                <li>主流计算机存储数据最终都转换成<strong>二进制</strong>数据进行存储</li>
                <li><strong>C++中表示</strong>：以<code>0b</code>开头表示二进制数，如<code>0b1010</code></li>
                <li><strong>八进制</strong>：以<code>0</code>开头，如<code>07654321</code></li>
                <li><strong>十六进制</strong>：以<code>0x</code>开头，如<code>0xFF</code></li>
            </ul>

            <h4>💻 进制转换方法：</h4>
            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <h5><strong>二进制转十进制：</strong></h5>
                <p>101.11₂ = 1×2² + 0×2¹ + 1×2⁰ + 1×2⁻¹ + 1×2⁻² = 4 + 0 + 1 + 0.5 + 0.25 = 5.75₁₀</p>
                
                <h5><strong>十进制小数转八进制：</strong></h5>
                <p>将小数部分不断乘以目标进制基数(8)，取整数部分作为八进制位：</p>
                <pre class="text-sm">0.3 × 8 = 2.4 (取2)
0.4 × 8 = 3.2 (取3)  
0.2 × 8 = 1.6 (取1)
...</pre>
            </div>

            <h4>⚡ 补码表示：</h4>
            <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <p><strong>用于表示有符号整数：</strong></p>
                <ul class="list-disc pl-6 space-y-1">
                    <li>最高位是符号位（0代表正，1代表负）</li>
                    <li>正数的补码就是其本身</li>
                    <li>负数的补码：绝对值的二进制表示<strong>按位取反再加1</strong></li>
                </ul>
            </div>

            <h4>💡 经典例题：</h4>
            <div class="bg-gray-100 p-4 rounded-md mt-4">
                <p><strong>2021 LGR SCP 题1：</strong>以补码存储的8位有符号整数10110111的十进制表示为（）</p>
                <p><strong>A.</strong> -73 <strong>B.</strong> 183 <strong>C.</strong> 72 <strong>D.</strong> -72</p>
                <div class="mt-2">
                    <p class="text-green-600"><strong>答案：A</strong></p>
                    <p class="text-sm text-gray-600">解析：最高位为1表示负数，补码10110111减1得10110110，按位取反得01001001 = 73，所以原数为-73。</p>
                </div>
            </div>

            <div class="bg-gray-100 p-4 rounded-md mt-4">
                <p><strong>2023 CSP-J1 题9：</strong>数101010₂和166₈的和为（）</p>
                <p><strong>A.</strong> 10110000₂ <strong>B.</strong> 236₈ <strong>C.</strong> 158₁₀ <strong>D.</strong> A0₁₆</p>
                <div class="mt-2">
                    <p class="text-green-600"><strong>答案：A</strong></p>
                    <p class="text-sm text-gray-600">解析：101010₂ = 42₁₀，166₈ = 118₁₀，42+118=160₁₀ = 10100000₂</p>
                </div>
            </div>
        `
    },

    'logical-operations': {
        title: '🔀 逻辑运算与短路',
        content: `
            <h3>逻辑运算基础</h3>
            <p>逻辑运算是计算机处理布尔值的重要工具，掌握运算规则、优先级和短路策略是关键。</p>
            
            <h4>🎯 基本运算规则：</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-red-50 p-3 rounded border-l-4 border-red-400">
                    <h5><strong>与运算 (&)</strong></h5>
                    <pre class="text-sm">0 & 0 = 0
0 & 1 = 0
1 & 0 = 0
1 & 1 = 1</pre>
                    <p class="text-xs mt-2">只有都为真时结果才为真</p>
                </div>
                <div class="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                    <h5><strong>或运算 (|)</strong></h5>
                    <pre class="text-sm">0 | 0 = 0
0 | 1 = 1
1 | 0 = 1
1 | 1 = 1</pre>
                    <p class="text-xs mt-2">有一个为真结果就为真</p>
                </div>
                <div class="bg-green-50 p-3 rounded border-l-4 border-green-400">
                    <h5><strong>异或运算 (^)</strong></h5>
                    <pre class="text-sm">0 ^ 0 = 0
0 ^ 1 = 1
1 ^ 0 = 1
1 ^ 1 = 0</pre>
                    <p class="text-xs mt-2">两个不同时结果为真</p>
                </div>
            </div>

            <h4>⚡ 运算优先级：</h4>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>括号内部分优先运算</strong></li>
                <li><strong>& 运算优先于 | 运算</strong></li>
                <li><strong>同级运算从左到右</strong></li>
                <li>例：<code>0|1&0</code> 等同于 <code>0|(1&0)</code></li>
            </ul>

            <h4>🚀 短路策略 (Short-Circuiting)：</h4>
            <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <p><strong>与运算短路：</strong>如果a为0，则a&b不需要计算b</p>
                <p><strong>或运算短路：</strong>如果a为1，则a|b不需要计算b</p>
                <p class="text-sm mt-2"><strong>注意：</strong>被外层短路包含的内层短路不计入统计次数</p>
            </div>

            <h4>💡 经典例题：</h4>
            <div class="bg-gray-100 p-4 rounded-md mt-4">
                <p><strong>2023 SCP-J1 题5：</strong>已知a=1010001010₂，b=1110100110₂，则(a&b)^(a|b)的值为（）</p>
                <p><strong>A.</strong> 0011011010₂ <strong>B.</strong> 0100101100₂ <strong>C.</strong> 0011010010₂ <strong>D.</strong> 0100101000₂</p>
                <div class="mt-2">
                    <p class="text-green-600"><strong>答案：B</strong></p>
                    <div class="text-sm text-gray-600 mt-2">
                        <p>解析：</p>
                        <pre>a&b: 1010000010
a|b: 1110101110
异或: 0100101100</pre>
                    </div>
                </div>
            </div>

            <div class="bg-gray-100 p-4 rounded-md mt-4">
                <p><strong>2022 CSP-J2 逻辑表达式：</strong>计算0&(1|0)|(1|1|1&0)的值和短路次数</p>
                <div class="mt-2">
                    <p class="text-green-600"><strong>答案：值=1，&短路1次，|短路2次</strong></p>
                    <div class="text-sm text-gray-600 mt-2">
                        <p>解析过程：</p>
                        <ol class="list-decimal pl-6">
                            <li>0&(1|0)发生&短路，值为0</li>
                            <li>(1|1)发生|短路，值为1</li>
                            <li>1|(1&0)发生|短路，值为1</li>
                            <li>最终0|1=1</li>
                        </ol>
                    </div>
                </div>
            </div>
        `
    },

    'data-structures': {
        title: '📊 基本数据结构',
        content: `
            <h3>基本数据结构概念</h3>
            <p>数据结构是组织和存储数据的方式，直接影响算法效率。理解各种数据结构的特点是编程基础。</p>
            
            <h4>🎯 数组 (Arrays)：</h4>
            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <h5><strong>特点：</strong></h5>
                <ul class="list-disc pl-6 space-y-1">
                    <li><strong>大小固定</strong>：创建后大小不能改变</li>
                    <li><strong>连续存储</strong>：元素在内存中连续排列</li>
                    <li><strong>随机访问</strong>：可通过下标O(1)时间访问</li>
                    <li><strong>插入删除</strong>：需要移动元素，效率较低</li>
                </ul>
                <p class="text-sm mt-2"><strong>存储方式：</strong>按行优先存储，按行读取效率更高</p>
            </div>

            <h4>🔗 链表 (Linked Lists)：</h4>
            <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <h5><strong>特点：</strong></h5>
                <ul class="list-disc pl-6 space-y-1">
                    <li><strong>动态大小</strong>：可以动态增删节点</li>
                    <li><strong>不连续存储</strong>：通过指针连接</li>
                    <li><strong>顺序访问</strong>：必须从头开始遍历</li>
                    <li><strong>插入删除</strong>：只需修改指针，效率高</li>
                </ul>
                <p class="text-sm mt-2"><strong>双向循环链表插入：</strong>s->next=p->next; p->next->prev=s; s->prev=p; p->next=s;</p>
            </div>

            <h4>📚 栈 (Stack)：</h4>
            <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <h5><strong>LIFO原则：</strong>后进先出 (Last In First Out)</h5>
                <ul class="list-disc pl-6 space-y-1">
                    <li><strong>基本操作</strong>：push(压栈)、pop(弹栈)</li>
                    <li><strong>应用场景</strong>：函数调用、DFS深度优先搜索</li>
                    <li><strong>出栈序列</strong>：必须遵循LIFO原则</li>
                </ul>
            </div>

            <h4>🎰 队列 (Queue)：</h4>
            <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <h5><strong>FIFO原则：</strong>先进先出 (First In First Out)</h5>
                <ul class="list-disc pl-6 space-y-1">
                    <li><strong>基本操作</strong>：enqueue(入队)、dequeue(出队)</li>
                    <li><strong>应用场景</strong>：BFS广度优先搜索、任务调度</li>
                    <li><strong>实现方式</strong>：可以用两个栈实现队列</li>
                </ul>
            </div>

            <h4>💡 经典例题：</h4>
            <div class="bg-gray-100 p-4 rounded-md mt-4">
                <p><strong>2019 CCF CSP-J1 题6：</strong>链表不具有的特点是（）</p>
                <p><strong>A.</strong> 插入删除不需要移动元素 <strong>B.</strong> 不必事先存储连续空间<br>
                <strong>C.</strong> 所需空间与长度成正比 <strong>D.</strong> 可随机访问任一元素</p>
                <div class="mt-2">
                    <p class="text-green-600"><strong>答案：D</strong></p>
                    <p class="text-sm text-gray-600">解析：链表无法随机访问，必须顺序遍历。随机访问是数组的特点。</p>
                </div>
            </div>

            <div class="bg-gray-100 p-4 rounded-md mt-4">
                <p><strong>2021 CSP-J1 题5：</strong>入栈顺序为a,b,c,d,e，下列哪个不是合法的出栈序列？</p>
                <p><strong>A.</strong> a,b,c,d,e <strong>B.</strong> e,d,c,b,a <strong>C.</strong> b,a,c,d,e <strong>D.</strong> c,d,a,e,b</p>
                <div class="mt-2">
                    <p class="text-green-600"><strong>答案：D</strong></p>
                    <p class="text-sm text-gray-600">解析：序列c,d,a,e,b违反了LIFO原则，a要出栈时b必须先出栈。</p>
                </div>
            </div>
        `
    },

    'algorithms-basic': {
        title: '🏃 基础算法思想',
        content: `
            <h3>常用算法与复杂度分析</h3>
            <p>掌握基本算法思想是CSP-J竞赛的核心要求，包括排序、搜索、递归等经典算法。</p>
            
            <h4>🔄 排序算法：</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
                    <h5><strong>冒泡排序</strong></h5>
                    <p class="text-sm">相邻元素比较交换，大元素"冒泡"到后面</p>
                    <p class="text-xs text-gray-600">时间复杂度：O(n²)</p>
                    <pre class="text-xs mt-2">for(i=0; i&lt;n-1; i++)
  for(j=0; j&lt;n-1-i; j++)
    if(arr[j] > arr[j+1])
      swap(arr[j], arr[j+1]);</pre>
                </div>
                <div class="bg-green-50 p-4 rounded border-l-4 border-green-400">
                    <h5><strong>选择排序</strong></h5>
                    <p class="text-sm">每次选择最小元素放到前面</p>
                    <p class="text-xs text-gray-600">时间复杂度：O(n²)</p>
                    <pre class="text-xs mt-2">for(i=0; i&lt;n-1; i++){
  int min_idx = i;
  for(j=i+1; j&lt;n; j++)
    if(arr[j] < arr[min_idx])
      min_idx = j;
  swap(arr[i], arr[min_idx]);
}</pre>
                </div>
            </div>

            <h4>🔍 搜索算法：</h4>
            <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <h5><strong>二分搜索（需要有序数组）：</strong></h5>
                <pre class="text-sm">int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;  // 未找到
}</pre>
                <p class="text-sm mt-2"><strong>时间复杂度：</strong>O(log n)</p>
            </div>

            <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <h5><strong>线性搜索：</strong></h5>
                <pre class="text-sm">int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;  // 未找到
}</pre>
                <p class="text-sm mt-2"><strong>时间复杂度：</strong>O(n)</p>
            </div>

            <h4>🌀 递归算法：</h4>
            <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                <h5><strong>经典递归示例：</strong></h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <p><strong>阶乘计算：</strong></p>
                        <pre class="text-xs">int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}</pre>
                    </div>
                    <div>
                        <p><strong>最大公约数：</strong></p>
                        <pre class="text-xs">int gcd(int a, int b) {
    if (b == 0) return a;
                    return gcd(b, a % b);
}</pre>
                    </div>
                </div>
            </div>

            <h4>⏱️ 时间复杂度分析：</h4>
            <div class="bg-gray-50 p-4 rounded-lg">
                <div class="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                    <div class="text-center p-2 bg-green-200 rounded">
                        <div class="font-bold">O(1)</div>
                        <div class="text-xs">常数时间</div>
                        <div class="text-xs">数组访问</div>
                    </div>
                    <div class="text-center p-2 bg-blue-200 rounded">
                        <div class="font-bold">O(log n)</div>
                        <div class="text-xs">对数时间</div>
                        <div class="text-xs">二分搜索</div>
                    </div>
                    <div class="text-center p-2 bg-yellow-200 rounded">
                        <div class="font-bold">O(n)</div>
                        <div class="text-xs">线性时间</div>
                        <div class="text-xs">遍历数组</div>
                    </div>
                    <div class="text-center p-2 bg-orange-200 rounded">
                        <div class="font-bold">O(n log n)</div>
                        <div class="text-xs">分治时间</div>
                        <div class="text-xs">快速排序</div>
                    </div>
                    <div class="text-center p-2 bg-red-200 rounded">
                        <div class="font-bold">O(n²)</div>
                        <div class="text-xs">平方时间</div>
                        <div class="text-xs">冒泡排序</div>
                    </div>
                </div>
            </div>

            <h4>💡 算法选择原则：</h4>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>数据规模小</strong>：简单算法即可（如选择排序）</li>
                <li><strong>数据已排序</strong>：选择二分搜索</li>
                <li><strong>需要稳定排序</strong>：选择稳定的排序算法</li>
                <li><strong>内存限制严格</strong>：选择原地算法</li>
            </ul>
        `
    },

    'cpp-basics': {
        title: '💻 C++程序设计基础',
        content: `
            <h3>C++程序设计基础</h3>
            <p>C++是CSP-J竞赛的主要编程语言，掌握基本语法、数据类型和程序结构是基础。</p>
            
            <h4>🎯 程序基本结构：</h4>
            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <pre class="text-sm">#include &lt;iostream&gt;
using namespace std;

int main() {
    // 程序主体
    cout << "Hello, CSP-J!" << endl;
    return 0;  // 程序正常结束
}</pre>
                <p class="text-sm mt-2"><strong>要点：</strong>int main()是C++程序的标准入口函数</p>
            </div>

            <h4>📊 基本数据类型：</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-green-50 p-3 rounded">
                    <h5><strong>整数类型：</strong></h5>
                    <ul class="text-sm space-y-1">
                        <li><code>int</code>：通常32位，范围约±21亿</li>
                        <li><code>long long</code>：64位，范围更大</li>
                        <li><code>short</code>：16位短整型</li>
                    </ul>
                </div>
                <div class="bg-yellow-50 p-3 rounded">
                    <h5><strong>浮点类型：</strong></h5>
                    <ul class="text-sm space-y-1">
                        <li><code>float</code>：单精度浮点数</li>
                        <li><code>double</code>：双精度浮点数</li>
                    </ul>
                </div>
            </div>

            <h4>🔤 变量与常量：</h4>
            <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <h5><strong>变量声明与初始化：</strong></h5>
                <pre class="text-sm">int a = 10;           // 整数变量
double pi = 3.14159;  // 浮点变量
char grade = 'A';     // 字符变量
bool flag = true;     // 布尔变量</pre>
                
                <h5><strong>常量定义：</strong></h5>
                <pre class="text-sm">const int MAX_SIZE = 1000;  // 常量定义
#define PI 3.14159          // 宏定义</pre>
            </div>

            <h4>🔄 控制结构：</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-red-50 p-3 rounded">
                    <h5><strong>条件语句：</strong></h5>
                    <pre class="text-xs">if (condition) {
    // 语句块
} else if (condition) {
    // 语句块  
} else {
    // 语句块
}</pre>
                </div>
                <div class="bg-blue-50 p-3 rounded">
                    <h5><strong>for循环：</strong></h5>
                    <pre class="text-xs">for (int i = 0; i < n; i++) {
    // 循环体
}

// 增强for循环
for (int x : arr) {
    cout << x << " ";
}</pre>
                </div>
                <div class="bg-green-50 p-3 rounded">
                    <h5><strong>while循环：</strong></h5>
                    <pre class="text-xs">while (condition) {
    // 循环体
}

do {
    // 至少执行一次
} while (condition);</pre>
                </div>
            </div>

            <h4>📚 数组操作：</h4>
            <div class="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                <h5><strong>一维数组：</strong></h5>
                <pre class="text-sm">int arr[100];           // 声明数组
int nums[] = {1,2,3,4}; // 初始化数组
cout << arr[0];         // 访问元素</pre>
                
                <h5><strong>二维数组：</strong></h5>
                <pre class="text-sm">int matrix[10][10];     // 二维数组
matrix[i][j] = value;   // 赋值
// 遍历：外层行，内层列效率更高</pre>
            </div>

            <h4>🛠️ 函数定义：</h4>
            <div class="bg-gray-50 p-4 rounded-lg">
                <pre class="text-sm">// 函数声明
int add(int a, int b);

// 函数定义  
int add(int a, int b) {
    return a + b;
}

// 递归函数示例
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}</pre>
            </div>

            <h4>💡 经典例题：</h4>
            <div class="bg-gray-100 p-4 rounded-md mt-4">
                <p><strong>题目：</strong>以下哪个是C++程序的正确入口函数？</p>
                <p><strong>A.</strong> void main() <strong>B.</strong> int main() <strong>C.</strong> main() <strong>D.</strong> start()</p>
                <div class="mt-2">
                    <p class="text-green-600"><strong>答案：B</strong></p>
                    <p class="text-sm text-gray-600">解析：C++程序的标准入口函数是int main()。</p>
                </div>
            </div>
        `
    },

    'file-operations': {
        title: '📁 文件输入输出',
        content: `
            <h3>文件输入输出操作</h3>
            <p>在CSP-J竞赛中，很多题目需要从文件读取数据并输出到文件，掌握文件操作是必备技能。</p>
            
            <h4>🎯 文件操作基础：</h4>
            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <h5><strong>基本文件操作：</strong></h5>
                <pre class="text-sm">#include &lt;fstream&gt;
using namespace std;

int main() {
    // 打开输入文件
    ifstream fin("input.txt");
    // 打开输出文件
    ofstream fout("output.txt");
    
    int n;
    fin >> n;              // 从文件读取
    fout << n * 2 << endl; // 写入文件
    
    fin.close();           // 关闭文件
    fout.close();
    return 0;
}</pre>
            </div>

            <h4>📊 重定向方法（推荐）：</h4>
            <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <h5><strong>使用freopen进行重定向：</strong></h5>
                <pre class="text-sm">#include &lt;iostream&gt;
#include &lt;cstdio&gt;
using namespace std;

int main() {
    freopen("input.txt", "r", stdin);   // 重定向标准输入
    freopen("output.txt", "w", stdout); // 重定向标准输出
    
    int n;
    cin >> n;              // 实际从input.txt读取
    cout << n * 2 << endl; // 实际写入output.txt
    
    return 0;
}</pre>
                <p class="text-sm mt-2"><strong>优势：</strong>使用cin/cout，代码更简洁，易于调试</p>
            </div>

            <h4>🔄 常见文件操作模式：</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-yellow-50 p-3 rounded">
                    <h5><strong>读取模式：</strong></h5>
                    <ul class="text-sm space-y-1">
                        <li><code>"r"</code>：只读模式</li>
                        <li><code>ifstream</code>：输入文件流</li>
                        <li><code>fin.eof()</code>：检查文件结尾</li>
                    </ul>
                </div>
                <div class="bg-purple-50 p-3 rounded">
                    <h5><strong>写入模式：</strong></h5>
                    <ul class="text-sm space-y-1">
                        <li><code>"w"</code>：写入模式（覆盖）</li>
                        <li><code>"a"</code>：追加模式</li>
                        <li><code>ofstream</code>：输出文件流</li>
                    </ul>
                </div>
            </div>

            <h4>💻 实际应用示例：</h4>
            <div class="bg-gray-50 p-4 rounded-lg">
                <h5><strong>题目：求两个数的和</strong></h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                        <p class="text-sm font-semibold">输入文件(input.txt)：</p>
                        <pre class="text-sm bg-white p-2 rounded">10 20</pre>
                        
                        <p class="text-sm font-semibold mt-2">期望输出(output.txt)：</p>
                        <pre class="text-sm bg-white p-2 rounded">30</pre>
                    </div>
                    <div>
                        <p class="text-sm font-semibold">程序代码：</p>
                        <pre class="text-xs bg-white p-2 rounded">#include &lt;iostream&gt;
#include &lt;cstdio&gt;
using namespace std;

int main() {
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);
    
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    
    return 0;
}</pre>
                    </div>
                </div>
            </div>

            <h4>⚠️ 注意事项：</h4>
            <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                <ul class="list-disc pl-6 space-y-2">
                    <li><strong>文件路径</strong>：确保输入文件存在，输出文件会自动创建</li>
                    <li><strong>文件关闭</strong>：使用文件流记得关闭文件</li>
                    <li><strong>错误处理</strong>：检查文件是否成功打开</li>
                    <li><strong>调试技巧</strong>：开发时可以注释掉freopen语句，使用键盘输入调试</li>
                </ul>
            </div>

            <h4>🛠️ 错误处理示例：</h4>
            <div class="bg-orange-50 p-4 rounded-lg">
                <pre class="text-sm">ifstream fin("input.txt");
if (!fin.is_open()) {
    cout << "无法打开输入文件!" << endl;
    return -1;
}

ofstream fout("output.txt");
if (!fout.is_open()) {
    cout << "无法创建输出文件!" << endl;
    return -1;
}</pre>
            </div>

            <h4>💡 经典应用场景：</h4>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>大数据处理</strong>：处理无法全部加载到内存的数据</li>
                <li><strong>批量测试</strong>：自动化测试多个测试用例</li>
                <li><strong>结果保存</strong>：将计算结果保存到文件中</li>
                <li><strong>竞赛题目</strong>：按照题目要求的输入输出格式</li>
            </ul>
        `
    },

    'exam-experience': {
        title: '🏅 应试技巧与经验',
        content: `
            <h3>CSP-J应试技巧与考场经验</h3>
            <p>除了掌握知识点外，合理的应试策略和考场技巧同样重要，能帮助你在考试中发挥最佳水平。</p>
            
            <h4>⏰ 时间分配策略：</h4>
            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <h5><strong>第一轮（初赛）时间分配：</strong></h5>
                <ul class="list-disc pl-6 space-y-2">
                    <li><strong>前30分钟</strong>：快速完成基础概念题（前10-12题）</li>
                    <li><strong>中间60分钟</strong>：仔细分析逻辑运算、数据结构等中等难度题</li>
                    <li><strong>最后30分钟</strong>：攻克算法分析、复杂应用题</li>
                    <li><strong>检查时间</strong>：预留10-15分钟检查答案</li>
                </ul>
            </div>

            <h4>🎯 答题策略：</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-green-50 p-4 rounded border-l-4 border-green-400">
                    <h5><strong>选择题技巧：</strong></h5>
                    <ul class="text-sm space-y-1">
                        <li>先易后难，建立信心</li>
                        <li>排除法缩小选项范围</li>
                        <li>注意题目中的关键词</li>
                        <li>计算题要验算</li>
                        <li>不确定的题目做标记</li>
                    </ul>
                </div>
                <div class="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                    <h5><strong>常见陷阱：</strong></h5>
                    <ul class="text-sm space-y-1">
                        <li>进制转换计算错误</li>
                        <li>逻辑运算优先级混乱</li>
                        <li>栈队列操作顺序错误</li>
                        <li>时间复杂度分析不准确</li>
                        <li>数据范围溢出问题</li>
                    </ul>
                </div>
            </div>

            <h4>📝 第二轮（复赛）策略：</h4>
            <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <h5><strong>编程题解决步骤：</strong></h5>
                <ol class="list-decimal pl-6 space-y-2">
                    <li><strong>读题理解</strong>：仔细分析题意，理解输入输出格式</li>
                    <li><strong>样例分析</strong>：手动模拟样例，验证理解是否正确</li>
                    <li><strong>算法设计</strong>：选择合适的算法和数据结构</li>
                    <li><strong>代码实现</strong>：编写代码，注意边界条件</li>
                    <li><strong>样例测试</strong>：用样例数据测试程序</li>
                    <li><strong>代码检查</strong>：检查语法、逻辑错误</li>
                </ol>
            </div>

            <h4>🐛 调试技巧：</h4>
            <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                <h5><strong>常见错误检查：</strong></h5>
                <ul class="list-disc pl-6 space-y-2">
                    <li><strong>数组越界</strong>：检查循环边界条件</li>
                    <li><strong>变量初始化</strong>：确保变量有初始值</li>
                    <li><strong>数据类型</strong>：注意整数溢出问题</li>
                    <li><strong>输入输出</strong>：格式要与题目要求完全一致</li>
                    <li><strong>特殊情况</strong>：考虑边界条件和特殊输入</li>
                </ul>
            </div>

            <h4>💡 考场心态调整：</h4>
            <div class="bg-orange-50 p-4 rounded-lg">
                <h5><strong>心理准备：</strong></h5>
                <ul class="list-disc pl-6 space-y-2">
                    <li><strong>保持冷静</strong>：遇到难题不要慌张，先跳过</li>
                    <li><strong>合理取舍</strong>：确保会做的题目不丢分</li>
                    <li><strong>时间意识</strong>：定期查看时间，控制答题节奏</li>
                    <li><strong>细心检查</strong>：计算题要验算，程序要测试</li>
                </ul>
            </div>

            <h4>📋 考前准备清单：</h4>
            <div class="bg-gray-50 p-4 rounded-lg">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h5><strong>知识准备：</strong></h5>
                        <ul class="text-sm space-y-1">
                            <li>✅ 熟练掌握进制转换</li>
                            <li>✅ 理解逻辑运算规则</li>
                            <li>✅ 掌握数据结构特点</li>
                            <li>✅ 熟悉基本算法</li>
                            <li>✅ 练习文件输入输出</li>
                        </ul>
                    </div>
                    <div>
                        <h5><strong>考场物品：</strong></h5>
                        <ul class="text-sm space-y-1">
                            <li>✅ 身份证、准考证</li>
                            <li>✅ 黑色签字笔（多支）</li>
                            <li>✅ 2B铅笔、橡皮</li>
                            <li>✅ 允许的参考资料</li>
                            <li>❌ 电子设备（禁止携带）</li>
                        </ul>
                    </div>
                </div>
            </div>

            <h4>🏆 提分技巧：</h4>
            <div class="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
                <ul class="list-disc pl-6 space-y-2">
                    <li><strong>刷真题</strong>：多做历年真题，熟悉题型和难度</li>
                    <li><strong>总结规律</strong>：归纳常见考点和解题方法</li>
                    <li><strong>模拟练习</strong>：按考试时间完成模拟测试</li>
                    <li><strong>弱点突破</strong>：针对薄弱环节重点练习</li>
                    <li><strong>代码模板</strong>：熟记常用算法模板</li>
                </ul>
            </div>

            <h4>📈 成绩目标设定：</h4>
            <div class="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                    <div class="bg-white p-3 rounded">
                        <div class="text-lg font-bold text-green-600">及格目标</div>
                        <div class="text-sm">初赛60分以上</div>
                        <div class="text-xs text-gray-600">掌握基础知识点</div>
                    </div>
                    <div class="bg-white p-3 rounded">
                        <div class="text-lg font-bold text-blue-600">优秀目标</div>
                        <div class="text-sm">初赛75分以上</div>
                        <div class="text-xs text-gray-600">进入复赛资格</div>
                    </div>
                    <div class="bg-white p-3 rounded">
                        <div class="text-lg font-bold text-purple-600">顶尖目标</div>
                        <div class="text-sm">复赛获奖</div>
                        <div class="text-xs text-gray-600">冲击一等奖</div>
                    </div>
                </div>
            </div>
        `
    }
};