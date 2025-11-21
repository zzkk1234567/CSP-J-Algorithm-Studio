/**
 * TestFramework - 轻量级测试框架
 * 用于CSP-J算法可视化系统的单元测试和集成测试
 */

class TestFramework {
    constructor() {
        this.suites = [];
        this.results = [];
        this.currentSuite = null;
    }

    /**
     * 定义测试套件
     * @param {string} suiteName - 测试套件名称
     * @param {Function} testFn - 测试函数，接收it函数作为参数
     */
    describe(suiteName, testFn) {
        const suite = {
            name: suiteName,
            tests: [],
            beforeEach: null,
            afterEach: null
        };
        
        this.currentSuite = suite;
        
        // 创建it函数用于定义测试用例
        const it = (testName, testFn) => {
            suite.tests.push({ 
                name: testName, 
                fn: testFn,
                timeout: 5000 // 默认超时5秒
            });
        };
        
        // 创建beforeEach函数
        const beforeEach = (fn) => {
            suite.beforeEach = fn;
        };
        
        // 创建afterEach函数
        const afterEach = (fn) => {
            suite.afterEach = fn;
        };
        
        // 执行测试定义函数
        testFn(it, beforeEach, afterEach);
        
        this.suites.push(suite);
        this.currentSuite = null;
    }

    /**
     * 运行所有测试套件
     * @returns {Promise<Object>} 测试结果摘要
     */
    async run() {
        console.log('🧪 开始运行测试...\n');
        this.results = [];
        
        const startTime = performance.now();
        
        for (const suite of this.suites) {
            await this._runSuite(suite);
        }
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        const summary = this._printSummary(duration);
        return summary;
    }

    /**
     * 运行单个测试套件
     * @param {Object} suite - 测试套件对象
     */
    async _runSuite(suite) {
        console.log(`📦 测试套件: ${suite.name}`);
        
        for (const test of suite.tests) {
            try {
                // 运行beforeEach钩子
                if (suite.beforeEach) {
                    await suite.beforeEach();
                }
                
                // 运行测试用例
                const testStartTime = performance.now();
                await this._runTestWithTimeout(test.fn, test.timeout);
                const testEndTime = performance.now();
                const testDuration = testEndTime - testStartTime;
                
                console.log(`  ✅ ${test.name} (${testDuration.toFixed(2)}ms)`);
                this.results.push({ 
                    suite: suite.name, 
                    test: test.name, 
                    passed: true,
                    duration: testDuration
                });
                
                // 运行afterEach钩子
                if (suite.afterEach) {
                    await suite.afterEach();
                }
            } catch (error) {
                console.error(`  ❌ ${test.name}`);
                console.error(`     错误: ${error.message}`);
                if (error.stack) {
                    console.error(`     堆栈: ${error.stack.split('\n')[1]?.trim()}`);
                }
                this.results.push({ 
                    suite: suite.name, 
                    test: test.name, 
                    passed: false, 
                    error: error.message,
                    stack: error.stack
                });
                
                // 即使测试失败也运行afterEach
                if (suite.afterEach) {
                    try {
                        await suite.afterEach();
                    } catch (cleanupError) {
                        console.error(`     清理错误: ${cleanupError.message}`);
                    }
                }
            }
        }
        console.log('');
    }

    /**
     * 运行带超时的测试
     * @param {Function} testFn - 测试函数
     * @param {number} timeout - 超时时间（毫秒）
     */
    _runTestWithTimeout(testFn, timeout) {
        return Promise.race([
            Promise.resolve(testFn()),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error(`测试超时 (${timeout}ms)`)), timeout)
            )
        ]);
    }

    /**
     * 打印测试摘要
     * @param {number} duration - 总运行时间
     * @returns {Object} 测试摘要对象
     */
    _printSummary(duration) {
        const total = this.results.length;
        const passed = this.results.filter(r => r.passed).length;
        const failed = total - passed;
        const passRate = total > 0 ? ((passed / total) * 100).toFixed(2) : 0;
        
        console.log('═══════════════════════════════════════════════════');
        console.log('📊 测试总结');
        console.log('═══════════════════════════════════════════════════');
        console.log(`总计: ${total} | 通过: ${passed} ✅ | 失败: ${failed} ❌`);
        console.log(`通过率: ${passRate}%`);
        console.log(`总耗时: ${duration.toFixed(2)}ms`);
        console.log('═══════════════════════════════════════════════════\n');
        
        if (failed > 0) {
            console.log('❌ 失败的测试:');
            this.results
                .filter(r => !r.passed)
                .forEach(r => {
                    console.log(`  • ${r.suite} > ${r.test}`);
                    console.log(`    ${r.error}`);
                });
            console.log('');
        }
        
        return {
            total,
            passed,
            failed,
            passRate: parseFloat(passRate),
            duration,
            results: this.results
        };
    }

    /**
     * 获取测试结果
     * @returns {Array} 测试结果数组
     */
    getResults() {
        return this.results;
    }

    /**
     * 清空测试结果
     */
    clear() {
        this.suites = [];
        this.results = [];
        this.currentSuite = null;
    }
}

/**
 * 断言工具对象
 * 提供各种断言方法用于测试验证
 */
const assert = {
    /**
     * 断言两个值相等
     * @param {*} actual - 实际值
     * @param {*} expected - 期望值
     * @param {string} message - 自定义错误消息
     */
    equal(actual, expected, message) {
        if (actual !== expected) {
            throw new Error(
                message || `断言失败: 期望 ${JSON.stringify(expected)}，实际 ${JSON.stringify(actual)}`
            );
        }
    },

    /**
     * 断言两个值不相等
     * @param {*} actual - 实际值
     * @param {*} expected - 不期望的值
     * @param {string} message - 自定义错误消息
     */
    notEqual(actual, expected, message) {
        if (actual === expected) {
            throw new Error(
                message || `断言失败: 不应该等于 ${JSON.stringify(expected)}`
            );
        }
    },

    /**
     * 断言值为真
     * @param {*} value - 要检查的值
     * @param {string} message - 自定义错误消息
     */
    truthy(value, message) {
        if (!value) {
            throw new Error(
                message || `断言失败: 期望真值，实际 ${JSON.stringify(value)}`
            );
        }
    },

    /**
     * 断言值为假
     * @param {*} value - 要检查的值
     * @param {string} message - 自定义错误消息
     */
    falsy(value, message) {
        if (value) {
            throw new Error(
                message || `断言失败: 期望假值，实际 ${JSON.stringify(value)}`
            );
        }
    },

    /**
     * 断言函数抛出异常
     * @param {Function} fn - 要执行的函数
     * @param {string|RegExp} expectedError - 期望的错误消息或正则表达式
     * @param {string} message - 自定义错误消息
     */
    throws(fn, expectedError, message) {
        let thrown = false;
        let actualError = null;
        
        try {
            fn();
        } catch (error) {
            thrown = true;
            actualError = error;
        }
        
        if (!thrown) {
            throw new Error(message || '断言失败: 期望抛出异常，但没有');
        }
        
        if (expectedError) {
            if (typeof expectedError === 'string') {
                if (!actualError.message.includes(expectedError)) {
                    throw new Error(
                        `断言失败: 期望错误消息包含 "${expectedError}"，实际 "${actualError.message}"`
                    );
                }
            } else if (expectedError instanceof RegExp) {
                if (!expectedError.test(actualError.message)) {
                    throw new Error(
                        `断言失败: 错误消息不匹配正则表达式 ${expectedError}`
                    );
                }
            }
        }
    },

    /**
     * 断言值为null或undefined
     * @param {*} value - 要检查的值
     * @param {string} message - 自定义错误消息
     */
    isNull(value, message) {
        if (value !== null && value !== undefined) {
            throw new Error(
                message || `断言失败: 期望null或undefined，实际 ${JSON.stringify(value)}`
            );
        }
    },

    /**
     * 断言值不为null或undefined
     * @param {*} value - 要检查的值
     * @param {string} message - 自定义错误消息
     */
    isNotNull(value, message) {
        if (value === null || value === undefined) {
            throw new Error(
                message || '断言失败: 期望非null/undefined值'
            );
        }
    },

    /**
     * 断言数组包含指定元素
     * @param {Array} array - 数组
     * @param {*} element - 要查找的元素
     * @param {string} message - 自定义错误消息
     */
    includes(array, element, message) {
        if (!Array.isArray(array)) {
            throw new Error('断言失败: 第一个参数必须是数组');
        }
        if (!array.includes(element)) {
            throw new Error(
                message || `断言失败: 数组不包含元素 ${JSON.stringify(element)}`
            );
        }
    },

    /**
     * 断言数组长度
     * @param {Array} array - 数组
     * @param {number} length - 期望的长度
     * @param {string} message - 自定义错误消息
     */
    lengthOf(array, length, message) {
        if (!Array.isArray(array)) {
            throw new Error('断言失败: 第一个参数必须是数组');
        }
        if (array.length !== length) {
            throw new Error(
                message || `断言失败: 期望长度 ${length}，实际 ${array.length}`
            );
        }
    },

    /**
     * 断言对象具有指定属性
     * @param {Object} obj - 对象
     * @param {string} property - 属性名
     * @param {string} message - 自定义错误消息
     */
    hasProperty(obj, property, message) {
        if (typeof obj !== 'object' || obj === null) {
            throw new Error('断言失败: 第一个参数必须是对象');
        }
        if (!(property in obj)) {
            throw new Error(
                message || `断言失败: 对象不包含属性 "${property}"`
            );
        }
    },

    /**
     * 深度相等断言
     * @param {*} actual - 实际值
     * @param {*} expected - 期望值
     * @param {string} message - 自定义错误消息
     */
    deepEqual(actual, expected, message) {
        const actualStr = JSON.stringify(actual);
        const expectedStr = JSON.stringify(expected);
        
        if (actualStr !== expectedStr) {
            throw new Error(
                message || `断言失败: 深度比较不相等\n期望: ${expectedStr}\n实际: ${actualStr}`
            );
        }
    }
};

// 导出到全局作用域
if (typeof window !== 'undefined') {
    window.TestFramework = TestFramework;
    window.assert = assert;
}

// 支持Node.js环境
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TestFramework, assert };
}
