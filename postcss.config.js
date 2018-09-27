const autoprefixer = require('autoprefixer');
// 后处理css，对浏览器需要加前缀的自动处理webkit
module.exports = {
    plugins:[
        autoprefixer()
    ]
}