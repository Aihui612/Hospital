/**
 * @description  axios 请求封装；
 * 
*/
// 请求头
var header = 'application/x-www-form-urlencoded'
var headerPost = 'application/json'
import config from './config.js'
// 对外接口
export function request({
	method,
	url,
	params,
	loading
}) {
	// #ifndef H5
	 var url1 = config.loadUrl+ url
	console.log('url1',config.loadUrl,'  ',url);
	// #endif
	// #ifdef H5
	var url1 = url
	var url1 = config.loadUrl+url
	// #endif
	if (!loading) {
		uni.showLoading({
			title: '加载中...',
			icon: 'loading',
			mask: true
		});
	}
	if (method == 'Get') {
		return get(url1, params)
	} else if (method == 'Post') {
		return post(url1, params)
	} else if (method == 'Postquery') {
		return postquery(url1, params)
	}
}

// 封装get方法
function get(url, params) {
	var Authorization = uni.getStorageSync('Authorization');
	return new Promise((resolve, reject) => {
		uni.request({
			url: url, //仅为示例，并非真实接口地址。
			method: "GET",
			data: params,
			dataType: 'json',
			header: {
				'content-type': header,
				'Authorization': Authorization
			},
			success: (res) => {
				uni.hideLoading();
				if(res.data.code==200){
					resolve(res.data);
				}else{
					erry(res)
					reject(res.data)
				}
				
			},
			fail: (err) => {
				uni.hideLoading();
				if (err) {
					uni.showToast({
						title: err.data,
						icon: "none",
						duration: 2000
					});
					reject(err.data)
				} else {
					uni.showToast({
						title: '请检查网络后重试',
						duration: 2000,
						icon: 'none',
					});
					reject(new Error('请检查网络后重试'))
				}
			}
		});
	})
}

// 封装post方法
function post(url, params) {
	var Authorization = uni.getStorageSync('Authorization');
	var utoken = ''
	if(params&&params.utoken){
		utoken=params.utoken
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: url, //仅为示例，并非真实接口地址。
			method: "POST",
			data: params,
			header: {
				'utoken': utoken,				
				'content-type': headerPost,
				'Authorization': Authorization
			},
			success: (res) => {
				uni.hideLoading();
				console.log(res.data.code)
				if(res.data.code==200){
					resolve(res.data);
				}else{
					erry(res)
					reject(res.data)
				}
			},
			fail: (err) => {
				uni.hideLoading();
				if (err) {
					uni.showToast({
						title: err.data,
						icon: "none",
						duration: 2000
					});
					reject(err.data)
				} else {
					uni.showToast({
						title: '请检查网络后重试',
						duration: 2000,
						icon: "loading",
					});
					reject(new Error('请检查网络后重试'))
				}
			}
		});
	})
}

function postquery(url, params) {
	var Authorization = uni.getStorageSync('Authorization');
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,//仅为示例，并非真实接口地址。
			method: "POST",
			data: params,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'Authorization': Authorization
			},
			success: (res) => {
				uni.hideLoading();
				if(res.data.code==200){
					resolve(res.data);
				}else{
					erry(res)
					reject(res.data)
				}
			},
			fail: (err) => {
				uni.hideLoading();
				if (err) {
					uni.showToast({
						title: err.data,
						icon: "none",
						duration: 2000
					});
					reject(err.data)
				} else {
					uni.showToast({
						title: '请检查网络后重试',
						icon: "none",
					});
					reject(new Error('请检查网络后重试'))
				}
			}
		});
	})
}
function erry(e){
	uni.showToast({
		title: e.data.msg,
		icon: "none",

	}); 
	
	var Authorization = uni.getStorageSync('Authorization');
	if(e.data!=''&&e.data.msg!=''||Authorization==''){
	
	if(e.data.msg.indexOf('请先登录后才能操作')!=-1){
		uni.removeStorageSync('Authorization');
		uni.redirectTo({
		    url: '/pages/index/index'
		});
	} } 
}
