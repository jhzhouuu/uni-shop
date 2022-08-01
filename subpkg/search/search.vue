<template>
	<view>
		<view class="search-box">
			<!-- <uni-search-bar @confirm="search" @input="input" ></uni-search-bar> -->
			<uni-search-bar @input="input" clearButton="always" cancelButton="none" :focus="true" :radius="100">
			</uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResult.length !==0">
			<view class="sugg-item" v-for="(item,index) in searchResult" :key="index" @click="gotoDetail(item)">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>

		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
			</view>
			<!-- 列表 -->
			<view class="history-list" v-for="(item,index) in historyList" :key="index">
				<uni-tag  inverted type="default" :text="item" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null, //定时器
				kw: '', //搜索关键字
				searchResult: [], // 搜索结果列表
				historyList: ['a', 'app', 'apple'] //搜索历史
			};
		},

		methods: {
			input(e) {
				// console.log(e)
				// console.log(e.valueOf())
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e
					// console.log(this.kw)
					this.getSearchResult()
				}, 600)
			},
			async getSearchResult() {
				// 判断搜索关键字是否为空
				if (this.kw.length === 0) {
					this.searchResult = []
					return
				}
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.kw
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResult = res.message
				
				this.saveSearchHistory()
			},
			gotoDetail(item) {
				// console.log(item.goods_id)
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			// 存储历史记录
			saveSearchHistory(){
				// this.historyList.push(this.kw)
				this.historyList=[...new Set([this.kw,...this.historyList])]
				// 搜索历史记录持久化存储
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			// 清除历史记录
			clearHistory(){
				this.historyList=[]
				uni.setStorageSync('kw','[]')
			},
			gotoGoodsList(kw){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query=' +kw
				})
			}
		},
		onLoad(){
			this.historyList=JSON.parse((uni.getStorageSync('kw')|| '[]'))
		}
	}
</script>

<style lang="scss">
	.search-box {
		background-color: #c00000;
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;

			.goods-name {
				//文字不允许换行 （单行文本）
				white-space: nowrap;
				overflow: hidden;
				// 溢出文本用 ...代替
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;

			height: 40px;
			align-items: center;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;
			
			display: inline-block;
			
			.uni-tag {
				display: block;
				margin-top: 5px;
				margin-right: 5px;
				color: #000000;
			}
		}
	}
</style>
