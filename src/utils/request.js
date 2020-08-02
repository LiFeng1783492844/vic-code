const fetch = require('dva').fetch;

const checkStatus = response => {
  if (response.status == 200) return response;
  throw { message: 'error' };
};
const parseJson = response => {
  const { statusText, status } = response;
  return response.json().then(res => {
    console.log('parsejson.res', res);
    return {
      data: res,
      status,
      success: true,
    };
  });

  // return response.text().then(res => {
  //   console.log('parsejson.res', res);
  //   return {
  //     data: res,
  //     status,
  //     success: true,
  //   };
  // });
};
export default (url, options) => {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJson);
};
