<template>
	<view>
		<view class="goods-list">
			<view v-for="(item,index) in goodsList" :key="index" @click="gotoDetail(item)">
				<my-goods :item="item"></my-goods>
			<!-- <my-goods :item="item"></my-goods> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//请求参数对象
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				isLoading:false //节流阀。
			};
		},
		onLoad(options) {
			console.log(options)
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''

			console.log(this.queryObj)
			this.getGoodsList()

		},

		methods: {
			//获取商品列表的数据方法
			async getGoodsList(cb) {
				// 打开节流阀
				this.isLoading =true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				//关闭节流阀
				this.isLoading=false
				cb && cb()
				// console.dir(res + 'dddss')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total = res.message.total

			},
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' +item.goods_id
				})
			}
		},
		onReachBottom(){
			if(this.queryObj.pagenum * this.queryObj.pagesize >=this.total) return uni.$showMsg('数据加载完毕！')
			if(this.isLoading) return
			//页码值自增加1
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh(){
			// 重置关键数据
			this.queryObj.pagenum =1
			this.total =0
			this.isLoading =false
			this.goodsList =[]
			
			// 重新发起数据请求
			this.getGoodsList(()=> uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>
