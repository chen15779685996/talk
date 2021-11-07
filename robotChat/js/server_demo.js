/* 
  暂时不能用，学习完nodeJS可以搞一下
 */

router.post('/robotChat', async ctx => {
  /* 获取前端的请求的参数 */
  let { txt: question } = ctx.request.body
  question = question.replace(/\s+/g, '')

  /* 注册了腾讯账号，免费获取的key，自己找 */
  const app_key = 'xkcpDE3jStPwzEhR';

  /* 准备请求腾讯ai 的参数 */
  const params = {
    'app_id': 2170573887,
    'nonce_str': stringRandom(5, 'abcdefghijklmnopqrstuvwxyz'),
    question,
    'session': '10001',
    'time_stamp': Math.floor(Date.now() / 1000)
  }

  /* 生成腾讯需要的签名 */
  params.sign = generateFn(params, app_key)

  /* 真正的调用腾讯的接口 */
  const response = await axios.post(`https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat`, qs.stringify(params))

  /* 返回给同学们 */
  if (response.data.ret !== 0) {
    ctx.body = { code: 1, responseTxt: '我不知道你在讲什么!!!' }
  } else {
    ctx.body = { code: 0, responseTxt: response.data.data.answer }
  }
})

/* 生成md5函数 */
const generateFn = (params, app_key) => {
  let str = '';
  Object.keys(params).forEach(key => {
    str += `${key}=${urlencode(params[key])}&`
  })

  str += `app_key=${app_key}`
  return md5(str).toUpperCase()
}