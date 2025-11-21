"""
彻底修复 CSP-J Studio 的 JavaScript 结构
重构 app 对象中的算法实现部分，解决嵌套错误
"""

print("=" * 60)
print("  重构算法实现代码")
print("=" * 60)

file_path = r"d:\CSPJ\csp-j-studio-simple.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. 定义正确的 runBinarySearch 及其后的所有新算法代码
# ---------------------------------------------------------
corrected_code = """            async runBinarySearch() {
                let arr = viz.data;
                let target = viz.target;
                let l = 0, r = arr.length - 1;

                viz.highlightCode(0);
                await viz.wait();

                while (l <= r) {
                    viz.highlightCode(1); // while
                    if (!viz.isRunning) return;

                    let m = Math.floor((l + r) / 2);
                    viz.highlightCode(3); // int m = ...
                    viz.log(`检查中间元素索引 ${m}: ${arr[m]}`);

                    // Highlight range and mid
                    viz.renderBoxes(arr, m, -1, { start: l, end: r });
                    await viz.wait();

                    viz.highlightCode(6); // if (arr[m] == x)
                    if (arr[m] === target) {
                        viz.highlightCode(7); // return m
                        viz.log(`✅ 找到目标 ${target} 在索引 ${m}`);
                        viz.renderBoxes(arr, -1, m);
                        return;
                    }

                    viz.highlightCode(10); // if (arr[m] < x)
                    if (arr[m] < target) {
                        viz.highlightCode(11); // l = m + 1
                        l = m + 1;
                        viz.log(`目标大于 ${arr[m]}，搜索右半部分`);
                    } else {
                        viz.highlightCode(14); // else
                        viz.highlightCode(15); // r = m - 1
                        r = m - 1;
                        viz.log(`目标小于 ${arr[m]}，搜索左半部分`);
                    }
                }
                viz.highlightCode(17); // return -1
                viz.log(`❌ 未找到目标 ${target}`);
            },

            async runQuickSort() {
                let arr = [...viz.data];
                viz.log("🚀 开始快速排序");
                
                async function partition(low, high) {
                    let pivot = arr[high];
                    let i = low - 1;
                    
                    viz.highlightCode(2);
                    viz.log(`选择基准: ${pivot}`);
                    viz.renderBars(arr, [high], []);
                    await viz.wait();
                    
                    for (let j = low; j < high; j++) {
                        if (!viz.isRunning) return -1;
                        viz.highlightCode(5);
                        viz.renderBars(arr, [j, high], []);
                        await viz.wait();
                        
                        if (arr[j] <= pivot) {
                            i++;
                            [arr[i], arr[j]] = [arr[j], arr[i]];
                            viz.highlightCode(7);
                            viz.log(`交换 ${arr[i]} 和 ${arr[j]}`);
                            viz.renderBars(arr, [i, j], []);
                            await viz.wait();
                        }
                    }
                    
                    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
                    viz.renderBars(arr, [i + 1], []);
                    await viz.wait();
                    return i + 1;
                }
                
                async function quickSortHelper(low, high) {
                    if (low < high && viz.isRunning) {
                        let pi = await partition(low, high);
                        if (pi === -1) return;
                        await quickSortHelper(low, pi - 1);
                        await quickSortHelper(pi + 1, high);
                    }
                }
                
                await quickSortHelper(0, arr.length - 1);
                viz.data = arr;
                viz.renderBars(arr, [], arr.map((_, i) => i));
                viz.log("✅ 快速排序完成");
            },

            async runMergeSort() {
                let arr = [...viz.data];
                viz.log("🔀 开始归并排序");
                
                async function merge(l, m, r) {
                    let n1 = m - l + 1;
                    let n2 = r - m;
                    let L = arr.slice(l, m + 1);
                    let R = arr.slice(m + 1, r + 1);
                    
                    viz.log(`合并 [${l},${m}] 和 [${m+1},${r}]`);
                    let indices = Array.from({length: r-l+1}, (_, i) => l+i);
                    viz.renderBars(arr, indices, []);
                    await viz.wait();
                    
                    let i = 0, j = 0, k = l;
                    while (i < n1 && j < n2) {
                        if (!viz.isRunning) return;
                        if (L[i] <= R[j]) {
                            arr[k] = L[i];
                            i++;
                        } else {
                            arr[k] = R[j];
                            j++;
                        }
                        viz.renderBars(arr, [k], []);
                        await viz.wait();
                        k++;
                    }
                    
                    while (i < n1) { arr[k++] = L[i++]; }
                    while (j < n2) { arr[k++] = R[j++]; }
                    
                    viz.renderBars(arr, [], indices);
                    await viz.wait();
                }
                
                async function mergeSortHelper(l, r) {
                    if (l < r && viz.isRunning) {
                        let m = Math.floor((l + r) / 2);
                        await mergeSortHelper(l, m);
                        await mergeSortHelper(m + 1, r);
                        await merge(l, m, r);
                    }
                }
                
                await mergeSortHelper(0, arr.length - 1);
                viz.data = arr;
                viz.renderBars(arr, [], arr.map((_, i) => i));
                viz.log("✅ 归并排序完成");
            },

            async runRecursion() {
                const n = 5;
                let callStack = [];
                viz.canvas.className = 'flex-1 flex flex-col items-center justify-center gap-2 p-4 overflow-y-auto';
                viz.log(`🔄 计算 ${n}! (阶乘)`);
                
                function renderStack() {
                    viz.canvas.innerHTML = '';
                    callStack.forEach((call, idx) => {
                        const frame = document.createElement('div');
                        frame.className = 'bg-blue-100 border-2 border-blue-500 rounded-lg p-4 w-64 text-center transition-all shadow-md';
                        frame.innerHTML = `
                            <div class="font-bold text-lg">factorial(${call.n})</div>
                            <div class="text-sm text-gray-600">${call.status}</div>
                        `;
                        viz.canvas.prepend(frame); // 最新调用在最上面
                    });
                }
                
                async function factorial(n) {
                    if (!viz.isRunning) return 0;
                    
                    callStack.push({ n, status: '调用中...' });
                    renderStack();
                    viz.log(`调用 factorial(${n})`);
                    viz.highlightCode(0);
                    await viz.wait();
                    
                    if (n <= 1) {
                        viz.highlightCode(1);
                        callStack[callStack.length - 1].status = '返回 1';
                        renderStack();
                        await viz.wait();
                        callStack.pop();
                        renderStack();
                        return 1;
                    }
                    
                    viz.highlightCode(2);
                    const result = n * await factorial(n - 1);
                    
                    if (callStack.length > 0) {
                        callStack[callStack.length - 1].status = `返回 ${result}`;
                        renderStack();
                        viz.log(`factorial(${n}) = ${result}`);
                        await viz.wait();
                        callStack.pop();
                        renderStack();
                    }
                    return result;
                }
                
                const result = await factorial(n);
                viz.log(`✅ ${n}! = ${result}`);
            },

            async runIteration() {
                const n = 10;
                viz.canvas.className = 'flex-1 flex flex-col items-center justify-center p-4';
                viz.log(`➡️ 计算斐波那契数列前${n}项`);
                
                let fib = [0, 1];
                viz.canvas.innerHTML = `
                    <div class="text-center w-full">
                        <div class="text-2xl font-bold mb-4">斐波那契数列</div>
                        <div id="fib-display" class="flex flex-wrap gap-2 justify-center"></div>
                    </div>
                `;
                
                const display = document.getElementById('fib-display');
                
                function showFib() {
                    if(!display) return;
                    display.innerHTML = fib.map((num, i) => `
                        <div class="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold shadow-sm animate-pulse">
                            F(${i})=${num}
                        </div>
                    `).join('');
                }
                
                viz.highlightCode(2);
                showFib();
                await viz.wait();
                
                for (let i = 2; i <= n; i++) {
                    if (!viz.isRunning) return;
                    viz.highlightCode(3);
                    
                    let val = fib[i-1] + fib[i-2];
                    fib.push(val);
                    
                    viz.log(`F(${i}) = F(${i-1}) + F(${i-2}) = ${fib[i-1]} + ${fib[i-2]} = ${val}`);
                    showFib();
                    await viz.wait();
                }
                
                viz.highlightCode(8);
                viz.log(`✅ 计算完成`);
            },

            async runGreedy() {
                const coins = [25, 10, 5, 1];
                let amount = 67;
                let result = [];
                viz.canvas.className = 'flex-1 flex flex-col items-center justify-center p-4';
                viz.log(`💰 找零 ${amount} 分`);
                
                function render() {
                     viz.canvas.innerHTML = `
                        <div class="text-center w-full max-w-2xl">
                            <div class="text-2xl font-bold mb-6">贪心算法 - 找零钱</div>
                            
                            <div class="flex justify-between items-center mb-8 bg-gray-100 p-4 rounded-xl">
                                <div class="text-xl">目标金额: <span class="font-bold text-red-600">${amount}</span></div>
                                <div class="text-xl">已选硬币数: <span class="font-bold text-blue-600">${result.length}</span></div>
                            </div>

                            <div class="mb-6">
                                <div class="text-sm text-gray-500 mb-2">可用面额</div>
                                <div class="flex gap-4 justify-center">
                                    ${coins.map(c => `<div class="bg-yellow-500 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-md border-4 border-yellow-600">${c}</div>`).join('')}
                                </div>
                            </div>
                            
                            <div class="mt-8">
                                <div class="text-sm text-gray-500 mb-2">已选硬币</div>
                                <div class="flex flex-wrap gap-2 justify-center min-h-[80px] p-4 border-2 border-dashed border-gray-300 rounded-xl">
                                    ${result.map(c => `<div class="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-sm">${c}</div>`).join('')}
                                </div>
                            </div>
                        </div>
                    `;
                }

                render();
                await viz.wait();
                
                viz.highlightCode(2); // for loop
                for (let i = 0; i < coins.length; i++) {
                    let coin = coins[i];
                    
                    viz.highlightCode(3); // while
                    while (amount >= coin) {
                        if (!viz.isRunning) return;
                        
                        viz.highlightCode(4); // amount -= coin
                        amount -= coin;
                        result.push(coin);
                        
                        viz.log(`选择 ${coin} 分硬币, 剩余 ${amount} 分`);
                        render();
                        await viz.wait();
                    }
                }
                
                viz.highlightCode(8);
                viz.log(`✅ 找零完成, 共用 ${result.length} 枚硬币`);
            },

            async runPrefixSum() {
                let arr = [1, 3, 5, 2, 7, 6, 4]; // 使用固定示例数据以便演示
                let prefix = [arr[0]];
                viz.log(`⚡ 构建前缀和数组`);
                
                viz.canvas.className = 'flex-1 flex flex-col items-center justify-center gap-4 p-4';
                
                function render(currIdx = -1) {
                    viz.canvas.innerHTML = `
                        <div class="text-center w-full max-w-3xl">
                            <div class="text-xl font-bold mb-6">前缀和构建</div>
                            
                            <div class="mb-8">
                                <div class="text-sm text-gray-600 mb-2 font-bold">原数组 (arr)</div>
                                <div class="flex gap-2 justify-center">
                                    ${arr.map((v, i) => `
                                        <div class="w-12 h-12 flex items-center justify-center rounded-lg font-bold text-white transition-all ${i === currIdx ? 'bg-red-500 scale-110' : 'bg-blue-500'}">
                                            ${v}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <div>
                                <div class="text-sm text-gray-600 mb-2 font-bold">前缀和数组 (prefix)</div>
                                <div class="flex gap-2 justify-center">
                                    ${prefix.map((v, i) => `
                                        <div class="w-12 h-12 flex items-center justify-center rounded-lg font-bold text-white bg-green-500 shadow-md">
                                            ${v}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                viz.highlightCode(1);
                render(0);
                await viz.wait();
                
                for (let i = 1; i < arr.length; i++) {
                    if (!viz.isRunning) return;
                    
                    viz.highlightCode(2); // for loop
                    
                    let sum = prefix[i-1] + arr[i];
                    prefix.push(sum);
                    
                    viz.highlightCode(3);
                    viz.log(`prefix[${i}] = prefix[${i-1}] (${prefix[i-1]}) + arr[${i}] (${arr[i]}) = ${sum}`);
                    render(i);
                    await viz.wait();
                }
                
                viz.log(`✅ 前缀和构建完成`);
            },

            async runSimpleDP() {
                const n = 8;
                let dp = [0, 1, 2]; // 爬楼梯: 1阶1种, 2阶2种
                viz.canvas.className = 'flex-1 flex flex-col items-center justify-center p-4';
                viz.log(`🪜 爬楼梯问题: ${n}级台阶`);
                
                function render(currIdx = -1) {
                    viz.canvas.innerHTML = `
                        <div class="text-center w-full">
                            <div class="text-2xl font-bold mb-4">动态规划 - 爬楼梯</div>
                            <div class="text-lg mb-8 bg-gray-100 inline-block px-4 py-2 rounded">状态转移方程: <span class="font-mono font-bold text-purple-600">dp[i] = dp[i-1] + dp[i-2]</span></div>
                            
                            <div class="flex gap-3 justify-center flex-wrap max-w-4xl mx-auto">
                                ${Array.from({length: n+1}).map((_, i) => {
                                    if (i === 0) return ''; // 忽略0
                                    const val = dp[i] !== undefined ? dp[i] : '?';
                                    const isCurr = i === currIdx;
                                    const isPrev = i === currIdx - 1 || i === currIdx - 2;
                                    
                                    let bgClass = 'bg-gray-200 text-gray-400';
                                    if (val !== '?') bgClass = 'bg-purple-500 text-white';
                                    if (isCurr) bgClass = 'bg-red-500 text-white scale-110 shadow-xl border-2 border-white';
                                    if (isPrev) bgClass = 'bg-purple-700 text-white opacity-80';
                                    
                                    return `
                                        <div class="${bgClass} w-16 h-20 rounded-lg flex flex-col items-center justify-center transition-all duration-500">
                                            <div class="text-xs opacity-70 mb-1">Step ${i}</div>
                                            <div class="text-xl font-bold">${val}</div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `;
                }
                
                viz.highlightCode(1);
                render();
                await viz.wait();
                
                for (let i = 3; i <= n; i++) {
                    if (!viz.isRunning) return;
                    
                    viz.highlightCode(3); // for loop
                    render(i);
                    await viz.wait();
                    
                    let val = dp[i-1] + dp[i-2];
                    dp[i] = val;
                    
                    viz.highlightCode(4);
                    viz.log(`dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]} = ${val}`);
                    render(i);
                    await viz.wait();
                }
                
                viz.highlightCode(8);
                viz.log(`✅ 爬${n}级台阶有 ${dp[n]} 种方法`);
            }"""

# 2. 定位替换区域
# ---------------------------------------------------------
# 开始：runBinarySearch 的定义行
start_marker = "async runBinarySearch() {"
start_idx = content.find(start_marker)

if start_idx == -1:
    print("❌ 错误：未找到 runBinarySearch 定义")
    exit(1)

# 结束：app 对象的结束标记 "        };"
# 我们从文件末尾向前找
end_marker = "        };"
end_idx = content.rfind(end_marker)

if end_idx == -1:
    print("❌ 错误：未找到 app 对象结束标记")
    exit(1)

print(f"📍 定位成功:")
print(f"   开始位置: {start_idx}")
print(f"   结束位置: {end_idx}")

# 3. 执行替换
# ---------------------------------------------------------
# 保留 start_marker 之前的内容
# 插入 corrected_code
# 保留 end_marker 及其之后的内容
new_content = content[:start_idx] + corrected_code + "\n" + content[end_idx:]

# 4. 保存文件
with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("✅ 成功重构代码结构！")
print("   runBinarySearch 已修复")
print("   所有新算法已正确嵌套")
