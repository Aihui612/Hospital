<script>
import indexApi from './serves/request.js';
export default {
	onLaunch: function() {
		// let _this = this;
		// console.log('App Launch');
		// // #ifdef MP-WEIXIN
		// if (!uni.getStorageSync('Authorization')) {
		// 	// uni.login 获取code
		// 	uni.login({
		// 		provider: 'weixin',
		// 		success: function(loginRes) {
		// 			console.log(loginRes);
		// 			_this.getcode(loginRes.code);
		// 		}
		// 	});
		// }
		// // #endif
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		getcode(e) {
			let params={
				code:e
			}
			console.log(indexApi);
			indexApi.accountLogin(params)
			.then(res=>{
				if(res&&res.code==200){
					let token=res.token;
					uni.setStorageSync('Authorization',token)
					
					uni.navigateTo({  
							 url: '/pages/index/index',
						});
				}else{
					console.log(res);
				}
				
			})
			.catch(err=>{
				console.error(err);
			})
			
		}
	}
};
</script>

<style lang="less">
/*每个页面公共css */

</style>
