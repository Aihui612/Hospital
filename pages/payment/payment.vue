<template>
	<view class="content">
		<view class="back-grounp" :style="{backgroundImage: 'url('+imageURL+')'}">
			<view class="circle-state">
				<view class="pay-state" v-if="payInfo.status==1">已申请</view>
				<view class="slow-color" v-else>待付款</view>
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
				<view class="attribute">{{payInfo.Freight}}元</view>
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
	import config from '../../serves/config.js';
	export default {
	
		data() {
			return {
				imageURL: "/static/image_list.png",
				id:null,
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
		onLoad(option) {
			this.id=option.id;
		},
		mounted(){
		 this.getHospitalPayInfo();
		},
		methods: {
			/**
			 * @description  获取医院详情
			 * */
			getHospitalPayInfo(){
				// 挂载时执行调用接口请求  /暂时写死
				let _this=this;
				let id=_this.id;
				let parmas={
					id
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
			 * @description  调用支付；
			 * 
			 * https://uniapp.dcloud.io/api/plugins/payment?id=requestpayment
			 * 
			 * uni.requestPayment(OBJECT)
			 * 	appId: "wxf8ebea952e73aaa8"
				nonceStr: "GN7mN2TNyOWmLF2hb1QDrjO98j4NxPUc"
				package: "prepay_id=wx05233307840272c4d90310ac37cee60000"
				paySign: "30562640A6E22C2F6C1F763AD66505CA7574FDAB75D7A3213ADE54D209B4D828"
				signType: "MD5"
				timeStamp: "1609860787"
			 * */
			payClick(){
				let id=this.id
				let params={
					  "applyId": id,
					  "payChannel": "WX",
					  "tradeType": "JSAPI"
					}
				indexApi.postPayInfo(params)
				.then(res=>{
					console.log(res);
					if(res&&res.code==200){
						console.log(res);
						let payinfo=res.data.data;
						
						// 调用支付
						uni.requestPayment({
						    provider: 'wxpay',
						    timeStamp: String(Date.now()),
						    nonceStr: payinfo.nonceStr,
						    package: payinfo.package,
						    signType: payinfo.signType,
						    paySign: payinfo.paySign,
						    success: function (res) {
						        console.log('success:' + JSON.stringify(res));
								// b9DOmpy8Qnbr9ZK089HPYypC4wmsyxOlg-fUDB8O6tM  7qzSgRjyAk2jmANUNTbrT3MHbu-9scy8Q0ELMterktE
								 wx.requestSubscribeMessage({
								   tmplIds: ['b9DOmpy8Qnbr9ZK089HPYypC4wmsyxOlg-fUDB8O6tM','7qzSgRjyAk2jmANUNTbrT3MHbu-9scy8Q0ELMterktE'],
								   success(res) {
										console.log(res);
										let errMsg=res.errMsg;
										console.log(errMsg);
										console.log(errMsg == 'requestSubscribeMessage:ok');
																		  
								     if (errMsg == 'requestSubscribeMessage:ok') {
								       //用户同意了订阅，允许订阅消息
										wx.showToast({
										  title: '订阅成功'
										})
												
								     } else {
								       //用户拒绝了订阅，禁用订阅消息
								       wx.showToast({
								         title: '订阅失败'
								       })
								     }
								   },
								   fail(err) {
								     console.error(err)
								   }
								 })
						    },
						    fail: function (err) {
						        console.log('fail:' + JSON.stringify(err));
								
						    }
						});
					
						
					}
				})
				.catch(err=>{
					console.error(err);
				})
				
				
				// uni.navigateTo({
				// 	url: '../index/index'
				// });
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
					width: auto;
					height: 34rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #FF7C42;
					//line-height: 36rpx;
					margin-top: 28rpx;
					margin-left: 234rpx;
					// margin-right: 296rpx;
					margin-bottom: 28rpx;
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
