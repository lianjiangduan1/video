document.addEventListener('DOMContentLoaded',function(){
	var oVideo = document.querySelector('video');
	var oContrs = document.querySelectorAll('#controller .contbtns');
	var oContbar = document.querySelector('.contbar');
	var oSpeedProg = document.querySelector('.speed_progress');
	var oSlider = document.querySelector('.slider');
	var audioContbar = document.querySelector('.audio_contbar');
	var audioSpeedProgress = document.querySelector('.audio_speed_progress');
	var audioSlider = document.querySelector('.audio_slider');
	var bOk = true;
	//播放
	oContrs[0].addEventListener('click',function(){
		oVideo.play();
	},false);

	//停止
	oContrs[1].addEventListener('click',function(){
		oVideo.pause();
	},false);

	//重播
	oContrs[2].addEventListener('click',function(){
		oVideo.currentTime = 0;//设置当前时间为零
	});

	//全屏
	oContrs[4].addEventListener('click',function(){
		oVideo.webkitEnterFullScreen();
	},false);

	//静音
	oContrs[5].addEventListener('click',function(){
		if(bOk){
			oVideo.muted = true;
			oContrs[5].className = 'contbtns mute';
		}else{
			oVideo.muted = false;
			oContrs[5].className = 'contbtns';
		}
		bOk = !bOk;
	},false);

	//拖拽视频进度
	oSlider.addEventListener('mousedown',function(ev){
		var disX = ev.clientX-oSlider.offsetLeft;
		function fnMove(ev){
			var l = ev.clientX-disX;
			if(l<0){
				l=0;
			}else if(l>oContbar.offsetWidth-oSlider.offsetWidth){
				l=oContbar.offsetWidth-oSlider.offsetWidth;
			}
			oSlider.style.left = l+'px';
			var scale = l/(oContbar.offsetWidth-oSlider.offsetWidth);
			
			oSpeedProg.style.width = oContbar.offsetWidth*scale+'px';
			oVideo.currentTime = oVideo.duration*scale;
		}
		function fnUp(){
			document.removeEventListener('mousemove',fnMove,false);
			document.removeEventListener('mouseup',fnUp,false);
		}
		document.addEventListener('mousemove',fnMove,false);
		document.addEventListener('mouseup',fnUp,false);
		ev.preventDefault();
	},false);

	//点击视频进度
	oContbar.addEventListener('click',function(ev){
		var scale = (ev.clientX-oContbar.offsetLeft)/oContbar.offsetWidth;
		oSlider.style.left = (oContbar.offsetWidth-oSlider.offsetWidth)*scale+'px';
		oSpeedProg.style.width = (oContbar.offsetWidth-oSlider.offsetWidth)*scale+'px';
		oVideo.currentTime = oVideo.duration*scale;
	},false);
	
	//监听更新时间更新进度
	oVideo.addEventListener('timeupdate',function(){
		var scale = oVideo.currentTime/oVideo.duration;
		oSpeedProg.style.width = (oContbar.offsetWidth-oSlider.offsetWidth)*scale+'px';
		oSlider.style.left = (oContbar.offsetWidth-oSlider.offsetWidth)*scale+'px';
	},false);

	//拖拽音频进度
	audioSlider.addEventListener('mousedown',function(ev){
		var disX = ev.clientX-audioSlider.offsetLeft;
		function fnMove(ev){
			var l = ev.clientX-disX;
			if(l<0){
				l=0;
			}else if(l>audioContbar.offsetWidth-audioSlider.offsetWidth){
				l=audioContbar.offsetWidth-audioSlider.offsetWidth;
			}
			audioSlider.style.left = l+'px';
			var scale = l/(audioContbar.offsetWidth-audioSlider.offsetWidth);
			audioSpeedProgress.style.width = (audioContbar.offsetWidth-audioSlider.offsetWidth)*scale+'px';
			oVideo.volume = scale;
		}
		function fnUp(){
			document.removeEventListener('mousemove',fnMove,false);
			document.removeEventListener('mouseup',fnUp,false);
		}
		document.addEventListener('mousemove',fnMove,false);
		document.addEventListener('mouseup',fnUp,false);
		ev.preventDefault();
	},false);
	
	//点击音频进度
	audioContbar.addEventListener('click',function(ev){
		var scale = (ev.clientX-audioContbar.offsetLeft)/audioContbar.offsetWidth;
		audioSpeedProgress.style.width = scale*(audioContbar.offsetWidth-audioSlider.offsetWidth)+'px';
		audioSlider.style.left = scale*(audioContbar.offsetWidth-audioSlider.offsetWidth)+'px';
		oVideo.volume = scale;
	},false);
},false);