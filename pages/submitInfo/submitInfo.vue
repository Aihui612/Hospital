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
					<input class="item-input" name="name" placeholder="请输入姓名"  v-model="sumbitInfo.name"/>
				</view>
				<view class="item">
					<view class="name-picture">
						<view class="name-text">性别</view>
						<image src="../../static/icon_tip.png" class="icon-tip"></image>
					</view>
					<view class="sdsd">
						<view class="item-input2">
							<view class="uni-list-cell-db">
							    <picker  mode="selector"  @change="bindPickerChange"  style='padding-left: 25rpx;' :value="sumbitInfo.sex" :range="array">
							    <view class="uni-input">{{array[index]}}</view>
							    </picker>
								<uni-icons type="arrowright"></uni-icons>
							</view>
						
						</view>
					</view>
				</view>
				<view  class="item">
					<view class="name-picture">
						<view class="name-text">身份证号</view>
						<image src="../../static/icon_tip.png" class="icon-tip"></image>
					</view>
					<input class="item-input" name="cardNo" maxlength="18" @blur="checkCardNo(sumbitInfo.cardNo)" placeholder="请输入身份证号" v-model="sumbitInfo.cardNo"/>
				</view>
				<view class="item">
					<view class="name-picture">
						<view class="name-text">出院证号</view>
						<image src="../../static/icon_tip.png" class="icon-tip"></image>
					</view>
					<input class="item-input" name="hospitalCardNo" placeholder="请输入出院证号"  v-model="sumbitInfo.hospitalCardNo"/>
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
						<input class="item-input" name="receiveName" placeholder="请输入收件人姓名" maxlength="50" v-model="sumbitInfo.receiveName" />
					</view>
					<view class="item">
						<view class="name-picture">
							<view class="name-text">收件人联系电话</view>
							<image src="../../static/icon_tip.png" class="icon-tip"></image>
						</view>
						<input class="item-input" name="receiveMobile" placeholder="请输入收件人联系电话"  maxlength="11" @blur="checkMobilephone(sumbitInfo.receiveMobile)" v-model="sumbitInfo.receiveMobile"/>
					</view>
					<view  class="item">
						<view class="name-picture">
							<view class="name-text">邮寄的地区</view>
							<image src="../../static/icon_tip.png" class="icon-tip"></image>
						</view>
						<view class="sdds">
							<view class="item-input3">
								<view class="XuanZeQi">
									<view @tap="togglePopup('bottom','popup')" style="display: flex;align-items: center;">
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
								
							</view>
						</view>
					</view>
					<view class="item">
						<view class="name-picture">
							<view class="name-text">详细地址</view>
							<image src="../../static/icon_tip.png" class="icon-tip"></image>
						</view>
						<input class="item-input1" name="addressDetails" placeholder="请输入详细地址" maxlength="50" v-model="sumbitInfo.addressDetails"/>
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
		            array: ['女', '男'],
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
				
				/**
				 * 
				 * @description  校验手机号码
				 * **/
				 checkMobilephone(phone){
					 let reg=/^1[0-9]{10}$/;
					 console.log(reg.test(phone),phone);
					 if(reg.test(phone)){
						 return true;
					 }else{
						 uni.showToast({
						 	title:'请输入正确的手机号码',
						 	icon: "none",
						 	duration: 2000
						 });
						 
						 return false;
					 }
				 },
				
				 	/**
				 	 * @description:大陆18位身份证校验规则；
				 	 * @params:[idcode]:身份证号码
				 	 *
				 	 *
				 	*/
				 			
				 checkCardNo (idcode){
				 		    // 加权因子
				 		    var weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
				 		    // 校验码
				 		    var check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2'];
				 		
				 		    var code = idcode + "";
				 		    var last = idcode[17];//最后一位
				 		
				 		    var seventeen = code.substring(0,17);
				 		
				 		    // ISO 7064:1983.MOD 11-2
				 		    // 判断最后一位校验码是否正确
				 		    var arr = seventeen.split("");
				 		    var len = arr.length;
				 		    var num = 0;
				 		    for(var i = 0; i < len; i++){
				 		        num = num + arr[i] * weight_factor[i];
				 		    }
				 		    
				 		    // 获取余数
				 		    var resisue = num%11;
				 		    var last_no = check_code[resisue];
				 		
				 		    // 格式的正则
				 		    // 正则思路
				 		    /*
				 		    第一位不可能是0
				 		    第二位到第六位可以是0-9
				 		    第七位到第十位是年份，所以七八位为19或者20
				 		    十一位和十二位是月份，这两位是01-12之间的数值
				 		    十三位和十四位是日期，是从01-31之间的数值
				 		    十五，十六，十七都是数字0-9
				 		    十八位可能是数字0-9，也可能是X
				 		    */
				 		    var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
				 		
				 		    // 判断格式是否正确
				 		    var format = idcard_patter.test(idcode);
				 		
				 		    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
				 		   // return last === last_no && format ? true : false;
				 			if(last === last_no && format){
				 				
				 				return true;
				 			}else{
				 				
								uni.showToast({
									title:'请输入正确的身份证号码',
									icon: "none",
									duration: 2000
								});
								return false;
				 			}
				 		},
				/**
				 * @description  必填信息校验是否为空；
				 * */
				hasEmpty(obj){
					console.log(obj);
					let result =Object.keys(obj).some(key=>{
						console.log(obj[key],obj[key]==''|| obj[key]== undefined);
						return obj[key]==null || obj[key]== undefined
					})	
					return result?result:false;
				},
				/**
				 * @description  点击表单提交
				 * */
				submitClick(){
					let sumbitInfo=this.sumbitInfo;
					sumbitInfo.hospitalId=this.hospitalId
					// 必填项校验是否完善
					let checkResult=this.hasEmpty(sumbitInfo);
					console.log(checkResult);
					if(checkResult){ // 必填项存在为空
						uni.showToast({
							title:'请完善必填信息',
							icon: "none",
							duration: 2000
						});
						return false;
					}
					//提交时校验身份证
					let checkNo=this.checkCardNo(sumbitInfo.cardNo)
					if(!checkNo){
						uni.showToast({
							title:'请输入正确的身份证号',
							icon: "none",
							duration: 2000
						});
						return false;
					}
					
					//提交时校验手机号
					let checkPhone=this.checkMobilephone(sumbitInfo.receiveMobile)
					if(!checkPhone){
						uni.showToast({
							title:'请输入正确的手机号',
							icon: "none",
							duration: 2000
						});
						return false;
					}
					
					let params=sumbitInfo;
					indexApi.postApplySubInfo(params)
					.then(res=>{
						if(res&&res.code==200){
							uni.showToast({
								title: res.msg,
								icon: "none",
								duration: 2000
							});
							// 提交成功以后返回到医院列表页
							uni.navigateBack()
						}
					})
					.catch(err=>{
						console.error(err);
					})
				},
				cancelClick(){
					uni.navigateBack()
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
		height: auto;
		overflow: auto;
		.inpatient-info{
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			width: 702rpx;
			height: 800rpx;
			background: #FFFFFF;
			margin-bottom: 22rpx;
			padding: 0rpx 24rpx;
			
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
							text-indent: 4rpx;

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
						text-indent: 25rpx;

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
			width: 702rpx;
			height: 800rpx;
			background: #FFFFFF;
			margin-bottom: 28rpx;
			margin-top: 22rpx;
			padding: 0rpx 24rpx;
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
								text-indent: 25rpx;
	
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
							text-indent: 25rpx;
						}
						.item-input{
							width: 654rpx;
							height: 76rpx;
							background: #FFFFFF;
							border: 1rpx solid #EBEBEB;
							border-radius: 10rpx;
							margin-top: 18rpx;
							margin-bottom: 40rpx;
							text-indent: 25rpx;
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
