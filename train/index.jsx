import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

class ZmitiTrainApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			maskShow:false,
			back:false,
			toTop:false,
			stop:false,//火车停止
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {


		var roadStyle = {
			background:'url(./assets/images/road-bg.png) repeat-x center / contain'
		}
		var maskStyle = {
			background:'url(./assets/images/arron1.png) no-repeat center top / cover',
			
		}
		

		return (
			<div className='zmiti-train-main-ui'>
				
				<section ref='zmiti-top-C' className={'zmiti-top-C '+(this.state.back?'active ':' ') + (this.state.stop?'stop ':' ')}>
					<section className='zmiti-train-cloud'>
						<img src='./assets/images/cloud.png'/>
					</section>
					<section className='zmiti-train-city'>
						<img src='./assets/images/city.png'/>
					</section>
					
				</section>


				<section className={'zmiti-train-C '+ (this.state.back?'active ':' ')+(this.state.toTop?'toTop ':' ')+ (this.state.stop?'stop ':' ') }>
					<img src='./assets/images/train.png'/>
					<div className='zmiti-train-road' style={roadStyle}></div>
				</section>
				
				<section className={'zmiti-train-item '+ (this.state.showItem?'active':'')}>
				</section>
				<section className={'zmiti-train-text zmiti-train-item '+ (this.state.showItem?'active':'')}>
					<section className={this.state.toTop?'active':''}>
						<div>从一步一个脚印的大漠驼队，到呼啸飞驰的中欧班列，穿越了千年的时空。瓷器丝绸茶叶被服装玩具电子器材替代，但丝绸之路承载的和平合作、开放包容、互学互鉴、互利共赢的精神薪火相传，“一带一路”正奏响人类共同发展的时代强音。</div>
					</section>
				</section>
				<section className={'zmiti-train-item '+ (this.state.showItem?'active':'')}>
					<div className='zmiti-logo-train-bg'><img src='./assets/images/train-bottom.png'/></div>
					<div className={'zmiti-train-share '+(this.state.showShare?'active':'')}>
						<div className='zmiti-logo'>
							<img src='./assets/images/logo.png'/>
							新华社新媒体中心出品
						</div>
						<section className='zmiti-searoad-btn' onTouchTap={this.entrySea.bind(this)}>
							<img src='./assets/images/sea-roadbtn.png'/>
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

	entrySea(){
		let {obserable} = this.props;
		obserable.trigger({type:'entrySea'});
		$('#zmiti-bgtrain').attr('src','./assets/music/hailang.mp3').attr('loop','loop')[0].play();
	}


	componentDidMount() {


		setTimeout(()=>{
			this.setState({
				back:true	
			});

			setTimeout(()=>{

				this.setState({
					toTop:true
				},()=>{
					this.refs['zmiti-top-C'].style.WebkitTransform = 'translate3d(0,-9rem,-800px)';
					setTimeout(()=>{

						this.setState({
							showShare:true,
							//showItem:true
						});
					},4000)
				});


			},7*1000)

		},1000);

	 
		
	}
}
export default PubCom(ZmitiTrainApp);