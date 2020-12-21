<template>
	<view class="content">
		<view  class="img-container">
			<image class="logo" src="/static/banner.png"></image>
		</view>
		<view class="list-container">
				<view class="item" @click="handleClick()">
					<view class="item-left">
					<image src="/static/hosp_image_1.png" class="icon"/>
					    <view class="hospital-name">郑州大学第一附属医院医院</view>
					</view>
					<image src="../../static/nav_ico_open.png" class="nav"></image>
				</view>
			<view class="item" @click="handleClick()">
				<view class="item-left">
					<image src="/static/hosp_image_2.png" class="icon"/>
					<view class="hospital-name">河南省人民医院医院</view>
				</view>
				<image src="../../static/nav_ico_open.png" class="nav"></image>
			</view>
			<view class="item" @click="handleClick()">
				<view class="item-left">
					<image src="/static/hosp_image_3.png" class="icon"/>
					<view class="hospital-name">河南省中医院医院</view>
				</view>
				<image src="../../static/nav_ico_open.png" class="nav"></image>
			</view>
			<view class="item" @click="handleClick()">
				<view class="item-left">
					<image src="/static/hosp_image_4.png" class="icon"/>
					<view class="hospital-name">郑州大学第三附属医院医院</view>
				</view>
				<image src="../../static/nav_ico_open.png" class="nav"></image>
			</view>
			<view class="item" @click="handleClick()">
				<view class="item-left">
					<image src="/static/hosp_image_0.png" class="icon"/>
					<view class="hospital-name">无图标的医院</view>
				</view>
				<image src="../../static/nav_ico_open.png" class="nav"></image>
			</view>
	  </view>
		
	</view>
</template>

<script>	
import {getHospitalList } from '../../servers/api.js';	
    export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
 
		},
		mounted(){
		// 挂载时执行调用接口请求
		getHospitalList()
		.then(res=>{
			console.log(res);
		})
		.catch(err=>{
			console.error(err);
		})
		},
		methods: {
			handleClick(){
				uni.navigateTo({
					url: '../submitInfo/submitInfo'
				});
			}
		}
	}
</script>

<style lang="less"> 
	.content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 750rpx;
		height: 1334rpx;
		background: #FFFFFF;
		
		.img-container{
			width: 750rpx;
			height: 340rpx;
			.logo{
				width: inherit;
				height: inherit;
			}
		}
		.list-container{
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			padding-top: 50rpx;
			
			 .item{
				 display: flex;
				 flex-direction: row;
				 justify-content: space-between;
				 align-items: center;
				 width: 660rpx;
				 height: 100rpx;
				 background: #FFFFFF;
				 border: 1rpx solid #EBEBEB;
				 border-radius: 10rpx;
				 padding-left: 27rpx;
				 padding-top: 11rpx;
				 padding-bottom: 9rpx;
				 padding-right: 42rpx;
				 margin-bottom: 20rpx;

				 .item-left{
					 display: flex;
					 flex-direction: row;
					 justify-content: flex-start;
					 align-items: center;
				 		.icon{
				 			 width: 80rpx;
				 			 height: 80rpx;
				 					 }
				 					 .hospital-name{
				 					 	 width: auto;
				 					 	 height: 31rpx;
				 					 	 font-size: 32rpx;
				 					 	 font-family: Lantinghei SC;
				 					 	 font-weight: 600;
				 					 	 color: #575757;
				 					 	 line-height: 36rpx;
				 					 	 margin-left: 47rpx;
				 					 }
				 }
				 .nav{
					 width: 16rpx;
					 height: 28rpx;
					 
				 }
				 
			 }
		}
 
	}

</style>
