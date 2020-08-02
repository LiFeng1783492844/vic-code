import request from '../utils/request';
import { getBrand } from '../services/BrandService';

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
    // 分页：总页数
    totalPage: 0,
  },
  effects: {
    // 请求服务端数据
    *getBrandData({ payload }, { call, put, select }) {
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

      yield put({ type: 'setState', payload: { brandData: data.content } });
    },
  },
  reducers: {
    // 修改state数据
    setState(state, { payload }) {
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
