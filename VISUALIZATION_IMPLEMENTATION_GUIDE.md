# 新算法可视化实现指南

## 🎯 实现策略

考虑到工作量,我建议分两步走:
1. **第一步**: 先更新算法数据和描述(立即可用)
2. **第二步**: 逐个实现可视化动画(按需添加)

---

## 📝 第一步:更新算法数据(立即执行)

### 使用PowerShell脚本自动更新

我将创建一个脚本,自动将12个算法的数据更新到HTML文件中。

**脚本功能**:
- 读取 `algorithms_data_enhanced.js` 中的算法数据
- 自动替换HTML文件中的算法数组
- 保留其他代码不变
- 创建备份文件

**使用方法**:
```powershell
powershell -ExecutionPolicy Bypass -File d:\CSPJ\update_algorithms_auto.ps1
```

---

## 🎨 第二步:实现可视化(示例代码)

### 示例1: 快速排序可视化

```javascript
async runQuickSort() {
    let arr = [...viz.data];
    
    async function partition(arr, low, high) {
        let pivot = arr[high];
        let i = low - 1;
        
        // 高亮基准元素
        viz.highlightCode(3); // pivot = arr[high]
        viz.renderBars(arr, [high], []);
        viz.log(`选择基准: ${pivot}`);
        await viz.wait();
        
        for (let j = low; j < high; j++) {
            viz.highlightCode(7); // if arr[j] <= pivot
            viz.renderBars(arr, [j, high], []);
            await viz.wait();
            
            if (arr[j] <= pivot) {
                i++;
                viz.highlightCode(9); // swap
                [arr[i], arr[j]] = [arr[j], arr[i]];
                viz.renderBars(arr, [i, j], []);
                viz.log(`交换 ${arr[i]} 和 ${arr[j]}`);
                await viz.wait();
            }
        }
        
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        viz.renderBars(arr, [i + 1], []);
        return i + 1;
    }
    
    async function quickSortHelper(arr, low, high) {
        if (low < high) {
            let pi = await partition(arr, low, high);
            await quickSortHelper(arr, low, pi - 1);
            await quickSortHelper(arr, pi + 1, high);
        }
    }
    
    await quickSortHelper(arr, 0, arr.length - 1);
    viz.renderBars(arr, [], arr.map((_, i) => i));
    viz.log("✅ 快速排序完成");
}
```

### 示例2: 归并排序可视化

```javascript
async runMergeSort() {
    let arr = [...viz.data];
    
    async function merge(arr, l, m, r) {
        let n1 = m - l + 1;
        let n2 = r - m;
        let L = arr.slice(l, m + 1);
        let R = arr.slice(m + 1, r + 1);
        
        viz.log(`合并 [${l},${m}] 和 [${m+1},${r}]`);
        viz.renderBars(arr, Array.from({length: r-l+1}, (_, i) => l+i), []);
        await viz.wait();
        
        let i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            viz.highlightCode(10);
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
        
        viz.renderBars(arr, [], Array.from({length: r-l+1}, (_, i) => l+i));
    }
    
    async function mergeSortHelper(arr, l, r) {
        if (l < r) {
            let m = Math.floor((l + r) / 2);
            await mergeSortHelper(arr, l, m);
            await mergeSortHelper(arr, m + 1, r);
            await merge(arr, l, m, r);
        }
    }
    
    await mergeSortHelper(arr, 0, arr.length - 1);
    viz.log("✅ 归并排序完成");
}
```

### 示例3: 递归算法可视化(调用栈)

```javascript
async runRecursion() {
    const n = 5; // 计算5!
    let callStack = [];
    
    // 扩展渲染方法
    viz.renderCallStack = function(stack) {
        const container = document.getElementById('viz-canvas');
        container.innerHTML = '';
        container.className = 'flex-1 flex flex-col items-center justify-center gap-2 p-4';
        
        stack.forEach((call, idx) => {
            const frame = document.createElement('div');
            frame.className = 'bg-blue-100 border-2 border-blue-500 rounded-lg p-4 w-64 text-center';
            frame.innerHTML = `
                <div class="font-bold text-lg">factorial(${call.n})</div>
                <div class="text-sm text-gray-600">${call.status}</div>
            `;
            container.appendChild(frame);
        });
    };
    
    async function factorial(n) {
        callStack.push({ n, status: '调用' });
        viz.renderCallStack(callStack);
        viz.log(`调用 factorial(${n})`);
        await viz.wait();
        
        if (n <= 1) {
            callStack[callStack.length - 1].status = '返回 1';
            viz.renderCallStack(callStack);
            viz.log(`factorial(${n}) = 1`);
            await viz.wait();
            callStack.pop();
            return 1;
        }
        
        const result = n * await factorial(n - 1);
        callStack[callStack.length - 1].status = `返回 ${result}`;
        viz.renderCallStack(callStack);
        viz.log(`factorial(${n}) = ${result}`);
        await viz.wait();
        callStack.pop();
        return result;
    }
    
    const result = await factorial(n);
    viz.log(`✅ ${n}! = ${result}`);
}
```

---

## 🔧 实现步骤

### 步骤1: 运行自动更新脚本
```powershell
# 这将更新算法数据到HTML
powershell -ExecutionPolicy Bypass -File d:\CSPJ\update_algorithms_auto.ps1
```

### 步骤2: 添加可视化函数
在HTML文件的 `selectAlgo` 函数中,为新算法添加对应的可视化函数:

```javascript
selectAlgo(id) {
    // ... 现有代码 ...
    
    // 为新算法添加可视化函数
    viz.start = async () => {
        if (viz.isRunning) return;
        viz.isRunning = true;
        
        // 现有算法
        if (id === 'bubble') await this.runBubbleSort();
        else if (id === 'selection') await this.runSelectionSort();
        else if (id === 'insertion') await this.runInsertionSort();
        else if (id === 'linear') await this.runLinearSearch();
        else if (id === 'binary') await this.runBinarySearch();
        
        // 新增算法
        else if (id === 'quick') await this.runQuickSort();
        else if (id === 'merge') await this.runMergeSort();
        else if (id === 'recursion') await this.runRecursion();
        else if (id === 'iteration') await this.runIteration();
        else if (id === 'greedy') await this.runGreedy();
        else if (id === 'prefix_sum') await this.runPrefixSum();
        else if (id === 'simple_dp') await this.runSimpleDP();
        
        viz.isRunning = false;
    };
}
```

### 步骤3: 实现各个可视化函数
将上面的示例代码添加到 `app` 对象中。

---

## 📦 我将提供的文件

1. **update_algorithms_auto.ps1** - 自动更新脚本
2. **visualizations_quick_merge.js** - 快速/归并排序可视化
3. **visualizations_recursion_dp.js** - 递归/DP可视化
4. **visualizations_advanced.js** - 高级算法可视化

---

## ⚡ 快速开始

**最简单的方法**:
1. 运行自动更新脚本
2. 刷新浏览器
3. 新算法会显示在列表中
4. 点击后会显示代码(暂无动画)
5. 根据需要逐步添加动画

**完整实现**:
1. 运行更新脚本
2. 复制可视化代码到HTML
3. 测试每个算法
4. 优化动画效果

---

下一步,我将创建这些文件...
