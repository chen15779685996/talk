const Koa = require('koa');
const router = require('koa-router')()
const app = new Koa()
const cors = require('koa2-cors');

/* 测试cors跨域的，不用的时候，你注释掉 */
// app.use(cors({
//   origin: "*",
//   allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))

/* cors请求简单请求测试 */
// router.get('/', async ctx => {
//   ctx.body = {
//     name: "小明",
//     age: 20
//   }
// })

/* cors请求测试复杂请求put请求的处理 */
// router.put('/', async ctx => {
//   ctx.body = {
//     name: "小明",
//     age: 20
//   }
// })

/* cors请求测试结束 */

/* JSONP请求测试 */
// router.get('/', async ctx => {
//   const callback = ctx.query.callback // 获取前端的请求参数
//   ctx.body = `${callback}(${JSON.stringify({ name: "小明", age: 20 })})`
// })

/* proxy测试,在测试proxy跨域的时候，第六行的代码快要进行关闭处理 */
router.get('/', async ctx => {
  ctx.body = {
    name: "小明",
    age: 20
  }
})

/* JSONP请求测试结束 */

app.use(router.routes());
app.use(router.allowedMethods());
const server = app.listen(3001, ctx => {
  console.log(`服务器创建成功，你现在本地已经开启了${server.address().port}的端口`)
});
