// 环境变量
window.EnvConfig = window.EnvConfig || {};
// ICOP后端服务地址
var ADDR = EnvConfig.ADDR;
// MA后端服务地址
var MAURL = EnvConfig.MAURL;
// 后端服务项目名
var ROOT_PATH = EnvConfig.ROOT_PATH;
var URL_HOME_PORTAL = EnvConfig.URL_HOME_PORTAL;
// API地址
var MODULE_URL = {
    loginContextUrl: MAURL + "/icop-ma-web/ssoLogin/checkToken",//MA验证token

    UPLOAD_ATTACHMENT_FILE : ADDR + '/icop-file/file/upload2',  // 附件上传
    DOWNLOAD_ATTACHMENT_FILE : ADDR  + '/icop-file/file/download', // 附件下载
    UPLOAD_FILE: ADDR + '/icop-file/file/fileupload',//图片上传

    DEVCONT_BASEHOST: ADDR + '/icop-devcont-web',
    GUIDESELF: ADDR + '/icop-support-web',
    SHARE_BASEHOST: ADDR + '/icop-share-web',
    SECURITY_BASEHOST: ADDR + '/icop-security-web',
    COMPANY_REF_URL: ADDR + '/icop-orgcenter-web',
    ATTACHURL: ADDR + '/icop-file/file',
    FILE_DOWN_SERVER: ADDR,

};
module.exports = {
    ADDR,
    MAURL,
    URL_HOME_PORTAL,
    MODULE_URL
};
