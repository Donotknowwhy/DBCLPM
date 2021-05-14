import request from '../utils/request';

export function getListPost(params) {
  return request({
    url: '/post-composite-service/api/v1/posts',
    method: 'get',
    params,
    headers: {
      'Content-type': 'application/json',
    },
  });
}

export function postContent(data) {
  return request({
    url: '/post-composite-service/api/v1/posts',
    method: 'post',
    data,
  });
}

export function putContent(data) {
  return request({
    url: '/post-composite-service/api/v1/posts',
    method: 'put',
    data,
  });
}

export function deleteContent(data) {
  return request({
    url: `/post-composite-service/api/v1/posts/${data}`,
    method: 'delete',
  });
}

export function getPreSign(params) {
  return request({
    url: '/image-service/api/images/presigned_url',
    method: 'get',
    params,
  });
}

