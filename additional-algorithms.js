// 额外算法实现和详细解释系统
// Additional Algorithms and Enhanced Explanation System

/**
 * 动态规划算法可视化器
 */
class DynamicProgrammingVisualizer extends AlgorithmVisualizer {
    constructor(containerId, algorithm = 'fibonacci', options = {}) {
        super(containerId, options);
        this.algorithm = algorithm;
        this.dpTable = [];
        this.elements = [];
    }

    initVisualization() {
        const vizContent = document.getElementById('viz-content');
        vizContent.innerHTML = '';
        
        // 根据算法类型准备可视化
        this.prepareDPAnimations();
    }

    prepareDPAnimations() {
        this.animationQueue = [];
        
        switch (this.algorithm) {
            case 'fibonacci':
                this.prepareFibonacci();
                break;
            case 'knapsack':
                this.prepareKnapsack();
                break;
            case 'lis':
                this.prepareLIS();
                break;
            default:
                this.prepareFibonacci();
        }
    }

    /**
     * 斐波那契数列动态规划
     */
    prepareFibonacci() {
        this.updateComplexity('O(n)', 'O(n)', 'O(n)');
        
        const n = 10;
        const dp = new Array(n + 1).fill(0);
        
        this.animationQueue.push({
            type: 'explain',
            text: `斐波那契数列动态规划：计算前 ${n} 项`
        });
        
        // 初始化
        dp[0] = 0;
        dp[1] = 1;
        
        this.animationQueue.push({
            type: 'explain',
            text: 'dp[0] = 0, dp[1] = 1 (基础情况)'
        });
        
        // 动态规划计算
        for (let i = 2; i <= n; i++) {
            dp[i] = dp[i-1] + dp[i-2];
            
            this.animationQueue.push({
                type: 'highlight',
                indices: [i-2, i-1, i],
                color: this.options.colors.comparing
            });
            
            this.animationQueue.push({
                type: 'explain',
                text: `dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`
            });
            
            this.animationQueue.push({
                type: 'update',
                index: i,
                value: dp[i]
            });
        }
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ 斐波那契数列计算完成！第${n}项为 ${dp[n]}`
        });
    }

    /**
     * 0-1背包问题
     */
    prepareKnapsack() {
        this.updateComplexity('O(nW)', 'O(nW)', 'O(nW)');
        
        const weights = [2, 1, 3, 2];
        const values = [12, 10, 20, 15];
        const capacity = 5;
        const n = weights.length;
        
        this.animationQueue.push({
            type: 'explain',
            text: `0-1背包问题：容量=${capacity}，物品数=${n}`
        });
        
        // 创建DP表
        const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
        
        for (let i = 1; i <= n; i++) {
            for (let w = 1; w <= capacity; w++) {
                this.animationQueue.push({
                    type: 'explain',
                    text: `考虑物品${i}：重量=${weights[i-1]}，价值=${values[i-1]}`
                });
                
                if (weights[i-1] <= w) {
                    const include = values[i-1] + dp[i-1][w - weights[i-1]];
                    const exclude = dp[i-1][w];
                    
                    dp[i][w] = Math.max(include, exclude);
                    
                    this.animationQueue.push({
                        type: 'explain',
                        text: `容量${w}：包含=${include}，不包含=${exclude}，选择=${dp[i][w]}`
                    });
                } else {
                    dp[i][w] = dp[i-1][w];
                    
                    this.animationQueue.push({
                        type: 'explain',
                        text: `容量${w}：物品太重，不能包含，dp[${i}][${w}] = ${dp[i][w]}`
                    });
                }
            }
        }
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ 背包问题解决！最大价值为 ${dp[n][capacity]}`
        });
    }

    /**
     * 最长递增子序列
     */
    prepareLIS() {
        this.updateComplexity('O(n²)', 'O(n²)', 'O(n²)');
        
        const arr = [10, 9, 2, 5, 3, 7, 101, 18];
        const n = arr.length;
        const dp = new Array(n).fill(1);
        
        this.animationQueue.push({
            type: 'explain',
            text: `最长递增子序列：数组 [${arr.join(', ')}]`
        });
        
        for (let i = 1; i < n; i++) {
            for (let j = 0; j < i; j++) {
                this.animationQueue.push({
                    type: 'compare',
                    indices: [i, j]
                });
                
                if (arr[i] > arr[j]) {
                    const newLength = dp[j] + 1;
                    if (newLength > dp[i]) {
                        dp[i] = newLength;
                        
                        this.animationQueue.push({
                            type: 'explain',
                            text: `arr[${i}]=${arr[i]} > arr[${j}]=${arr[j]}，更新dp[${i}]=${dp[i]}`
                        });
                        
                        this.animationQueue.push({
                            type: 'update',
                            index: i,
                            value: dp[i]
                        });
                    }
                }
            }
        }
        
        const maxLength = Math.max(...dp);
        this.animationQueue.push({
            type: 'explain',
            text: `✅ 最长递增子序列长度为 ${maxLength}`
        });
    }
}

/**
 * 贪心算法可视化器
 */
class GreedyAlgorithmVisualizer extends AlgorithmVisualizer {
    constructor(containerId, algorithm = 'activity', options = {}) {
        super(containerId, options);
        this.algorithm = algorithm;
    }

    initVisualization() {
        const vizContent = document.getElementById('viz-content');
        vizContent.innerHTML = '';
        
        this.prepareGreedyAnimations();
    }

    prepareGreedyAnimations() {
        this.animationQueue = [];
        
        switch (this.algorithm) {
            case 'activity':
                this.prepareActivitySelection();
                break;
            case 'fractional_knapsack':
                this.prepareFractionalKnapsack();
                break;
            case 'huffman':
                this.prepareHuffmanCoding();
                break;
            default:
                this.prepareActivitySelection();
        }
    }

    /**
     * 活动选择问题
     */
    prepareActivitySelection() {
        this.updateComplexity('O(n log n)', 'O(n log n)', 'O(n log n)');
        
        const activities = [
            { id: 1, start: 1, end: 4 },
            { id: 2, start: 3, end: 5 },
            { id: 3, start: 0, end: 6 },
            { id: 4, start: 5, end: 7 },
            { id: 5, start: 8, end: 9 },
            { id: 6, start: 5, end: 9 }
        ];
        
        this.animationQueue.push({
            type: 'explain',
            text: '活动选择问题：选择最多的不冲突活动'
        });
        
        // 按结束时间排序
        activities.sort((a, b) => a.end - b.end);
        
        this.animationQueue.push({
            type: 'explain',
            text: '贪心策略：按结束时间排序，优先选择结束早的活动'
        });
        
        const selected = [];
        let lastEnd = 0;
        
        for (const activity of activities) {
            this.animationQueue.push({
                type: 'highlight',
                indices: [activity.id],
                color: this.options.colors.comparing
            });
            
            if (activity.start >= lastEnd) {
                selected.push(activity);
                lastEnd = activity.end;
                
                this.animationQueue.push({
                    type: 'highlight',
                    indices: [activity.id],
                    color: this.options.colors.completed
                });
                
                this.animationQueue.push({
                    type: 'explain',
                    text: `选择活动${activity.id}：[${activity.start}, ${activity.end}]`
                });
            } else {
                this.animationQueue.push({
                    type: 'explain',
                    text: `活动${activity.id}与已选活动冲突，跳过`
                });
            }
        }
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ 最多可选择 ${selected.length} 个活动`
        });
    }

    /**
     * 分数背包问题
     */
    prepareFractionalKnapsack() {
        this.updateComplexity('O(n log n)', 'O(n log n)', 'O(n log n)');
        
        const items = [
            { weight: 10, value: 60, ratio: 6 },
            { weight: 20, value: 100, ratio: 5 },
            { weight: 30, value: 120, ratio: 4 }
        ];
        const capacity = 50;
        
        this.animationQueue.push({
            type: 'explain',
            text: `分数背包问题：容量=${capacity}`
        });
        
        // 按价值密度排序
        items.sort((a, b) => b.ratio - a.ratio);
        
        this.animationQueue.push({
            type: 'explain',
            text: '贪心策略：按价值密度(价值/重量)降序排列'
        });
        
        let totalValue = 0;
        let remainingCapacity = capacity;
        
        for (const item of items) {
            this.animationQueue.push({
                type: 'explain',
                text: `考虑物品：重量=${item.weight}，价值=${item.value}，密度=${item.ratio}`
            });
            
            if (item.weight <= remainingCapacity) {
                totalValue += item.value;
                remainingCapacity -= item.weight;
                
                this.animationQueue.push({
                    type: 'explain',
                    text: `完全装入，获得价值${item.value}，剩余容量${remainingCapacity}`
                });
            } else if (remainingCapacity > 0) {
                const fraction = remainingCapacity / item.weight;
                const fractionalValue = item.value * fraction;
                totalValue += fractionalValue;
                
                this.animationQueue.push({
                    type: 'explain',
                    text: `部分装入${(fraction * 100).toFixed(1)}%，获得价值${fractionalValue.toFixed(1)}`
                });
                
                remainingCapacity = 0;
            }
        }
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ 最大价值为 ${totalValue.toFixed(1)}`
        });
    }
}

/**
 * CSP-J真题算法可视化器
 */
class CSPJExamAlgorithmVisualizer extends AlgorithmVisualizer {
    constructor(containerId, algorithm = 'prime-sieve', options = {}) {
        super(containerId, options);
        this.algorithm = algorithm;
        this.elements = [];
    }

    initVisualization() {
        const vizContent = document.getElementById('viz-content');
        vizContent.innerHTML = '';
        
        this.prepareCSPJAnimations();
    }

    prepareCSPJAnimations() {
        this.animationQueue = [];
        
        switch (this.algorithm) {
            case 'prime-sieve':
                this.preparePrimeSieve();
                break;
            case 'gcd-euclidean':
                this.prepareGCDEuclidean();
                break;
            case 'binary-conversion':
                this.prepareBinaryConversion();
                break;
            case 'factorial-recursive':
                this.prepareFactorialRecursive();
                break;
            case 'fibonacci-dp':
                this.prepareFibonacciDP();
                break;
            case 'stack-simulation':
                this.prepareStackSimulation();
                break;
            case 'queue-simulation':
                this.prepareQueueSimulation();
                break;
            default:
                this.preparePrimeSieve();
        }
    }

    /**
     * CSP-J真题：埃拉托斯特尼筛法求质数
     * 考查点：数组操作、循环优化、数学思维
     */
    preparePrimeSieve() {
        this.updateComplexity('O(n log log n)', 'O(n log log n)', 'O(n log log n)');
        
        const n = 30;
        const isPrime = new Array(n + 1).fill(true);
        isPrime[0] = isPrime[1] = false;
        
        this.animationQueue.push({
            type: 'explain',
            text: `🔢 埃拉托斯特尼筛法：寻找2到${n}之间的所有质数`
        });
        
        this.animationQueue.push({
            type: 'explain',
            text: '初始化：假设所有数都是质数，标记0和1为非质数'
        });
        
        for (let i = 2; i * i <= n; i++) {
            if (isPrime[i]) {
                this.animationQueue.push({
                    type: 'highlight',
                    indices: [i],
                    color: this.options.colors.current
                });
                
                this.animationQueue.push({
                    type: 'explain',
                    text: `发现质数 ${i}，开始标记其倍数为合数`
                });
                
                for (let j = i * i; j <= n; j += i) {
                    if (isPrime[j]) {
                        isPrime[j] = false;
                        
                        this.animationQueue.push({
                            type: 'highlight',
                            indices: [j],
                            color: this.options.colors.comparing
                        });
                        
                        this.animationQueue.push({
                            type: 'explain',
                            text: `标记 ${j} = ${i} × ${j/i} 为合数`
                        });
                    }
                }
            }
        }
        
        const primes = [];
        for (let i = 2; i <= n; i++) {
            if (isPrime[i]) {
                primes.push(i);
                this.animationQueue.push({
                    type: 'highlight',
                    indices: [i],
                    color: this.options.colors.completed
                });
            }
        }
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ 筛法完成！2到${n}的质数有：${primes.join(', ')}`
        });
    }

    /**
     * CSP-J真题：欧几里得算法求最大公约数
     * 考查点：递归思想、数学推理
     */
    prepareGCDEuclidean() {
        this.updateComplexity('O(log min(a,b))', 'O(log min(a,b))', 'O(log min(a,b))');
        
        let a = 48, b = 18;
        const originalA = a, originalB = b;
        
        this.animationQueue.push({
            type: 'explain',
            text: `🔢 欧几里得算法：求gcd(${originalA}, ${originalB})`
        });
        
        this.animationQueue.push({
            type: 'explain',
            text: '算法原理：gcd(a,b) = gcd(b, a mod b)，直到b=0'
        });
        
        let step = 1;
        while (b !== 0) {
            const remainder = a % b;
            
            this.animationQueue.push({
                type: 'explain',
                text: `步骤${step}: gcd(${a}, ${b})`
            });
            
            this.animationQueue.push({
                type: 'explain',
                text: `${a} ÷ ${b} = ${Math.floor(a/b)} 余 ${remainder}`
            });
            
            this.animationQueue.push({
                type: 'explain',
                text: `更新：a = ${b}, b = ${remainder}`
            });
            
            a = b;
            b = remainder;
            step++;
        }
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ 算法结束！gcd(${originalA}, ${originalB}) = ${a}`
        });
    }

    /**
     * CSP-J真题：进制转换算法
     * 考查点：进制概念、除法取余
     */
    prepareBinaryConversion() {
        this.updateComplexity('O(log n)', 'O(log n)', 'O(log n)');
        
        const decimal = 42;
        let num = decimal;
        const binaryDigits = [];
        
        this.animationQueue.push({
            type: 'explain',
            text: `🔢 十进制转二进制：将 ${decimal} 转换为二进制`
        });
        
        this.animationQueue.push({
            type: 'explain',
            text: '算法：重复除以2，记录余数，直到商为0'
        });
        
        let step = 1;
        while (num > 0) {
            const remainder = num % 2;
            const quotient = Math.floor(num / 2);
            
            binaryDigits.unshift(remainder);
            
            this.animationQueue.push({
                type: 'explain',
                text: `步骤${step}: ${num} ÷ 2 = ${quotient} 余 ${remainder}`
            });
            
            this.animationQueue.push({
                type: 'explain',
                text: `二进制位：${binaryDigits.join('')} (从右到左读取)`
            });
            
            num = quotient;
            step++;
        }
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ 转换完成！${decimal}(10) = ${binaryDigits.join('')}(2)`
        });
        
        // 验证
        let verification = 0;
        for (let i = 0; i < binaryDigits.length; i++) {
            const power = binaryDigits.length - 1 - i;
            verification += binaryDigits[i] * Math.pow(2, power);
        }
        
        this.animationQueue.push({
            type: 'explain',
            text: `验证：${binaryDigits.map((bit, i) => `${bit}×2^${binaryDigits.length-1-i}`).join(' + ')} = ${verification}`
        });
    }

    /**
     * CSP-J真题：递归阶乘计算
     * 考查点：递归思想、栈概念
     */
    prepareFactorialRecursive() {
        this.updateComplexity('O(n)', 'O(n)', 'O(n)');
        
        const n = 5;
        const callStack = [];
        
        this.animationQueue.push({
            type: 'explain',
            text: `🔢 递归阶乘：计算 ${n}!`
        });
        
        this.animationQueue.push({
            type: 'explain',
            text: '递归定义：n! = n × (n-1)!，基础情况：0! = 1! = 1'
        });
        
        // 模拟递归调用过程
        const simulateFactorial = (num, depth = 0) => {
            callStack.push(`factorial(${num})`);
            
            this.animationQueue.push({
                type: 'explain',
                text: `${'  '.repeat(depth)}调用 factorial(${num})`
            });
            
            this.animationQueue.push({
                type: 'explain',
                text: `调用栈：[${callStack.join(', ')}]`
            });
            
            if (num <= 1) {
                this.animationQueue.push({
                    type: 'explain',
                    text: `${'  '.repeat(depth)}基础情况：factorial(${num}) = 1`
                });
                
                callStack.pop();
                return 1;
            } else {
                this.animationQueue.push({
                    type: 'explain',
                    text: `${'  '.repeat(depth)}递归：factorial(${num}) = ${num} × factorial(${num-1})`
                });
                
                const result = num * simulateFactorial(num - 1, depth + 1);
                
                this.animationQueue.push({
                    type: 'explain',
                    text: `${'  '.repeat(depth)}返回：factorial(${num}) = ${result}`
                });
                
                callStack.pop();
                return result;
            }
        };
        
        const result = simulateFactorial(n);
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ 计算完成！${n}! = ${result}`
        });
    }

    /**
     * CSP-J真题：斐波那契数列动态规划
     * 考查点：动态规划思想、时间复杂度优化
     */
    prepareFibonacciDP() {
        this.updateComplexity('O(n)', 'O(n)', 'O(n)');
        
        const n = 10;
        const dp = new Array(n + 1);
        
        this.animationQueue.push({
            type: 'explain',
            text: `🔢 斐波那契数列(动态规划)：计算F(${n})`
        });
        
        this.animationQueue.push({
            type: 'explain',
            text: '递推关系：F(n) = F(n-1) + F(n-2)，F(0)=0, F(1)=1'
        });
        
        // 初始化
        dp[0] = 0;
        dp[1] = 1;
        
        this.animationQueue.push({
            type: 'explain',
            text: '初始化：F(0) = 0, F(1) = 1'
        });
        
        // 动态规划计算
        for (let i = 2; i <= n; i++) {
            dp[i] = dp[i-1] + dp[i-2];
            
            this.animationQueue.push({
                type: 'explain',
                text: `F(${i}) = F(${i-1}) + F(${i-2}) = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`
            });
            
            this.animationQueue.push({
                type: 'explain',
                text: `当前序列：${dp.slice(0, i+1).join(', ')}`
            });
        }
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ 计算完成！F(${n}) = ${dp[n]}`
        });
        
        this.animationQueue.push({
            type: 'explain',
            text: `完整序列：${dp.join(', ')}`
        });
    }

    /**
     * CSP-J真题：栈的模拟操作
     * 考查点：栈的LIFO特性、表达式求值
     */
    prepareStackSimulation() {
        this.updateComplexity('O(n)', 'O(n)', 'O(n)');
        
        const operations = ['push(5)', 'push(3)', 'push(8)', 'pop()', 'push(2)', 'pop()', 'pop()'];
        const stack = [];
        
        this.animationQueue.push({
            type: 'explain',
            text: '🔢 栈操作模拟：演示LIFO(后进先出)特性'
        });
        
        this.animationQueue.push({
            type: 'explain',
            text: `操作序列：${operations.join(', ')}`
        });
        
        operations.forEach((op, index) => {
            this.animationQueue.push({
                type: 'explain',
                text: `第${index + 1}步：执行 ${op}`
            });
            
            if (op.startsWith('push')) {
                const value = parseInt(op.match(/\d+/)[0]);
                stack.push(value);
                
                this.animationQueue.push({
                    type: 'explain',
                    text: `将 ${value} 压入栈顶`
                });
            } else if (op === 'pop()') {
                if (stack.length > 0) {
                    const value = stack.pop();
                    
                    this.animationQueue.push({
                        type: 'explain',
                        text: `从栈顶弹出 ${value}`
                    });
                } else {
                    this.animationQueue.push({
                        type: 'explain',
                        text: '栈为空，无法弹出元素'
                    });
                }
            }
            
            this.animationQueue.push({
                type: 'explain',
                text: `当前栈状态：[${stack.join(', ')}] (栈顶在右)`
            });
        });
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ 栈操作完成！最终栈内容：[${stack.join(', ')}]`
        });
    }

    /**
     * CSP-J真题：队列的模拟操作
     * 考查点：队列的FIFO特性、循环队列
     */
    prepareQueueSimulation() {
        this.updateComplexity('O(n)', 'O(n)', 'O(n)');
        
        const operations = ['enqueue(5)', 'enqueue(3)', 'dequeue()', 'enqueue(8)', 'enqueue(2)', 'dequeue()', 'dequeue()'];
        const queue = [];
        
        this.animationQueue.push({
            type: 'explain',
            text: '🔢 队列操作模拟：演示FIFO(先进先出)特性'
        });
        
        this.animationQueue.push({
            type: 'explain',
            text: `操作序列：${operations.join(', ')}`
        });
        
        operations.forEach((op, index) => {
            this.animationQueue.push({
                type: 'explain',
                text: `第${index + 1}步：执行 ${op}`
            });
            
            if (op.startsWith('enqueue')) {
                const value = parseInt(op.match(/\d+/)[0]);
                queue.push(value);
                
                this.animationQueue.push({
                    type: 'explain',
                    text: `将 ${value} 加入队尾`
                });
            } else if (op === 'dequeue()') {
                if (queue.length > 0) {
                    const value = queue.shift();
                    
                    this.animationQueue.push({
                        type: 'explain',
                        text: `从队头移除 ${value}`
                    });
                } else {
                    this.animationQueue.push({
                        type: 'explain',
                        text: '队列为空，无法移除元素'
                    });
                }
            }
            
            this.animationQueue.push({
                type: 'explain',
                text: `当前队列状态：[${queue.join(', ')}] (队头在左，队尾在右)`
            });
        });
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ 队列操作完成！最终队列内容：[${queue.join(', ')}]`
        });
    }
}

/**
 * 数学算法可视化器
 */
class MathAlgorithmVisualizer extends AlgorithmVisualizer {
    constructor(containerId, algorithm = 'gcd', options = {}) {
        super(containerId, options);
        this.algorithm = algorithm;
    }

    initVisualization() {
        const vizContent = document.getElementById('viz-content');
        vizContent.innerHTML = '';
        
        this.prepareMathAnimations();
    }

    prepareMathAnimations() {
        this.animationQueue = [];
        
        switch (this.algorithm) {
            case 'gcd':
                this.prepareGCD();
                break;
            case 'prime_sieve':
                this.preparePrimeSieve();
                break;
            case 'fast_power':
                this.prepareFastPower();
                break;
            default:
                this.prepareGCD();
        }
    }

    /**
     * 欧几里得算法求最大公约数
     */
    prepareGCD() {
        this.updateComplexity('O(log min(a,b))', 'O(log min(a,b))', 'O(log min(a,b))');
        
        let a = 48, b = 18;
        const originalA = a, originalB = b;
        
        this.animationQueue.push({
            type: 'explain',
            text: `欧几里得算法：求gcd(${originalA}, ${originalB})`
        });
        
        while (b !== 0) {
            const remainder = a % b;
            
            this.animationQueue.push({
                type: 'explain',
                text: `${a} = ${b} × ${Math.floor(a/b)} + ${remainder}`
            });
            
            this.animationQueue.push({
                type: 'highlight',
                indices: [a, b, remainder],
                color: this.options.colors.comparing
            });
            
            a = b;
            b = remainder;
            
            if (b !== 0) {
                this.animationQueue.push({
                    type: 'explain',
                    text: `继续计算gcd(${a}, ${b})`
                });
            }
        }
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ gcd(${originalA}, ${originalB}) = ${a}`
        });
    }

    /**
     * 埃拉托斯特尼筛法
     */
    preparePrimeSieve() {
        this.updateComplexity('O(n log log n)', 'O(n log log n)', 'O(n log log n)');
        
        const n = 30;
        const isPrime = new Array(n + 1).fill(true);
        isPrime[0] = isPrime[1] = false;
        
        this.animationQueue.push({
            type: 'explain',
            text: `埃拉托斯特尼筛法：找出小于等于${n}的所有质数`
        });
        
        for (let i = 2; i * i <= n; i++) {
            if (isPrime[i]) {
                this.animationQueue.push({
                    type: 'highlight',
                    indices: [i],
                    color: this.options.colors.pivot
                });
                
                this.animationQueue.push({
                    type: 'explain',
                    text: `${i}是质数，标记其所有倍数为合数`
                });
                
                for (let j = i * i; j <= n; j += i) {
                    isPrime[j] = false;
                    
                    this.animationQueue.push({
                        type: 'highlight',
                        indices: [j],
                        color: this.options.colors.comparing
                    });
                    
                    this.animationQueue.push({
                        type: 'explain',
                        text: `标记${j}为合数（${i}的倍数）`
                    });
                }
            }
        }
        
        const primes = [];
        for (let i = 2; i <= n; i++) {
            if (isPrime[i]) {
                primes.push(i);
            }
        }
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ 找到质数：[${primes.join(', ')}]`
        });
    }

    /**
     * 快速幂算法
     */
    prepareFastPower() {
        this.updateComplexity('O(log n)', 'O(log n)', 'O(log n)');
        
        const base = 3, exponent = 10, mod = 1000;
        let result = 1;
        let currentBase = base;
        let currentExp = exponent;
        
        this.animationQueue.push({
            type: 'explain',
            text: `快速幂：计算${base}^${exponent} mod ${mod}`
        });
        
        while (currentExp > 0) {
            this.animationQueue.push({
                type: 'explain',
                text: `当前：base=${currentBase}, exp=${currentExp}, result=${result}`
            });
            
            if (currentExp & 1) {
                result = (result * currentBase) % mod;
                
                this.animationQueue.push({
                    type: 'explain',
                    text: `指数为奇数，result = (${result / currentBase} × ${currentBase}) mod ${mod} = ${result}`
                });
            }
            
            currentBase = (currentBase * currentBase) % mod;
            currentExp >>= 1;
            
            if (currentExp > 0) {
                this.animationQueue.push({
                    type: 'explain',
                    text: `base平方：${Math.sqrt(currentBase)} → ${currentBase}，指数减半：${currentExp * 2} → ${currentExp}`
                });
            }
        }
        
        this.animationQueue.push({
            type: 'explain',
            text: `✅ ${base}^${exponent} mod ${mod} = ${result}`
        });
    }
}

// 将所有类暴露到全局作用域
if (typeof window !== 'undefined') {
    window.DynamicProgrammingVisualizer = DynamicProgrammingVisualizer;
    window.GreedyAlgorithmVisualizer = GreedyAlgorithmVisualizer;
    window.CSPJExamAlgorithmVisualizer = CSPJExamAlgorithmVisualizer;
    window.MathAlgorithmVisualizer = MathAlgorithmVisualizer;
    
    console.log('✅ 额外算法可视化器已加载并暴露到全局作用域:');
    console.log('  - DynamicProgrammingVisualizer (动态规划)');
    console.log('  - GreedyAlgorithmVisualizer (贪心算法)');
    console.log('  - CSPJExamAlgorithmVisualizer (CSP-J真题算法)');
    console.log('  - MathAlgorithmVisualizer (数学算法)');
}

// 扩展算法信息数据库
window.additionalAlgorithmInfo = {
    // 动态规划算法
    'fibonacci': {
        name: '斐波那契数列(DP)',
        principle: '使用动态规划思想，将大问题分解为子问题，通过存储子问题的解来避免重复计算。',
        complexity: {
            time: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
            space: 'O(n)'
        },
        advantages: ['避免重复计算', '时间复杂度优化', '思路清晰'],
        disadvantages: ['需要额外空间', '只适用于有最优子结构的问题'],
        code: `int fibonacci(int n) {
    vector<int> dp(n + 1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}`
    },
    
    'knapsack': {
        name: '0-1背包问题',
        principle: '对于每个物品，考虑放入或不放入背包两种选择，选择使总价值最大的方案。',
        complexity: {
            time: { best: 'O(nW)', average: 'O(nW)', worst: 'O(nW)' },
            space: 'O(nW)'
        },
        advantages: ['经典DP问题', '思路清晰', '可扩展性强'],
        disadvantages: ['空间复杂度高', '只适用于整数重量'],
        code: `int knapsack(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= capacity; w++) {
            if (weights[i-1] <= w) {
                dp[i][w] = max(dp[i-1][w], 
                              dp[i-1][w-weights[i-1]] + values[i-1]);
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    return dp[n][capacity];
}`
    },
    
    'lis': {
        name: '最长递增子序列',
        principle: '对于每个位置，计算以该位置结尾的最长递增子序列长度。',
        complexity: {
            time: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
            space: 'O(n)'
        },
        advantages: ['经典序列DP', '易于理解', '可优化到O(n log n)'],
        disadvantages: ['基础版本效率不高', '需要额外空间'],
        code: `int lengthOfLIS(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n, 1);
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return *max_element(dp.begin(), dp.end());
}`
    },
    
    // 贪心算法
    'activity': {
        name: '活动选择问题',
        principle: '贪心策略：总是选择结束时间最早的活动，这样能为后续活动留出最多时间。',
        complexity: {
            time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
            space: 'O(1)'
        },
        advantages: ['简单高效', '贪心策略直观', '空间复杂度低'],
        disadvantages: ['只适用于特定问题', '需要证明贪心选择性质'],
        code: `int activitySelection(vector<pair<int,int>>& activities) {
    sort(activities.begin(), activities.end(), 
         [](const pair<int,int>& a, const pair<int,int>& b) {
             return a.second < b.second;
         });
    
    int count = 1;
    int lastEnd = activities[0].second;
    
    for (int i = 1; i < activities.size(); i++) {
        if (activities[i].first >= lastEnd) {
            count++;
            lastEnd = activities[i].second;
        }
    }
    return count;
}`
    },
    
    // 数学算法
    'gcd': {
        name: '欧几里得算法',
        principle: '基于gcd(a,b) = gcd(b, a mod b)的递归关系，不断缩小问题规模。',
        complexity: {
            time: { best: 'O(log min(a,b))', average: 'O(log min(a,b))', worst: 'O(log min(a,b))' },
            space: 'O(1)'
        },
        advantages: ['效率极高', '实现简单', '数学基础扎实'],
        disadvantages: ['只适用于整数', '需要理解数学原理'],
        code: `int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}`
    },
    
    'prime_sieve': {
        name: '埃拉托斯特尼筛法',
        principle: '从2开始，标记每个质数的所有倍数为合数，剩下的未标记数字就是质数。',
        complexity: {
            time: { best: 'O(n log log n)', average: 'O(n log log n)', worst: 'O(n log log n)' },
            space: 'O(n)'
        },
        advantages: ['批量求质数效率高', '算法简单', '易于实现'],
        disadvantages: ['空间需求大', '只适用于连续范围'],
        code: `vector<bool> sieve(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    
    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    return isPrime;
}`
    },
    
    'fast_power': {
        name: '快速幂算法',
        principle: '利用指数的二进制表示，通过平方和乘法的组合快速计算幂。',
        complexity: {
            time: { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)' },
            space: 'O(1)'
        },
        advantages: ['效率极高', '适用于大数运算', '可处理模运算'],
        disadvantages: ['需要理解位运算', '实现稍复杂'],
        code: `long long fastPower(long long base, long long exp, long long mod) {
    long long result = 1;
    while (exp > 0) {
        if (exp & 1) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exp >>= 1;
    }
    return result;
}`
    }
};