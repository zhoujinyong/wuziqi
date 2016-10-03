$(function(){
	var canvas=$("canvas").get(0);
	var ctx=canvas.getContext('2d');
	var width=canvas.width;
	var Row=15;
	var off=width/Row;
	var flas=true;
	var blocks={};
	var ai=false;
	var blank={};
	var times=0;
	var times1=0;
	var t,tt;
	var audio = $('audio').get(0);
	var musics=[
		{path:"./img/Aggiungi Un Posto A Tavola.mp3"},
		{path:"./img/甜蜜蜜.mp3"}
	]
	for(var i=0;i<Row;i++){
		for(var j=0;j<Row;j++){
			blank[p2k(i,j)]=true
		}
	}
	function AI(){
		var max1=-Infinity;
		var max2=-Infinity;
		var pos1;
		var pos2;
		for(var i in blank){
			var score1=check(k2o(i),"hei");
			var score2=check(k2o(i),"bai");
			 if(score1>max1){
               max1 = score1;
               console.log(i)
               pos1 = k2o(i);
           }
            if(score2>max2){
                max2 = score2;
                pos2 = k2o(i);
            }
        }
            if(max1>=max2){
            return pos1;
        }else{
            return pos2;
        
		}
	}
	//画棋盘线条
	function draw(){
		//+0.5是解决双像素问题
		//0.5*off和14.5*off是棋盘外边距的处理
		var x=0.5*off+0.5;
		var y=14.5*off+0.5;
		ctx.beginPath();
	for(var i=0;i<Row;i++){
		ctx.moveTo(x,x+i*off);
		ctx.lineTo(y,x+i*off);
		ctx.moveTo(x+i*off,x);
		ctx.lineTo(x+i*off,y);
		ctx.strokeStyle="#555"
	}	
	ctx.stroke();
	ctx.closePath();
		makeCircle(3.5,3.5);
		makeCircle(3.5,11.5);
		makeCircle(7.5,7.5);
		makeCircle(11.5,3.5);
		makeCircle(11.5,11.5);
	}	
	//封装一个类似转换坐标的函数
	function v2k(position){
		return position.x+"_"+position.y
	}
	//封装一个查数组的把坐标转换成便于查询类型的函数
	function p2k(x,y){
		return x+'_'+y;
	}
	//传进来一个值 返回一个去掉下滑线的对象
	function k2o(key){
		var arr=key.split("_");
		return {x:parseInt(arr[0]),y:parseInt(arr[1])}
	}
	//为棋盘上的五个小黑店封装的函数
	function makeCircle(x,y){
		ctx.beginPath();
		ctx.arc(x*off+0.5,y*off+0.5,4,0,2*Math.PI);
		ctx.fillStyle="#555"
		ctx.fill()
		ctx.closePath()
	}
	//把有特定规格的元素放到一个数组里面，同时 检查有没有符合规格的函数 返回一个布尔值
	function check(pos,color){
		var num=1;
		var num1=1;
		var num2=1;
		var num3=1;
		var table={};
		//得到一个属于同种类型棋子的表格
		for(var i in blocks){
			if(blocks[i]===color){
				table[i]=true;
//				console.log(table)
			}
		}
		var tx=pos.x;
		var ty=pos.y;
		//水平方向
		while(table[p2k(tx+1,ty)]){
			num++;
			tx++;
		}
		var tx=pos.x;
		var ty=pos.y;
		while(table[p2k(tx-1,ty)]){
			num++;
			tx--;
		}
		var tx=pos.x;
		var ty=pos.y;
		//上下方向
		while(table[p2k(tx,ty+1)]){
			num1++;
			ty++;
		}
		var tx=pos.x;
		var ty=pos.y;
		while(table[p2k(tx,ty-1)]){
			num1++;
			ty--;
		}
		var tx=pos.x;
		var ty=pos.y;
//		左上右下
		while(table[p2k(tx+1,ty+1)]){
			num2++;
			tx++;
			ty++;
		}
		var tx=pos.x;
		var ty=pos.y;
		while(table[p2k(tx-1,ty-1)]){
			num2++;
			tx--;
			ty--;
		}
		var tx=pos.x;
		var ty=pos.y;
		//左下右上
		while(table[p2k(tx+1,ty-1)]){
			num3++;
			tx++;
			ty--;
		}
		var tx=pos.x;
		var ty=pos.y;
		while(table[p2k(tx-1,ty+1)]){
			num3++;
			tx--;
			ty++;
		}
		return Math.max(num,num1,num2,num3);
	}
	//根据点击事件在规定的地方放规定颜色的棋子
	var img1=document.getElementById("hei");
	var img2=document.getElementById("bai");
	function makeChess(position,color){
		ctx.save();
		ctx.translate((position.x+0.5)*off+0.5,(position.y+0.5)*off+0.5)
		ctx.beginPath();
			
		if(color==="hei"){
			clearInterval(t)
			clearInterval(tt)
			ctx.arc(0,0,15,0,2*Math.PI);
				console.log("bai".length)
			
			
			times=0;
			t=setInterval(time,1000)
			$(".bai").css("display","block")
			$(".hei").css("display","none")
			ctx.drawImage(img1,-15,-15)
		}
		if(color==="bai"){
			clearInterval(t)
			clearInterval(tt)
			ctx.arc(0,0,15,0,2*Math.PI);
			times1=0;
			tt=setInterval(time1,1000)
			$(".hei").css("display","block")
			$(".bai").css("display","none")
			ctx.drawImage(img2,-15,-15)
		};
//		console.log(blocks)
//		ctx.fill()
		ctx.closePath()
		ctx.restore()
		blocks[v2k(position)]=color
	//删除表格中新放棋子的位置
        delete  blank[v2k(position)];
	}
	//设置棋谱的样式及位置颜色
	function draWText(pos,text,color){
		ctx.save();
		ctx.font="15px 微软雅黑";
		ctx.textAlign="center";
		ctx.textBaseline="middle";
		if(color==="hei"){
			ctx.fillStyle="white"
		}
		if(color==="bai"){
			ctx.fillStyle="#000"
		}
		ctx.fillText(text,(pos.x+0.5)*off,(pos.y+0.5)*off);
		ctx.restore()
	}
	function restart(){
		ctx.clearRect(0,0,width,width);
		flas=true;
		blocks={};
		times=59;
		times1=59;
		audio.pause();
		$(".tishi img").css("display","none")
//		clearInterval(t)
//		clearInterval(tt)
		$("canvas").off("click")
		draw();
		$('canvas').on('click',handleClick)
	}
	//输出棋谱
	function review(){
		var i=1
	for(var pos in blocks){
		draWText(k2o(pos),i,blocks[pos])
		i++
	}
	}
	//调用函数 生成棋盘以及五个小黑点
	
	//点击事件 同时调用放棋子函数 以及判断是否输赢
	function handleClick(e){
//		$('canvas').on("click",function(e){
			var position={
				x:Math.round((e.offsetX-off/2)/off),
				y:Math.round((e.offsetY-off/2)/off)
			}
			if(blocks[v2k(position)]){
				return;
			}
			if(ai){
            	makeChess(position,'hei');
           		makeChess(AI(),'bai');
            	if(check(position,'hei')>=5){
                	alert('黑棋赢');
                	// hei.show();
               	 	$(canvas).off('click');
                	if(confirm('是否生成棋谱')){
                    	review();
                	}
                	return;
            	}
            	if(check(AI(),'bai')>5){
                	alert('白棋赢');
                	// bai.show();
                	$(canvas).off('click');
               	 	if(confirm('是否生成棋谱')){
                    	review();
                	}
                	return;
            	}
            	return;
        	}
			if(flas){
				makeChess(position, "hei");
	//			console.log(check(position,"hei"))
				if(check(position,"hei")>=5){
					alert("黑棋胜利");
					$("canvas").off("click");
					if(confirm('是否生成棋谱')){
						review()
					}
					return
				};
				flag=false
			}else{
				makeChess(position, "bai");
				if(check(position,"bai")>=5){
					alert("白棋赢了");
					$("canvas").off("click");
					if(confirm('是否生成棋谱')){
						review()
					}
				};
			}
			flas=!flas
//		})
	}
	draw();
	$(canvas).on('click',handleClick);
	
	$(".fanhui").on('click',restart);
	//重新开始按钮
	$(".xinju").on('click',restart);
	var kaiguan=true
	//单击和网游选择按钮
	$(".danji").on("click",function(){
		if(kaiguan){
			kaiguan=false;
//			audio.src=musics[0].path;
//			if(yinxiao===true){
//				audio.play();
//			}
			$(this).css("background","url(img/06.png)")
		}else{
			kaiguan=true
			$(this).css("background","url(img/07.png)")
//			if(yinxiao===true){
//			audio.pause();
//			}
		}
		if(ai==true){
            ai=false
        }else if(ai==false){
            ai = true;
        }
	})
	//按钮旋转效果
	$('.tishi .list').on("click",function(){
		if($(this).hasClass('fanzhuang')===false){
			$(this).addClass("fanzhuang")
		}else{
			$(this).removeClass("fanzhuang")
		}
		
	})
	//暂停
	var stop=true;
	$(".stop").on("click",function(){
		audio.src=musics[0].path;
		if(stop){
			$(this).css("background","url(img/01a.png)")
			stop=false;
			if(yinxiao){
				audio.pause();
			}
		}else{
			$(this).css("background","url(img/01.png)")
			stop=true;
			if(yinxiao===false){
				audio.play();
			}
		}
	})
	//时间倒计时
	function time(){
		if(stop===false){
			times+=0;
		}else{
			times++;
		}
		if(times>60){
			return;
		}
		s=60-times
		$('.time').text("00:"+s)
	}
	function time1(){
		if(stop===false){
			times1+=0;
		}else{
			times1++;
		}
		if(times1>=60){
			return;
		}
		s=60-times1
		$('.time').text("00:"+s)
	}
	
	//音效
	var yinxiao=true;
	$(".xuanxiang").on("click",function(){
		audio.src=musics[0].path;
		if(yinxiao){
			$(this).css("background","url(img/02a.png)")
			yinxiao=false;
			audio.play();
		}else{
			$(this).css("background","url(img/02.png)")
			yinxiao=true;
			audio.pause();
		}
	})
	
})
