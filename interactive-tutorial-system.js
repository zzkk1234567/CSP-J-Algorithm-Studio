// 交互式教程系统
// Interactive Tutorial System for Algorithm Learning

/**
 * 交互式教程管理器
 */
class InteractiveTutorialSystem {
    constructor() {
        this.currentTutorial = null;
        this.tutorialStep = 0;
        this.tutorials = {};
        this.init();
    }

    init() {
        this.createTutorials();
        this.createTutorialUI();
    }

    /**
     * 创建教程内容
     */
    createTutorials() {
        // 冒泡排序教程
        this.tutorials.bubble = {
            title: '冒泡排序互动教程',
            description: '通过互动学习冒泡排序的工作原理',
            steps: [
                {
                    title: '算法概述',
                    content: '冒泡排序通过重复比较相邻元素并交换它们来排序数组。',
                    interactive: false,
                    code: null,
                    question: null
                },
                {
                    title: '基本思想',
                    content: '每次遍历都会将最大的元素"冒泡"到数组末尾。',
                    interactive: true,
                    code: `for (int i = 0; i < n-1; i++) {
    // 每轮遍历将最大元素移到末尾
}`,
                    question: {
                        text: '第一轮遍历后，哪个元素会到达正确位置？',
                        options: ['最小元素', '最大元素', '中间元素', '随机元素'],
                        correct: 1,
                        explanation: '第一轮遍历后，最大元素会"冒泡"到数组的最后位置。'
                    }
                },
                {
                    title: '内层循环',
                    content: '内层循环负责比较相邻元素并进行交换。',
                    interactive: true,
                    code: `for (int j = 0; j < n-i-1; j++) {
    if (arr[j] > arr[j+1]) {
        swap(arr[j], arr[j+1]);
    }
}`,
                    question: {
                        text: '为什么内层循环的条件是 j < n-i-1？',
                        options: [
                            '防止数组越界',
                            '已排序的元素不需要再比较',
                            '提高效率',
                            '以上都对'
                        ],
                        correct: 3,
                        explanation: '因为每轮后最大的i个元素已经在正确位置，不需要再参与比较。'
                    }
                },
                {
                    title: '优化版本',
                    content: '可以添加标志位来检测数组是否已经有序。',
                    interactive: true,
                    code: `bool swapped = false;
for (int j = 0; j < n-i-1; j++) {
    if (arr[j] > arr[j+1]) {
        swap(arr[j], arr[j+1]);
        swapped = true;
    }
}
if (!swapped) break; // 已经有序`,
                    question: {
                        text: '这个优化在什么情况下最有效？',
                        options: [
                            '数组完全逆序',
                            '数组已经有序',
                            '数组随机排列',
                            '数组部分有序'
                        ],
                        correct: 1,
                        explanation: '当数组已经有序时，第一轮遍历就不会发生交换，可以提前结束。'
                    }
                },
                {
                    title: '复杂度分析',
                    content: '分析冒泡排序的时间和空间复杂度。',
                    interactive: true,
                    code: `// 时间复杂度：
// 最佳情况：O(n) - 数组已有序
// 平均情况：O(n²)
// 最坏情况：O(n²) - 数组逆序
// 空间复杂度：O(1) - 原地排序`,
                    question: {
                        text: '冒泡排序的主要缺点是什么？',
                        options: [
                            '不稳定',
                            '需要额外空间',
                            '时间复杂度高',
                            '实现复杂'
                        ],
                        correct: 2,
                        explanation: 'O(n²)的时间复杂度使得冒泡排序不适合大规模数据。'
                    }
                }
            ]
        };

        // 二分查找教程
        this.tutorials.binary = {
            title: '二分查找互动教程',
            description: '学习如何在有序数组中高效查找元素',
            steps: [
                {
                    title: '前提条件',
                    content: '二分查找要求数组必须是有序的。',
                    interactive: true,
                    code: `int arr[] = {1, 3, 5, 7, 9, 11, 13, 15};
// 数组必须有序！`,
                    question: {
                        text: '为什么二分查找要求数组有序？',
                        options: [
                            '提高查找速度',
                            '能够确定搜索方向',
                            '减少比较次数',
                            '以上都对'
                        ],
                        correct: 3,
                        explanation: '有序性让我们能根据比较结果确定目标在左半部分还是右半部分。'
                    }
                },
                {
                    title: '基本思路',
                    content: '每次比较中间元素，根据结果缩小搜索范围。',
                    interactive: true,
                    code: `int left = 0, right = n - 1;
while (left <= right) {
    int mid = left + (right - left) / 2;
    // 比较 arr[mid] 与 target
}`,
                    question: {
                        text: '为什么用 left + (right - left) / 2 而不是 (left + right) / 2？',
                        options: [
                            '防止整数溢出',
                            '提高计算速度',
                            '代码更清晰',
                            '没有区别'
                        ],
                        correct: 0,
                        explanation: '当left和right都很大时，left + right可能溢出。'
                    }
                },
                {
                    title: '搜索逻辑',
                    content: '根据比较结果更新搜索边界。',
                    interactive: true,
                    code: `if (arr[mid] == target) {
    return mid;  // 找到目标
} else if (arr[mid] < target) {
    left = mid + 1;  // 搜索右半部分
} else {
    right = mid - 1; // 搜索左半部分
}`,
                    question: {
                        text: '如果 arr[mid] < target，下一步应该怎么做？',
                        options: [
                            'left = mid',
                            'left = mid + 1',
                            'right = mid',
                            'right = mid - 1'
                        ],
                        correct: 1,
                        explanation: '因为arr[mid] < target，目标一定在右半部分，所以left = mid + 1。'
                    }
                },
                {
                    title: '时间复杂度',
                    content: '每次操作都将搜索范围减半。',
                    interactive: true,
                    code: `// 搜索范围变化：
// n → n/2 → n/4 → n/8 → ... → 1
// 需要 log₂(n) 次操作
// 时间复杂度：O(log n)`,
                    question: {
                        text: '在1000个元素的有序数组中，二分查找最多需要几次比较？',
                        options: ['10次', '100次', '500次', '1000次'],
                        correct: 0,
                        explanation: 'log₂(1000) ≈ 10，所以最多需要10次比较。'
                    }
                }
            ]
        };

        // DFS教程
        this.tutorials.dfs = {
            title: '深度优先搜索教程',
            description: '学习图的深度优先遍历算法',
            steps: [
                {
                    title: '基本概念',
                    content: 'DFS沿着图的深度遍历，尽可能深入分支。',
                    interactive: true,
                    code: `void dfs(int node, vector<bool>& visited) {
    visited[node] = true;
    // 处理当前节点
    
    for (int neighbor : graph[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, visited);
        }
    }
}`,
                    question: {
                        text: 'DFS使用什么数据结构来实现？',
                        options: ['队列', '栈', '堆', '数组'],
                        correct: 1,
                        explanation: 'DFS使用栈（或递归调用栈）来记住访问路径。'
                    }
                },
                {
                    title: '递归实现',
                    content: '递归是DFS最自然的实现方式。',
                    interactive: true,
                    code: `// 递归DFS
void dfs(int node) {
    visited[node] = true;
    cout << node << " ";
    
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor);  // 递归调用
        }
    }
}`,
                    question: {
                        text: '递归DFS的空间复杂度主要来自什么？',
                        options: [
                            '邻接表存储',
                            '访问标记数组',
                            '递归调用栈',
                            '输出缓冲区'
                        ],
                        correct: 2,
                        explanation: '递归调用栈的深度可能达到O(V)，这是主要的空间开销。'
                    }
                },
                {
                    title: '应用场景',
                    content: 'DFS在很多图算法中都有应用。',
                    interactive: true,
                    code: `// DFS的应用：
// 1. 连通性检测
// 2. 拓扑排序
// 3. 强连通分量
// 4. 路径查找
// 5. 环检测`,
                    question: {
                        text: 'DFS最适合解决哪类问题？',
                        options: [
                            '最短路径',
                            '连通性问题',
                            '最小生成树',
                            '最大流'
                        ],
                        correct: 1,
                        explanation: 'DFS特别适合解决图的连通性相关问题。'
                    }
                }
            ]
        };
    }

    /**
     * 创建教程界面
     */
    createTutorialUI() {
        // 创建教程按钮
        const tutorialButton = document.createElement('button');
        tutorialButton.innerHTML = '📚 互动教程';
        tutorialButton.className = 'tutorial-button';
        tutorialButton.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: #10b981;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transition: all 0.3s ease;
        `;

        tutorialButton.addEventListener('click', () => {
            this.showTutorialMenu();
        });

        document.body.appendChild(tutorialButton);
    }

    /**
     * 显示教程菜单
     */
    showTutorialMenu() {
        const modal = document.createElement('div');
        modal.className = 'tutorial-menu-modal';
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;

        content.innerHTML = `
            <h3 style="margin-top: 0; color: #1f2937; font-size: 24px; text-align: center;">📚 选择互动教程</h3>
            <div style="display: grid; gap: 15px; margin: 20px 0;">
                ${Object.entries(this.tutorials).map(([key, tutorial]) => `
                    <div onclick="window.tutorialSystem.startTutorial('${key}')" 
                         style="padding: 20px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer; transition: all 0.3s ease;"
                         onmouseover="this.style.borderColor='#3b82f6'; this.style.backgroundColor='#f0f9ff'"
                         onmouseout="this.style.borderColor='#e5e7eb'; this.style.backgroundColor='white'">
                        <h4 style="margin: 0 0 8px 0; color: #1f2937;">${tutorial.title}</h4>
                        <p style="margin: 0; color: #6b7280; font-size: 14px;">${tutorial.description}</p>
                        <div style="margin-top: 10px; color: #3b82f6; font-size: 12px;">
                            ${tutorial.steps.length} 个步骤 • 约 ${Math.ceil(tutorial.steps.length * 2)} 分钟
                        </div>
                    </div>
                `).join('')}
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="width: 100%; padding: 12px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer; margin-top: 20px;">
                关闭
            </button>
        `;

        modal.appendChild(content);
        document.body.appendChild(modal);

        // 点击外部关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    /**
     * 开始教程
     */
    startTutorial(tutorialKey) {
        // 关闭菜单
        const menu = document.querySelector('.tutorial-menu-modal');
        if (menu) menu.remove();

        this.currentTutorial = this.tutorials[tutorialKey];
        this.tutorialStep = 0;
        this.showTutorialStep();
    }

    /**
     * 显示教程步骤
     */
    showTutorialStep() {
        const step = this.currentTutorial.steps[this.tutorialStep];
        
        const modal = document.createElement('div');
        modal.className = 'tutorial-step-modal';
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 12px;
            max-width: 700px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;

        let questionHTML = '';
        if (step.question) {
            questionHTML = `
                <div style="margin-top: 20px; padding: 20px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
                    <h5 style="margin: 0 0 15px 0; color: #1e40af;">🤔 思考题</h5>
                    <p style="margin: 0 0 15px 0; font-weight: 500;">${step.question.text}</p>
                    <div style="display: grid; gap: 8px;">
                        ${step.question.options.map((option, index) => `
                            <label style="display: flex; align-items: center; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer; transition: all 0.2s;"
                                   onmouseover="this.style.backgroundColor='#f9fafb'"
                                   onmouseout="this.style.backgroundColor='white'">
                                <input type="radio" name="tutorial-question" value="${index}" style="margin-right: 8px;">
                                ${option}
                            </label>
                        `).join('')}
                    </div>
                    <button onclick="window.tutorialSystem.checkAnswer(${step.question.correct}, '${step.question.explanation}')"
                            style="margin-top: 15px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        检查答案
                    </button>
                    <div id="answer-feedback" style="margin-top: 10px;"></div>
                </div>
            `;
        }

        content.innerHTML = `
            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 20px;">
                <div>
                    <h3 style="margin: 0; color: #1f2937;">${this.currentTutorial.title}</h3>
                    <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">
                        步骤 ${this.tutorialStep + 1} / ${this.currentTutorial.steps.length}
                    </p>
                </div>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                        style="background: none; border: none; font-size: 20px; cursor: pointer; color: #6b7280;">✖️</button>
            </div>
            
            <div style="margin-bottom: 15px;">
                <div style="background: #e5e7eb; height: 4px; border-radius: 2px;">
                    <div style="background: #3b82f6; height: 100%; width: ${((this.tutorialStep + 1) / this.currentTutorial.steps.length) * 100}%; border-radius: 2px; transition: width 0.3s ease;"></div>
                </div>
            </div>

            <h4 style="color: #1f2937; margin-bottom: 15px;">${step.title}</h4>
            <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">${step.content}</p>
            
            ${step.code ? `
                <div style="margin: 20px 0;">
                    <h5 style="margin: 0 0 10px 0; color: #374151;">💻 代码示例：</h5>
                    <pre style="background: #1f2937; color: #f9fafb; padding: 15px; border-radius: 6px; overflow-x: auto; font-size: 14px;"><code>${step.code}</code></pre>
                </div>
            ` : ''}
            
            ${questionHTML}
            
            <div style="display: flex; justify-content: space-between; margin-top: 30px;">
                <button onclick="window.tutorialSystem.previousStep()" 
                        ${this.tutorialStep === 0 ? 'disabled' : ''}
                        style="padding: 10px 20px; background: ${this.tutorialStep === 0 ? '#e5e7eb' : '#6b7280'}; color: white; border: none; border-radius: 6px; cursor: ${this.tutorialStep === 0 ? 'not-allowed' : 'pointer'};">
                    ← 上一步
                </button>
                <button onclick="window.tutorialSystem.nextStep()" 
                        style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    ${this.tutorialStep === this.currentTutorial.steps.length - 1 ? '完成教程' : '下一步 →'}
                </button>
            </div>
        `;

        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    /**
     * 检查答案
     */
    checkAnswer(correctIndex, explanation) {
        const selectedRadio = document.querySelector('input[name="tutorial-question"]:checked');
        const feedback = document.getElementById('answer-feedback');
        
        if (!selectedRadio) {
            feedback.innerHTML = '<p style="color: #dc2626; margin: 0;">请选择一个答案！</p>';
            return;
        }
        
        const selectedIndex = parseInt(selectedRadio.value);
        const isCorrect = selectedIndex === correctIndex;
        
        feedback.innerHTML = `
            <div style="padding: 10px; border-radius: 4px; background: ${isCorrect ? '#dcfce7' : '#fef2f2'}; border: 1px solid ${isCorrect ? '#16a34a' : '#dc2626'};">
                <p style="margin: 0 0 5px 0; font-weight: 500; color: ${isCorrect ? '#15803d' : '#dc2626'};">
                    ${isCorrect ? '✅ 正确！' : '❌ 不正确'}
                </p>
                <p style="margin: 0; color: #374151; font-size: 14px;">${explanation}</p>
            </div>
        `;
    }

    /**
     * 下一步
     */
    nextStep() {
        if (this.tutorialStep < this.currentTutorial.steps.length - 1) {
            this.tutorialStep++;
            // 关闭当前步骤
            const currentModal = document.querySelector('.tutorial-step-modal');
            if (currentModal) currentModal.remove();
            // 显示下一步
            this.showTutorialStep();
        } else {
            // 教程完成
            this.completeTutorial();
        }
    }

    /**
     * 上一步
     */
    previousStep() {
        if (this.tutorialStep > 0) {
            this.tutorialStep--;
            // 关闭当前步骤
            const currentModal = document.querySelector('.tutorial-step-modal');
            if (currentModal) currentModal.remove();
            // 显示上一步
            this.showTutorialStep();
        }
    }

    /**
     * 完成教程
     */
    completeTutorial() {
        const currentModal = document.querySelector('.tutorial-step-modal');
        if (currentModal) currentModal.remove();

        // 显示完成消息
        const completionModal = document.createElement('div');
        completionModal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        `;

        completionModal.innerHTML = `
            <div style="background: white; padding: 40px; border-radius: 12px; text-align: center; max-width: 400px;">
                <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
                <h3 style="margin: 0 0 15px 0; color: #1f2937;">教程完成！</h3>
                <p style="margin: 0 0 25px 0; color: #6b7280;">恭喜你完成了《${this.currentTutorial.title}》！</p>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="padding: 12px 24px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    继续学习
                </button>
            </div>
        `;

        document.body.appendChild(completionModal);
    }
}

// 初始化教程系统
document.addEventListener('DOMContentLoaded', () => {
    window.tutorialSystem = new InteractiveTutorialSystem();
});

// 导出教程系统
window.InteractiveTutorialSystem = InteractiveTutorialSystem;