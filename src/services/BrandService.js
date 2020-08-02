import request from '../utils/request';
var qs = require('qs');

export const getBrand = params => {
  console.log('getBrand', { ...params });
  // get请求传参，参数拼接在url后面
  return request('/api/brand?' + qs.stringify(params), {
    method: 'GET',
  });
};
