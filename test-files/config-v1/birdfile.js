var npath = require('path')

module.exports = {
    name: 'ar',
    bird_port: 7676,
    staticFileRootDirPath: npath.resolve(npath.resolve(__dirname + '/..')),
    bprouting: 'bprouting/BpSecurityAuthentification?bpservice=https%3A%2F%2Ferp8020.baidu.com%2Fbprouting%2FBpFlowRouting%3Fappindex%3Dtrue%26t%3D0.9769457862712443',

    // -------- 8020 ------------------------------------------
    server: 'https://erp8020.baidu.com/',
    uuap_server: 'http://bjkjy-ite-uuapforerp01.bjkjy.baidu.com:8020/',
    password_suffix: '120',
    // -------- 8020 ------------------------------------------

    username: 'jingqi',

    debug: true
};