<template>
	<view>
		<!-- 选择收货地址按钮 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
		</view>

		<!-- 收货信息的盒子 -->
		<view class="address-info-box" v-else  @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：{{address.userName}}
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：{{address.telNumber}}
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>

			<view class="row2">
				<view class="row2-left">

					收货地址：

				</view>
				<view class="row2-right">

					<!-- 广东省深圳市宝安区航程街道***小区***单元***栋***室 -->
					{{addstr}}
				</view>
			</view>

		</view>

		<!-- 底部的边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations, mapGetters
	} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {
				// address: {
				// 	// username:'za'
				// } //收货地址

			};
		},
		methods: {
			...mapMutations('m_user', ['updateAddress']),

			// 选择收货地址
			async chooseAddress() {
				// 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
				//    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
				const [err, succ] = await uni.chooseAddress().catch(err => err)

				// 2. 用户成功的选择了收货地址
				if (err === null && succ.errMsg === 'chooseAddress:ok') {
					// 为 data 里面的收货地址对象赋值
					// this.address = succ
					// console.log(succ)
					//  调用 Store 中提供的 updateAddress 方法，将 address 保存到 Store 里面
					this.updateAddress(succ)
				}
			}
		},
		computed: {
			//  把 m_user 模块中的 address 对象映射当前组件中使用，代替 data 中 address 对象
			...mapState('m_user', ['address']),
			// // 收货详细地址的计算属性
			// addstr() {
			// 	if (!this.address.provinceName) return ''

			// 	// 拼接 省，市，区，详细地址 的字符串并返回给用户
			// 	return this.address.provinceName + this.address.cityName + this.address.countyName + this.address
			// 		.detailInfo
			// }
			  ...mapGetters('m_user', ['addstr']),
		}
	}
</script>

<style lang="scss">
	.address-choose-box {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-left {
				.username {}
			}

			.row1-right {
				display: flex;
				align-items: center;

				.phone {}
			}
		}

		.row2 {
			display: flex;
			// justify-content: space-between;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}

			.row2-right {}
		}
	}

	.address-border {
		display: flex;
		width: 100%;
		height: 5px;
	}
</style>
