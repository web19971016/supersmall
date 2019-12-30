module.exports = {
    plugins:{
        autoprefixer:{},
        "postcss-px-to-viewport":{
            viewportWidth: 375, //视窗的宽度，对应的是设计稿的宽度（750）
            viewportHeight: 667, //视窗的高度，对应的是设计稿的高度（1334）
            unitPrecision: 5, //指定‘px’转换为视窗单位值的小数位数（由于很多时候无法整除）
            viewportUnit: 'vw', //指定需要转换成的视窗单位，建议vw
            selectorBlackList: ['ignore','tab-bar','tab-bar-item'], //指定不需要转换的类
            minPixelValue: 1, //小于或等于1px时不进行转换
            mediaQuery: false, //是否允许在媒体查询中转换‘px’
        }
    }
}