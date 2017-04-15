import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

class ZmitiSeaIndexApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			imgW:0,
			bgStyle:{
				x:0,
				y:0,
				z:0
			},
			shipStyle:{
				x:0,
				y:0,
				z:0	
			},
			toTop:false,
			toBig:false,
			showText:false,
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var bgStyle = {};

		var shipStyle = {};

		if(this.state.bgStyle.x !==0 || this.state.bgStyle.y !==0 || this.state.bgStyle.z !==0 ){
			bgStyle.WebkitTransform ='translate3d('+this.state.bgStyle.x+'px,'+this.state.bgStyle.y+'px,'+this.state.bgStyle.z+'px)';
		}
		

		if(this.state.shipStyle.x !==0 || this.state.shipStyle.y !==0 || this.state.shipStyle.z !==0 ){
			shipStyle.WebkitTransform ='translate3d('+this.state.shipStyle.x+'px,'+this.state.shipStyle.y+'px,'+this.state.shipStyle.z+'px)';
		}
		else{
			shipStyle ={};	
		}

		return (
			<div className='seaindex-main-ui'>
				<section className={'seaindex-main-bg '+(this.state.toTop?'toTop':'')}>
					<img style={bgStyle} onLoad={e=>{this.setState({imgW:e.target.width})}} src='./assets/images/sea-bg.jpg'/>
				</section>
				<div className={'index-text1 seaindex-text '+(this.state.showText?'active':'')}>
					唐代，“广州通海夷道”的海上航路，这便是我国海上丝绸之路的最早叫法成为中国与外国贸易往来和文化交流的海上大通道并推动了沿线各国的共同发展
				</div>
				<section onTransitionEnd={this.transitonEnd.bind(this)} className={'seaindex-ship '+(this.state.toTop?'toTop ':'')+(this.state.toBig?' toBig ':'')} >
					<img src='./assets/images/ship.gif' style={shipStyle}/>
					<img src='./assets/images/ship.gif' style={shipStyle}/>
					<img src='./assets/images/ship.gif' style={shipStyle}/>
				</section>
			</div>
		);
	}


	componentDidMount() {
		this.timer = 1;
		this.animate();
		setTimeout(()=>{
			this.setState({
				showText:true
			})
		},10);
	}

	transitonEnd(e){

		let {obserable} = this.props;

		this.setState({
			showText:true
		})


		this.state.showText=false;
		this.forceUpdate();
		
		setTimeout(()=>{
			this.timer = false;
			this.state.shipStyle.x = 0;
			this.state.shipStyle.y = 0;
			this.state.shipStyle.z = 0;
			this.state.toBig = true;
			this.state.toTop = false;
			this.forceUpdate();
			

			obserable.trigger({
				type:'entryContent',
				data:'./assets/images/sea-bg-inner.jpg'
			});


		},2000)
 
	}

	componentWillMount() {
		this.timer = false;
	}

	animate(){
		var x = 0,
			shipX = 0;

		var render = ()=>{
			x+=.5;
			this.state.bgStyle.x = x;

			var X = shipX - x;
			
			if(X<=(-this.viewW / 10 * 9 ) ){
				X =(-this.viewW / 10 * 9 );
				this.setState({toTop:true});
			}

			this.state.shipStyle.x = X;
			if(this.timer){
				this.forceUpdate();
				window.webkitRequestAnimationFrame(render);
			}
			
		}
		render();


	}
}
export default PubCom(ZmitiSeaIndexApp);