import axios from "axios";

const service = axios.create({
  timeout: 5000,
});

//请求拦截
service.interceptors.request.use(
  (config) => {
    //拦截到请求后，这里就可以做各种事情
    //一般是添加 token

    //请求放行
    return config;
  },
  (error) => {
    //发生错误时的回调
    console.log("请求拦截出错，错误信息：", error);
  }
);

//响应拦截
service.interceptors.response.use(
  (response) => {
    // 拦截到响应后，可以做各种判断
    const res = response.data;
    return res;
  },
  (error) => {
    //发生错误时的回调
    console.log("响应拦截出错，错误信息：", error);
  }
);

export default service;
