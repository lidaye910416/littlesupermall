module.exports = {
    configureWebpack:{
        devtool: 'source-map',
        resolve:{
            alias:{
                //配置别名 
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'router':'@/router',
            },
            
        }
    }
}