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

/**
 * 用户登录
 * @param {Object} loginInfo
 * @returns
 */
export function loginUser(loginInfo) {
  return request({
    url: "/api/user/login",
    data: loginInfo,
    method: "POST",
  });
}

/**
 * 根据 loginId 获取 userInfo
 * @param {string} loginId
 * @returns
 */
export function getUserInfoById(loginId) {
  return request({
    url: `/api/user/${loginId}`,
    method: "GET",
  });
}

/**
 *  恢复登录
 * @returns
 */
export function refreshUser() {
  return request({
    url: "/api/user/whoami",
    method: "GET",
  });
}

/**
 *
 * @returns 获取积分前十名
 */
export function scoreRank() {
  return request({
    url: "/api/user/pointsrank",
    method: "GET",
  });
}
