import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 查询所有
 * @param params
 * @returns {Promise<*>}
 */
export async function query(params) {
  return request(`/api/customer/table?${stringify(params)}`);
}

export async function pool(params) {
  return request(`/api/customer/pool?${stringify(params)}`);
}

/**
 * 获取详情
 * @param params
 * @returns {Promise<*>}
 */
export async function get(params) {
  return request(`/api/customer/?${stringify(params)}`);
}

/**
 * 移除
 * @param params
 * @returns {Promise<*>}
 */
export async function remove(params) {
  return request(`/api/customer/delete`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/**
 * 添加
 * @param params
 * @returns {Promise<*>}
 */
export async function add(params) {
  return request(`/api/customer`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

/**
 * 更新
 * @param params
 * @returns {Promise<*>}
 */
export async function update(params) {
  return request(`/api/customer/${params.customerId}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'post',
    },
  });
}

/**
 * 校验
 * @param params
 * @returns {Promise<*>}
 */
export async function validate(params) {
  return request(`/api/customer/validate`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function lingqu(params) {
  return request(`/api/customer/lingqu`, {
    method: 'POST',
    body: params
  });
}

export async function thisweek() {
  return request(`/api/customer/thisweek?`);
}

export async function nonFollowup(params) {
  return request(`/api/customer/nonFollowup?${stringify(params)}`);
}
