import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

import '../assets/js/touch'

class ZmitiContentApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			isBlur:false,
			showContent:true,
			current:0,
			data:[
				{
					img:'./assets/images/compass.png',
					className:'',
					text:'中国输往世界各地的主要货物，从丝绸到瓷器与茶叶，形成一股持续吹向全球的东方文明之风。'
				},
				{
					className:'',
					img:'./assets/images/tea.png',
					text:'中国输往世界各地的主要货物，从丝绸到瓷器与茶叶，形成一股持续吹向全球的东方文明之风。tea'
				},{
					className:'zmiti-porcelain',
					img:'./assets/images/porcelain.png',
					text:'中国输往世界各地的主要货物，从丝绸到瓷器与茶叶，形成一股持续吹向全球的东方文明之风。porcelain'
				}

			]

		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {
		var mainStyle = {
			background:'url(./assets/images/bg1.jpg) no-repeat center bottom / cover ',
		}
		var goodStyle={
			background:'url(./assets/images/goods-bg.png) no-repeat center bottom / contain '	
		}
		return (
			<div className={'zmiti-content-main-ui '+(this.state.isBlur ?'blur':'')} ref='zmiti-content-main-ui' style={mainStyle}>
				<section style={goodStyle}>
					{
						this.state.data.map((item,i)=>{
							return <img key={i} className={this.state.data[this.state.current].className + (this.state.current === i?' active':'')} src={this.state.data[this.state.current].img}/>			
						})
					}
					
				</section>
				<section>
					{
						this.state.data.map((item,i)=>{
							return <div className={this.state.current===i?'active':''} key={i}>{this.state.data[this.state.current].text}</div>
						})
					}
					
				</section>
				<section>
				</section>
			</div>
		);
	}

	componentDidMount() {
		var iNow = 0;
		var isFilish= false;
		var {obserable} = this.props;
		$(this.refs['zmiti-content-main-ui']).swipe('left',()=>{

			if(isFilish){
				return;
			}
			iNow++;
			if(iNow === this.state.data.length){
				iNow = 0;
				this.setState({
					current:iNow
				});
				isFilish = true;
				var t = setInterval(()=>{
					if(iNow === this.state.data.length-1){
						clearInterval(t);
						this.setState({
							isBlur:true
						});
						obserable.trigger({type:'showTrain'})
					}else{
						iNow++;
						this.setState({
							current:iNow
						});	
					}
					
				},2000);
			}else{
				this.setState({
					current:iNow
				})	
			}
			
		});
	}
}
export default PubCom(ZmitiContentApp);