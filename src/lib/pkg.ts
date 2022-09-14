
import { send } from '../utils/send';

export default function CloudUploader(options: any = {}) {
  let cloudOption = options

  if (cloudOption?.interactive?.open)  {
    interactiveSender()
  }

  if (cloudOption?.pv?.open) {
    pvSender()
  }

  if (cloudOption?.sys?.open) {
    sysSender()
  }

  if (cloudOption?.all?.open) {
    allSender()
  }

  // 后期可以针对每种monitor写不同的配置转换器
  function transferConfig(options) {
    delete options.referer
    delete options.baseURL
    delete options.pv
    delete options.interactive
    delete options.sys
    delete options.all
  }

  // 交互日志sender发送器
  function interactiveSender() {
    const options = {...cloudOption}
    transferConfig(options)

    const eventTimesTamp = new Date().getTime()
    const referer = window.location.host || options.referer || ''
    const baseURL = options.baseURL || 'https://dj.xesimg.com/'
    const appid = options.appid
    const url = `${baseURL}${appid}/b.gif`

    console.log('---options', options)

    let body = 'content='
    body += JSON.stringify(options)

    const infos = {
      method: 'POST',
      url: url,
      data: body,
      headers: {
        'X-Log-TimeStamp': eventTimesTamp.toString(),
        'X-Log-Referer': referer,
        'X-Log-Appid': appid
      }
    }
  
    send.ajax({
      ...infos,
      success() {
        
      },
      fail() {
        
      }
    })
  }

  // 展现日志 sender发送器
  function pvSender() {
    const options = {...cloudOption}
    this.transferConfig(options)
  }

  // 系统日志 sender发送器
  function sysSender() {
    const options = {...cloudOption}
    this.transferConfig(options)
  }

  // 合并日志 all发送器
  function allSender() {
    const options = {...cloudOption}
    this.transferConfig(options)
  }

}