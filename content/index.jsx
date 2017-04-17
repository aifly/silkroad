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
					text:'是中国古代劳动人民在长期的实践中对磁石磁性认识的结果，是中国的四大发明之一'
				},
				{
					className:'',
					img:'./assets/images/tea.png',
					text:'是中国特有的一种著名饮品'
				},{
					className:'zmiti-porcelain',
					img:'./assets/images/porcelain.png',
					text:'是中国劳动人民的一个重要的创造'
				},{
					className:'zmiti-silk',
					img:'./assets/images/silk.png',
					text:'是以蚕丝织造的纺织品'
				}

			]

		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {
		var mainStyle = {
			background:'url('+this.props.contentBg+') no-repeat center bottom / cover ',
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
		var i =0;
		$(this.refs['zmiti-content-main-ui']).on('touchstart',()=>{
			if(++i>=this.state.data.length){
				$('#zmiti-bgsound1')[0].pause();
				$('#zmiti-bgtrain')[0].play();
			}
		}).swipe('left',()=>{

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
				if(this.props.contentBg === './assets/images/bg1.jpg'){
					obserable.trigger({type:'showTrain'});	
				}
				else{
					obserable.trigger({type:'showSea'});		
				}
				
			}else{
				this.setState({
					current:iNow
				})	
			}
			
		});
	}
}
export default PubCom(ZmitiContentApp);