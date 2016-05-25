var npath = require('path')

var staticFileRootDirPath = npath.resolve(__dirname)

var birdConfig = {
  name: 'erp',
  bird_port: 7676,
  staticFileRootDirPath: staticFileRootDirPath,
  bprouting: 'bprouting/BpSecurityAuthentification?bpservice=https%3A%2F%2Ferp8020.baidu.com%2Fbprouting%2FBpFlowRouting%3Fappindex%3Dtrue%26t%3D0.9769457862712443',

  // -------- 8020 ------------------------------------------
  server: 'https://erp8020.baidu.com/',
  uuap_server: 'http://bjkjy-ite-uuapforerp01.bjkjy.baidu.com:8020/',
  password_suffix: '120',
  // -------- 8020 ------------------------------------------
  
  username: 'jingqi',

  // !IMPORTANT! 这个debug会有很大的问题, 如果设置为false, 会导致node_module里的log被全部清空
  debug: true,
  mock: {
    path: './mock',  // relative to staticFileRootDirPath
    map: {
      '/test-mock-data': 'test-mock-data'
      // global
      // '/apex-m/finfa/getMenuList': 'menu',
      // '/bprouting/rest/api/user/context': 'context',
    }
  }
}

module.exports = birdConfig