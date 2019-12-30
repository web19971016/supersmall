import Toast from "./Toast";

const obj = {}

obj.install = function (Vue) {
    //1.创建组件构造器
    const toastConstructor = Vue.extend(Toast)

    //2.new的方式，根据组件构造器，可以创建出来一个对象
    const toast = new toastConstructor()
    //3.将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    //4.此时toast.$el就是对应的div
    document.body.appendChild(toast.$el)

    //5.将toast挂载到Vue原型对象上
    Vue.prototype.$toast = toast
}

export default obj