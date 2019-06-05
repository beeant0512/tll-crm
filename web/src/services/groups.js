import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 查询所有
 * @param params
 * @returns {Promise<*>}
 */
export async function query(params) {
  return request(`/api/groups/table?${stringify(params)}`);
}

/**
 * 获取详情
 * @param params
 * @returns {Promise<*>}
 */
export async function get(params) {
  return request(`/api/groups/?${stringify(params)}`);
}

/**
 * 移除
 * @param params
 * @returns {Promise<*>}
 */
export async function remove(params) {
  return request(`/api/groups/delete`, {
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
  return request(`/api/groups`, {
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
  return request(`/api/groups/${params.itemId}`, {
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
  return request(`/api/groups/validate`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
