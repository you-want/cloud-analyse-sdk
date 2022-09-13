/**
 * Wrapper of CORS get request function
 * Example: `get('script')`
 * @param {String} key to create element type
 * @return {Function} get request function
 */
 const get = function (type) {
  return function (options) {
    if (type === 'img') {
      let img = new window.Image();
      img.src = options.url;
    } else {
      let dom = document.createElement(type);
      dom.src = options.url;
      let container;
      container = document.head;
      container.appendChild(dom);
      let del = function () {
        container.removeChild(dom);
      };
      dom.onload = function () {
        del();
        options.success && options.success();
      }
      dom.onerror = function () {
        del();
        options.fail && options.fail();
      }
    }
  };
};

/**
 * Send ajax request function
 * Example: `ajax({
 *    type: 'POST',
 *    url: options.url,
 *    data: options.data,
 *    headers: options.headers
 *  });`
 * @param {Object} object to ajax request options
 */
function ajax (options) {
  options = options || {};
  options.type = (options.type || 'GET').toUpperCase();
  options.type = options.method || options.type;
  options.dataType = options.dataType || 'json';

  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new window.XMLHttpRequest();
  } else {
    // IE6及其以下版本浏览器
    xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
  }

  // 接收 - 第三步
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      let status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  };
  // 连接 和 发送 - 第二步
  if (options.type === 'GET') {
    xhr.open('GET', options.url, true);
    xhr.send(null);
  } else if (options.type === 'POST') {
    xhr.open('POST', options.url, true);
    // 设置请求头
    if (options.headers) {
      for (var key in options.headers) {
        xhr.setRequestHeader(key, options.headers[key]);
      }
    }
    xhr.send(options.data);
  }
}

/**
 * Export all network send methods
 */
const methods = {
  /*
   * get image method
   */
  getImage: get('img'),
  /*
   * jsonp method, if server open CORS
   */
  jsonp: get('script'),
  /*
   * ajax post method, if server open CORS
   */
  post: function (options) {
    ajax({
      type: 'POST',
      url: options.url,
      data: options.data,
      headers: options.headers
    });
  },
  /*
   * ajax get method, if server open CORS
   */
  get: function (options) {
    ajax({
      type: 'GET',
      url: options.url,
      data: options.data,
      headers: options.headers
    });
  }
};

export const send = {
  ajax,
  methods
};
