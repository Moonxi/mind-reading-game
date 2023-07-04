;(function () {
  // 从服务器获取图片数据
  var imgs = [
    './images/values/0.png',
    './images/values/1.png',
    './images/values/2.png',
    './images/values/3.png',
    './images/values/4.png',
    './images/values/5.png',
    './images/values/6.png',
    './images/values/7.png',
    './images/values/8.png',
    './images/values/9.png',
    './images/values/10.png',
    './images/values/11.png',
    './images/values/12.png',
    './images/values/13.png',
    './images/values/14.png',
    './images/values/15.png'
  ]
  // 获取需要操作的dom元素
  var mindReadingRoulette = document.querySelector('.mind-reading-roulette')
  var mindReadingRight = document.querySelector('.mind-reading-right')
  var mindReadingAgain = document.querySelector('.mind-reading-again')
  // 定义初始化函数
  var init = function () {
    // 初始化轮盘
    initRoulette()
    // 初始化结果图形
    initResults()
    // 清空事件
    removeEvents()
    // 初始化事件
    initEvents()
  }
  // 定义事件处理函数
  var eventHandlers = {
    // 开始读心
    startMindReading(e) {
      function _animationEnd(e) {
        this.style.transition = 'none'
        mindReadingAgain.style.visibility = 'visible'
        this.children[0].style.transition = 'none'
        this.removeEventListener('transitionend', _animationEnd)
        this.removeEventListener('click', eventHandlers.startMindReading)
      }
      this.addEventListener('transitionend', _animationEnd)
      this.style.transition = 'all 3s'
      var resultSrc = mindReadingRight.children[0].children[1].src
      this.style.transform = 'rotate(2880deg)'
      this.children[0].style.transition = 'all 3s'
      this.children[0].style.backgroundImage = `url(${resultSrc})`
    },
    // 再来一次
    again(e) {
      init()
    }
  }
  // 定义初始化事件函数
  function initEvents() {
    mindReadingRoulette.addEventListener('click', eventHandlers.startMindReading)
    mindReadingAgain.addEventListener('click', eventHandlers.again)
  }
  // 定义清空事件函数
  function removeEvents() {
    mindReadingRoulette.removeEventListener('click', eventHandlers.startMindReading)
    mindReadingAgain.removeEventListener('click', eventHandlers.again)
  }
  // 定义获取随机数函数
  function getRadom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
  // 定义初始化轮盘函数
  function initRoulette() {
    mindReadingRoulette.style.transform = 'rotate(0deg)'
    mindReadingRoulette.children[0].style.backgroundImage = 'url("./images/round.png")'
    mindReadingAgain.style.visibility = 'hidden'
  }
  // 定义初始化结果图形函数
  function initResults() {
    // 清空所有图形
    mindReadingRight.innerHTML = ''
    // 随机一个结果图形
    var index = getRadom(0, imgs.length)
    // 随机生成全部图形，若序号为0或者9的倍数，则生成结果图形
    for (var i = 0; i < 100; i++) {
      var mindReadingRightItem = document.createElement('div')
      mindReadingRightItem.className = 'mind-reading-right-item'
      mindReadingRightItem.innerHTML = `          <span>${i}</span>
      <img src="${i % 9 === 0 ? imgs[index] : imgs[getRadom(0, imgs.length)]}" alt="">`
      mindReadingRight.append(mindReadingRightItem)
    }
  }
  //
  init()
})()
