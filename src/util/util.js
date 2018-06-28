/**
 * Created by zhongzheng on 2018-06-28.
 */

/**
 * 一个变量指向Function，防止有些前端编译工具报错
 * @param fn
 * @returns {*}
 */
export function evil(fn) {
    var Fn = Function;
    return new Fn('return ' + fn)();
}

/**
 * @desc 是否为JSON对象格式的字符串形态。匹配格式:"{...}"
 */
export function isJsonStr(val) {
    return typeof val === "string" && /^\{.*\}$/.test(val);
}

/**
 * @param 使用js让数字的千分位用,分隔
 */
export function shiftThousands(val) {
    if (typeof val !== "number") {
        return null;
    }
    ;
    return val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');//使用正则替换，每隔三个数加一个','
}

/**
 * @param 显示特定日期形式
 */
export function shifitDate(dateStr) {
    if (typeof  dateStr !== 'string') return null;
    const now = new Date().getTime();
    const date = new Date(dateStr).getTime();
    if (now - date <= 60 * 60 * 24) return '今天';
    else if (now - date <= 60 * 60 * 24 * 2) return '昨天';
    else return dateStr;
}
