import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

// 日志中心自己埋点
import cloudAnalyseSDK from 'cloud-analyse-sdk'

console.log(111, cloudAnalyseSDK({}));


const cloudLog = (options: {}) => {
  if (process.env.NODE_ENV !== 'production') return
  var userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  // console.log('userInfo', userInfo)
  const cloudOption = {
    appid: process.env.NODE_ENV === 'production' ? '1005116' : '1014745',
    projectId: 'logcenter',
    date: new Date(),
    userId: userInfo.workcode,
    username: userInfo.realname,
    pageId: document.title,
    department: userInfo.department,
    interactive: { // 交互日志
      open: true
    },
    pv: { // 展现日志
      open: false
    },
    sys: { // 系统日志
      open: false
    },
    all: { // 合并日志
      open: false
    }
  }
  // console.log('cloudLog', options)

  const CASDK = cloudAnalyseSDK(Object.assign(cloudOption, options))
  console.log(222, CASDK);
  
}
cloudLog({})
// Vue.prototype.$cloudLog = cloudLog

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
