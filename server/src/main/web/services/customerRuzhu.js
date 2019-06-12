import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 查询所有
 * @param params
 * @returns {Promise<*>}
 */
export async function query(params) {
  return request(`/customerRuzhu/table?${stringify(params)}`);
}

/**
 * 获取详情
 * @param params
 * @returns {Promise<*>}
 */
export async function get(params) {
  return request(`/customerRuzhu/?${stringify(params)}`);
}

/**
 * 移除
 * @param params
 * @returns {Promise<*>}
 */
export async function remove(params) {
  return request(`/customerRuzhu/delete`, {
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
  return request(`/customerRuzhu`, {
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
  return request(`/customerRuzhu/${params.ruzhuId}`, {
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
  return request(`/customerRuzhu/validate`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
