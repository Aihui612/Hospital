<template>
	<view class="content">
		<view class="list-container">
			<template v-for="item in applyList">
				<view class="list-item" :key='item.id' @click="handleClickItem(item.id)">
					<view v-if="item.status==1" class="applyed"><text class="text">已申请</text></view>
					<view v-else class="unpayed"><text class="text">待付款</text></view>
					
					<view class="hospital-info">
						<view class="hospital-block">{{item.hospitalName}}</view>
						<!-- <view class="hospital-name"></view> -->
					</view>
					<view class="apply-time">{{item.createTime}}</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import indexApi from '../../serves/api.js';	
	export default {
		data() {
			return {
				applyList:[],
				queryform: {
								pageNum: 1,
								pageSize: 10
							},
				total:null
			};
		},
		mounted() {
			this.handleApplyList();
		},
		onReachBottom() {
			 let self = this;		
				    // 显示加载图标
					let total=this.total;
					let page=this.queryform.pageNum;
					let pageSize=this.queryform.pageSize;
					if(pageSize<total){
						// page++;
						pageSize+=10;
						self.queryform.pageSize=pageSize;
						
						wx.showToast({
						  title: '更多加载中'
						})
						self.handleApplyList();
					}
		
		},
		methods:{
			handleClickItem(id){
				console.log(id);
				uni.navigateTo({
					url: `../payment/payment?id=${id}`
				});
			},
			/**
			 * 
			 * @description  获取打印申请详细信息
			 * // 下拉待处理
			 * */
					
			handleApplyList(){
				let params=this.queryform
				indexApi.getApplylist(params)
					.then(res=>{
						console.log(res);
						if(res&&res.code==200){
							let applyList=res.rows;
						
							this.applyList=applyList;
							this.total=res.total;
						}
					})
					.catch(err=>{
						console.error(err);
					})
			}
		}
	}
</script>

<style lang="less">
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 41rpx;
		.list-container{
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.list-item{
				
				width: 660rpx;
				height: 160rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 6rpx 0rpx #EEEEEE;
				border-radius: 10rpx;
				margin-bottom: 20rpx;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				.applyed{
					width: 86rpx;
					height: 52rpx;
					background: #cddbfe;
				
					border-radius: 4rpx;
					margin-left: 23rpx;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					.text{
						width: auto;
						display: block;
						height: auto;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #0048FF;
						line-height: 36rpx;

					}

				}
				.unpayed{
					width: 86rpx;
					height: 52rpx;
					background: #ffe5da;
				
					border-radius: 4rpx;
					margin-left: 23rpx;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					.text{
						width: auto;
						display: block;
						height: auto;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FF7C42;
						line-height: 36rpx;
				
					}
				
				}
				.hospital-info{
					width: auto;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content:center ;
					align-items: flex-start;
					margin-left: 27rpx;
					.hospital-block{
						width: auto;
						height: 33rpx;
						font-size: 34rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #575757;
						line-height: 36rpx;

					}
					.hospital-name{
						width: auto;
						height: 25rpx;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #A9A9A9;
						line-height: 36rpx;

					}
				}
				.apply-time{
					width: auto;
					height: 20rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 300;
					color: #575757;
					line-height: 36rpx;
					margin-left: 89rpx;

				}

			}
		}
	}
</style>
