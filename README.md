# @xes/cloud-analyse

## 技术

### 依赖包

- @microsoft/api-extractor：汇总产物中的类型定义
- @rollup/plugin-typescript：用于构建阶段TS的转换
- core-js：用于js polyfill支持
- tslib：为TS提供一些辅助方法，Runtime - library for TypeScript helper functions
- eslint：代码规范
- vite：开发阶段测试，与库的最终构建（Rollup提供构建能力）
- rimraf：替代rm -rf指令用于清理不需要的资源
- typescript：TS支持

### 文件目录

- 文件 src/index.ts：主要用于模块内容的导出
- 目录 src/lib：主要用于存放库的核心源码
- 目录 src/types：TS定义文件
- 目录 src/constants：常量
- 目录 src/utils：工具方法

### 产物 dist

- *.cjs.js：构建工具引用
- *.es.js：支持ESM的构建工具使用
- index.min.js：CDN引入使用，其中UMD兼容AMD，commonJS，全局引用等等方式

### CDN资源

- https://unpkg.com/@xes/cloud-analyse@0.0.1/dist/index.min.js

### 使用说明

#### npm

```sh
# npm
npm i @xes/cloud-analyse

# yarn
yarn add @xes/cloud-analyse

# pnpm
pnpm add @xes/cloud-analyse
```

```js
// 日志中心自己埋点
import cloudAnalyseSDK from '@xes/cloud-analyse'

const cloudLog = (options: {}) => {
  // if (process.env.NODE_ENV !== 'production') return
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
    pv: { // 展现日志（待开发）
      open: false
    },
    sys: { // 系统日志（待开发）
      open: false
    },
    all: { // 合并日志（待开发）
      open: false
    }
  }
  // 需要把传进来的 options 和 cloudOption 合并为一个 参数
  cloudAnalyseSDK(Object.assign(cloudOption, options))  
}

// vue2版本
Vue.prototype.$cloudLog = cloudLog

// 具体交互埋点
this.$cloudLog({
    eventId: 'log-access', // 事件ID 规则详见wiki
    params: {} // 自定义参数
})

// vue3版本
app.config.globalProperties.$cloudLog = cloudLog

// js 中使用方式
import { getCurrentInstance } from 'vue'

export default {
  setup () {
    const { proxy } = getCurrentInstance()
    proxy.$cloudLog({
        eventId: 'log-access', // 事件ID 规则详见wiki
        params: {} // 自定义参数
    })
  }
}
```

#### cdn

```js
<script src="https://unpkg.com/@xes/cloud-analyse@0.0.1/dist/index.min.js"></script>
<script>
    cloudAnalyseSDK(options)
</script>
```

***本地 及 测试环境 调试注意事项***

1、绑定 host （效果可能有延迟？可以多等一会试试）

```sh
# 前端监控的host
120.52.32.211 cloud-test.tal.com
120.52.32.211 dj.xesimg.com
120.52.32.211 dj.saasz.vdyoo.com
120.52.32.211 basiclog-test.xev5.com
120.52.32.211 basiclog-test.xesv5.com
120.52.32.211 fedata.xesv5.com
120.52.32.211 upload.xueersi.com
120.52.32.211 app.xesv5.com 
120.52.32.211 api.xesv5.com
```

2、在日志中心查找对应日志（生产环境：'1005116'，测试环境：'1014745'）修改日志详情的 referer （可联系 zhangbin19）

如下：

referer：http://0.0.0.0:8000/,https://cloud-test.tal.com/,http://localhost:8080/
