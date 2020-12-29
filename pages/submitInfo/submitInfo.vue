<template>
	<view class="content">
		<view class="inpatient-info">
			<view class="be-hospital">
				<image src="../../static/icon_titicon.png" class="icon-titicon">
					<view class="infoMation-peo">住院患者信息</view>
				</image>
			</view>
			<view class="list-item">
				<view class="item">
					<view class="name-picture">
						<view class="name-text">姓名</view>
						<image src="../../static/icon_tip.png" class="icon-tip"></image>
					</view>
					<input class="item-input" name="input" placeholder="请输入姓名"  v-model="sumbitInfo.name"/>
				</view>
				<view class="item">
					<view class="name-picture">
						<view class="name-text">性别</view>
						<image src="../../static/icon_tip.png" class="icon-tip"></image>
					</view>
					<view class="sdsd">
						<text class="item-input2">
							<view class="uni-list-cell-db">
							    <picker @change="bindPickerChange" :value="sumbitInfo.sex" :range="array">
							    <view class="uni-input">{{array[index]}}</view>
							    </picker>
							</view>
						</text>
					</view>
				</view>
				<view  class="item">
					<view class="name-picture">
						<view class="name-text">身份证号</view>
						<image src="../../static/icon_tip.png" class="icon-tip"></image>
					</view>
					<input class="item-input" name="input" placeholder="请输入身份证号" v-model="sumbitInfo.cardNo"/>
				</view>
				<view class="item">
					<view class="name-picture">
						<view class="name-text">出院证号</view>
						<image src="../../static/icon_tip.png" class="icon-tip"></image>
					</view>
					<input class="item-input" name="input" placeholder="请输入出院证号"  v-model="sumbitInfo.hospitalCardNo"/>
				</view>
			</view>
		</view>
		<view class="consignee-info">
			<view class="Em-hospital">
					<image src="../../static/icon_titicon.png" class="icon-titicon">
						<view class="infoMation-peo">收件人信息</view>
					</image>
			
			</view>
			<view class="list-item">
				<view class="item">
					<view class="name-picture">
							<view class="name-text">收件人姓名</view>
							<image src="../../static/icon_tip.png" class="icon-tip"></image>
						</view>
						<input class="item-input" name="input" placeholder="请输入收件人姓名" v-model="sumbitInfo.receiveName" />
					</view>
					<view class="item">
						<view class="name-picture">
							<view class="name-text">收件人联系电话</view>
							<image src="../../static/icon_tip.png" class="icon-tip"></image>
						</view>
						<input class="item-input" name="input" placeholder="请输入收件人联系电话" v-model="sumbitInfo.receiveMobile"/>
					</view>
					<view  class="item">
						<view class="name-picture">
							<view class="name-text">邮寄的地区</view>
							<image src="../../static/icon_tip.png" class="icon-tip"></image>
						</view>
						<view class="sdds">
							<text class="item-input3">
								<view class="XuanZeQi">
									<view @tap="togglePopup('bottom','popup')" style="padding: 40upx;display: flex;align-items: center;">
												<view v-for="(item, index) in selectList" :key="index">
													{{item.txt}}<span v-show="index == 0 || index == 1">—</span>
												</view>
											</view>
											<uni-popup ref="popup" :type="type" @change="change">
												<view class="select-border">
													<view class="header">
														<view class="title">
															选择地区
														</view>
														<view class="cancel-icon" @tap="cancel('popup')">
															X
														</view>
													</view>
													<view class="select-box">
														<view class="select-item">
															<view class="select-list" @tap="tabEvent(index)" :class="indexTab == index ? 'selected' : ''" v-for="(item, index) in selectList"
															 :key="index">
																{{item.txt}}
															</view>
														</view>
														<view class="select-item-box">
															<!-- 省 -->
															<view class="province-box" v-show="proviceShow">
																<view class="select-list-cont" @tap="provinceEvent(item,index)" v-for="(item,index) in provinceData" :key="item.code">
																	{{item.name}}<span class="check" v-show="index == checkOne">√</span>
																</view>
															</view>
															<!-- 市 -->
															<view class="city-box" v-show="cityShow">
																<view class="select-list-cont" @tap="cityEvent(item,index)" v-for="(item,index) in cityData" :key="item.code">
																	{{item.name}}<span class="check" v-show="index==checkTwo">√</span>
																</view>
															</view>
															<!-- 区 -->
															<view class="area-box" v-show="areaShow">
																<view class="select-list-cont" @tap="areaEvent(item,index)" v-for="(item,index) in areaData" :key="item.code">
																	{{item.name}}<span class="check" v-show="index==checkThree">√</span>
																</view>
															</view>
														</view>
													</view>
												</view>
											</uni-popup>
								</view>
								
							</text>
						</view>
					</view>
					<view class="item">
						<view class="name-picture">
							<view class="name-text">详细地址</view>
							<image src="../../static/icon_tip.png" class="icon-tip"></image>
						</view>
						<input class="item-input1" name="input" placeholder="请输入详细地址" v-model="sumbitInfo.addressDetails"/>
					</view>
					</view>
		</view>
		<view class="button-container">
			<button type="default" class="button-cancel" @click="cancelClick">取消</button>
			<button type="default" class="button-submit" @click="submitClick()">提交</button>
		</view>
	</view>
</template>

<script>
	import cityDatas from '../../components/mpvue-citypicker/city-data/city.area.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import indexApi from '../../serves/api.js';	
	export default {
		components: {
					uniPopup
				},
		data() {
			
		        const currentDate = this.getDate({
		            format: true
		        })
		        return {
		            title: 'picker',
		            array: ['男', '女'],
		            index: 0,
					provinceData: cityDatas,
					cityData: [],
					areaData: [],
					selectList: [{
						txt: '请选择'
					}, {
						txt: '请选择'
					}, {
						txt: '请选择'
					}],
					tabOne: '请选择',
					indexTab: 0,
					proviceShow: true,
					areaShow: false,
					cityShow: false,
					show: false,
					type: '',
					checkOne: null,
					checkTwo: null,
					checkThree: null,
					hospitalId: null,
					sumbitInfo:{
						  "addressDetails": "",
						  "cardNo": "",
						  "city": "",
						  "county": "",
						  "hospitalCardNo": "",
						  "hospitalId": 0,
						  "name": "",
						  "province": "",
						  "receiveMobile": "",
						  "receiveName": "",
						  "sex": 0
						}
		        }
		    },
			onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			        console.log(option.id); //打印出上个页面传递的参数。
			        this.hospitalId=option.id;
					console.log(this.hospitalId);
			    },
			watch: {
			 
					},
			methods: {
				submitClick(){
					let sumbitInfo=this.sumbitInfo;
					sumbitInfo.hospitalId=this.hospitalId
					
					let params=sumbitInfo;
						console.log(params);
					indexApi.postApplySubInfo(params)
					.then(res=>{
						if(res&&res.code==200){
							console.log(res);
							uni.showToast({
								title: res.msg,
								icon: "none",
								duration: 2000
							});
						}
					})
					.catch(err=>{
						console.error(err);
					})
					
					uni.navigateTo({
					    url: '../payment/payment'
					})
				},
				cancelClick(){
					uni.navigateTo({
					    url: '../index/index'
					})
				},
				
			    bindPickerChange: function(e) {
			        console.log('picker发送选择改变，携带值为', e.target.value)
			        this.index = e.target.value
			    },
				getDate(type) {
				   const date = new Date();
				       },
				togglePopup(type, open) {
								this.type = type
								if (open === 'tip') {
									this.show = true
								} else {
									this.$refs[open].open()
								}
							},
							cancel(type) {
								if (type === 'tip') {
									this.show = false
									return
								}
								this.$refs[type].close()
							},
							change(e) {
								if (e.show == true) {
									uni.hideTabBar()
								} else {
									uni.showTabBar()
								}
							},
							tabEvent(index) {
								this.indexTab = index
								if (this.indexTab == 0) {
									this.proviceShow = true
									this.cityShow = false
									this.areaShow = false
									// this.checkOne = null
									this.checkTwo = null
									this.checkThree = null
									// this.cityData = []
									this.areaData = []
									// this.selectList[0].txt = "请选择"
									this.selectList[1].txt = "请选择"
									this.selectList[2].txt = "请选择"
								} else if (this.indexTab == 1) {
									this.proviceShow = false
									this.cityShow = true
									this.areaShow = false
									// this.checkTwo = null
									this.checkThree = null
									// this.areaData = []
									// this.selectList[1].txt = "请选择"
									this.selectList[2].txt = "请选择"
								} else if (this.indexTab == 2) {
									this.proviceShow = false
									this.cityShow = false
									this.areaShow = true
								}
							},
							provinceEvent(data, index) {
								this.checkOne = index
								this.selectList[0].txt = data.name
								this.indexTab = 1
								this.proviceShow = false
								this.cityShow = true
								this.areaShow = false
								this.cityData = data.cityList
								this.sumbitInfo.province = data.name
							},
							cityEvent(data, index) {
								this.checkTwo = index
								this.selectList[1].txt = data.name
								this.indexTab = 2
								this.proviceShow = false
								this.cityShow = false
								this.areaShow = true
								this.areaData = data.areaList
								this.sumbitInfo.city = data.name
							},
							areaEvent(data, index) {
								this.checkThree = index
								this.selectList[2].txt = data.name
								this.sumbitInfo.county = data.name
			}
		}
	}
</script>

<style lang="less">
	.content{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding-left: 48rpx;
		height: auto;
		overflow: auto;
		.inpatient-info{
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			width: 750rpx;
			height: 800rpx;
			background: #FFFFFF;
			margin-bottom: 22rpx;
			
			.be-hospital{
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				
				.icon-titicon{
					width: 4rpx;
					height: 34rpx;
				}
				.infoMation-peo{
					width: 211rpx;
					height: 33rpx;
					font-size: 34rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #575757;
					line-height: 36rpx;
					margin-top: 58rpx;
					margin-left: 24rpx;
					margin-bottom: 55rpx;
					margin-right: 464rpx;

				}
		}
				
		    .list-item{
		     	display: flex;
		     	flex-direction: column;
		     	justify-content: flex-start;
		     	align-items: center;
				width: 750rpx;
				height: 800rpx;
		     	.item{
		     		display: flex;
		     		flex-direction: column;
		     		justify-content: flex-start;
		     		align-items: flex-start;
					width: 654rpx;
					margin-right: 48rpx;
		     		.name-picture{
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: center;
						
						.name-text{
							width: auto;
							height: 28rpx;
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #575757;
							line-height: 36rpx;
							margin-bottom: 18rpx;
						}
						.icon-tip{
							width: 15rpx;
							height: 15rpx;
							margin-left: 19rpx;
							margin-top: 7rpx;
							margin-bottom: 6rpx;
						}
					
						
					}
					.sdsd{
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: flex-start;
						margin-top: 18rpx;
						margin-bottom: 40rpx;
						.item-input2{
							width: 654rpx;
							height: 76rpx;
							background: #FFFFFF;
							border: 1rpx solid #EBEBEB;
							border-radius: 10rpx;

							.uni-list-cell-db{
										margin-bottom: 69rpx;
										margin-top: 18rpx;
										width: 654rpx;
										height: 76rpx;
									}
						}
					}
					
					.item-input{
						width: 654rpx;
						height: 76rpx;
						background: #FFFFFF;
						border: 1rpx solid #EBEBEB;
						border-radius: 10rpx;
						margin-top: 18rpx;
						margin-bottom: 40rpx;

					}	
		     		.icon-tip{
		     				width: 15rpx;
		     				height: 15rpx;
		     				margin-left: 19rpx;
		     				margin-top: 7rpx;
		     				margin-bottom: 6rpx;
		     				}
		     		}
		     	
		     	
		     }
			}	
		.consignee-info{
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			width: 750rpx;
			height: 800rpx;
			background: #FFFFFF;
			margin-bottom: 28rpx;
			margin-top: 22rpx;
			.Em-hospital{
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: center;
						
					.icon-titicon{
						width: 4rpx;
						height: 34rpx;
					}
					.infoMation-peo{
						width: 211rpx;
						height: 33rpx;
						font-size: 34rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #575757;
						line-height: 36rpx;
						margin-top: 58rpx;
						margin-left: 24rpx;
						margin-bottom: 55rpx;
						margin-right: 464rpx;
					}
			}
			.list-item{
			     	display: flex;
			     	flex-direction: column;
			     	justify-content: flex-start;
			     	align-items: center;
					width: 750rpx;
					height: 800rpx;
			     	.item{
			     		display: flex;
			     		flex-direction: column;
			     		justify-content: flex-start;
			     		align-items: flex-start;
						width: 654rpx;
						margin-right: 48rpx;
			     		.name-picture{
			     			display: flex;
			     			flex-direction: row;
			     			justify-content: flex-start;
			     			align-items: center;
			     			.name-text{
			     				width: auto;
			     				height: 28rpx;
			     				font-size: 30rpx;
			     				font-family: PingFang SC;
			     				font-weight: 400;
			     				color: #575757;
			     				line-height: 36rpx;
			     				margin-bottom: 18rpx;
			     			}
			     			.icon-tip{
			     				width: 15rpx;
			     				height: 15rpx;
			     				margin-left: 20rpx;
			     				margin-top: 7rpx;
			     				margin-bottom: 6rpx;
			     			}
			     		}
						.sdds{
							display: flex;
							flex-direction: row;
							justify-content: flex-start;
							align-items: flex-start;
							margin-top: 18rpx;
							margin-bottom: 40rpx;
							.item-input3{
								width: 654rpx;
								height: 76rpx;
								background: #FFFFFF;
								border: 1rpx solid #EBEBEB;
								border-radius: 10rpx;
	
								.XuanZeQi{
									display: flex;
									justify-content: space-between;
									align-items: center;
									width: 654rpx;
									height: 76rpx;
									.header {
											display: flex;
											align-items: center;
											justify-content: space-between;
											padding: 35rpx;
										.title {
											font-size: 34rpx;
											font-family: PingFang SC;
											font-weight: bold;
											color: rgba(51, 51, 51, 1);
										  }
										.cancel-icon {
											font-size: 34rpx;
											color: rgba(153, 153, 153, 1);
										}
									 }
										.check {
											padding-left: 17rpx;
											color: #FF7E28;
										}
									 
										.select-box {
											height: 1024rpx;
										}
									 
										.select-item {
											display: flex;
											align-items: center;
											padding-left: 50rpx;
											margin-bottom: 20rpx;
											border-bottom: 1rpx solid #F6F6F6;
										}
									 
										.select-list {
											width: 120rpx;
											height: 40rpx;
											text-align: center;
											overflow: hidden;
											/*超出部分隐藏*/
											text-overflow: ellipsis;
											/* 超出部分显示省略号 */
											white-space: nowrap;
											/*规定段落中的文本不进行换行 */
											font-size: 30rpx;
											font-family: PingFang SC;
											font-weight: bold;
											color: rgba(51, 51, 51, 1);
											margin-right: 30rpx;
											border-bottom: 1rpx solid #FFFFFF;
										}
									 
										.select-list-cont {
											padding-left: 67rpx;
											font-size: 30rpx;
											font-family: PingFang SC;
											font-weight: 500;
											color: rgba(51, 51, 51, 1);
											line-height: 40rpx;
										}
									 
										.selected {
											border-bottom: 1rpx solid #F0AD4E;
											color: rgba(255, 133, 0, 1);
									}
								}
							}
						}
						.item-input1{
							width: 654rpx;
							height: 100rpx;
							background: #FFFFFF;
							border: 1rpx solid #EBEBEB;
							border-radius: 10rpx;
						}
						.item-input{
							width: 654rpx;
							height: 76rpx;
							background: #FFFFFF;
							border: 1rpx solid #EBEBEB;
							border-radius: 10rpx;
							margin-top: 18rpx;
							margin-bottom: 40rpx;
					      }			
			        }			     	
			    }
		    }
		.button-container{
			width: 750rpx;
			height: 148rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-right: 48rpx;
			.button-cancel{
				width: 316rpx;
				height: 90rpx;
				background: #6DAEFE;
				border-radius: 45rpx;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
		}
		    .button-submit{
				width: 316rpx;
				height: 90rpx;
				background: #0048FF;
				border: 1rpx solid #EBEBEB;
				border-radius: 45rpx;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
		}
	}
}
</style>
