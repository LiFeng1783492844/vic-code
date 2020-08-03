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

// 查询数据
function getBrandList(query) {
  const { brandName, status, page, size } = query;
  let list = [];
  brandList.forEach(item => {
    if (item.brandName.includes(brandName)) {
      if (status == -1 || item.status == status) {
        list.push(item);
      }
    }
  });

  let content = list.slice((page - 1) * size, page * size);
  // let content = list;

  let totalPage = list.length;
  console.log('num', content.length);

  return { content, totalPage, page, size };
}

// 删除数据
function deleteBrand(key) {
  let idx = 0;
  brandList.forEach((item, index) => {
    if (item.key == key) {
      idx = index;
      return;
    }
  });
  console.log('delete index', idx);
  brandList.splice(idx, 1);
}

// 更新数据
function updateBrand(record) {
  brandList.forEach((item, index) => {
    if (item.key == record.key) {
      item.brandName = record.brandName;
      item.status = parseInt(record.status);
      item.operationTime = record.operationTime;
      return;
    }
  });
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

  'DELETE /api/brand': (req, res) => {
    const { key } = req.query;
    console.log('key', key);
    deleteBrand(key);
    res.status(200);
  },

  'POST /api/brand': (req, res) => {
    const { record } = req.body;
    console.log('record 96', record);
    updateBrand(record);
    res.json(200);
  },
};
