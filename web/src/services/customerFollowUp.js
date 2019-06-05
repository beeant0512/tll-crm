import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 查询所有
 * @param params
 * @returns {Promise<*>}
 */
export async function query(params) {
  return request(`/api/customerFollowUp/table?${stringify(params)}`);
}

/**
 * 获取详情
 * @param params
 * @returns {Promise<*>}
 */
export async function get(params) {
  return request(`/api/customerFollowUp/?${stringify(params)}`);
}

/**
 * 移除
 * @param params
 * @returns {Promise<*>}
 */
export async function remove(params) {
  return request(`/api/customerFollowUp/delete`, {
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
  return request(`/api/customerFollowUp`, {
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
  return request(`/api/customerFollowUp/${params.id}`, {
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
  return request(`/api/customerFollowUp/validate`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
