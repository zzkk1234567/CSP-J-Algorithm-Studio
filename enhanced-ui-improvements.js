// 增强用户交互体验和界面优化
// Enhanced UI Improvements for Algorithm Visualization System

/**
 * 移动端适配优化
 */
class MobileOptimization {
    constructor() {
        this.isMobile = this.detectMobile();
        this.isTablet = this.detectTablet();
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        this.init();
    }

    init() {
        if (this.isMobile || this.isTablet) {
            this.addMobileCSS();
            this.optimizeTouchInteraction();
            this.adaptLayoutForMobile();
            this.optimizePerformanceForMobile();
            this._setupViewport();
        }
    }

    /**
     * 检测是否为移动设备
     */
    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth <= 768;
    }

    /**
     * 检测是否为平板设备
     */
    detectTablet() {
        return /iPad|Android/i.test(navigator.userAgent) && window.innerWidth > 768 && window.innerWidth <= 1024;
    }

    /**
     * 添加移动端专用CSS
     */
    addMobileCSS() {
        const mobileCSS = `
        <style id="mobile-optimization-css">
            /* 移动端全局优化 */
            @media (max-width: 768px) {
                body {
                    font-size: 14px;
                    line-height: 1.4;
                    touch-action: manipulation;
                }
                
                /* 容器适配 */
                .container {
                    padding: 10px !important;
                    margin: 0 !important;
                }
                
                /* 网格布局优化 */
                .grid {
                    grid-template-columns: 1fr !important;
                    gap: 10px !important;
                }
                
                /* 按钮优化 */
                button {
                    min-height: 44px !important;
                    min-width: 44px !important;
                    padding: 12px 16px !important;
                    font-size: 16px !important;
                    border-radius: 8px !important;
                    touch-action: manipulation;
                }
                
                /* 输入框优化 */
                input, select, textarea {
                    min-height: 44px !important;
                    font-size: 16px !important;
                    padding: 12px !important;
                    border-radius: 8px !important;
                }
                
                /* 算法可视化区域优化 */
                .algorithm-viz {
                    min-height: 200px !important;
                    max-height: 300px !important;
                    overflow-x: auto;
                    overflow-y: hidden;
                }
                
                /* 数组显示优化 */
                .array-bar {
                    min-width: 25px !important;
                    margin: 0 1px !important;
                    font-size: 10px !important;
                }
                
                /* 控制面板优化 */
                .control-panel {
                    position: sticky;
                    bottom: 0;
                    background: white;
                    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                    z-index: 100;
                    padding: 15px !important;
                }
                
                /* 对话框优化 */
                .modal {
                    width: 95% !important;
                    margin: 20px auto !important;
                    max-height: 80vh !important;
                    overflow-y: auto;
                }
                
                /* 标签页优化 */
                .tab {
                    padding: 8px 12px !important;
                    font-size: 14px !important;
                }
                
                /* 隐藏复杂的统计信息 */
                .advanced-stats {
                    display: none !important;
                }
                
                /* 简化课程布局 */
                .course-layout {
                    flex-direction: column !important;
                }
                
                /* 代码编辑器优化 */
                .code-editor {
                    font-size: 14px !important;
                    line-height: 1.3 !important;
                }
                
                /* 视频区域优化 */
                #viz-content {
                    overflow-x: auto;
                    overflow-y: hidden;
                    max-width: 100%;
                }
                
                /* SVG图形优化 */
                svg {
                    max-width: 100% !important;
                    height: auto !important;
                }
            }
            
            /* 平板端优化 */
            @media (min-width: 769px) and (max-width: 1024px) {
                .container {
                    padding: 15px !important;
                }
                
                .grid {
                    grid-template-columns: 1fr 1fr !important;
                }
                
                button {
                    min-height: 40px !important;
                }
            }
            
            /* 触摸优化 */
            .touch-optimized {
                -webkit-tap-highlight-color: transparent;
                user-select: none;
                -webkit-user-select: none;
            }
            
            /* 滚动优化 */
            .smooth-scroll {
                -webkit-overflow-scrolling: touch;
                scroll-behavior: smooth;
            }
            
            /* 动画优化 */
            @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
        </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', mobileCSS);
    }

    /**
     * 优化触摸交互
     */
    optimizeTouchInteraction() {
        // 添加触摸手势识别
        document.addEventListener('touchstart', this._handleTouchStartGesture.bind(this), { passive: true });
        document.addEventListener('touchend', this._handleTouchEndGesture.bind(this), { passive: true });
        
        // 添加触摸反馈
        document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
        
        // 优化按钮点击
        this.optimizeButtonTaps();
        
        // 添加手势支持
        this.addGestureSupport();
        
        // 优化选择器
        this.optimizeSelectors();
    }

    /**
     * 处理触摸开始手势
     * @private
     */
    _handleTouchStartGesture(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    /**
     * 处理触摸结束手势
     * @private
     */
    _handleTouchEndGesture(e) {
        this.touchEndX = e.changedTouches[0].clientX;
        this.touchEndY = e.changedTouches[0].clientY;
        
        // 检测滑动手势
        this._detectSwipeGesture();
    }

    /**
     * 检测滑动手势
     * @private
     */
    _detectSwipeGesture() {
        const deltaX = this.touchEndX - this.touchStartX;
        const deltaY = this.touchEndY - this.touchStartY;
        const minSwipeDistance = 50;
        
        // 确保是水平滑动（水平距离大于垂直距离）
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                this._handleSwipeRight();
            } else {
                this._handleSwipeLeft();
            }
        }
    }

    /**
     * 处理向右滑动
     * @private
     */
    _handleSwipeRight() {
        // 分发自定义事件
        const event = new CustomEvent('mobile-swipe-right', {
            detail: {
                startX: this.touchStartX,
                startY: this.touchStartY,
                endX: this.touchEndX,
                endY: this.touchEndY,
                distance: this.touchEndX - this.touchStartX
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * 处理向左滑动
     * @private
     */
    _handleSwipeLeft() {
        // 分发自定义事件
        const event = new CustomEvent('mobile-swipe-left', {
            detail: {
                startX: this.touchStartX,
                startY: this.touchStartY,
                endX: this.touchEndX,
                endY: this.touchEndY,
                distance: this.touchStartX - this.touchEndX
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * 设置移动端viewport
     * @private
     */
    _setupViewport() {
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            document.head.appendChild(viewport);
        }
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    }

    /**
     * 处理触摸开始
     */
    handleTouchStart(e) {
        const target = e.target;
        if (target.tagName === 'BUTTON' || target.classList.contains('clickable')) {
            target.style.opacity = '0.7';
            target.style.transform = 'scale(0.95)';
        }
    }

    /**
     * 处理触摸结束
     */
    handleTouchEnd(e) {
        const target = e.target;
        if (target.tagName === 'BUTTON' || target.classList.contains('clickable')) {
            setTimeout(() => {
                target.style.opacity = '';
                target.style.transform = '';
            }, 150);
        }
    }

    /**
     * 优化按钮点击
     */
    optimizeButtonTaps() {
        // 防止双击缩放
        document.addEventListener('dblclick', (e) => {
            e.preventDefault();
        }, { passive: false });
        
        // 优化点击延迟
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target.tagName === 'BUTTON') {
                // 添加视觉反馈
                target.classList.add('touch-feedback');
                setTimeout(() => {
                    target.classList.remove('touch-feedback');
                }, 200);
            }
        });
    }

    /**
     * 添加手势支持
     */
    addGestureSupport() {
        let startX, startY;
        let isScrolling = false;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isScrolling = false;
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            const diffX = Math.abs(e.touches[0].clientX - startX);
            const diffY = Math.abs(e.touches[0].clientY - startY);
            
            if (diffY > diffX) {
                isScrolling = true;
            }
            
            // 横向滑动切换算法
            if (!isScrolling && diffX > 50) {
                const direction = e.touches[0].clientX - startX > 0 ? 'right' : 'left';
                this.handleSwipe(direction);
                startX = null;
                startY = null;
            }
        }, { passive: true });
    }

    /**
     * 处理滑动手势
     */
    handleSwipe(direction) {
        const algorithmSelect = document.getElementById('specific-algorithm');
        if (!algorithmSelect) return;
        
        const options = algorithmSelect.options;
        let currentIndex = algorithmSelect.selectedIndex;
        
        if (direction === 'left' && currentIndex < options.length - 1) {
            algorithmSelect.selectedIndex = currentIndex + 1;
        } else if (direction === 'right' && currentIndex > 0) {
            algorithmSelect.selectedIndex = currentIndex - 1;
        }
        
        // 触发变更事件
        const event = new Event('change');
        algorithmSelect.dispatchEvent(event);
        
        // 显示提示
        this.showSwipeHint(direction);
    }

    /**
     * 显示滑动提示
     */
    showSwipeHint(direction) {
        const hint = document.createElement('div');
        hint.textContent = direction === 'left' ? '下一个算法 ➜' : '← 上一个算法';
        hint.style.cssText = `
            position: fixed;
            top: 50%;
            ${direction}: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px 15px;
            border-radius: 20px;
            z-index: 1000;
            animation: swipeHint 1s ease-out;
        `;
        
        document.body.appendChild(hint);
        setTimeout(() => hint.remove(), 1000);
    }

    /**
     * 优化选择器
     */
    optimizeSelectors() {
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            // 为选择器添加移动端样式
            select.classList.add('mobile-select');
            
            // 添加触摸反馈
            select.addEventListener('focus', () => {
                select.style.borderColor = '#3b82f6';
                select.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.2)';
            });
            
            select.addEventListener('blur', () => {
                select.style.borderColor = '';
                select.style.boxShadow = '';
            });
        });
    }

    /**
     * 适配布局为移动端
     */
    adaptLayoutForMobile() {
        // 调整导航栏
        this.adaptNavigation();
        
        // 调整内容区域
        this.adaptContentAreas();
        
        // 调整控制面板
        this.adaptControlPanels();
        
        // 调整模态框
        this.adaptModals();
    }

    /**
     * 适配导航栏
     */
    adaptNavigation() {
        const nav = document.querySelector('nav');
        if (nav && this.isMobile) {
            nav.style.position = 'sticky';
            nav.style.top = '0';
            nav.style.zIndex = '1000';
            
            // 添加汉包包菜单
            this.addHamburgerMenu(nav);
        }
    }

    /**
     * 添加汉包包菜单
     */
    addHamburgerMenu(nav) {
        const hamburger = document.createElement('button');
        hamburger.innerHTML = '☰';
        hamburger.className = 'hamburger-menu';
        hamburger.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            padding: 8px;
        `;
        
        if (this.isMobile) {
            hamburger.style.display = 'block';
        }
        
        nav.appendChild(hamburger);
    }

    /**
     * 适配内容区域
     */
    adaptContentAreas() {
        const contentAreas = document.querySelectorAll('.content-area, .tab-content');
        contentAreas.forEach(area => {
            if (this.isMobile) {
                area.style.padding = '10px';
                area.style.margin = '0';
            }
        });
    }

    /**
     * 适配控制面板
     */
    adaptControlPanels() {
        const controlPanels = document.querySelectorAll('.control-panel');
        controlPanels.forEach(panel => {
            if (this.isMobile) {
                // 调整按钮布局
                const buttons = panel.querySelectorAll('button');
                buttons.forEach(btn => {
                    btn.style.margin = '5px';
                    btn.style.flex = '1';
                });
                
                // 隐藏复杂控件
                const advancedControls = panel.querySelectorAll('.advanced-control');
                advancedControls.forEach(control => {
                    control.style.display = 'none';
                });
            }
        });
    }

    /**
     * 适配模态框
     */
    adaptModals() {
        const modals = document.querySelectorAll('.modal, [id$="-modal"]');
        modals.forEach(modal => {
            if (this.isMobile) {
                modal.style.width = '95%';
                modal.style.height = '90%';
                modal.style.maxHeight = '90vh';
                modal.style.borderRadius = '12px';
            }
        });
    }

    /**
     * 优化移动端性能
     */
    optimizePerformanceForMobile() {
        if (this.isMobile) {
            // 减少动画帧率
            this.reduceAnimationFramerate();
            
            // 简化视觉效果
            this.simplifyVisualEffects();
            
            // 优化图像加载
            this.optimizeImageLoading();
            
            // 限制同时动画数量
            this.limitConcurrentAnimations();
        }
    }

    /**
     * 减少动画帧率
     */
    reduceAnimationFramerate() {
        // 覆盖默认的requestAnimationFrame
        const originalRAF = window.requestAnimationFrame;
        let frameCount = 0;
        
        window.requestAnimationFrame = function(callback) {
            frameCount++;
            // 移动端降低到30fps
            if (frameCount % 2 === 0) {
                return originalRAF(callback);
            } else {
                return setTimeout(callback, 16);
            }
        };
    }

    /**
     * 简化视觉效果
     */
    simplifyVisualEffects() {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .glass-effect {
                    background: white !important;
                    backdrop-filter: none !important;
                }
                
                .shadow {
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
                }
                
                .gradient {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%) !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 优化图像加载
     */
    optimizeImageLoading() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
        });
    }

    /**
     * 限制同时动画数量
     */
    limitConcurrentAnimations() {
        let activeAnimations = 0;
        const maxAnimations = 3;
        
        const originalSetTimeout = window.setTimeout;
        window.setTimeout = function(callback, delay) {
            if (activeAnimations >= maxAnimations) {
                return originalSetTimeout(() => {
                    activeAnimations++;
                    callback();
                    activeAnimations--;
                }, delay + 100);
            } else {
                activeAnimations++;
                return originalSetTimeout(() => {
                    callback();
                    activeAnimations--;
                }, delay);
            }
        };
    }
}

/**
 * 用户界面增强功能
 */
class UIEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addKeyboardShortcuts();
        this.addTooltips();
        this.addProgressIndicators();
        this.addThemeToggle();
        this.addFullscreenMode();
        this.addAnimationControls();
        this.addAccessibilityFeatures();
    }

    /**
     * 添加键盘快捷键支持
     */
    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // 检查是否有活跃的可视化器
            if (!window.visualizer) return;

            switch(e.key) {
                case ' ': // 空格键 - 播放/暂停
                    e.preventDefault();
                    if (window.visualizer.state.isPlaying) {
                        window.visualizer.pause();
                    } else {
                        window.visualizer.play();
                    }
                    this.showShortcutFeedback('播放/暂停');
                    break;
                
                case 'ArrowRight': // 右箭头 - 下一步
                    e.preventDefault();
                    window.visualizer.stepForward();
                    this.showShortcutFeedback('下一步');
                    break;
                
                case 'r': // R键 - 重置
                    if (e.ctrlKey) {
                        e.preventDefault();
                        window.visualizer.reset();
                        this.showShortcutFeedback('重置');
                    }
                    break;
                
                case 'f': // F键 - 全屏
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.toggleFullscreen();
                        this.showShortcutFeedback('全屏切换');
                    }
                    break;
                
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                    // 数字键 - 快速设置速度
                    const speed = parseInt(e.key) * 400;
                    if (window.visualizer.setSpeed) {
                        window.visualizer.setSpeed(speed);
                        this.showShortcutFeedback(`速度设置为 ${speed}ms`);
                    }
                    break;
            }
        });

        // 添加快捷键帮助面板
        this.createShortcutHelpPanel();
    }

    /**
     * 显示快捷键反馈
     */
    showShortcutFeedback(action) {
        const feedback = document.createElement('div');
        feedback.className = 'shortcut-feedback';
        feedback.textContent = action;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 1000;
            animation: fadeInOut 2s ease-in-out;
        `;

        document.body.appendChild(feedback);
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 2000);
    }

    /**
     * 创建快捷键帮助面板
     */
    createShortcutHelpPanel() {
        const helpButton = document.createElement('button');
        helpButton.innerHTML = '⌨️ 快捷键';
        helpButton.className = 'help-button';
        helpButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #3b82f6;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transition: all 0.3s ease;
        `;

        helpButton.addEventListener('click', () => {
            this.showShortcutHelp();
        });

        document.body.appendChild(helpButton);
    }

    /**
     * 显示快捷键帮助
     */
    showShortcutHelp() {
        const modal = document.createElement('div');
        modal.className = 'shortcut-help-modal';
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
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;

        content.innerHTML = `
            <h3 style="margin-top: 0; color: #1f2937; font-size: 20px;">⌨️ 键盘快捷键</h3>
            <div style="display: grid; gap: 12px; font-size: 14px;">
                <div style="display: flex; justify-content: space-between; padding: 8px; background: #f3f4f6; border-radius: 6px;">
                    <span><kbd>空格</kbd></span>
                    <span>播放/暂停</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px; background: #f3f4f6; border-radius: 6px;">
                    <span><kbd>→</kbd></span>
                    <span>下一步</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px; background: #f3f4f6; border-radius: 6px;">
                    <span><kbd>Ctrl + R</kbd></span>
                    <span>重置</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px; background: #f3f4f6; border-radius: 6px;">
                    <span><kbd>Ctrl + F</kbd></span>
                    <span>全屏切换</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px; background: #f3f4f6; border-radius: 6px;">
                    <span><kbd>1-5</kbd></span>
                    <span>快速设置速度</span>
                </div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="margin-top: 20px; width: 100%; padding: 10px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
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
     * 添加工具提示
     */
    addTooltips() {
        const style = document.createElement('style');
        style.textContent = `
            .tooltip {
                position: relative;
                cursor: help;
            }
            
            .tooltip::after {
                content: attr(data-tooltip);
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 6px 10px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s;
                z-index: 1000;
            }
            
            .tooltip:hover::after {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);

        // 为按钮添加工具提示
        this.addTooltipToElements();
    }

    /**
     * 为元素添加工具提示
     */
    addTooltipToElements() {
        // 等待DOM加载完成后添加工具提示
        setTimeout(() => {
            const tooltips = [
                { selector: 'button[onclick*="play"]', text: '播放算法演示 (空格键)' },
                { selector: 'button[onclick*="pause"]', text: '暂停演示 (空格键)' },
                { selector: 'button[onclick*="stepForward"]', text: '单步执行 (→键)' },
                { selector: 'button[onclick*="reset"]', text: '重置演示 (Ctrl+R)' },
                { selector: 'input[type="range"]', text: '调整动画速度 (1-5键)' },
            ];

            tooltips.forEach(({ selector, text }) => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.classList.add('tooltip');
                    el.setAttribute('data-tooltip', text);
                });
            });
        }, 1000);
    }

    /**
     * 添加进度指示器
     */
    addProgressIndicators() {
        const style = document.createElement('style');
        style.textContent = `
            .progress-indicator {
                width: 100%;
                height: 4px;
                background: #e5e7eb;
                border-radius: 2px;
                overflow: hidden;
                margin: 10px 0;
            }
            
            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #3b82f6, #10b981);
                transition: width 0.3s ease;
                border-radius: 2px;
            }
            
            .step-counter {
                font-size: 12px;
                color: #6b7280;
                text-align: center;
                margin-top: 5px;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 添加主题切换
     */
    addThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '🌙';
        themeToggle.className = 'theme-toggle';
        themeToggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #374151;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            z-index: 1000;
            transition: all 0.3s ease;
        `;

        let isDark = false;
        themeToggle.addEventListener('click', () => {
            isDark = !isDark;
            document.body.classList.toggle('dark-theme', isDark);
            themeToggle.innerHTML = isDark ? '☀️' : '🌙';
            this.showShortcutFeedback(isDark ? '深色主题' : '浅色主题');
        });

        document.body.appendChild(themeToggle);

        // 添加深色主题样式
        const darkThemeStyle = document.createElement('style');
        darkThemeStyle.textContent = `
            .dark-theme {
                background: #1f2937 !important;
                color: #f9fafb !important;
            }
            
            .dark-theme .glass-effect {
                background: rgba(55, 65, 81, 0.95) !important;
                color: #f9fafb !important;
            }
            
            .dark-theme .bg-white {
                background: #374151 !important;
                color: #f9fafb !important;
            }
        `;
        document.head.appendChild(darkThemeStyle);
    }

    /**
     * 添加全屏模式
     */
    addFullscreenMode() {
        this.isFullscreen = false;
    }

    /**
     * 切换全屏
     */
    toggleFullscreen() {
        const vizContainer = document.getElementById('visualization-container');
        if (!vizContainer) return;

        if (!this.isFullscreen) {
            if (vizContainer.requestFullscreen) {
                vizContainer.requestFullscreen();
            } else if (vizContainer.webkitRequestFullscreen) {
                vizContainer.webkitRequestFullscreen();
            } else if (vizContainer.msRequestFullscreen) {
                vizContainer.msRequestFullscreen();
            }
            this.isFullscreen = true;
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            this.isFullscreen = false;
        }
    }

    /**
     * 添加动画控制增强
     */
    addAnimationControls() {
        // 添加动画质量设置
        const style = document.createElement('style');
        style.textContent = `
            .animation-controls {
                display: flex;
                gap: 10px;
                align-items: center;
                margin: 10px 0;
            }
            
            .quality-selector {
                padding: 5px 10px;
                border: 1px solid #d1d5db;
                border-radius: 4px;
                background: white;
                font-size: 12px;
            }
            
            @keyframes fadeInOut {
                0%, 100% { opacity: 0; transform: translateY(-10px); }
                50% { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            .highlight-animation {
                animation: pulse 0.6s ease-in-out;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 添加无障碍功能
     */
    addAccessibilityFeatures() {
        // 添加ARIA标签和键盘导航支持
        const style = document.createElement('style');
        style.textContent = `
            button:focus,
            select:focus,
            input:focus {
                outline: 2px solid #3b82f6;
                outline-offset: 2px;
            }
            
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }
        `;
        document.head.appendChild(style);

        // 为重要元素添加ARIA标签
        setTimeout(() => {
            const buttons = document.querySelectorAll('button');
            buttons.forEach((button, index) => {
                if (!button.getAttribute('aria-label')) {
                    button.setAttribute('aria-label', button.textContent || `按钮 ${index + 1}`);
                }
            });
        }, 1000);
    }

    /**
     * 添加性能监控
     */
    addPerformanceMonitor() {
        const monitor = document.createElement('div');
        monitor.id = 'performance-monitor';
        monitor.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px;
            border-radius: 6px;
            font-family: monospace;
            font-size: 12px;
            z-index: 1000;
            display: none;
        `;

        document.body.appendChild(monitor);

        // 性能监控逻辑
        let frameCount = 0;
        let lastTime = performance.now();

        const updatePerformance = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round(frameCount * 1000 / (currentTime - lastTime));
                const memory = performance.memory ? 
                    `${Math.round(performance.memory.usedJSHeapSize / 1024 / 1024)}MB` : 'N/A';
                
                monitor.innerHTML = `
                    FPS: ${fps}<br>
                    Memory: ${memory}
                `;
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(updatePerformance);
        };

        // 切换性能监控显示
        document.addEventListener('keydown', (e) => {
            if (e.key === 'p' && e.ctrlKey && e.shiftKey) {
                e.preventDefault();
                monitor.style.display = monitor.style.display === 'none' ? 'block' : 'none';
                if (monitor.style.display === 'block') {
                    updatePerformance();
                }
            }
        });
    }
}

// 自动初始化UI增强功能
document.addEventListener('DOMContentLoaded', () => {
    window.uiEnhancements = new UIEnhancements();
});

// 导出供其他模块使用
window.UIEnhancements = UIEnhancements;

// 将所有类暴露到全局作用域
if (typeof window !== 'undefined') {
    window.MobileOptimization = MobileOptimization;
    window.UIEnhancements = UIEnhancements;
    
    console.log('✅ UI增强功能已加载并暴露到全局作用域:');
    console.log('  - MobileOptimization (移动端优化)');
    console.log('  - UIEnhancements (界面增强功能)');
}
