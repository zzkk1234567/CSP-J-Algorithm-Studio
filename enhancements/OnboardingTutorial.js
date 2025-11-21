/**
 * 新手引导教程系统
 * 为首次使用的用户提供交互式引导
 */
class OnboardingTutorial {
    constructor() {
        this.currentStep = 0;
        this.steps = this._defineSteps();
        this.overlay = null;
        this.tooltip = null;
        this.isActive = false;
        
        // 检查用户是否已完成引导
        this.hasCompleted = localStorage.getItem('onboarding-completed') === 'true';
    }

    /**
     * 定义引导步骤
     * @private
     * @returns {Array} 步骤数组
     */
    _defineSteps() {
        return [
            {
                title: '欢迎使用 CSP-J 算法可视化系统！',
                content: '这是一个专为 CSP-J 考试准备的算法学习平台。让我们快速了解一下主要功能。',
                target: null, // 无特定目标，显示在中央
                position: 'center',
                highlightArea: null,
                action: null
            },
            {
                title: '知识点学习',
                content: '左侧导航栏包含了所有 CSP-J 考试的核心知识点。点击任意知识点可以查看详细的讲解和示例代码。',
                target: '#knowledge-nav',
                position: 'right',
                highlightArea: '#knowledge-nav',
                action: null
            },
            {
                title: '算法可视化',
                content: '在这里选择算法进行可视化演示。系统支持多种排序、搜索和图算法的动画展示，帮助您直观理解算法执行过程。',
                target: '#algorithm-select',
                position: 'bottom',
                highlightArea: '#algorithm-visualization',
                action: null
            },
            {
                title: '代码编辑器',
                content: '使用内置的代码编辑器编写和测试您的代码。支持语法高亮和代码补全功能。',
                target: '#code-editor',
                position: 'top',
                highlightArea: '#code-editor',
                action: null
            },
            {
                title: '练习测试',
                content: '通过练习题目巩固所学知识。系统会记录您的答题情况并提供即时反馈。',
                target: '#test-area',
                position: 'top',
                highlightArea: '#test-area',
                action: null
            },
            {
                title: '个性化设置',
                content: '点击右上角的齿轮图标可以打开设置面板，调整主题、语言、动画速度等选项。您的设置会自动保存。',
                target: 'button[onclick="openSettings()"]',
                position: 'left',
                highlightArea: 'button[onclick="openSettings()"]',
                action: null
            },
            {
                title: '开始学习吧！',
                content: '现在您已经了解了基本功能。选择一个知识点或算法开始您的学习之旅吧！您可以随时在设置中重新查看此引导。',
                target: null,
                position: 'center',
                highlightArea: null,
                action: () => {
                    this._markAsCompleted();
                }
            }
        ];
    }

    /**
     * 开始引导
     */
    start() {
        if (this.isActive) {
            return;
        }

        this.isActive = true;
        this.currentStep = 0;
        this._createOverlay();
        this._createTooltip();
        this.showStep(0);
    }

    /**
     * 显示指定步骤
     * @param {number} stepIndex - 步骤索引
     */
    showStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= this.steps.length) {
            return;
        }

        this.currentStep = stepIndex;
        const step = this.steps[stepIndex];

        // 更新高亮区域
        this._updateHighlight(step.highlightArea);

        // 更新提示框
        this._updateTooltip(step);

        // 执行步骤动作
        if (step.action) {
            step.action();
        }
    }

    /**
     * 下一步
     */
    next() {
        if (this.currentStep < this.steps.length - 1) {
            this.showStep(this.currentStep + 1);
        } else {
            this.complete();
        }
    }

    /**
     * 上一步
     */
    previous() {
        if (this.currentStep > 0) {
            this.showStep(this.currentStep - 1);
        }
    }

    /**
     * 跳过引导
     */
    skip() {
        if (confirm('确定要跳过新手引导吗？您可以随时在设置中重新查看。')) {
            this._markAsCompleted();
            this.close();
        }
    }

    /**
     * 完成引导
     */
    complete() {
        this._markAsCompleted();
        this.close();
        
        // 显示完成消息
        this._showCompletionMessage();
    }

    /**
     * 关闭引导
     */
    close() {
        this.isActive = false;
        
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }
        
        if (this.tooltip) {
            this.tooltip.remove();
            this.tooltip = null;
        }

        // 移除所有高亮
        document.querySelectorAll('.onboarding-highlight').forEach(el => {
            el.classList.remove('onboarding-highlight');
        });
    }

    /**
     * 创建遮罩层
     * @private
     */
    _createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'onboarding-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 9998;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(this.overlay);
    }

    /**
     * 创建提示框
     * @private
     */
    _createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'onboarding-tooltip';
        this.tooltip.style.cssText = `
            position: fixed;
            background: white;
            border-radius: 8px;
            padding: 20px;
            max-width: 400px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            transition: all 0.3s;
        `;
        document.body.appendChild(this.tooltip);
    }

    /**
     * 更新提示框内容和位置
     * @private
     * @param {Object} step - 步骤对象
     */
    _updateTooltip(step) {
        if (!this.tooltip) return;

        // 更新内容
        this.tooltip.innerHTML = `
            <div class="onboarding-tooltip-header">
                <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 18px;">
                    ${step.title}
                </h3>
                <div style="color: #6b7280; font-size: 14px; margin-bottom: 15px;">
                    步骤 ${this.currentStep + 1} / ${this.steps.length}
                </div>
            </div>
            <div class="onboarding-tooltip-content">
                <p style="margin: 0 0 20px 0; color: #374151; line-height: 1.6;">
                    ${step.content}
                </p>
            </div>
            <div class="onboarding-tooltip-footer" style="display: flex; justify-content: space-between; align-items: center;">
                <button class="onboarding-skip-btn" style="
                    background: transparent;
                    border: none;
                    color: #6b7280;
                    cursor: pointer;
                    padding: 8px 12px;
                    font-size: 14px;
                ">跳过</button>
                <div style="display: flex; gap: 10px;">
                    ${this.currentStep > 0 ? `
                        <button class="onboarding-prev-btn" style="
                            background: #e5e7eb;
                            border: none;
                            color: #374151;
                            cursor: pointer;
                            padding: 8px 16px;
                            border-radius: 4px;
                            font-size: 14px;
                        ">上一步</button>
                    ` : ''}
                    <button class="onboarding-next-btn" style="
                        background: #3b82f6;
                        border: none;
                        color: white;
                        cursor: pointer;
                        padding: 8px 16px;
                        border-radius: 4px;
                        font-size: 14px;
                    ">${this.currentStep === this.steps.length - 1 ? '完成' : '下一步'}</button>
                </div>
            </div>
        `;

        // 绑定事件
        this.tooltip.querySelector('.onboarding-skip-btn').onclick = () => this.skip();
        this.tooltip.querySelector('.onboarding-next-btn').onclick = () => this.next();
        
        const prevBtn = this.tooltip.querySelector('.onboarding-prev-btn');
        if (prevBtn) {
            prevBtn.onclick = () => this.previous();
        }

        // 更新位置
        this._positionTooltip(step);
    }

    /**
     * 定位提示框
     * @private
     * @param {Object} step - 步骤对象
     */
    _positionTooltip(step) {
        if (!this.tooltip) return;

        if (step.position === 'center' || !step.target) {
            // 居中显示
            this.tooltip.style.top = '50%';
            this.tooltip.style.left = '50%';
            this.tooltip.style.transform = 'translate(-50%, -50%)';
            return;
        }

        const targetElement = document.querySelector(step.target);
        if (!targetElement) {
            // 目标不存在，居中显示
            this.tooltip.style.top = '50%';
            this.tooltip.style.left = '50%';
            this.tooltip.style.transform = 'translate(-50%, -50%)';
            return;
        }

        const targetRect = targetElement.getBoundingClientRect();
        const tooltipRect = this.tooltip.getBoundingClientRect();

        let top, left;

        switch (step.position) {
            case 'top':
                top = targetRect.top - tooltipRect.height - 20;
                left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = targetRect.bottom + 20;
                left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
                left = targetRect.left - tooltipRect.width - 20;
                break;
            case 'right':
                top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
                left = targetRect.right + 20;
                break;
            default:
                top = targetRect.bottom + 20;
                left = targetRect.left;
        }

        // 确保提示框在视口内
        top = Math.max(20, Math.min(top, window.innerHeight - tooltipRect.height - 20));
        left = Math.max(20, Math.min(left, window.innerWidth - tooltipRect.width - 20));

        this.tooltip.style.top = `${top}px`;
        this.tooltip.style.left = `${left}px`;
        this.tooltip.style.transform = 'none';
    }

    /**
     * 更新高亮区域
     * @private
     * @param {string} selector - 选择器
     */
    _updateHighlight(selector) {
        // 移除旧高亮
        document.querySelectorAll('.onboarding-highlight').forEach(el => {
            el.classList.remove('onboarding-highlight');
        });

        if (!selector) return;

        // 添加新高亮
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('onboarding-highlight');
            
            // 添加高亮样式
            if (!document.getElementById('onboarding-highlight-style')) {
                const style = document.createElement('style');
                style.id = 'onboarding-highlight-style';
                style.textContent = `
                    .onboarding-highlight {
                        position: relative;
                        z-index: 9999 !important;
                        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5),
                                    0 0 20px rgba(59, 130, 246, 0.3) !important;
                        border-radius: 4px;
                    }
                `;
                document.head.appendChild(style);
            }

            // 滚动到可见区域
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    /**
     * 标记为已完成
     * @private
     */
    _markAsCompleted() {
        localStorage.setItem('onboarding-completed', 'true');
        this.hasCompleted = true;
    }

    /**
     * 显示完成消息
     * @private
     */
    _showCompletionMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            text-align: center;
            max-width: 400px;
        `;
        message.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 15px;">🎉</div>
            <h3 style="margin: 0 0 10px 0; color: #1f2937;">引导完成！</h3>
            <p style="margin: 0 0 20px 0; color: #6b7280;">
                您已经了解了系统的基本功能。现在可以开始学习算法了！
            </p>
            <button style="
                background: #3b82f6;
                border: none;
                color: white;
                cursor: pointer;
                padding: 10px 24px;
                border-radius: 4px;
                font-size: 16px;
            ">开始学习</button>
        `;

        document.body.appendChild(message);

        message.querySelector('button').onclick = () => {
            message.remove();
        };

        // 3秒后自动关闭
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 3000);
    }

    /**
     * 重置引导状态（用于测试或重新查看）
     */
    reset() {
        localStorage.removeItem('onboarding-completed');
        this.hasCompleted = false;
        this.currentStep = 0;
    }

    /**
     * 检查是否应该自动启动
     * @returns {boolean}
     */
    shouldAutoStart() {
        return !this.hasCompleted;
    }
}

// 创建全局实例
if (typeof window !== 'undefined') {
    window.OnboardingTutorial = OnboardingTutorial;
    window.onboardingTutorial = new OnboardingTutorial();
}
