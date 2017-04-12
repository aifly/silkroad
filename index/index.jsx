import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

class ZmitiIndexApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			scale:2,
			imgW:0
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {


		return (
			<div className='index-main-ui' style={{width:this.viewW,height:this.viewH}}>
				<div className='index-bg' ref='index-bg' style={{height:this.viewH ,width:this.viewH*this.state.scale} }>
					<img onLoad={(e)=>{this.setState({scale:e.target.width/e.target.height,imgW:e.target.width})}} src='./assets/images/bg.jpg'/>
				</div>
				<div className='zmiti-camel' ref='zmiti-camel'>
					<img src='./assets/images/camel.gif'/>
					<img src='./assets/images/camel1.gif'/>
					<img src='./assets/images/camel1.gif'/>
				</div>
			</div>
		);
	}


	componentDidMount() {
		var iNow=1;
		var camel = this.refs['zmiti-camel'];
		var indexBg = this.refs['index-bg'];
		var timer = setInterval(()=>{
			iNow+=1;
			if(iNow/1.5>500){
				clearInterval(timer)
			}
			camel.style.WebkitTransform = 'translate3d('+-iNow/6+'px,'+-iNow/4+'px,'+iNow*1.5+'px)';
			indexBg.style.WebkitTransform = 'translate3d('+iNow+'px,0,0px)';
		},20)
	}
}
export default PubCom(ZmitiIndexApp);