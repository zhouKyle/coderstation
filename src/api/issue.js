import request from "./request.js";

/**
 * 获取问答列表
 * @param {Object} \current\pageSize\issueStatus
 * @returns
 */
export function getIssueByPage(params) {
  return request({
    url: "/api/issue/",
    method: "GET",
    params: {
      ...params,
    },
  });
}

/**
 * 新增问答
 *
 */
export function addIssue(newIssue) {
  return request({
    url: "/api/issue/",
    method: "POST",
    data: newIssue,
  });
}

/**
 * 根据id获取详情
 */
export function getIssueById(id) {
  return request({
    url: `/api/issue/${id}`,
    method: "GET",
  });
}
