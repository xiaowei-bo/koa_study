/**
 * @param {Object} data 返回结果
 * @param rest 扩展参数
 * @description 请求成功返回结果包装
 */
function sucResHandler(data, rest) {
    return {
        success: true,
        data: data || {},
        ...rest
    };
}
/**
 * @param {Object} message 提示文案
 * @param rest 扩展参数
 * @description 请求失败返回结果包装
 */
function failResHandler(message, rest) {
    return {
        success: false,
        message: message,
        ...rest
    };
}

module.exports = {
    sucResHandler,
    failResHandler
};
