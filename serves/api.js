import {request} from './request.js'

// swagger 地址  http://syc320.320.io/swagger-ui.html 

const indexApi = {
	// 登陆接口

	/**
	 * 
	 * @description api/wu/account/login/code 小程序授权登录
	*/
	accountLogin(params){
		return request({
		  method: 'Postquery', 
		  url: '/api/wu/account/login/code',
		  params: params
		})
	},
    
     /**
     * 
     * @description /api/wu/hospital/list查询医院信息列表
    */
    
	getHospitalList(params){
		return request({
		  method: 'Get', 
		  url: '/api/wu/hospital/list',
		  params:params
		})
    },
	
	/**
	 * 
	 * @description  /api/wu/apply/getlist 获取打印申请列表
	 * */
	 getApplylist(params){
	 	return request({
	 	  method: 'Get', 
	 	  url: '/api/wu/apply/getlist',
	 	  params:params
	 	})
	 },
	 
    /**
     * 
     * @description '/api/wu/apply/applySub', 打印申请提交
    */
	postApplySubInfo(params){
		return request({
		  method: 'Post', 
		  url: '/api/wu/apply/applySub',
		  params: params
		})
	},
	
    /**
     * 
     * @description api/wu/hospital/{id} 查询具体某个医院详情
    */
    
	getHospitalDetail(params) {
		return request({
			method: 'Get',
			url: '/api/wu/hospital/',
			params: params
		})
	},
	
	/**
	 * 
	 * @description /api/wu/apply/{id} 获取打印申请详细信息
	*/
	getHospitalPay(params){
		return request({
			method:'Get',
			url:`/api/wu/apply/${params.id}`,
			
		})
	},
}


export default indexApi