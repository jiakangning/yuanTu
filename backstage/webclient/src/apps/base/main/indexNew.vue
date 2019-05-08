<template>
	<div class="run-grid-layout">
		<header class="run-grid-layout-header">
			<h1>曹家滩矿井智能管控平台</h1>
		  <el-popover
			  placement="bottom"
			  title="标题"
			  width="200"
			  trigger="click"
			  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
			  <div
				  slot="reference"
				  class="item">
					<i class="runicon iconbell-fill"/>
					<span class="badge">20</span>
				</div>
		  </el-popover>
			<div class="avatar">
				<i
					class="runicon iconuser"/>
			</div>
			<el-dropdown trigger="click">
			  <span class="el-dropdown-link">
			    admin<i class="el-icon-arrow-down el-icon--right"></i>
			  </span>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item>修改密码</el-dropdown-item>
			    <el-dropdown-item>退出</el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>
		</header>
		<nav class="run-grid-layout-nav">
			<div
				class="nav-item"
				@click="onClickRootMenu(item)"
				:class="{ active: currentRootMenuId === item.id }"
				v-for="(item, index) in currentRootMenus"
				:key="index">
				<i
					class="nav-item-icon"
					:class="item.icon"/>
				<span class="nav-item-label">{{ item.name }}</span>
			</div>
		</nav>
		<article class="run-grid-layout-main">
			<div
				class="slider"
				v-show="menu.slider && !menu.flex"
				@click="onOverSlider">
				<i class="runicon icondoubleright"/></div>
			<div
				class="menu"
				:class="{ show: menu.show, absolute: menu.absolute, flex: menu.flex }"
				@mouseenter="onEnterMenu"
				@mouseleave="onLeaveMenu">
				<div class="menu-toolbar">
					<div class="menu-toolbar-groupbtn">
						<div class="btn active">
							<i class="runicon iconunorderedlist"/>
						</div>
						<div class="btn">
							<i class="runicon iconstar"/>
						</div>
					</div>
					<div class="menu-toolbar-search">
						<i class="runicon iconsearch"/>
					</div>
					<div class="menu-toolbar-input">
						<el-input
							placeholder="搜索"
							v-model="searchText">
					    <i
						    slot="suffix"
						    class="runicon iconclose"/>
					  </el-input>
					</div>
					<div class="menu-toolbar-fixed">
						<i
							class="runicon iconlock-fill"
							v-show="menu.flex"
							@click="onCancelFixedMenu"/>
						<i
							class="runicon iconunlock-fill"
							v-show="!menu.flex"
							@click="onFixedMenu"/>
					</div>
				</div>
				<div class="menu-body">
					<div class="menu-list">
						<el-tree
							:data="currentMenus"
							:props="defaultProps"
							accordion
							@node-click="handleNodeClick"/>
					</div>
					<div class="menu-favorite"></div>
				</div>
			</div>
			<div class="content-wrap">
				<div class="tabs"></div>
				<div class="content"><router-view/></div>
			</div>
		</article>
	</div>
</template>

<script>
	export default {
    name: 'indexNew',
    data () {
      return {
        menu: {
          show: false,
          absolute: true,
          flex: false,
          slider: true
        },
        searchText: '',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        menus: [
          {
            id: 1,
            icon: 'el-icon-setting',
            name: '系统管理',
            children: [
              {
                id: 2,
                icon: 'el-icon-location',
                name: '职位管理',
                router: '/system/job'
              },
              {
                id: 3,
                icon: 'el-icon-location',
                name: '帐号管理',
                router: '/system/member'
              },
              {
                id: 4,
                icon: 'el-icon-location',
                name: '通讯录管理',
                router: '/system/contact'
              },
              {
                id: 5,
                icon: 'el-icon-location',
                name: '角色管理',
                router: '/system/role'
              },
              {
                id: 6,
                icon: 'el-icon-location',
                name: '菜单管理',
                router: '/system/menu'
              },
              {
                id: 7,
                icon: 'el-icon-location',
                name: '组织机构管理',
                router: '/system/organization'
              },
              {
                id: 8,
                icon: 'el-icon-location',
                name: '登录日志管理',
                router: '/system/logLogin'
              },
              {
                id: 9,
                icon: 'el-icon-location',
                name: '操作日志管理',
                router: '/system/logOperate'
              },
              {
                id: 10,
                icon: 'el-icon-location',
                name: '移动端菜单管理',
                router: '/system/mobileModule'
              },
              {
                id: 11,
                icon: 'el-icon-location',
                name: '字典项管理',
                router: '/system/dictionary'
              },
              {
                id: 12,
                icon: 'el-icon-location',
                name: '错误日志管理',
                router: '/system/errorlog'
              }
            ]
          },
          {
            id: 2,
            icon: 'el-icon-menu',
            name: '组件示例',
            children: [
              {
                id: 222,
                icon: 'el-icon-location',
                name: 'form组件',
                router: '/run/form'
              },
              {
                id: 223,
                icon: 'el-icon-location',
                name: 'list组件',
                router: '/run/list'
              },
              {
                id: 224,
                icon: 'el-icon-location',
                name: 'search组件',
                router: '/run/search'
              },
              {
                id: 225,
                icon: 'el-icon-location',
                name: 'popup-search组件',
                router: '/run/popupSearch'
              },
              {
                id: 226,
                icon: 'el-icon-location',
                name: 'chart组件',
                router: '/run/chart'
              },
              {
                id: 227,
                icon: 'el-icon-location',
                name: 'chartWidge组件',
                router: '/run/chartWidge'
              },
              {
                id: 228,
                icon: 'el-icon-location',
                name: 'chartCard组件',
                router: '/run/chartCard'
              },
              {
                id: 229,
                icon: 'el-icon-location',
                name: 'work组件',
                router: '/run/work'
              }
            ]
          },
          {
            id: 3,
            icon: 'el-icon-location',
            name: '地图',
            router: '/map'
          },
          {
            id: 4,
            icon: 'el-icon-service',
            name: '调度派单',
            router: '/driver/map'
          }
        ],
        currentRootMenuId: null
      }
    },
    computed: {
      currentRootMenus () {
        return this.menus.map((item, index) => {
          let { id, icon, name } = item
          return {
            id,
            icon,
            name
          }
        })
      },
      currentMenus () {
        return this.menus.filter((item, index) => this.currentRootMenuId ? item.id === this.currentRootMenuId : index === 0) || []
      }
    },
    mounted () {
      this.currentRootMenuId = this.menus[0].id // 初始化菜单
    },
    methods: {
      onOverSlider () {
        this.menu.show = true
        this.menu.absolute = true
      },
      onLeaveMenu () {
        this.timer = setTimeout(() => {
          this.menu.show = false
          this.menu.slider = true
        }, 500)
      },
      onEnterMenu () {

      },
      onFixedMenu () {
        this.menu.flex = true
        this.menu.absolute = false
        this.menu.slider = false
      },
      onCancelFixedMenu () {
        this.menu.show = true
        this.menu.flex = false
        this.menu.absolute = true
        this.menu.slider = false
      },
      handleNodeClick (item) {
        item.router
          ? this.$router.push(item.router)
          : null
      },
      onClickRootMenu (item) {
        this.currentRootMenuId = item.id
      }
    }
  }
</script>

<style
	lang="stylus"
	type="text/stylus"
	rel="stylesheet/stylus">
	.run-grid-layout
		width 100%
		height 100%
		display grid
		grid-template-columns 70px 3fr
		grid-template-rows 40px auto
		grid-template-areas 'header header' 'nav content'
		font-family "Helvetica Neue"
		&-header
			grid-area header
			background-color #409EFF
			color #fff
			display: flex
			justify-content flex-end
			align-items center
			.item
				position relative
				.badge
					position absolute
					top -8px
					left 15px
					background-color red
					font-size 10px
					padding 5px
					border-radius 50%
				.runicon
					font-size 25px
					cursor pointer
			h1
				flex 1
				font-weight normal
				padding-left 20px
			.avatar
				width 26px
				height 26px
				border-radius 50%
				background #1972C6
				margin-right 10px
				margin-left 50px
				.runicon
					font-size 21px
					position relative
					top 2px
					left 2px
			.el-dropdown
				color #fff
				margin-right 20px
				cursor pointer
		&-nav
			grid-area nav
			background-color #0A1733
			color #fff
			padding-top 50px
			.nav-item
				display flex
				flex-direction column
				align-items center
				margin-bottom 20px
				color rgba(255, 255, 255, 0.6)
				cursor pointer
				transition all .5s ease
				&.active
					color #fff
					position relative
				&.active:before
					position absolute
					left 0
					bottom 0
					content ''
					width 2px
					height 75%
					background-color #fff
				&-icon
					font-size 24px
					margin 15px 0
				&-label
					font-size 12px
		&-main
			position relative
			grid-area main
			grid-column-start 2
			grid-column-end 3
			grid-row-start 2
			grid-row-end 3
			background-color #f7f8fa
			display flex
			.slider
				flex 0 0 20px
				background-color #21304C
				color #3296F5
				.runicon
					display inline-block
					font-size 16px
					position relative
					top 5px
					left 2px
			.menu
				background-color #21304C
				transition all .5s ease-in
				overflow-x hidden
				overflow-y auto
				width 0
				text-align center
				&.show
					width 240px
				&.flex
					flex 0 0 240px
				&.absolute
					position absolute
					top 0
					left 0
					right 0
					height 100%
				&-list
					margin 20px 0px
					.el-tree
						background-color #21304c
						color #fff
					.el-tree-node__content
						height 36px
					.el-tree-node__content:hover
						background-color rgba(50, 150, 245, 0.05)
					.el-tree-node:focus > .el-tree-node__content
						background-color rgba(50, 150, 245, 0.05)
					.el-tree-node__content > .el-tree-node__expand-icon
						padding-left 15px
				&-toolbar
					display flex
					align-items stretch
					justify-content space-around
					margin 15px
					&-groupbtn
						display flex
						align-items center
						background-color rgba(50, 150, 245, 0.1)
						border-radius 15px
						.btn
							width 50px
							height 30px
							flex-shrink 0
							color #3296F5
							cursor pointer
							&.active
								background-color #3296F5
								color #ffffff
								border-radius 15px
							.runicon
								font-size 16px
								position relative
								top 6px
					&-search
						display flex
						align-items center
						.runicon
							font-size 18px
							color #fff
							cursor pointer
					&-input
						display none
					&-fixed
						display flex
						align-items center
						.runicon
							font-size 18px
							color #fff
							cursor pointer
			.content-wrap
				flex 1
</style>
