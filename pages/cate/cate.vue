<template>
	<view>
		<!-- 搜索 -->
		<!-- <my-search :bgcolor="'pink'" :radius="8""></my-search> -->
		<my-search @click="gotoSearch"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧的滑动区域 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
				<block v-for="(item,index) in cateList" :key="index">
					<view :class="['left-scrool-item',index===active ? 'active' : ''] " @click="activeChange(index)">
						{{item.cat_name}}</view>

				</block>


			</scroll-view>
			<!-- 右侧的滑动区域 -->
			<scroll-view scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2,index2) in cateLevel2" :key="index2">
					<!-- 二级分类标题 -->
					<view class="cate-lv2-title">
						/{{item2.cat_name}}/

					</view>
					<!-- 当前二级类下的三级分类列表 -->
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3,index3) in item2.children" 
						:key="index3" @click="gotGoodsList(item3)">
							<image :src="item3.cat_icon.replace('dev','web')"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		  // 将 badgeMix 混入到当前的页面中进行使用
		  mixins: [badgeMix],
		data() {
			return {
				wh: 0, //当前设备的可用高度
				cateList: [], //一级分类
				active: 0,
				cateLevel2: [] ,//二级分类
				scrollTop:0

			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			// console.log(sysInfo)
			this.wh = sysInfo.windowHeight - 50

			this.getCateList()
		},
		methods: {
			// 获取分类列表数据
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				console.log(res)
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message

				//为二级分类赋值
				this.cateLevel2 = res.message[0].children
			},
			activeChange(index) {
				this.active = index
				this.cateLevel2 = this.cateList[index].children
				this.scrollTop= Math.random()
			},
			//跳转到商品列表页面
			gotGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			},
				
			gotoSearch(){
				// console.log('fgg')
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;


		.left-scroll-view {
			width: 120px;

			.left-scrool-item {
				background-color: #f7f7f7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;

				&.active {
					background-color: #ffffff;
					position: relative;

					&::before {
						content: '';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
				}
			}
		}
	}

	.cate-lv2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}

	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;

		.cate-lv3-item {
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;
			image {
				width: 60px;
				height: 60px;
			}

			text {
				font-size: 12px;
			}
		}
	}
</style>
