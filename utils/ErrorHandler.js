/**
 * ErrorHandler - 统一的错误处理系统
 * 提供错误捕获、日志记录、用户友好提示和本地存储功能
 * 
 * @class ErrorHandler
 * @description 提供完整的错误处理功能：
 * - 错误信息的本地存储（最多100条）
 * - 用户友好的错误提示Toast
 * - 错误类型到友好消息的映射
 * - 错误日志的导出功能
 * 
 * @example
 * // 处理错误
 * try {
 *     // 某些可能出错的代码
 *     throw new TypeError('Invalid data type');
 * } catch (error) {
 *     ErrorHandler.handle(error, 'DataProcessing');
 * }
 * 
 * // 获取错误日志
 * const logs = ErrorHandler.getErrorLogs();
 * 
 * // 导出错误日志
 * const logText = ErrorHandler.exportErrorLogs();
 * 
 * // 清除错误日志
 * ErrorHandler.clearErrorLogs();
 */
class ErrorHandler {
    /**
     * 处理错误的主入口
     * @param {Error} error - 错误对象
     * @param {string} context - 错误上下文描述
     */
    static handle(error, context = '') {
        const errorInfo = {
            message: error.message || String(error),
            stack: error.stack || '',
            context: context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            type: error.name || 'Error'
        };
        
        // 记录错误到本地存储
        this.log(errorInfo);
        
        // 显示用户友好的错误消息
        this.showUserMessage(error);
        
        // 在控制台输出详细错误信息（开发调试用）
        console.error('❌ 错误详情:', errorInfo);
    }
    
    /**
     * 记录错误到本地存储
     * @param {Object} errorInfo - 错误信息对象
     */
    static log(errorInfo) {
        try {
            // 从localStorage获取现有错误日志
            const errors = JSON.parse(localStorage.getItem('cspj-error-log') || '[]');
            
            // 添加新错误
            errors.push(errorInfo);
            
            // 只保留最近100条错误记录
            if (errors.length > 100) {
                errors.splice(0, errors.length - 100);
            }
            
            // 保存回localStorage
            localStorage.setItem('cspj-error-log', JSON.stringify(errors));
        } catch (storageError) {
            // 如果localStorage不可用，只在控制台输出
            console.warn('无法保存错误日志到本地存储:', storageError);
        }
    }
    
    /**
     * 显示用户友好的错误提示Toast
     * @param {Error} error - 错误对象
     */
    static showUserMessage(error) {
        const message = this.getUserFriendlyMessage(error);
        
        // 创建Toast容器（如果不存在）
        let toastContainer = document.getElementById('error-toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'error-toast-container';
            toastContainer.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
            `;
            document.body.appendChild(toastContainer);
        }
        
        // 创建错误提示Toast
        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.style.cssText = `
            background: #fee;
            border: 2px solid #f44;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: flex-start;
            gap: 12px;
            animation: slideIn 0.3s ease-out;
        `;
        
        toast.innerHTML = `
            <div class="error-icon" style="font-size: 24px; flex-shrink: 0;">⚠️</div>
            <div class="error-content" style="flex: 1; min-width: 0;">
                <div class="error-message" style="color: #c00; font-weight: 600; margin-bottom: 4px;">
                    ${message}
                </div>
                <div class="error-hint" style="color: #666; font-size: 12px;">
                    错误已记录，您可以在设置中查看详细日志
                </div>
            </div>
            <button class="error-close" style="
                background: none;
                border: none;
                font-size: 20px;
                color: #999;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                flex-shrink: 0;
                line-height: 1;
            ">×</button>
        `;
        
        // 添加CSS动画
        if (!document.getElementById('error-toast-styles')) {
            const style = document.createElement('style');
            style.id = 'error-toast-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
                .error-close:hover {
                    color: #333 !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        toastContainer.appendChild(toast);
        
        // 自动关闭（5秒后）
        const autoCloseTimer = setTimeout(() => {
            this._removeToast(toast);
        }, 5000);
        
        // 手动关闭
        const closeButton = toast.querySelector('.error-close');
        closeButton.onclick = () => {
            clearTimeout(autoCloseTimer);
            this._removeToast(toast);
        };
    }
    
    /**
     * 移除Toast元素（带动画）
     * @param {HTMLElement} toast - Toast元素
     */
    static _removeToast(toast) {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
    
    /**
     * 获取用户友好的错误消息
     * @param {Error} error - 错误对象
     * @returns {string} 用户友好的错误消息
     */
    static getUserFriendlyMessage(error) {
        const errorType = error.name || 'Error';
        
        // 错误类型到用户友好消息的映射
        const messageMap = {
            'TypeError': '数据类型错误，请检查输入的数据格式',
            'ReferenceError': '引用错误，某些功能可能未正确加载，请刷新页面',
            'RangeError': '数值超出有效范围，请调整输入的数据',
            'SyntaxError': '语法错误，请检查输入格式',
            'NetworkError': '网络连接错误，请检查网络连接',
            'QuotaExceededError': '存储空间已满，请清理浏览器缓存',
            'SecurityError': '安全错误，某些功能被浏览器限制',
            'TimeoutError': '操作超时，请重试',
            'AbortError': '操作被取消'
        };
        
        // 返回映射的消息，如果没有映射则返回通用消息
        return messageMap[errorType] || '发生了一个错误，请刷新页面重试';
    }
    
    /**
     * 获取所有错误日志
     * 
     * @static
     * @returns {Array<Object>} 错误日志数组
     * @returns {string} return[].message - 错误消息
     * @returns {string} return[].stack - 错误堆栈
     * @returns {string} return[].context - 错误上下文
     * @returns {string} return[].timestamp - 时间戳
     * @returns {string} return[].type - 错误类型
     * 
     * @example
     * const logs = ErrorHandler.getErrorLogs();
     * logs.forEach(log => {
     *     console.log(`[${log.timestamp}] ${log.type}: ${log.message}`);
     * });
     */
    static getErrorLogs() {
        try {
            return JSON.parse(localStorage.getItem('cspj-error-log') || '[]');
        } catch (error) {
            console.error('无法读取错误日志:', error);
            return [];
        }
    }
    
    /**
     * 清除所有错误日志
     * 从localStorage中删除所有错误记录
     * 
     * @static
     * @returns {boolean} 是否成功清除
     * 
     * @example
     * if (ErrorHandler.clearErrorLogs()) {
     *     console.log('错误日志已清除');
     * }
     */
    static clearErrorLogs() {
        try {
            localStorage.removeItem('cspj-error-log');
            return true;
        } catch (error) {
            console.error('无法清除错误日志:', error);
            return false;
        }
    }
    
    /**
     * 导出错误日志为文本
     * 将所有错误日志格式化为易读的文本格式
     * 
     * @static
     * @returns {string} 格式化的错误日志文本
     * 
     * @example
     * const logText = ErrorHandler.exportErrorLogs();
     * // 可以保存到文件或复制到剪贴板
     * navigator.clipboard.writeText(logText);
     */
    static exportErrorLogs() {
        const logs = this.getErrorLogs();
        if (logs.length === 0) {
            return '暂无错误日志';
        }
        
        let text = '=== CSP-J 算法学习系统 - 错误日志 ===\n\n';
        logs.forEach((log, index) => {
            text += `[${index + 1}] ${log.timestamp}\n`;
            text += `类型: ${log.type}\n`;
            text += `消息: ${log.message}\n`;
            text += `上下文: ${log.context || '无'}\n`;
            text += `堆栈: ${log.stack ? log.stack.split('\n')[0] : '无'}\n`;
            text += '\n' + '-'.repeat(60) + '\n\n';
        });
        
        return text;
    }
}

// 将ErrorHandler暴露到全局作用域
if (typeof window !== 'undefined') {
    window.ErrorHandler = ErrorHandler;
}
