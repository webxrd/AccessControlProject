
// 将一串时间转化为直观中文
export function getTime(date1){
    var date = new Date(date1);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;    //js从0开始取
    var date1 = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var second = date.getSeconds();
    return (year + "年" + month + "月" + date1 + "日" + hour + "时" + minutes + "分" + second + "秒");
}
