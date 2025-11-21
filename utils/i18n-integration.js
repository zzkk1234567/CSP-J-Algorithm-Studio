/**
 * I18n Integration Helper
 * 提供页面国际化集成功能
 */

// 初始化国际化
function initI18n() {
    if (!window.i18n) {
        console.error('I18n not loaded');
        return;
    }
    
    // 更新页面文本
    updatePageText();
    
    // 监听语言变更事件
    document.addEventListener('locale-changed', () => {
        updatePageText();
    });
    
    console.log('✅ I18n integration initialized');
}

// 更新页面所有文本
function updatePageText() {
    const i18n = window.i18n;
    if (!i18n) return;
    
    // 更新导航栏
    updateElement('nav h1', i18n.t('nav.title'));
    updateElement('#overall-progress', '0%'); // 保持动态值
    updateAttribute('[title="设置"]', 'title', i18n.t('nav.settings'));
    
    // 更新设置面板
    updateElement('#settings-modal h2', `⚙️ ${i18n.t('settings.title')}`);
    updateElement('#settings-modal h3:nth-of-type(1)', `🎨 ${i18n.t('settings.theme')}`);
    updateElement('#theme-light .font-medium', i18n.t('settings.theme.light'));
    updateElement('#theme-dark .font-medium', i18n.t('settings.theme.dark'));
    
    // 更新语言设置
    updateElement('#settings-modal h3:nth-of-type(2)', `🌐 ${i18n.t('settings.language')}`);
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        langSelect.innerHTML = `
            <option value="zh-CN">${i18n.t('settings.language.zh')}</option>
            <option value="en-US">${i18n.t('settings.language.en')}</option>
        `;
        langSelect.value = i18n.getLocale();
    }
    
    // 更新动画速度设置
    updateElement('#settings-modal h3:nth-of-type(3)', `⚡ ${i18n.t('settings.animation-speed')}`);
    
    // 更新功能开关
    updateElement('#settings-modal h3:nth-of-type(4)', `🔧 ${i18n.t('settings.title')}`);
    
    // 更新Tab导航
    updateElement('#tab-knowledge', `📚 ${i18n.t('nav.algorithms')}`);
    updateElement('#tab-practice', `💻 ${i18n.t('input.custom-data')}`);
    updateElement('#tab-interactive', `🎮 ${i18n.t('nav.tutorial')}`);
    updateElement('#tab-test', `📝 ${i18n.t('nav.comparison')}`);
    
    // 更新控制按钮
    updateControlButtons();
    
    // 更新统计面板
    updateStatsPanel();
}

// 更新控制按钮文本
function updateControlButtons() {
    const i18n = window.i18n;
    if (!i18n) return;
    
    // 这些按钮会在可视化器初始化时创建，所以我们需要在那里处理
    // 这里只是提供一个辅助函数
}

// 更新统计面板
function updateStatsPanel() {
    const i18n = window.i18n;
    if (!i18n) return;
    
    const statsLabels = [
        { selector: '#mastered-count + .text-sm', key: 'progress.completed' },
        { selector: '#practice-count + .text-sm', key: 'stats.comparisons' },
        { selector: '#accuracy-rate + .text-sm', key: 'stats.swaps' },
        { selector: '#study-time + .text-sm', key: 'stats.time' }
    ];
    
    // 注意：这些是示例，实际标签需要根据HTML结构调整
}

// 辅助函数：更新元素文本
function updateElement(selector, text) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = text;
    }
}

// 辅助函数：更新元素属性
function updateAttribute(selector, attr, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.setAttribute(attr, value);
    }
}

// 获取翻译文本的辅助函数
function t(key, params = {}) {
    return window.i18n ? window.i18n.t(key, params) : key;
}

// 导出到全局
if (typeof window !== 'undefined') {
    window.initI18n = initI18n;
    window.updatePageText = updatePageText;
    window.t = t;
}
