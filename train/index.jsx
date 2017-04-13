import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

class ZmitiTrainApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			back:false
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {


		var roadStyle = {
			background:'url(./assets/images/road.gif) no-repeat center'
		}

		return (
			<div className='zmiti-train-main-ui'>
				<section className={'zmiti-train-C '+ (this.state.back?'active':'')}>
					<img src='./assets/images/train.png'/>
					<div className='zmiti-train-road' style={roadStyle}></div>
				</section>
			</div>
		);
	}


	componentDidMount() {


		setTimeout(()=>{
			this.setState({
				back:true	
			});
		},1000)	

		var {obserable} = this.props;
		obserable.on('showTrain',()=>{
		
		});
	}
}
export default PubCom(ZmitiTrainApp);