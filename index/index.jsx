import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

class ZmitiIndexApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			scale:2,
			imgW:0,
			bHeight:0,
			isBegin:false,
			changeImgShow:true,
			showBeginBtn:false,
			currentText:-1,
			showTitle:false,
			showText2:false,
			indexBgStyle:{
				x:0,
				y:0,
				z:0
			},
			camelStyle:{
				x:0,
				y:0,
				z:0
			}
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var indexBgStyle ={
			height:this.viewH,
			width:this.viewH*this.state.scale

		};
		if(this.state.indexBgStyle.x !==0 || this.state.indexBgStyle.y !==0 || this.state.indexBgStyle.z !==0 ){

			indexBgStyle.WebkitTransform ='translate3d('+this.state.indexBgStyle.x+'px,'+this.state.indexBgStyle.y+'px,'+this.state.indexBgStyle.z+'px)'
		}

		var camelStyle ={

		};
		if(this.state.camelStyle.x !==0 || this.state.camelStyle.y !==0 || this.state.camelStyle.z !==0 ){
			camelStyle.WebkitTransform ='translate3d('+this.state.camelStyle.x+'px,'+this.state.camelStyle.y+'px,'+this.state.camelStyle.z+'px)';
			camelStyle.WebkitTransition = this.state.camelStyle.transition;			
		}

		return (
			<div className='index-main-ui' style={{width:this.viewW,height:this.viewH}}>
				<div  className={'index-bg '+ (this.state.isBegin?' active time':'')} ref='index-bg' style={indexBgStyle}>
					<img onLoad={(e)=>{this.setState({scale:e.target.width/e.target.height,imgW:e.target.width})}} src='./assets/images/bg.jpg'/>
				</div>
				<div onTransitionEnd={this.camelTranstionEnd.bind(this)} className={'zmiti-camel '+ (this.state.isBegin?'active duration':'')} style={camelStyle} ref='zmiti-camel'>
					<img src='./assets/images/camel1.gif'/>
					<img src='./assets/images/camel1.gif'/>
					<img src='./assets/images/camel1.gif'/>
				</div>
				<section className={'zmiti-change '+(this.state.changeImgShow?'':'hide')} ref='zmiti-change' style={{height:this.state.bHeight}}>
					<img  draggable='false' onTouchStart={e=>e.preventDefault()} className={this.state.imgShow?'active':''} onLoad={()=>{this.setState({imgShow:true,showTitle:true})}} src='./assets/images/bianqian1.png'/>
				</section>
				{this.state.showBeginBtn || !this.state.clicked && <section onTouchTap={this.begin.bind(this)} className='zmiti-begin'>
									<img src='./assets/images/begin.png'/>
								</section>}
				{this.state.showBeginBtn || !this.state.clicked &&<section className='zmiti-entry-sea' onTouchTap={this.entrySea.bind(this)}>
									<img src='./assets/images/sea-roadbtn.png'/>
								</section>}
				<div className={'index-text ' +(this.state.changeImgShow?'':'hide')+(this.state.showTitle ?' active':' ') }>千年的时空穿越</div>
				<div className={'index-text1 '+(this.state.currentText === 0 ? 'show':'')}>古时丝绸之路从中国西安出发，载有瓷器、丝绸和茶叶等“中国特产”的驼队跨越高原峡谷，奔波沙漠盆地，深入中亚腹地，一路向西，通连欧洲。</div>
				<div onTransitionEnd={this.textEnd.bind(this)}  className={'index-text2 '+ (this.state.showText2?'show':'')}>从一步一个脚印的大漠驼队，到呼啸飞驰的中欧班列，“钢铁驼队”穿越了千年的时空。</div>
			</div>
		);
	}

	camelTranstionEnd(){
		if(!this.start){
			this.start =true;
			setTimeout(()=>{
				this.camel.classList.remove('duration');
				this.indexBg.classList.remove('duration');
				this.indexBg.classList.remove('time');
				this.animate();

			},1000)
		}
		
	}

	entrySea(){
		let {obserable} = this.props;
		obserable.trigger({type:'gotoSeaApp'})
	}

	beginCanvasAnimate(e){
		var target = e.target;
		var s = this;
		setTimeout(()=>{
			this.setState({bHeight:target.height,showTitle:true})
			s.flyParticleToImage({
				container:s.refs['zmiti-change'],
				img:s.refs['zmiti-change'].querySelector('img'),
				complate:()=>{
					s.setState({
						showBeginBtn:true
					});

					this.createjs = null;
				}
			})

			/* */
		},1000);
	}

	componentWillUnmount() {
		this.timer = false;
		this.bgTimer = false;
	}

	 
	begin(){

		this.starting = this.starting || 1;

		if(this.starting === 1){
			this.starting = 2;
			$('#zmiti-bgsound')[0].pause();
			$('#zmiti-bgsound1')[0].play();

			setTimeout(()=>this.beginGame(),100);

			this.bgZ = 0;
			this.bgTop = 0;

			this.setState({
				changeImgShow:false,
				clicked:true,
				showBeginBtn:false,
				showTitle:false,//清除默认的文字。

			});

			

			setTimeout(()=>{
				this.setState({
					currentText:0
				});
			},3000);

			setTimeout(()=>{
				this.setState({
					showText2:true,
					currentText:2
				});
			},6000)
		}

		
	}

	componentDidMount() {
		var iNow=1;
		this.iNow = iNow;
		var camel = this.refs['zmiti-camel'];
		this.camel = camel;
		var indexBg = this.refs['index-bg'];
		this.indexBg = indexBg;
 
	}

	beginGame(){
		this.setState({
			isBegin:true
		})
	}

	animate(){
		var iNow = this.iNow;

		this.timer =true;
		var x = 0;
		var s =this;
		this.timer = setInterval(()=>{
			iNow+=.1;

			var scale = (iNow/20<1?1:iNow/25);
			scale > 2 && (scale = 2);
			var top = iNow*4 >this.viewW / 10 * 4.5 ? this.viewW / 10 * 4.5 : iNow *4;
			var z = iNow*4 > 200 ? 200 : iNow *4 ;

			s.state.camelStyle.x =0;
			s.state.camelStyle.y = -top;
			s.state.camelStyle.z = z;


			x+=.4;
			s.state.indexBgStyle.x = x;

			s.state.indexBgStyle.y = -top;
			s.state.indexBgStyle.z = z

			s.forceUpdate()
			//this.camel.style.WebkitTransform = 'translate3d('+0+'px,'+-top+'px,'+z+'px)';

			this.bgTop = -top;
			this.bgZ = z;
		})
	
		 
	}


	textEnd(){
		
		var {obserable} = this.props;

			this.setState({
				showText2:false
			});

			clearInterval(this.timer)
			this.timer = false;
			this.bgTimer = false;
			/*;
			clearInterval(this.bgTimer);*/
			this.state.camelStyle.transition = '2s';
			this.state.camelStyle.x =-5;
			this.state.camelStyle.y = -this.viewW/10*2.5;
			this.state.camelStyle.z = this.viewW / 10 * 12.5;
				
			
			this.forceUpdate();
			//this.camel.style.WebkitTransform = 'translate3d('+-5+'px,'+(-this.viewW/10*2.5)+'px,'+400+'px)';
			
			setTimeout(()=>{
				obserable.trigger({
					type:'entryContent'
				})
			},1000)
		
	}
}
export default PubCom(ZmitiIndexApp);