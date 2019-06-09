import {
  add,
  get,
  remove,
  update,
  query,
  validate,
  lizhi,
  changePwd
} from '@/services/member';

export default {
  namespace: 'member',
  state: {
    data: { list: [], pagination: {} }, 
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      if (response.success) {
        yield put({
          type: 'save',
          payload: { data: response.data },
        });
      } else {
        yield put({
          type: 'save',
          payload: { data: { list: [], pagination: {}} },
        });
      }
    },
    *add({ payload, callback }, { call }) {
      const response = yield call(add, payload);
      if (callback){
        callback(response);
      }
    },
    *get({ payload, callback }, { call }) {
      const response = yield call(get, payload);
      if (callback){
        callback(response);
      }
    },
    *update({ payload, callback }, { call }) {
      const response = yield call(update, payload);
      if (callback){
        callback(response);
      }
    },
    *lizhi({ payload, callback }, { call }) {
      const response = yield call(lizhi, payload);
      if (callback){
        callback(response);
      }
    },
    *changePwd({ payload, callback }, { call }) {
      const response = yield call(changePwd, payload);
      if (callback){
        callback(response);
      }
    },
    *validate({ payload, callback }, { call }) {
      const response = yield call(validate, payload);
      if (callback){
        callback(response);
      }
    },
    *remove({ payload, callback }, { call }) {
      const response = yield call(remove, payload);
      if (callback){
        callback(response);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
