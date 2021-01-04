<template>
	<view class="content">
		<view class="back-grounp" :style="{backgroundImage: 'url('+imageURL+')'}">
			<view class="circle-state">
				<view class="pay-state">已申请</view>
				<view class="slow-color">待付款状态色值</view>
			</view>	
			<view class="list-name">
				<view class="item">姓名</view>
				<view class="attribute">{{payInfo.name}}</view>
			</view>
			<view class="list-name">
				<view class="item">性别</view>
				<view  v-if="payInfo.sex==0" class="attribute">男</view>
				<view  v-if="payInfo.sex==1" class="attribute">女</view>
			</view>
		    <view class="list-name">
				<view class="item">住院号</view>
				<view class="attribute">{{payInfo.hospitalCardNo}}</view>
			</view>
			<view class="cut-off1"></view>
			<view class="list-cost">
				<view class="item">打印数量</view>
				<view class="attribute">{{payInfo.printNum}}</view>
			</view>
			<view class="list-name">
				<view class="item">打印费用</view>
				<view class="attribute">{{payInfo.printAmount}}</view>
			</view>
			<view class="list-name">
				<view class="item">邮寄费用</view>
				<view class="attribute">{{payInfo.expressNo}}元</view>
			</view>
			<view class="cut-off2"></view>
			<view class="add-on">
				<view class="major-total">
					合计:{{payInfo.totalAmount}}元
				</view>
			</view>
			<view class="button-container1" @click="payClick">
				<view class="button-pay">支付</view>	
			</view>
			<view class="button-container2" @click="cancelpayClick">
				<view class="button-cancel">取消</view>
			</view>
			</view>
			
		</view>
	</view>	
</template>

<script>
	import indexApi from '../../serves/api.js';	
	export default {
	
		data() {
			return {
				imageURL: "/static/image_list.png",
				queryform: {
								pageNum: 1,
								pageSize: 10
							},
				payInfo:{
					addressDetails: "",
					cardNo: "",
					city: "",
					county: "",
					expressNo: null,
					freight: null,
					hospitalCardNo: "",
					hospitalId: null,
					id: null,
					name: "",
					printAmount: null,
					printNum: null,
					province: "",
					receiveMobile: "",
					receiveName: "",
					sex: 0,
					status: 1,
					totalAmount: null,
					userId: 4
				}
			};
		},
		mounted(){
		 this.getApplyList();
		 this.getHospitalPayInfo();
		},
		methods: {
			/**
			 * @description  获取医院详情
			 * */
			getHospitalPayInfo(){
				// 挂载时执行调用接口请求  /暂时写死
				let _this=this;
				let parmas={
					id:8
				};
				indexApi.getHospitalPay(parmas)
				.then(res=>{
					if(res&&res.code==200){
						console.log(res);
						_this.payInfo=res.data;
						
					}
				})
				.catch(err=>{
					console.error(err);
				})
			},
			/**
			 * 
			 * @description  获取打印申请详细信息
			 * */
			getApplyList(){
				// 挂载时执行调用接口请求
				let parmas=this.queryform;
				indexApi.getApplylist(parmas)
				.then(res=>{
					if(res&&res.code==200){
						console.log(res);
						
					}
				})
				.catch(err=>{
					console.error(err);
				})
			},
			payClick(){
				uni.navigateTo({
					url: '../index/index'
				});
			},
			cancelpayClick(){
				uni.navigateTo({
					url: '../submitInfo/submitInfo'
				});
			},
		}
	}
</script>

<style lang="less">
	.content{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		background-color: #0066CC;
		// height: auto;
		// overflow: auto;
		.back-grounp{
			width: 702rpx;
			height: 1100rpx;
			background-size:702rpx;
			margin-top: 35rpx;
			margin-left: 24rpx;
			margin-right: 24rpx;
			margin-bottom: 71rpx;
			.circle-state{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin-top: 114rpx;
				margin-left: 64rpx;
				margin-right: 58rpx;
				margin-bottom: 36rpx;
				width: 580rpx;
				height: 90rpx;
				background: #6DAEFE;
				opacity: 0.9;
				border-radius: 45rpx;
				.pay-state{
					width: 108rpx;
					height: 34rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #0048FF;
					//line-height: 36rpx;
					margin-top: 28rpx;
					margin-left: 234rpx;
					// margin-right: 296rpx;
					margin-bottom: 28rpx;
				}
			    .slow-color{
			    	margin-top: 27rpx;
			    	margin-right: 0rpx;
					margin-bottom: 28rpx;
			    	width: 108px;
			    	height: 35px;
			    	font-size: 14px;
			    	font-family: PingFang SC;
			    	font-weight: 100;
			    	color: #FF7C42;
			    	line-height: 36px;
			        }	
			}
			.list-name{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: flex-start;
				width: 580rpx;
				margin-left: 99rpx;
				margin-right: 99rpx;
				.item{
					padding-bottom: 49rpx;
					width: auto;
					height: 28rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #575757;
					line-height: 36rpx;

				}
				.attribute{
					width: auto;
					height: 30rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #575757;
					line-height: 36rpx;
					margin-right: 98rpx;

				}
			}
			.cut-off1{
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				margin-left: 101rpx;
				margin-right: 101rpx;
				margin-bottom: 50rpx;
				width: 500rpx;
				height: 0rpx;
				border: 1rpx solid #6DAEFE;
			}
			.list-cost{
				display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: flex-start;
					width: 580rpx;
					margin-left: 99rpx;
					.item{
						padding-bottom: 49rpx;
						width: auto;
						height: 28rpx;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #575757;
						line-height: 36rpx;
					}
					.attribute{
						width: auto;
						height: 30rpx;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #575757;
						line-height: 36rpx;
						margin-right: 98rpx;
					}
			}
		    .cut-off2{
		    	display: flex;
		    	align-items: center;
		    	margin-top: 10rpx;
		    	margin-left: 101rpx;
		    	margin-right: 101rpx;
		    	margin-bottom: 43rpx;
		    	width: 500rpx;
		    	height: 0rpx;
		    	border: 1rpx solid #6DAEFE;
		    }
		    .add-on{
				display: flex;
				justify-content: flex-end;
				width: 580rpx;
				margin-bottom: 34rpx;
				.major-total{
					width: 197rpx;
					height: 34rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #ff0000;
					line-height: 36rpx;
					margin-left: 407rpx;
					
				}
			}
		    .button-container1{
				display: flex;
				align-items: center;
				width: 580rpx;
				height: 90rpx;
				background: #0048FF;
				border-radius: 45rpx;
				margin-left: 64rpx;
				margin-bottom: 35rpx;
				.button-pay{
					width: 71rpx;
					height: 34rpx;
					font-size: 35rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 36rpx;
					margin-top: 28rpx;
					margin-bottom: 28rpx;
					margin-left: 255rpx;
					margin-right: 254rpx;
				}
			}
		    .button-container2{
				display: flex;
				align-items: center;
				margin-left: 319rpx;
				margin-bottom: 49rpx;
				.button-cancel{
					width: 70rpx;
					height: 34rpx;
					font-size: 35rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #575757;
					line-height: 36rpx;
				}
			}
		}
	}
</style>
