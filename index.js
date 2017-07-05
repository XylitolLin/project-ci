const axios = require('axios')
const tough = require('tough-cookie')
const Cookie = tough.Cookie
const CookieJar = new tough.CookieJar()
const Qs = require('querystring')

const Config = {
    baseUrl: 'smzdm.com',
}

const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    'Referer': 'https://zhiyou.smzdm.com/user/login/window/'
}

const userInfo = {
    username: '',
    password: '',
    rememberme: 0
}

axios.interceptors.request.use((config) => {
    CookieJar.getCookies(config.url, (err, cookies) => {
        config.headers.cookie = cookies.join('; ')
    })
    return config
})

axios.interceptors.response.use((response) => {
    if (response.headers['set-cookie'] instanceof Array) {
        cookies = response.headers['set-cookie'].forEach((c) => {
            CookieJar.setCookie(Cookie.parse(c), response.config.url, (err, cookie) => {})
        })
    }
    return response
})

function start() {
    axios.request({
        method: 'post',
        url: 'https://zhiyou.smzdm.com/user/login/ajax_check',
        headers,
        data: Qs.stringify(userInfo)
    })
        .then((res) => {
            if (res.status === 200) {
                if (res.data.error_code === 0) {
                    return res.data
                } else {
                    throw new Error(res.data)
                }
            } else {
                throw new Error(res)
            }
        })
        .then(() => {
            axios.request({
                method: 'get',
                url: 'https://zhiyou.smzdm.com/user/checkin/jsonp_checkin',
                headers
            })
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data)
                    } else {
                        console.log(res)
                    }
                })
        })
}

module.exports = start
