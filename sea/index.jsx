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
						<div>服装，玩具，电子器材......</div>
						<div>一带一经济；一路一丝绸，</div>
						<div>样子变了，不忘初心。</div>
						<div>“一带一路”是中国与丝路沿途国家分享优质产能，共商项目投资、共建基础设施、共享合作成果的倡议。</div>
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