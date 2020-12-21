import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.imgUrl = 'http://syc320.320.io/swagger-ui.html'; 

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
