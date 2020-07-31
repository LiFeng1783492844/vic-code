const db = {
  name: '优衣库项目2',
  value: '01',
  isFile: false,
  children: [
    {
      name: '合同编辑',
      value: '02',
      isFile: false,
      children: [
        {
          name: '脚本1.jmx',
          isFile: true,
          value: '03',
          url: '/ss/ss/ok1.jmx',
        },
        {
          name: '脚本2.jmx',
          isFile: true,
          value: '04',
          url: '/ss/ss/ok2.jmx',
        },
        {
          name: '脚本3.jmx',
          isFile: true,
          value: '05',
          url: '/ss/ss/ok3.jmx',
        },
      ],
    },
    {
      name: '合同查询',
      value: '06',
      isFile: false,
      children: [
        {
          name: '脚本4.jmx',
          isFile: true,
          value: '07',
          url: '/ss/ss/ok4.jmx',
        },
        {
          name: '脚本5.jmx',
          isFile: true,
          value: '08',
          url: '/ss/ss/ok5.jmx',
        },
      ],
    },
  ],
};

export default {
  'GET /api/tree': db,
};
