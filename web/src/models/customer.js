import {
  add,
  get,
  remove,
  update,
  query,
  validate,
  lingqu,
  pool,
  thisweek,
  nonFollowup,
} from '@/services/customer';

export default {
  namespace: 'customer',
  state: {
    data: { list: [], pagination: {} }, 
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
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
      if (callback) { callback(response)}
    },
    *pool({ payload }, { call, put }) {
      const response = yield call(pool, payload);
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
    *validate({ payload, callback }, { call }) {
      const response = yield call(validate, payload);
      if (callback){
        callback(response);
      }
    },
    *lingqu({ payload, callback }, { call }) {
      const response = yield call(lingqu, payload);
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
    *thisweek({ payload, callback }, { call }) {
      const response = yield call(thisweek, payload);
      if (callback) { callback(response)}
    },
    *nonFollowup({ payload, callback }, { call }) {
      const response = yield call(nonFollowup, payload);
      if (callback) { callback(response)}
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
