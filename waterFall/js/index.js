(function () {
  var loadedNum = 0
  var initTime = 0
  /* 定义模块的入口函数 */
  var init = function () {
    initData()
    /* 创建window的滚动的监听 */
    window.addEventListener('scroll', onWindowScroll)
  }

  /* window窗口的滚动事件监听函数 */
  var onWindowScroll = function () {
    /* 判断滚动条滚动到底部，进行数据的请求 */
    var screenHeight = window.innerHeight
    var scrollTop = window.pageYOffset
    var items = document.querySelectorAll('.item')
    var lastNodeDistance = items[items.length - 1].offsetTop + items[items.length - 1].offsetHeight
    if (lastNodeDistance === screenHeight + scrollTop) {
      /* 处理函数调用的节流 */
      var currentTime = Date.now()
      if (currentTime - initTime > 500) {  
        initData()
        initTime = currentTime
      }
    }
  }

  /* 定义数据请求函数 */
  var initData = function () {
    ajax({
      url: 'https://api.hyfarsight.com/test/testRequest/imgList',
      method: "get",
      type: 'json',
      onSuccess: function (res) {
        /* 渲染界面 */
        renderList(res.imgList)
      },
      onError: function (error) {
        console.log(error)
      }
    })
  }

  /* 定义渲染函数 */
  var renderList = function (imgList) {
    imgList.forEach(function (src) {
      var div = document.createElement('div')
      div.className = 'item'
      var img = new Image()
      img.src = src
      div.appendChild(img)
      document.querySelector('.img-container').appendChild(div)
      img.onload = function () {
        loadedNum++
        if (loadedNum === document.querySelectorAll('.item').length) {
          waterFallFn()
        }
      }
    })
  }

  /* 调整位置函数 */
  var waterFallFn = function () {
    var arrayNodeLists = Array.prototype.slice.call(document.querySelectorAll('.item'))
    var heightArr = arrayNodeLists.slice(0, 5).map(function (node) {
      return node.offsetHeight
    })
    arrayNodeLists.slice(5).forEach(function (node) {
      var minHeight = Math.min.apply(null, heightArr)
      var minIndex = heightArr.indexOf(minHeight)

      node.style.position = 'absolute'
      node.style.top = minHeight + 20 + 'px'
      node.style.left = arrayNodeLists[minIndex].offsetLeft - 10 + 'px'
      heightArr[minIndex] += node.offsetHeight + 20
    })
  }

  init()
})()