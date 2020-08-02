import request from '../utils/request';
import { getBrand } from '../services/BrandService';

export default {
  namespace: 'brandRecognition',
  state: {
    brandData: [],
  },
  effects: {
    // 请求服务端数据
    *requestBrandData({ payload }, { call, put }) {
      const { data } = yield call(getBrand, payload);
      console.log('requestBrandData', data);

      yield put({ type: 'getBrandData', payload: { brandData: data.content } });
    },
  },
  reducers: {
    // 修改state数据
    getBrandData(state, { payload }) {
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
            type: 'requestBrandData',
            payload: {
              brandName: '',
              status: null,
              page: 1,
              size: 10,
            },
          });
        }
      });
    },
  },
};
