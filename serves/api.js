import {request} from './request.js'

// swagger 地址  http://syc320.320.io/swagger-ui.html 

const indexApi = {
	// 登陆接口

	// 驾驶员端修改手机号
	changMobile(params){
		return request({
		  method: 'Post', 
		  url: '/api/driver/changMobile',
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
     * @description api/wu/hospital/{id} 查询具体某个医院详情
    */
    
	getHospitalDetail(params) {
		return request({
			method: 'Get',
			url: '/api/wu/hospital/',
			params: params
		})
	},
}


export default indexApi