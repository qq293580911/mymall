import Toast from './Toast.vue'

const obj = {
  install(Vue){
    //1、创建组件构造器
    const toastContrustor = Vue.extend(Toast)
    //2、new的方式根据组件构造器可以创建一个组件对象
    const toast = new toastContrustor()
    //3、将组件对象手动挂载到某一元素上
    toast.$mount(document.createElement('div'))
    //3、挂载到body 
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
  }
}

export default obj