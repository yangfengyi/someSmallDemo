// 封闭作用域
(function () {
	var oLi = document.getElementsByTagName('li'),
		itemWidth = 200,
		page = 1,
		// 根据数据添加dom完成之后才解锁
		flag = false;
	getData();
	function getData() {
		if(!flag) {
			flag = true;
			// 使用服务器中转实现跨域
			ajax("GET", "http://localhost/data/getPics.php", "cpage="+page, true, addDom);
			page++;
		}
	}
	function addDom(data) {
		var dataList = JSON.parse(data);
		console.log(dataList);
		dataList.forEach(function(ele, index) {
			var oItem = document.createElement('div'),
				oBox = document.createElement('div'),
				oImg = new Image(),
				oP = document.createElement('p'),
				itemHeight = undefined;
			// 根据比例可以起提起设置图片的高度，这样就可以避免图片没有加载完成就执行了计算高度的问题。
			oImg.height = (itemWidth / ele.width) * ele.height;
			var minIndex = getMinIndex(oLi);
			oItem.className = 'item';
			oBox.className = "img-box";
			oBox.style.overflow = "hidden";
			oImg.src = ele.preview;
			oP.innerText = ele.title;
			// 当图片加载失败的时候图片有个难看的小边框,解决掉
			// 我们加一层div之后，让图片大一点，然后使用overflow:hidden把它盖住
			oImg.onerror = function () {
				this.style.margin = "-1px";
				oImg.style.width = 202 + "px";
				oImg.style.height = (itemWidth / ele.width) * ele.height + 2 + "px";
			}
			oBox.appendChild(oImg);
			oItem.appendChild(oBox);
			oItem.appendChild(oP);
			oLi[minIndex].appendChild(oItem);
		})
		flag = false;
	}

	// 获取最短的li
	function getMinIndex(dom) {
		var minHeight = dom[0].offsetHeight,
			index = 0,
			len = dom.length;
			// 循环比较
		for(var i = 0; i < len; i++){
			var h = dom[i].offsetHeight;
			if(h < minHeight) {
				minHeight = h;
				index = i;
			}
		}
		return index;
	}

	// 监听鼠标滚轮事件，判断何时要去加载数据
	window.onscroll = function () {
		var minValue = oLi[getMinIndex(oLi)].offsetHeight,
			// 获取滚动条的高度
			scrollHeight = document.documentElement.scrollTop || document.body.scrollTop,
			pageHeight = document.documentElement.clientHeight || document.body.height;
		if(minValue < scrollHeight + pageHeight) {
			getData();
		}
	}
})();