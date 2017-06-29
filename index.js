const axios = require('axios')
const Qs = require('querystring')

const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    'Referer': 'https://zhiyou.smzdm.com/user/login/window/'
}

const userInfo = {
    username: '',
    password: '',
    rememberme: 0
}

axios.request({
    method: 'post',
    url: 'https://zhiyou.smzdm.com/user/login/ajax_check',
    headers,
    data: Qs.stringify(userInfo)
})
    .then((res) => {
        console.log(res)
    })