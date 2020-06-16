import axios from "@/request/http";

export default {
    /**
     * 获取 csrf
     */
    getCommonInfo() {
        return axios.get("/api/csrf");
    },

    /**
     *登录接口
     *
     * @param {String} username 用户名
     * @param {String} password 密码
     * @returns
     */
    postLogin(username, password) {
        return axios.get("/api/csrf").then(res => {
            axios.defaults.headers.post["X-CSRF-Token"] = res.data._csrf;
            return axios.post("/api/login", {
                username: username,
                password: password
            });
        });
    }
};