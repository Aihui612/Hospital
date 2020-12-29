<template>
	<view class="content">
		<view  class="img-container">
			<image class="logo" src="/static/banner.png"></image>
		</view>
		<view class="list-container">
				<template v-for="item in hospitalList" >
					<view class="item" @click="handleClick(item.id)" :key="item.id">
						<view class="item-left">
						<image :src="item.logoImg" class="icon"/>
						    <view class="hospital-name">{{item.name}}</view>
						</view>
						<image src="../../static/nav_ico_open.png" class="nav"></image>
					</view>
				</template>

	  </view>
		
	</view>
</template>

<script>	
import indexApi from '../../serves/api.js';	
import config from '../../serves/config.js';

    export default {
		data() {
			return {
				title: 'Hello',
				code:'',
				winUrl:'',
				hospitalList:[]
			}
		},
		onLoad() {
			// 判断如果本地token 存在，则直接获取源列表； 
			if(uni.getStorageSync('Authorization')){
				
				this.handleGetHospitalList()
			}else{
				//否则进行登录，暂时code写死，
				
				this.handleAccountLogin()
			}
		},
		mounted(){
	  if(!window.localStorage.getItem('openId')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
	                // this.getCode() 
	        } else {
	            // 别的业务逻辑
			}
		},
		methods: {
			/**
			 * @description  账号登录
			 * */
			 handleAccountLogin(){
				let params={code:'001vrqFa1ChYeA0HYbHa1Ul9V53vrqFO'}
				indexApi.accountLogin(params)
				.then(res=>{
					console.log(res);
					if(res&&res.code==200){
						let token=res.token;
						uni.setStorageSync('Authorization',token)
						this.handleGetHospitalList()
					}
				})
				.catch(err=>{
					console.error(err);
				})
				 
			 },
			 
			 /**
			  * 
			  * @description  获取医院列表
			  * */
			  handleGetHospitalList(){
				  // 挂载时执行调用接口请求
				  indexApi.getHospitalList()
				  .then(res=>{
				  	console.log(res);
					if(res&&res.code==200){
						let hospitalList=res.data;
						for(let item of hospitalList){
							item.logoImg = config.loadUrl+item.logoImg
						}
						this.hospitalList=hospitalList;
					}
				  })
				  .catch(err=>{
				  	console.error(err);
				  })
			  },
			
			
			// https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
			getCode () { // 非静默授权，第一次有弹框
			                // this.code = ''
			               // var local = window.location.href // 获取页面url
						    var local ='http://linshi2.shunlukeji.com'
			                var appid = 'wxa7c54270e26812ff' 
			                this.code = this.getUrlCode().code // 截取code
							console.log('asdasdfadfas',this.code);
			                if (this.code == null || this.code === '') { // 如果没有code，则去请求
			                    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
								console.log(this.code);
							} else {
			                    // 你自己的业务逻辑
			                }
			            },
			getUrlCode() { // 截取url中的code方法
			                var url = location.search
			                this.winUrl = url
			                var theRequest = new Object()
			                if (url.indexOf("?") != -1) {
			                    var str = url.substr(1)
			                    var strs = str.split("&")
			                    for(var i = 0; i < strs.length; i ++) {
			                        theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
			                    }
			                }
			                return theRequest
			            },
			handleClick(id){
				console.log(id);
				uni.navigateTo({
					url: `../submitInfo/submitInfo?id=${id}`
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
			margin: 0rpx auto;
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
