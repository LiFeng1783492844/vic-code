import { getBrand, deleteBrand, updateBrand } from '../services/BrandService';

export default {
  namespace: 'brandRecognition',
  state: {
    brandData: [],
    // 查询条件：品牌名称
    brandName: '',
    // 查询条件：状态 [-1]:查询所有；[0]:待确定；[1]:成功；[2]:失败；[3]:取消
    status: -1,
    // 分页：当前第几页
    page: 1,
    // 分页：一页展示多少条数据
    size: 10,
    // 分页：总数据条数
    totalPage: 0,
    // 编辑品牌信息对话框
    visible: false,
    // 正在被操作的记录
    record: null,
    // 对话框的类型，['update','add']
    modalType: 'update',
  },
  effects: {
    // 根据查询条件，得到数据
    *getBrandData({ payload }, { call, put, select }) {
      if (payload) {
        console.log('设置', payload);
        yield put({ type: 'setState', payload });
      }
      const params = yield select(({ brandRecognition }) => {
        return {
          brandName: brandRecognition.brandName,
          status: brandRecognition.status,
          page: brandRecognition.page,
          size: brandRecognition.size,
        };
      });
      console.log('params', params);
      const { data } = yield call(getBrand, params);
      console.log('getBrandData', data);
      const { content, totalPage, page, size } = data;

      yield put({
        type: 'setState',
        payload: {
          brandData: content,
          totalPage: parseInt(totalPage),
          page: parseInt(page),
          size: parseInt(size),
        },
      });
    },

    // 根据key删除数据
    *deleteBrand({ payload }, { call, put, select }) {
      yield call(deleteBrand, payload);

      yield put({
        type: 'getBrandData',
        payload: {
          page: 1,
          visible: false,
          record: null,
        },
      });
    },

    *updateBrand({ payload }, { call, put, select }) {
      const { record } = payload;

      yield call(updateBrand, { record });
      yield put({ type: 'getBrandData', payload: { page: 1 } });
    },
  },
  reducers: {
    // 修改state数据
    setState(state, { payload }) {
      console.log('setState', {
        ...state,
        ...payload,
      });
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    // 初始化数据
    initData({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/brand') {
          dispatch({
            type: 'getBrandData',
          });
        }
      });
    },
  },
};
