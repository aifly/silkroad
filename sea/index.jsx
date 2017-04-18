import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

class ZmitiSeaApp extends Component {
	constructor(props) {
		super(props);
		this.state={
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
			back:false
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {
		var bgStyle = {};


		if(this.state.bgStyle.x !==0 || this.state.bgStyle.y !==0 || this.state.bgStyle.z !==0 ){
			bgStyle.WebkitTransform ='translate3d('+this.state.bgStyle.x+'px,'+this.state.bgStyle.y+'px,'+this.state.bgStyle.z+'px)';
		}

		var shipStyle = {};


		if(this.state.shipStyle.x !==0 || this.state.shipStyle.y !==0 || this.state.shipStyle.z !==0 ){
			shipStyle.WebkitTransform ='translate3d('+this.state.shipStyle.x+'px,'+this.state.shipStyle.y+'px,'+this.state.shipStyle.z+'px)';
		}

		var bottomStyle={
			background:'url(./assets/images/train-bottom.png) no-repeat center / cover'
		}

		var maskStyle = {
			background:'url(./assets/images/arron1.png) no-repeat center top / cover',
			
		}

		return (
			<div className='zmiti-sea-main-ui'>
				<section style={bgStyle} className={'zmiti-sea-bg  '+(this.state.back?'':'toBack')+(this.state.top?' toTop':'')}>
					<img  src='./assets/images/sea-bg.jpg'/>
				</section>
				<section style={shipStyle} className={'zmiti-big-ship '+(this.state.back?'':'toBack')+(this.state.top?' toTop':'')}>
					<img src='./assets/images/bigship.gif'/>
				</section>

				<section className={'zmiti-ship-text '+(this.state.top?'active':'')}>
					<section>
						<div>从利用牵星术和指南针的古船扬帆到现代的超大型集装箱货轮，“海丝”传奇再被续写，搭载着高附加值的电子、家电等产品的<b>远洋货轮</b>启航赴欧。丝绸之路承载的和平合作、开放包容、互学互鉴、互利共赢的精神薪火相传，“一带一路”正奏响人类共同发展的时代强音。</div>
					</section>
				</section>

				<section className={'zmiti-sea-item '+ (this.state.showItem?'active':'')} style={bottomStyle}>
					<div className='zmiti-logo-train-bg' ><img src='./assets/images/train-bottom.png'/></div>
					<div className={'zmiti-train-share '+(this.state.showShare?'active':'')}>
						<div className='zmiti-logo'>
							<img src='./assets/images/logo.png'/>
							新华社新媒体中心出品
						</div>

						<section className='zmiti-leand' onTouchStart={this.initApp.bind(this)}>
							<img src='./assets/images/leand-roadbtn.png'/>
						</section>
						<section className='zmiti-share' onTouchTap={()=>{this.setState({maskShow:true})}}>
							<img src='./assets/images/share-btn.png'/>
						</section>
					</div>
				</section>
				{this.state.maskShow&& <section onTouchStart={()=>{this.setState({maskShow:false})}} className='zmiti-mask' style={maskStyle}></section>}
			</div>
		);
	}

	initApp(){
		let {obserable} = this.props;
		obserable.trigger({
			type:'initApp'
		});
	}

	componentDidMount() {
		//this.animate();




		setTimeout(()=>{
				this.state.back = true;
				this.forceUpdate();

				setTimeout(()=>{
					this.setState({
						top:true,
						showItem:true
					})
				},5000)
			},1000);
		let {obserable} = this.props;



		obserable.on('showSeaApp',()=>{
			setTimeout(()=>{
				this.state.back = true;
				this.forceUpdate();

				setTimeout(()=>{
					this.setState({
						top:true,
						showItem:true
					})
				},5000)
			},1000);
		});
	}

	animate(){

	}

}
export default PubCom(ZmitiSeaApp);