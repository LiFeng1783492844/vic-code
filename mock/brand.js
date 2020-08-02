var qs = require('qs');

function createBrandList(count, brandList = []) {
  const status = [0, 1, 2, 3];

  for (let i = 1; i <= count; i++) {
    brandList.push({
      key: i,
      brandName: 'Name' + i,
      status: status[i % 4].toString(),
      operator: 'Vic' + i,
      operationTime: '2020-07-30 16:20:00',
    });
  }
  return brandList;
}

const brandList = createBrandList(25);

// 得到返回的对象
function getResObj(content, totalPage, page, size) {
  return {
    content,
    totalPage,
    page,
    size,
  };
}

function getBrandList(query) {
  const { brandName, status, page, size } = query;
  let count = 0;
  let list = [];
  brandList.forEach(item => {
    if (item.brandName.includes(brandName)) {
      if (!status || item.status == status) {
        count++;
        list.push(item);
      }
    }
  });

  let content = list.slice((page - 1) * size, page * size);
  let totalPage = list.length / size + 1;
  console.log('num', content.length);

  return { content, totalPage, page, size };
}

export default {
  'GET /api/brand': (req, res) => {
    /**
     * get请求接收参数用req.query
     * 接收url后的字符串解析出来的对象
     * username=zhangsan&password=123 { username:zhangsan }
     */
    let data = getBrandList(req.query);
    res.status(200).json(data);
  },
};
