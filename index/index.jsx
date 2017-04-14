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
					<img src='./assets/images/camel.gif'/>
					<img src='./assets/images/camel1.gif'/>
					<img src='./assets/images/camel1.gif'/>
				</div>
				<section className={'zmiti-change '+(this.state.changeImgShow?'':'hide')} ref='zmiti-change' style={{height:this.state.bHeight}}>
					<img  draggable='false' onTouchStart={e=>e.preventDefault()} className={this.state.imgShow?'active':''} onLoad={()=>{this.setState({imgShow:true,showTitle:true})}} src='./assets/images/bianqian1.png'/>
				</section>
				{this.state.showBeginBtn || !this.state.clicked && <section onTouchTap={this.begin.bind(this)} className='zmiti-begin'>
									<img src='./assets/images/begin.png'/>
								</section>}
				<div className={'index-text ' +(this.state.changeImgShow?'':'hide')+(this.state.showTitle ?' active':' ') }>样子变了,<br/>&nbsp;&nbsp;不忘初心。 </div>
				<div className={'index-text1 '+(this.state.currentText === 0 ? 'show':'')}>从中国西安出发,一路向西，跨越高原峡谷，奔波沙漠盆地，深入中亚腹地，通连欧洲。输往西方的主要货物，从丝绸到瓷器与茶叶，形成一股持续吹向全球的东方文明之风 </div>
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

	/*flyParticleToImage(option ={}){

        option.container.innerHTML = "";
        var canvas = document.createElement("canvas");
        canvas.style.transition = "1s opacity";
        canvas.style.position = "absolute";
        
        canvas.width = option.container.offsetWidth;
        canvas.height = option.container.offsetHeight;
        option.img.width = canvas.width;
        option.img.height  = canvas.height ;

        option.container.appendChild(canvas);
        var stage = new createjs.Stage(canvas);
        var container = new createjs.Container();

        var outCanvas = createShape();
        var outContext = outCanvas.getContext("2d");
        var dots = getImageData(outCanvas, outContext);


        var ball = [];

        for (var i = 0; i < dots.length; i++) {
            var shape = new createjs.Shape();
            var x = Math.random() * canvas.width * 2,
                y = Math.random() * canvas.height * 2;
            var circle = shape.graphics.beginFill('rgba('+dots[i].r+','+dots[i].g+','+dots[i].b+','+dots[i].a+')').drawCircle(x-14, y, 1);
            shape.posX = x-3;
            shape.posY = y;
            container.addChild(shape);
            ball.push(shape);
        }
        container.x = 10;


        stage.addChild(container);

        stage.update();



        function getImageData(outCanvas, outContext) {
            var imgData = outContext.getImageData(0, 0, outCanvas.width, outCanvas.height);
            var dots = [],
                x = 0,
                y = 0,
                gap = 4;

            for (var x = 0; x < imgData.width; x += gap) {
                for (var y = 0; y < imgData.height; y += gap) {
                    var i = (x + y * outCanvas.width) * 4;
                    
                    if (imgData.data[i + 3] > 50 && imgData.data[i ] !==255 && imgData.data[i +1] !==255 && imgData.data[i +2] !==255) {
                        dots.push({
                            x: x,
                            y: y,
                            r:imgData.data[i],
                            g:imgData.data[i + 1],
                            b:imgData.data[i + 2],
                            a:imgData.data[i + 3]
                        });
                    }
                }
            }
            return dots;
        }

        function createShape() {
            var outCanvas = document.createElement("canvas");
            outCanvas.width = option.img.width;
            outCanvas.height = option.img.height;
            var context = outCanvas.getContext("2d");
            var outStage = new createjs.Stage(outCanvas);


            context.drawImage(option.img, 0, 0, option.img.width, option.img.height);

            outCanvas.style.position = "absolute";
            outCanvas.style.opacity = 0;
            outCanvas.style.transition = "opacity 2s";

            option.container.appendChild(outCanvas);

            return outCanvas;
        }


        for (var i = 0; i < ball.length; i++) {
            createjs.Tween.get(ball[i], { override: true }).wait(Math.random() * 800).to({ x: dots[i].x - ball[i].posX, y: dots[i].y - ball[i].posY, alpha: 1 }, 500, createjs.Ease.cubicInOut);
        }
        setTimeout(function () {
            outCanvas.style.opacity = 1;
            canvas.style.opacity = 0;
            option.complate && option.complate();
        }, 2000);
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", stage);
	}*/

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

		this.requesAniation = window.webkitRequestAnimationFrame ;
		
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
			iNow+=1;

			var scale = (iNow/20<1?1:iNow/25);
			scale > 2 && (scale = 2);
			var top = iNow*4 >this.viewW / 10 * 4.5 ? this.viewW / 10 * 4.5 : iNow *4;
			var z = iNow*4 > 200 ? 200 : iNow *4 ;

			s.state.camelStyle.x =0;
			s.state.camelStyle.y = -top;
			s.state.camelStyle.z = z;


			x+=.1;
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