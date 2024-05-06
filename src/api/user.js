import request from "./request.js";

/**
 * 用户相关的 api 都放在这里
 * @returns 返回一个promise
 */
export function getCaptcha() {
  return request({
    url: "/res/captcha",
    method: "GET",
  });
}

/**
 * 验证注册用户是否存在
 * @param {string} loginId
 * @returns
 */
export function userIsExist(loginId) {
  return request({
    url: `/api/user/userIsExist/${loginId}`,
    method: "GET",
  });
}

/**
 * 用户注册
 * @param {Object} newUserInfo
 * @returns
 */
export function addUser(newUserInfo) {
  return request({
    url: "/api/user",
    data: newUserInfo,
    method: "POST",
  });
}
