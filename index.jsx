import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';
injectTapEventPlugin();
import IScroll from 'iscroll';
import './assets/css/index.css';

import ZmitiIndexApp from './index/index.jsx';
import ZmitiContentApp from './content/index.jsx';
import ZmitiTrainApp from './train/index.jsx';
import ZmitiLoadingApp from './loading/index.jsx';
import ZmitiSeaIndexApp from './seaindex/index.jsx';
import ZmitiSeaApp from './sea/index.jsx';



import Obserable  from './assets/js/obserable';

var obserable = new Obserable();

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEntry:false,
			showTrain:false,
			progress:'0%',
			showLoading:true,
			entrySea:false,
			showSea:false,
			contentBg:'./assets/images/bg1.jpg'

		}
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}
	render() {
		var data ={
			obserable
		}
		return (
			<div className='zmiti-main-ui' >
				{this.state.showLoading &&   <ZmitiLoadingApp {...this.state}></ZmitiLoadingApp>}
				{!this.state.isEntry &&　!this.state.entrySea && !this.state.showLoading &&  <ZmitiIndexApp {...data}></ZmitiIndexApp>}
				{this.state.isEntry && !this.state.showSea  && !this.state.entrySea && !this.state.showTrain &&  <ZmitiContentApp {...this.state} {...data}></ZmitiContentApp>}
				{this.state.showTrain && !this.state.entrySea && <ZmitiTrainApp {...data}></ZmitiTrainApp>}
				{this.state.entrySea && !this.state.showSea && !this.state.showLoading && <ZmitiSeaIndexApp {...data}></ZmitiSeaIndexApp>}
				{!this.state.showLoading  &&  this.state.showSea && <ZmitiSeaApp {...data}></ZmitiSeaApp>}
			</div>
		);
	}

	wxConfig(title,desc,img,appId='wxfacf4a639d9e3bcc',worksid){
		   var durl = location.href.split('#')[0]; //window.location;
		        var code_durl = encodeURIComponent(durl);
			$.ajax({
				type:'get',
				url: "http://api.zmiti.com/weixin/jssdk.php",
				dataType:'jsonp',
				data:{
					durl:durl,
					type:'signature'
				},
				jsonp: "callback",
			    jsonpCallback: "jsonFlickrFeed",
			    error(){
			    },
			    success(data){
			    	wx.config({
							    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							    appId:appId, // 必填，公众号的唯一标识
							    timestamp:'1488558145' , // 必填，生成签名的时间戳
							    nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
							    signature: data.signature,// 必填，签名，见附录1
							    jsApiList: [ 'checkJsApi',
											  'onMenuShareTimeline',
											  'onMenuShareAppMessage',
											  'onMenuShareQQ',
											  'onMenuShareWeibo',
											  'hideMenuItems',
											  'showMenuItems',
											  'hideAllNonBaseMenuItem',
											  'showAllNonBaseMenuItem'
									] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							});

			    	wx.ready(()=>{


			    		/*wx.getLocation({
						    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						    success: function (res) {
						        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
						        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
						        var speed = res.speed; // 速度，以米/每秒计
						        var accuracy = res.accuracy; // 位置精度

						        
						    },
						    error(){
						    	
						    }
						});
*/
			    			 		//朋友圈
	                    wx.onMenuShareTimeline({
	                        title: title, // 分享标题
	                        link: durl, // 分享链接
	                        imgUrl: img, // 分享图标
	                        desc: desc,
	                        success: function () { },
	                        cancel: function () { }
	                    });
	                    //朋友
	                    wx.onMenuShareAppMessage({
	                        title: title, // 分享标题
	                        link: durl, // 分享链接
	                        imgUrl: img, // 分享图标
	                        type: "link",
	                        dataUrl: "",
	                        desc: desc,
	                        success: function () {
	                        },
	                        cancel: function () { 
	                        }
	                    });
	                    //qq
	                    wx.onMenuShareQQ({
	                        title: title, // 分享标题
	                        link: durl, // 分享链接
	                        imgUrl: img, // 分享图标
	                        desc: desc,
	                        success: function () { },
	                        cancel: function () { }
	                    });
			    	});
			    }
			});
		
	}

	componentDidMount() {

		this.wxConfig('丝路变迁','千年的时空穿越','http://h5.zmiti.com/public/silk/assets/images/300.jpg')

		obserable.on('showTrain',()=>{
			this.setState({
				showTrain:true
			});
		});

		obserable.on('initApp',()=>{
			this.setState({
				isEntry:false,
				showTrain:false,
				progress:'0%',
				showLoading:false,
				entrySea:false,
				showSea:false,
				contentBg:'./assets/images/bg1.jpg'
			});
			$('#zmiti-bgtrain').attr('src','./assets/music/train.mp3')[0].pause();
			$('#zmiti-bgsound')[0].pause();
			$('#zmiti-bgsound1')[0].pause();
		});

		obserable.on('gotoSeaApp',()=>{
			this.setState({
				isEntry:false,
				showTrain:false,
				progress:'0%',
				showLoading:false,
				entrySea:true,
				showSea:false
			});

			$('#zmiti-bgtrain').attr('src','./assets/music/hailang.mp3').attr('loop','loop')[0].play();
			$('#zmiti-bgsound')[0].pause();
			$('#zmiti-bgsound1')[0].pause();
		});

		obserable.on('entrySea',()=>{
			this.setState({
				showTrain:false,
				entrySea:true
			})
		});
		obserable.on('showSea',()=>{
			this.setState({
				showSea:true,entrySea:false
			})
		})
		var arr = [
			'./assets/images/arron1.png',
			'./assets/images/bg.jpg',
			'./assets/images/bg1.jpg',
			'./assets/images/sea-bg.jpg',
			'./assets/images/sea-bg-inner.jpg',
			'./assets/images/bianqian1.png',
			'./assets/images/camel.png',
			'./assets/images/camel1.gif',
			'./assets/images/city.png',
			'./assets/images/cloud.png',
			'./assets/images/goods-bg.png',
			'./assets/images/logo.png',
			'./assets/images/porcelain.png',
			'./assets/images/road-bg.png',
			'./assets/images/sea-bg.jpg',
			'./assets/images/sea-roadbtn.png',
			'./assets/images/share-btn.png',
			'./assets/images/ship.gif',
			'./assets/images/ship.png',

			'./assets/images/silk.png',
			'./assets/images/tea.png',
			'./assets/images/train.png',
			'./assets/images/begin.png',

			'./assets/images/train-bottom.png'
		];
		var s=  this;
		
		this.loading(arr,(value)=>{
			s.setState({
				progress:(value*100|0)+'%'
			})
		},()=>{
			s.setState({
				progress:(100|0)+'%'
			});
			s.setState({
				showLoading:false
			});
		});

		obserable.on('entryContent',(data)=>{
			this.setState({
				isEntry:true,
				entrySea:false,
				contentBg:data || './assets/images/bg1.jpg'
			});
		});

		$(document).one('touchstart',()=>{
			var audio = $('#zmiti-bgsound')[0];
			if(audio.paused){
				audio.play();
			};
		})
	}	

	componentWillMount() {

	}

	loading(arr, fn, fnEnd){
        var len = arr.length;
        var count = 0;
        var i = 0;
        
        function loadimg() {
            if (i === len) {
                return;
            }
            var img = new Image();
            img.onload = img.onerror = function(){
                count++;
                if (i < len - 1) {
                    i++;
                    loadimg();
                    fn && fn(i / (len - 1), img.src);
                } else {
                    fnEnd && fnEnd(img.src);
                }
            };
            img.src = arr[i];
        }
       loadimg();
    }

	isWeiXin(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        return true;
	    }else{
	        return false;
	    }
    }

    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    }

	componentWillMount() {
		var s = this;

	}
}

	ReactDOM.render(<App></App>,document.getElementById('fly-main-ui'));
	

