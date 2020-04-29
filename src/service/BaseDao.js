import axios from 'axios'


var instance = axios.create({

  // headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  // headers: { 'Content-Type': 'text/plain' },
  headers: { 'Content-Type': "application/json;charset=utf-8" },
  // baseURL: 'http://127.0.0.1:9999/'
  baseURL: 'http://121.36.33.83:12000/'

});
//  这一步直接提取了 返回的字段数据 不用再具体的请求中处理
function proessData(response) {
  let result = response.data
  return result;
}

// 统一处理post 请求
function post(path, data) {
  let url = path;
  // return instance.post(url, data).then(proessData)
  return instance.post(url, JSON.stringify(data)).then(proessData)
}




export default { post }