/**
 * Created by jiachenpan on 19/3/27.
 */
// 验证用户名
export function isvalidUsername(str) {
    //必须字母开头，可以纯字母可以加数字字符  唯一不可以加的就是汉字
    const reg = /^[a-zA-Z][a-zA-Z0-9!@#$%^&*~`,.+=\-_\<\>\?:;'"{}\[\]|/\\]*$/;
    return reg.test(str)

}

// 验证密码
export function isvalidPassword(str) {
    const reg = /^(?=.*?[A-Za-z]+)(?=.*?[0-9]+)(.*)$/   // 必须包含字母和数字
    const len = str.length >= 8 //且超过8位
    return reg.test(str) && len
}

/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}
