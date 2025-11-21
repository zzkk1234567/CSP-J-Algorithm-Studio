/**
 * Language Switcher
 * 处理语言切换功能
 */

// 设置语言
function setLanguage(locale) {
    if (!window.i18n || !window.configManager) {
        console.error('I18n or ConfigManager not loaded');
        return;
    }
    
    // 更新i18n
    window.i18n.setLocale(locale);
    
    // 保存到配置
    window.configManager.set('language', locale);
    
    // 更新UI
    updateLanguageUI();
    
    console.log(`✅ Language switched to: ${locale}`);
}

// 更新语言相关的UI
function updateLanguageUI() {
    if (!window.i18n) return;
    
    const locale = window.i18n.getLocale();
    
    // 更新语言选择器
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        langSelect.value = locale;
    }
    
    // 更新页面文本（如果有集成函数）
    if (window.updatePageText) {
        window.updatePageText();
    }
    
    // 更新HTML lang属性
    document.documentElement.lang = locale;
}

// 初始化语言设置
function initLanguage() {
    if (!window.configManager || !window.i18n) {
        console.error('ConfigManager or I18n not loaded');
        return;
    }
    
    // 从配置中获取语言
    const savedLanguage = window.configManager.get('language') || 'zh-CN';
    
    // 设置语言
    window.i18n.setLocale(savedLanguage);
    
    // 更新UI
    updateLanguageUI();
    
    console.log('✅ Language initialized:', savedLanguage);
}

// 导出到全局
if (typeof window !== 'undefined') {
    window.setLanguage = setLanguage;
    window.initLanguage = initLanguage;
    window.updateLanguageUI = updateLanguageUI;
}
