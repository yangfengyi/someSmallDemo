## 瀑布流特效

- 使用服务器中转实现跨域，加载图片资源
- 监听onscroll事件，根据最短的li的高度和文档高度加上滚轮高度进行比较，实现数据的实时加载
- 通过getMinIndex函数计算最短的li的索引值
- 使用提前设置图片的高度的方法，防止图片未加载就已经计算出最短高度
- 使用加锁的方式，解决满足加载条件时候scroll事件的频繁触发
- 使用套一层div加大图片宽度，适用overflow:hidden的方式解决chrome浏览器对失败图片加上默认border的bug

