/**
 * I18n - 国际化类
 * 提供多语言支持和文本翻译功能
 */
class I18n {
    /**
     * 构造函数
     * @param {string} locale - 语言代码 (如 'zh-CN', 'en-US')
     */
    constructor(locale = 'zh-CN') {
        this.locale = locale;
        this.messages = {};
        this.fallbackLocale = 'zh-CN';
        this.loadMessages(locale);
    }

    /**
     * 加载指定语言的消息
     * @param {string} locale - 语言代码
     */
    loadMessages(locale) {
        // 定义语言包
        const allMessages = {
            'zh-CN': {
                // 通用
                'common.loading': '加载中...',
                'common.error': '错误',
                'common.success': '成功',
                'common.cancel': '取消',
                'common.confirm': '确认',
                'common.close': '关闭',
                'common.save': '保存',
                'common.reset': '重置',
                'common.search': '搜索',
                'common.filter': '筛选',
                
                // 导航和标题
                'nav.title': 'CSP-J \u7b97\u6cd5\u53ef\u89c6\u5316\u5b66\u4e60\u7cfb\u7edf',
                'nav.algorithms': '算法列表',
                'nav.tutorial': '互动教程',
                'nav.comparison': '性能对比',
                'nav.settings': '设置',
                'nav.help': '帮助',
                
                // 算法类别
                'category.sorting': '\u6392\u5e8f\u7b97\u6cd5',
                'category.searching': '\u641c\u7d22\u7b97\u6cd5',
                'category.graph': '\u56fe\u7b97\u6cd5',
                'category.dp': '\u52a8\u6001\u89c4\u5212',
                'category.greedy': '\u8d2a\u5fc3\u7b97\u6cd5',
                'category.all': '\u5168\u90e8\u7b97\u6cd5',
                
                // 算法名称
                'algorithm.bubble': '冒泡排序',
                'algorithm.selection': '选择排序',
                'algorithm.insertion': '插入排序',
                'algorithm.quick': '快速排序',
                'algorithm.merge': '归并排序',
                'algorithm.heap': '堆排序',
                'algorithm.linear-search': '线性搜索',
                'algorithm.binary-search': '二分搜索',
                'algorithm.dfs': '深度优先搜索',
                'algorithm.bfs': '广度优先搜索',
                'algorithm.dijkstra': '迪杰斯特拉算法',
                'algorithm.prim': '普里姆算法',
                'algorithm.kruskal': '克鲁斯卡尔算法',
                'algorithm.knapsack': '背包问题',
                'algorithm.lcs': '最长公共子序列',
                
                // 控制按钮
                'control.play': '播放',
                'control.pause': '暂停',
                'control.stop': '停止',
                'control.next': '下一步',
                'control.prev': '上一步',
                'control.reset': '重置',
                'control.speed': '速度',
                'control.fast': '快速',
                'control.normal': '正常',
                'control.slow': '慢速',
                
                // 设置面板
                'settings.title': '系统设置',
                'settings.theme': '主题',
                'settings.theme.light': '浅色',
                'settings.theme.dark': '深色',
                'settings.language': '语言',
                'settings.language.zh': '\u4e2d\u6587',
                'settings.language.en': 'English',
                'settings.animation-speed': '动画速度',
                'settings.enable-sound': '启用声音',
                'settings.enable-stats': '显示统计',
                'settings.mobile-optimization': '移动端优化',
                'settings.auto': '自动',
                'settings.enabled': '启用',
                'settings.disabled': '禁用',
                'settings.view-errors': '查看错误日志',
                'settings.restart-tutorial': '重新查看引导',
                
                // 统计信息
                'stats.comparisons': '比较次数',
                'stats.swaps': '交换次数',
                'stats.accesses': '访问次数',
                'stats.time': '执行时间',
                'stats.complexity': '时间复杂度',
                'stats.space-complexity': '空间复杂度',
                'stats.best': '最佳',
                'stats.average': '平均',
                'stats.worst': '最坏',
                
                // 数据输入
                'input.custom-data': '自定义数据',
                'input.placeholder': '输入数字，用逗号分隔',
                'input.generate-random': '生成随机数据',
                'input.generate-sorted': '生成已排序数据',
                'input.generate-reversed': '生成逆序数据',
                'input.array-size': '数组大小',
                'input.apply': '应用',
                
                // 步骤说明
                'step.comparing': '比较元素 {a} 和 {b}',
                'step.swapping': '交换元素 {a} 和 {b}',
                'step.sorted': '元素 {index} 已排序',
                'step.found': '找到目标元素',
                'step.not-found': '未找到目标元素',
                'step.visiting': '访问节点 {node}',
                'step.complete': '算法执行完成',
                
                // 错误消息
                'error.invalid-input': '输入数据无效，请检查格式',
                'error.empty-data': '数据不能为空',
                'error.too-large': '数据量过大，请减少元素数量',
                'error.network': '网络错误，请检查连接',
                'error.unknown': '发生未知错误，请刷新页面重试',
                'error.type': '数据类型错误，请检查输入',
                'error.reference': '引用错误，某些功能可能未正确加载',
                'error.range': '数值超出范围，请调整输入',
                
                // 教程
                'tutorial.welcome': '欢迎使用 CSP-J 算法可视化学习系统',
                'tutorial.next': '下一步',
                'tutorial.skip': '跳过',
                'tutorial.finish': '完成',
                'tutorial.step': '步骤 {current} / {total}',
                
                // 性能对比
                'comparison.title': '算法性能对比',
                'comparison.select-algorithms': '选择要对比的算法',
                'comparison.start': '开始对比',
                'comparison.results': '对比结果',
                
                // 帮助和提示
                'help.keyboard-shortcuts': '键盘快捷键',
                'help.space': '空格键：播放/暂停',
                'help.left-arrow': '左箭头：上一步',
                'help.right-arrow': '右箭头：下一步',
                'help.mobile-gestures': '移动端手势',
                'help.swipe-left': '左滑：下一步',
                'help.swipe-right': '右滑：上一步',
                
                // 其他
                'recent.title': '最近使用',
                'favorites.title': '收藏夹',
                'favorites.add': '添加到收藏',
                'favorites.remove': '从收藏移除',
                'progress.title': '学习进度',
                'progress.completed': '已完成',
                // 优化页面文案
                'optimized.nav.subtitle': '\u4f18\u5316\u7248 v2.0',
                'optimized.intro.title': 'CSP-J \u7b97\u6cd5\u5b66\u4e60\u4e0e\u53ef\u89c6\u5316',
                'optimized.intro.body': '在左侧选择算法即可查看描述、复杂度和示例代码，切换到“可视化”标签体验动画演示。',
                'optimized.tabs.algorithms': '\u7b97\u6cd5\u5217\u8868',
                'optimized.tabs.visualizer': '\u53ef\u89c6\u5316',
                'optimized.tabs.progress': '\u5b66\u4e60\u8fdb\u5ea6',
                'optimized.search.label': '\u641c\u7d22\u7b97\u6cd5',
                'optimized.search.placeholder': '输入名称或关键字，如 sort、graph',
                'optimized.defaultPrompt': '从左侧选择任意算法，右侧会显示详细信息。',
                'optimized.detail.start': '\u25b6 \u542f\u52a8\u53ef\u89c6\u5316',
                'optimized.detail.description': '\u7b97\u6cd5\u8bf4\u660e',
                'optimized.detail.useCases': '\u5178\u578b\u5e94\u7528\u573a\u666f',
                'optimized.detail.properties': '\u5173\u952e\u7279\u6027',
                'optimized.detail.code': 'C++ \u4ee3\u7801\u793a\u4f8b',
                'optimized.detail.complexity': '\u590d\u6742\u5ea6',
                'optimized.detail.best': '\u6700\u4f73\u65f6\u95f4：',
                'optimized.detail.average': '\u5e73\u5747\u65f6\u95f4：',
                'optimized.detail.worst': '\u6700\u574f\u65f6\u95f4：',
                'optimized.detail.space': '\u7a7a\u95f4\u5360\u7528：',
                'optimized.visualizer.title': '\u53ef\u89c6\u5316\u6f14\u793a',
                'optimized.visualizer.hint': '在“算法”页选择算法后点击“启动可视化”即可查看动画。',
                'optimized.visualizer.statusTitle': '\u5f53\u524d\u72b6\u6001',
                'optimized.visualizer.statusEmpty': '暂未运行任何可视化。',
                'optimized.visualizer.noConfig': '该算法暂未配置可视化演示。',
                'optimized.visualizer.running': '正在展示：{algorithm}',
                'optimized.list.empty': '没有符合筛选条件的算法。',
                'optimized.alert.selectAlgorithm': '请先选择一个算法。',
                'optimized.progress.viewed': '\u5df2\u6d4f\u89c8\u7b97\u6cd5\u6570',
                'optimized.progress.time': '\u9884\u8ba1\u5b66\u4e60\u65f6\u95f4（\u5206\u949f）',
                'optimized.progress.badges': '\u5fbd\u7ae0（\u793a\u4f8b）',
                'optimized.progress.note': '进度仅保存在当前浏览器本地，不会同步到服务器。',
                'difficulty.easy': '\u7b80\u5355',
                'difficulty.medium': '\u4e2d\u7b49',
                'difficulty.hard': '\u56f0\u96be',
                'optimized.sidebar.title': '\u7b97\u6cd5\u7b5b\u9009',
                'optimized.sidebar.subtitle': '\u6839\u636e\u7c7b\u522b\u548c\u5173\u952e\u8bcd\u9009\u62e9\u7b97\u6cd5',
                'optimized.sidebar.counter': '\u53ef\u7528\u7b97\u6cd5\uff1a{count}\u4e2a',
                'optimized.detail.tags': '\u7b97\u6cd5\u6807\u7b7e',
                'optimized.detail.emptyUseCases': '\u6682\u65f6\u6ca1\u6709\u53ef\u5c55\u793a\u7684\u5e94\u7528\u793a\u4f8b\u3002',
            },
            'en-US': {
                // Common
                'common.loading': 'Loading...',
                'common.error': 'Error',
                'common.success': 'Success',
                'common.cancel': 'Cancel',
                'common.confirm': 'Confirm',
                'common.close': 'Close',
                'common.save': 'Save',
                'common.reset': 'Reset',
                'common.search': 'Search',
                'common.filter': 'Filter',
                
                // Navigation and titles
                'nav.title': 'CSP-J Algorithm Visualization Learning System',
                'nav.algorithms': 'Algorithms',
                'nav.tutorial': 'Interactive Tutorial',
                'nav.comparison': 'Performance Comparison',
                'nav.settings': 'Settings',
                'nav.help': 'Help',
                
                // Algorithm categories
                'category.sorting': 'Sorting Algorithms',
                'category.searching': 'Searching Algorithms',
                'category.graph': 'Graph Algorithms',
                'category.dp': 'Dynamic Programming',
                'category.greedy': 'Greedy Algorithms',
                'category.all': 'All Algorithms',
                
                // Algorithm names
                'algorithm.bubble': 'Bubble Sort',
                'algorithm.selection': 'Selection Sort',
                'algorithm.insertion': 'Insertion Sort',
                'algorithm.quick': 'Quick Sort',
                'algorithm.merge': 'Merge Sort',
                'algorithm.heap': 'Heap Sort',
                'algorithm.linear-search': 'Linear Search',
                'algorithm.binary-search': 'Binary Search',
                'algorithm.dfs': 'Depth-First Search',
                'algorithm.bfs': 'Breadth-First Search',
                'algorithm.dijkstra': 'Dijkstra\'s Algorithm',
                'algorithm.prim': 'Prim\'s Algorithm',
                'algorithm.kruskal': 'Kruskal\'s Algorithm',
                'algorithm.knapsack': 'Knapsack Problem',
                'algorithm.lcs': 'Longest Common Subsequence',
                
                // Control buttons
                'control.play': 'Play',
                'control.pause': 'Pause',
                'control.stop': 'Stop',
                'control.next': 'Next',
                'control.prev': 'Previous',
                'control.reset': 'Reset',
                'control.speed': 'Speed',
                'control.fast': 'Fast',
                'control.normal': 'Normal',
                'control.slow': 'Slow',
                
                // Settings panel
                'settings.title': 'System Settings',
                'settings.theme': 'Theme',
                'settings.theme.light': 'Light',
                'settings.theme.dark': 'Dark',
                'settings.language': 'Language',
                'settings.language.zh': '中文',
                'settings.language.en': 'English',
                'settings.animation-speed': 'Animation Speed',
                'settings.enable-sound': 'Enable Sound',
                'settings.enable-stats': 'Show Statistics',
                'settings.mobile-optimization': 'Mobile Optimization',
                'settings.auto': 'Auto',
                'settings.enabled': 'Enabled',
                'settings.disabled': 'Disabled',
                'settings.view-errors': 'View Error Log',
                'settings.restart-tutorial': 'Restart Tutorial',
                
                // Statistics
                'stats.comparisons': 'Comparisons',
                'stats.swaps': 'Swaps',
                'stats.accesses': 'Accesses',
                'stats.time': 'Execution Time',
                'stats.complexity': 'Time Complexity',
                'stats.space-complexity': 'Space Complexity',
                'stats.best': 'Best',
                'stats.average': 'Average',
                'stats.worst': 'Worst',
                
                // Data input
                'input.custom-data': 'Custom Data',
                'input.placeholder': 'Enter numbers separated by commas',
                'input.generate-random': 'Generate Random',
                'input.generate-sorted': 'Generate Sorted',
                'input.generate-reversed': 'Generate Reversed',
                'input.array-size': 'Array Size',
                'input.apply': 'Apply',
                
                // Step explanations
                'step.comparing': 'Comparing elements {a} and {b}',
                'step.swapping': 'Swapping elements {a} and {b}',
                'step.sorted': 'Element {index} is sorted',
                'step.found': 'Target element found',
                'step.not-found': 'Target element not found',
                'step.visiting': 'Visiting node {node}',
                'step.complete': 'Algorithm execution complete',
                
                // Error messages
                'error.invalid-input': 'Invalid input data, please check format',
                'error.empty-data': 'Data cannot be empty',
                'error.too-large': 'Data size too large, please reduce elements',
                'error.network': 'Network error, please check connection',
                'error.unknown': 'Unknown error occurred, please refresh and retry',
                'error.type': 'Data type error, please check input',
                'error.reference': 'Reference error, some features may not be loaded correctly',
                'error.range': 'Value out of range, please adjust input',
                
                // Tutorial
                'tutorial.welcome': 'Welcome to CSP-J Algorithm Visualization Learning System',
                'tutorial.next': 'Next',
                'tutorial.skip': 'Skip',
                'tutorial.finish': 'Finish',
                'tutorial.step': 'Step {current} / {total}',
                
                // Performance comparison
                'comparison.title': 'Algorithm Performance Comparison',
                'comparison.select-algorithms': 'Select algorithms to compare',
                'comparison.start': 'Start Comparison',
                'comparison.results': 'Comparison Results',
                
                // Help and tips
                'help.keyboard-shortcuts': 'Keyboard Shortcuts',
                'help.space': 'Space: Play/Pause',
                'help.left-arrow': 'Left Arrow: Previous Step',
                'help.right-arrow': 'Right Arrow: Next Step',
                'help.mobile-gestures': 'Mobile Gestures',
                'help.swipe-left': 'Swipe Left: Next Step',
                'help.swipe-right': 'Swipe Right: Previous Step',
                
                // Others
                'recent.title': 'Recently Used',
                'favorites.title': 'Favorites',
                'favorites.add': 'Add to Favorites',
                'favorites.remove': 'Remove from Favorites',
                'progress.title': 'Learning Progress',
                'progress.completed': 'Completed',
                // Optimized page strings
                'optimized.nav.subtitle': 'Optimized version v2.0',
                'optimized.intro.title': 'Algorithm learning and visualization for CSP-J',
                'optimized.intro.body': 'Select an algorithm on the left to read the description, complexity, and code sample. Switch to the Visualization tab to watch the animation.',
                'optimized.tabs.algorithms': 'Algorithms',
                'optimized.tabs.visualizer': 'Visualization',
                'optimized.tabs.progress': 'Progress',
                'optimized.search.label': 'Search algorithms',
                'optimized.search.placeholder': 'Name or keyword, e.g. sort, graph',
                'optimized.defaultPrompt': 'Select an algorithm on the left to see details.',
                'optimized.detail.start': '▶ Start visualization',
                'optimized.detail.description': 'Description',
                'optimized.detail.useCases': 'Typical use cases',
                'optimized.detail.properties': 'Key properties',
                'optimized.detail.code': 'C++ code example',
                'optimized.detail.complexity': 'Complexity',
                'optimized.detail.best': 'Best time:',
                'optimized.detail.average': 'Average time:',
                'optimized.detail.worst': 'Worst time:',
                'optimized.detail.space': 'Space:',
                'optimized.visualizer.title': 'Visualizer',
                'optimized.visualizer.hint': 'Pick an algorithm in the first tab and click “Start visualization”.',
                'optimized.visualizer.statusTitle': 'Current status',
                'optimized.visualizer.statusEmpty': 'No visualization running yet.',
                'optimized.visualizer.noConfig': 'No visualizer is configured for this algorithm.',
                'optimized.visualizer.running': 'Showing a demo visualization for {algorithm}.',
                'optimized.list.empty': 'No algorithms match the current filter.',
                'optimized.alert.selectAlgorithm': 'Please select an algorithm first.',
                'optimized.progress.viewed': 'Algorithms viewed',
                'optimized.progress.time': 'Estimated study time (min)',
                'optimized.progress.badges': 'Badges (demo)',
                'optimized.progress.note': 'Progress is stored locally in this browser only.',
                'difficulty.easy': 'Easy',
                'difficulty.medium': 'Medium',
                'difficulty.hard': 'Hard',
                'optimized.sidebar.title': 'Algorithm filters',
                'optimized.sidebar.subtitle': 'Filter by category or keyword',
                'optimized.sidebar.counter': 'Available algorithms: {count}',
                'optimized.detail.tags': 'Algorithm tags',
                'optimized.detail.emptyUseCases': 'No use cases available yet.'
            }
        };

        this.messages = allMessages[locale] || allMessages[this.fallbackLocale];
        this.locale = locale;
    }

    /**
     * 翻译文本
     * @param {string} key - 翻译键
     * @param {Object} params - 参数对象，用于替换占位符
     * @returns {string} 翻译后的文本
     */
    t(key, params = {}) {
        let message = this.messages[key];
        
        // 如果找不到翻译，返回键名
        if (!message) {
            console.warn(`Translation missing for key: ${key}`);
            return key;
        }
        
        // 替换参数占位符
        Object.keys(params).forEach(param => {
            const placeholder = `{${param}}`;
            message = message.replace(new RegExp(placeholder, 'g'), params[param]);
        });
        
        return message;
    }

    /**
     * 切换语言
     * @param {string} locale - 新的语言代码
     */
    setLocale(locale) {
        this.loadMessages(locale);
        
        // 触发语言变更事件
        const event = new CustomEvent('locale-changed', { 
            detail: { locale: this.locale } 
        });
        document.dispatchEvent(event);
    }

    /**
     * 获取当前语言
     * @returns {string} 当前语言代码
     */
    getLocale() {
        return this.locale;
    }

    /**
     * 获取所有支持的语言
     * @returns {Array} 支持的语言列表
     */
    getSupportedLocales() {
        return [
            { code: 'zh-CN', name: '中文' },
            { code: 'en-US', name: 'English' }
        ];
    }
}

// 创建全局实例
// 从 ConfigManager 获取当前语言设置
if (typeof window !== 'undefined') {
    const currentLanguage = window.configManager ? 
        window.configManager.get('language') : 'zh-CN';
    window.i18n = new I18n(currentLanguage);
    
    console.log('✅ I18n initialized with locale:', currentLanguage);
}
