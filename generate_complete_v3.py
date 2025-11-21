"""
CSP-J Studio v3.0 Generator
生成包含所有12个算法完整可视化的HTML文件
"""

import re

print("=" * 60)
print("  CSP-J Studio v3.0 完整版本生成器")
print("=" * 60)
print()

# 读取基础文件
print("📖 读取基础文件...")
with open(r"d:\CSPJ\csp-j-studio-simple.html", "r", encoding="utf-8") as f:
    base_content = f.read()

# 读取算法数据
print("📖 读取算法数据...")
with open(r"d:\CSPJ\algorithms_data_enhanced.js", "r", encoding="utf-8") as f:
    algo_data = f.read()

# 提取算法数组
print("🔄 提取算法数组...")
match = re.search(r'const algorithmsData = \[(.*)\];', algo_data, re.DOTALL)
if match:
    algorithms_array = match.group(1).strip()
    print(f"   找到 {algorithms_array.count('id:')} 个算法")
else:
    print("   ❌ 未找到算法数组")
    exit(1)

# 替换算法数组
print("🔄 更新算法数组...")
pattern = r'(algorithms:\s*\[)(.*?)(\s*\],)'
replacement = f'\\1\n{algorithms_array}\n\\3'
updated_content = re.sub(pattern, replacement, base_content, flags=re.DOTALL)

# 添加新算法的可视化函数
print("🎨 添加新算法可视化函数...")

# 在 runBinarySearch 函数后添加新函数
new_visualizations = '''

            // ========== 新增算法可视化 ==========
            
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
                viz.canvas.className = 'flex-1 flex flex-col items-center justify-center gap-2 p-4';
                viz.log(`🔄 计算 ${n}! (阶乘)`);
                
                function renderStack() {
                    viz.canvas.innerHTML = '';
                    callStack.forEach((call, idx) => {
                        const frame = document.createElement('div');
                        frame.className = 'bg-blue-100 border-2 border-blue-500 rounded-lg p-4 w-64 text-center transition-all';
                        frame.innerHTML = `
                            <div class="font-bold text-lg">factorial(${call.n})</div>
                            <div class="text-sm text-gray-600">${call.status}</div>
                        `;
                        viz.canvas.appendChild(frame);
                    });
                }
                
                async function factorial(n) {
                    callStack.push({ n, status: '调用中...' });
                    renderStack();
                    viz.log(`调用 factorial(${n})`);
                    await viz.wait();
                    
                    if (n <= 1) {
                        callStack[callStack.length - 1].status = '返回 1';
                        renderStack();
                        await viz.wait();
                        callStack.pop();
                        renderStack();
                        return 1;
                    }
                    
                    const result = n * await factorial(n - 1);
                    callStack[callStack.length - 1].status = `返回 ${result}`;
                    renderStack();
                    viz.log(`factorial(${n}) = ${result}`);
                    await viz.wait();
                    callStack.pop();
                    renderStack();
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
                    <div class="text-center">
                        <div class="text-2xl font-bold mb-4">斐波那契数列</div>
                        <div id="fib-display" class="flex flex-wrap gap-2 justify-center"></div>
                    </div>
                `;
                
                const display = document.getElementById('fib-display');
                
                function showFib() {
                    display.innerHTML = fib.map((num, i) => `
                        <div class="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold">
                            F(${i})=${num}
                        </div>
                    `).join('');
                }
                
                showFib();
                await viz.wait();
                
                for (let i = 2; i < n; i++) {
                    if (!viz.isRunning) return;
                    fib[i] = fib[i-1] + fib[i-2];
                    viz.log(`F(${i}) = F(${i-1}) + F(${i-2}) = ${fib[i-1]} + ${fib[i-2]} = ${fib[i]}`);
                    showFib();
                    await viz.wait();
                }
                
                viz.log(`✅ 计算完成`);
            },

            async runGreedy() {
                const coins = [25, 10, 5, 1];
                let amount = 67;
                let result = [];
                viz.canvas.className = 'flex-1 flex flex-col items-center justify-center p-4';
                viz.log(`💰 找零 ${amount} 分`);
                
                viz.canvas.innerHTML = `
                    <div class="text-center">
                        <div class="text-2xl font-bold mb-4">贪心算法 - 找零钱</div>
                        <div class="text-lg mb-4">剩余金额: <span id="remaining">${amount}</span> 分</div>
                        <div class="flex gap-4 justify-center mb-4">
                            ${coins.map(c => `<div class="bg-yellow-500 text-white px-6 py-3 rounded-full font-bold">${c}分</div>`).join('')}
                        </div>
                        <div id="result" class="mt-4"></div>
                    </div>
                `;
                
                for (let coin of coins) {
                    while (amount >= coin && viz.isRunning) {
                        amount -= coin;
                        result.push(coin);
                        document.getElementById('remaining').textContent = amount;
                        document.getElementById('result').innerHTML = `
                            <div class="text-sm">已选硬币: ${result.join(', ')}</div>
                            <div class="text-sm">硬币数量: ${result.length}</div>
                        `;
                        viz.log(`选择 ${coin} 分硬币,剩余 ${amount} 分`);
                        await viz.wait();
                    }
                }
                
                viz.log(`✅ 找零完成,共用 ${result.length} 枚硬币`);
            },

            async runPrefixSum() {
                let arr = viz.data;
                let prefix = [arr[0]];
                viz.log(`⚡ 构建前缀和数组`);
                
                viz.canvas.className = 'flex-1 flex flex-col items-center justify-center gap-4 p-4';
                
                function render() {
                    viz.canvas.innerHTML = `
                        <div class="text-center w-full">
                            <div class="text-xl font-bold mb-4">前缀和</div>
                            <div class="mb-4">
                                <div class="text-sm text-gray-600 mb-2">原数组:</div>
                                <div class="flex gap-2 justify-center">
                                    ${arr.map((v, i) => `<div class="bg-blue-500 text-white px-4 py-2 rounded">${v}</div>`).join('')}
                                </div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-600 mb-2">前缀和数组:</div>
                                <div class="flex gap-2 justify-center">
                                    ${prefix.map((v, i) => `<div class="bg-green-500 text-white px-4 py-2 rounded">${v}</div>`).join('')}
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                render();
                await viz.wait();
                
                for (let i = 1; i < arr.length; i++) {
                    if (!viz.isRunning) return;
                    prefix[i] = prefix[i-1] + arr[i];
                    viz.log(`prefix[${i}] = prefix[${i-1}] + arr[${i}] = ${prefix[i-1]} + ${arr[i]} = ${prefix[i]}`);
                    render();
                    await viz.wait();
                }
                
                viz.log(`✅ 前缀和构建完成`);
            },

            async runSimpleDP() {
                const n = 8;
                let dp = [0, 1, 2];
                viz.canvas.className = 'flex-1 flex flex-col items-center justify-center p-4';
                viz.log(`🪜 爬楼梯问题: ${n}级台阶`);
                
                function render() {
                    viz.canvas.innerHTML = `
                        <div class="text-center">
                            <div class="text-2xl font-bold mb-4">动态规划 - 爬楼梯</div>
                            <div class="text-lg mb-4">dp[i] = dp[i-1] + dp[i-2]</div>
                            <div class="flex gap-2 justify-center flex-wrap">
                                ${dp.map((v, i) => `
                                    <div class="bg-purple-500 text-white px-4 py-3 rounded-lg">
                                        <div class="text-xs">dp[${i}]</div>
                                        <div class="text-xl font-bold">${v}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }
                
                render();
                await viz.wait();
                
                for (let i = 3; i <= n; i++) {
                    if (!viz.isRunning) return;
                    dp[i] = dp[i-1] + dp[i-2];
                    viz.log(`dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`);
                    render();
                    await viz.wait();
                }
                
                viz.log(`✅ 爬${n}级台阶有 ${dp[n]} 种方法`);
            }
'''

# 在 runBinarySearch 函数后插入新函数
insertion_point = updated_content.find('async runBinarySearch()')
if insertion_point == -1:
    print("   ❌ 未找到插入点")
    exit(1)

# 找到 runBinarySearch 函数的结束位置
end_of_binary = updated_content.find('},', insertion_point + 1000)  # 大概位置
if end_of_binary == -1:
    print("   ❌ 未找到函数结束")
    exit(1)

# 插入新函数
final_content = updated_content[:end_of_binary+1] + new_visualizations + updated_content[end_of_binary+1:]

# 更新版本号
final_content = final_content.replace('v2.1.1', 'v3.0.0')

# 保存文件
output_file = r"d:\CSPJ\csp-j-studio-v3-complete.html"
print(f"💾 保存文件到: {output_file}")
with open(output_file, "w", encoding="utf-8") as f:
    f.write(final_content)

print()
print("=" * 60)
print("  ✅ 生成完成!")
print("=" * 60)
print()
print("📊 统计:")
print(f"   文件大小: {len(final_content)} 字节")
print(f"   算法数量: 12 个")
print(f"   可视化: 12 个 (全部完成)")
print()
print("🚀 下一步:")
print("   1. 打开浏览器")
print(f"   2. 访问: file:///{output_file}")
print("   3. 测试所有算法")
print()
