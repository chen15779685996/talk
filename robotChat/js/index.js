/* 
1: 初始化获取按钮，绑定事件
2:获取输入的value值，实现内容的渲染(判断一下用户是否输入了文字，如果为空，禁止的动作)
3:实现内容的渲染操作 
  3-1: 渲染我们自己输入的内容
  3-2： 发送数据请求，获取机器人的响应内容
  3-3： 渲染机器人的内容 
  3-4  定义一个公共的渲染函数
  4:  滚动条每一次都有触底的操作
 */

(function () {
  var sendBtn = document.getElementById('sendBtn')
  var inputNode = document.getElementById('inputNode')
  var mainContainer = document.getElementById('mainContainer')
  /* 程序的入口函数 */
  var init = function () {
    initEvent()
  }

  /* 事件绑定入口函数 */
  var initEvent = function () {
    sendBtn.addEventListener('click', onSendBtnClick)
  }

  /* 按钮的事件绑定函数 */

  var onSendBtnClick = function () {
    var txt = inputNode.value.trim()
    if (!txt) return
    renderHtml(txt, 'right')
    sendChatInfo(txt)
    inputNode.value = ''
  }

  /* 发送数据请求，获取后端的响应内容 */

  var sendChatInfo = function (txt) {
    ajax({
      url: 'https://api.hyfarsight.com/test/testRequest/robotChat',
      method: "POST",
      data: {
        txt: txt
      },
      type: "json",
      onSuccess: function (res) {
        renderHtml(res.responseTxt, 'left')
      }
    })
  }

  /* 渲染函数 */
  var renderHtml = function (txt, direction) {
    var parentDiv = document.createElement('div')
    parentDiv.className = direction === 'right' ? 'chat-container self-container' : 'chat-container robot-container'
    var img = document.createElement('img')
    img.src = direction === 'right' ? './img/avatar.jpg' : './img/robot.jpg'
    var childDiv = document.createElement('div')
    childDiv.className = 'chat-txt'
    childDiv.innerHTML = txt
    parentDiv.appendChild(img)
    parentDiv.appendChild(childDiv)
    mainContainer.appendChild(parentDiv)
    var bottomDistance = parentDiv.offsetTop
    console.log(bottomDistance)
    mainContainer.scrollTo(0, bottomDistance)
  }

  init();
})()