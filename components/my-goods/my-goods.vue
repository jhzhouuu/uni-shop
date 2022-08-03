<template>
	
		<view class="goods-item">
			<!-- 左侧的盒子 -->
			<view class="goods-item-left">
				<radio :checked="item.goods_state" color="#c00000" v-if="showRadio"
				 @click="radioClickHandler"></radio>
				<image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
			</view>
			<!-- 右侧的盒子 -->
		<view class="goods-item-right">
			<view class="goods-name">
				{{item.goods_name}}
			</view>
			<view class="goods-info-box">
				<view class="goods-price">
					￥{{item.goods_price.toFixed(2)}}
					  <!-- 商品数量 -->
				</view>
				<uni-number-box :min="1" :value="item.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
			</view>
		</view>
		</view>

</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				default:{}
				
			},
			showRadio :{
				type: Boolean,
				default:false
			},
			showNum :{
				type: Boolean,
				default:false
			}
		},
		name:"my-goods",
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		methods:{
			radioClickHandler(){
				// this.$emit('@radio-change',{
				// 	goods.id:this.item.goods_id,
				// 	goods_state:!this.item.goods_state
					
					
				// })
				 // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
				    // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
				    this.$emit('radio-change', {
				      // 商品的 Id
				      goods_id: this.item.goods_id,
				      // 商品最新的勾选状态
				      goods_state: !this.item.goods_state
				    })
				  },
				   // NumberBox 组件的 change 事件处理函数
				    numChangeHandler(val) {
						console.log(val)
				    
				      this.$emit('num-change', {
				        // 商品的 Id
				        goods_id: this.item.goods_id,
				        // 商品的最新数量
				        goods_count: +val
				      })
				    }
			}
		
	}
</script>

<style lang="scss">
	.goods-item {
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;
			display: flex;
			flex: 1;
			justify-content: space-between;
			align-items: center;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.goods-name {
				font-size: 13px;

			}

			.goods-info-box {
				 //    display: flex;
					// // flex: 1;
					// justify-content: space-between;
				 //    align-items: center;
				 display: flex;
				 justify-content: space-between;
				 align-items: center;
			
				.goods-price {
					color: #c00000;
					font-size: 16px;
				}
			}
		}
	}
</style>