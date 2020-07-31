import request from '../utils/request';

export default {
  namespace: 'brandRecognition',
  state: {
    testData: '',
  },
  effects: {
    *requestData({ payload }, { call, put }) {
      const data = yield request('/api/tree');
      console.log('data', data);

      yield put({ type: 'getData', payload: { testData: { data } } });
    },
  },
  reducers: {
    getData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    initData({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/brand') {
          dispatch({
            type: 'requestData',
          });
        }
      });
    },
  },
};
