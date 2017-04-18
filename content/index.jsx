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
					className:'zmiti-porcelain',
					img:'./assets/images/porcelain.png',
					text:''
				},{
					className:'zmiti-silk',
					img:'./assets/images/silk.png',
					text:''
				},{
					className:'',
					img:'./assets/images/tea.png',
					text:''
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
							return <img ref={'zmiti-good-img-'+i} key={i} className={this.state.data[i].className + (this.state.current === i?' active':'')} src={this.state.data[i].img}/>
						})
					}
					
				</section>
				<section>
					{
						this.state.data.map((item,i)=>{
							return <div   key={i}>{this.state.data[this.state.current].text}</div>
						})
					}
					
				</section>
				<section>
					<div className='zmiti-content-bottom' style={{background:'url(./assets/images/line.png) repeat-x center 70%'}}>
						<img style={{WebkitTransform:'translate3d('+(-2*this.state.current)+'rem,0,0)'}} src='./assets/images/swipeleft.png'/>
					</div>
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
			if(iNow >= this.state.data.length){
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
				this.refs['zmiti-good-img-'+(iNow)].classList.add('active');
				this.refs['zmiti-good-img-'+(iNow-1)].classList.remove('active');
				this.refs['zmiti-good-img-'+(iNow-1)].classList.add('hide');
			}
			
		});
	}
}
export default PubCom(ZmitiContentApp);