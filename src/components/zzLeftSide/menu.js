const Menu = [
	{
		key: '1',
		iconType: 'dashboard',
		link: '/frame/home',
		label: '首页'
	}, {
		key: '3',
		iconType: 'switcher',
		link: '',
		label: '产品管理',
		children: [
			{
				key: '3_1',
				link: '/frame/product/productList',
				label: '产品列表'
			}, {
				key: '3_2',
				link: '/frame/product/addProduct',
				label: '添加产品'
			}, {
				key: '3_3',
				link: '/frame/product/brandAdmin',
				label: '品牌管理'
			}
		]
	}, {
		key: '4',
		iconType: 'line-chart',
		link: '',
		label: '订单管理',
		children: [
			{
				key: '4_1',
				link: '/frame/order/orderList',
				label: '订单列表'
			}
		]
	}, {
		key: '5',
		iconType: 'credit-card',
		link: '',
		label: '案例和新闻管理',
		children: [
			{
				key: '5_1',
				link: '/frame/news/caseList',
				label: '案例列表'
			}, {
				key: '5_2',
				link: '/frame/news/addCase',
				label: '添加案例'
			}, {
				key: '5_3',
				link: '/frame/news/newsList',
				label: '新闻列表'
			}, {
				key: '5_4',
				link: '/frame/news/addNews',
				label: '添加新闻'
			}
		]
	}, {
		key: '2',
		iconType: 'user',
		link: '/frame/user/userList',
		label: '人员管理'
	}
];

export default Menu;