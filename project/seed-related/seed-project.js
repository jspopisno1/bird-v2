module.exports = {
    // 如果是 seed project 下, version会自动被 git 的 tag 自动替换
    // 暂时未实现version的自动管理功能
    // version: '0.1.1',
    locals: [
        // 需要忽略掉的一些文件, 包括 .git
        '.git',

        // 一些其他可能的文件夹
        '.idea',
        '_unbroken_doc/',

        // 构建文件夹
        'dest/',

        // 1.x locals 会被统一集中在 locals/ 下
        'locals/',

        // 忽略临时文件夹
        'tmp/',
    ],
    use: {
        default: {
            dependencies: {
                "copy-dir": "0.0.*",
                "delete": "0.3.*",
                "express": "4.13.*",
                "lodash": "4.11.*",
                "serve-static": "1.10.*"
            },
            devDependencies: {
                // webpack related
                "webpack": "1.12.*",
                "webpack-dev-middleware": "1.6.*",
                "webpack-hot-middleware": "2.10.*",
                "extract-text-webpack-plugin": "1.0.*",

                // loaders
                "autoprefixer-loader": "3.2.*",
                "babel-core": "6.7.*",
                "babel-preset-es2015": "6.6.*",
                "babel-preset-react": "6.5.*",
                "babel-preset-stage-0": "6.5.*",
                "babel-loader": "6.2.*",
                "json-loader": "0.5.*",
                "css-loader": "0.23.*",
                "file-loader": "0.8.*",
                "html-loader": "0.4.*",
                "url-loader": "0.5.*",
                "style-loader": "0.13.*",
                "less-loader": "2.2.*"
            }
        },
        react: {
            dependencies: {},
            devDependencies: {
                "react": "0.14.*",
                "react-dom": "0.14.*",
                "react-redux": "4.4.*",
                "react-router": "2.0.*",
                "react-router-redux": "4.0.*",
                "redux": "3.3.*",
                'redux-thunk': '2.0.*',
                "immutable": "3.7.*",
                "bluebird": "3.3.*",
                "superagent": "1.8.*",
                "superagent-bluebird-promise": "3.0.*",
                "superagent-no-cache": "0.1.*"
            }
        },
        riot: {
            devDependencies: {
                riot: '2.4.*',
                'befe-riotjs-loader': '0.1.*'
            }
        },
        itoolkit: {

        },
        bluebird: {
            devDependencies: {
                "bluebird": "3.3.*",
                "superagent": "1.8.*",
                "superagent-bluebird-promise": "3.0.*",
                "superagent-no-cache": "0.1.*"
            }
        },
        birdv2: {
            devDependencies: {
                "cors": "2.7.*",
                "birdv2": "0.0.*"
            }
        }
    }
}