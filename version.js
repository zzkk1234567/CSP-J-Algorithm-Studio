/**
 * 版本管理系统
 * 管理应用程序版本信息和更新检查
 */

const AppVersion = {
    // 当前版本号（遵循语义化版本规范）
    current: '2.0.0',
    
    // 版本发布日期
    releaseDate: '2024-01-15',
    
    // 版本名称
    codeName: 'Enhanced Edition',
    
    // 构建号
    build: '20240115001',
    
    /**
     * 获取完整版本信息
     * @returns {string} 格式化的版本信息
     */
    getFullVersion() {
        return `v${this.current} (${this.codeName}) - Build ${this.build}`;
    },
    
    /**
     * 获取简短版本信息
     * @returns {string} 简短版本号
     */
    getShortVersion() {
        return `v${this.current}`;
    },
    
    /**
     * 检查是否有新版本
     * 比较localStorage中保存的版本号与当前版本号
     * @returns {boolean} 是否有新版本
     */
    checkForUpdate() {
        try {
            const savedVersion = localStorage.getItem('app-version');
            
            if (!savedVersion) {
                // 首次使用，保存当前版本
                this.saveCurrentVersion();
                return false;
            }
            
            // 比较版本号
            const isNewVersion = this.compareVersions(this.current, savedVersion) > 0;
            
            if (isNewVersion) {
                console.log(`🎉 检测到新版本: ${savedVersion} → ${this.current}`);
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('版本检查失败:', error);
            return false;
        }
    },
    
    /**
     * 保存当前版本号到localStorage
     */
    saveCurrentVersion() {
        try {
            localStorage.setItem('app-version', this.current);
            localStorage.setItem('app-version-date', this.releaseDate);
        } catch (error) {
            console.error('保存版本信息失败:', error);
        }
    },
    
    /**
     * 比较两个版本号
     * @param {string} v1 - 版本号1
     * @param {string} v2 - 版本号2
     * @returns {number} 1表示v1>v2, -1表示v1<v2, 0表示相等
     */
    compareVersions(v1, v2) {
        const parts1 = v1.split('.').map(Number);
        const parts2 = v2.split('.').map(Number);
        
        for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
            const num1 = parts1[i] || 0;
            const num2 = parts2[i] || 0;
            
            if (num1 > num2) return 1;
            if (num1 < num2) return -1;
        }
        
        return 0;
    },
    
    /**
     * 显示版本更新提示
     */
    showUpdateNotification() {
        const notification = document.createElement('div');
        notification.id = 'version-update-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 350px;
            animation: slideInRight 0.5s ease-out;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <div style="font-size: 32px;">🎉</div>
                <div style="flex: 1;">
                    <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: bold;">
                        新版本可用！
                    </h3>
                    <p style="margin: 0 0 12px 0; font-size: 14px; opacity: 0.9;">
                        ${this.getFullVersion()}
                    </p>
                    <p style="margin: 0 0 15px 0; font-size: 13px; opacity: 0.8;">
                        发布日期: ${this.releaseDate}
                    </p>
                    <button onclick="AppVersion.dismissNotification()" 
                            style="
                                background: rgba(255,255,255,0.2);
                                border: 1px solid rgba(255,255,255,0.3);
                                color: white;
                                padding: 8px 16px;
                                border-radius: 6px;
                                cursor: pointer;
                                font-size: 14px;
                                font-weight: 600;
                            ">
                        知道了
                    </button>
                </div>
                <button onclick="AppVersion.dismissNotification()" 
                        style="
                            background: none;
                            border: none;
                            color: white;
                            font-size: 24px;
                            cursor: pointer;
                            padding: 0;
                            line-height: 1;
                        ">
                    ×
                </button>
            </div>
        `;
        
        // 添加动画样式
        if (!document.getElementById('version-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'version-notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // 10秒后自动关闭
        setTimeout(() => {
            this.dismissNotification();
        }, 10000);
    },
    
    /**
     * 关闭更新提示
     */
    dismissNotification() {
        const notification = document.getElementById('version-update-notification');
        if (notification) {
            notification.style.animation = 'slideInRight 0.3s ease-in reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
        
        // 保存当前版本，下次不再提示
        this.saveCurrentVersion();
    },
    
    /**
     * 初始化版本管理系统
     * 在页面加载时调用
     */
    init() {
        console.log(`📦 CSP-J 算法学习系统 ${this.getFullVersion()}`);
        console.log(`📅 发布日期: ${this.releaseDate}`);
        
        // 检查更新
        if (this.checkForUpdate()) {
            // 延迟显示，让页面先加载完成
            setTimeout(() => {
                this.showUpdateNotification();
            }, 2000);
        } else {
            // 即使没有更新，也保存当前版本
            this.saveCurrentVersion();
        }
    }
};

// 导出到全局作用域
if (typeof window !== 'undefined') {
    window.AppVersion = AppVersion;
}

// 页面加载完成后初始化
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            AppVersion.init();
        });
    } else {
        AppVersion.init();
    }
}
