<style type="text/scss" lang="scss" scoped>
  .header {
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    z-index: 101;
    border-bottom: 1px solid #eef1f6;
    background-color: #FFF;
    .logo {
      display: inline-block;
      width: 200px;
      padding-top: 10px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .navicon {
      display: inline-block;
      margin: 15px 0 0 10px;
      text-align: center;
      vertical-align: top;
      color: #565758;
      .fa:hover {
        cursor: pointer;
        color: #0091ea;
      }
    }
    .userInfo {
      float: right;
      margin-right: 10px;
      line-height: 60px;
    }
  }

  .main {
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 0;
  }

  .left-part {
    position: fixed;
    top: 60px;
    bottom: 0;
    width: 200px;
    background-color: #eef1f6;
    overflow: hidden;
    overflow-y: auto;
    &.collapse {
      width: 0;
    }
  }

  .right-part {
    width: auto;
    position: absolute;
    left: 200px;
    top: 0;
    right: 0;
    bottom: 0;
    &.collapse {
      left: 0;
    }
    .breadcrumb {
      margin: 15px 0 15px 15px;
    }
    .content {
      padding: 0 15px;
      overflow-x: hidden;
      overflow-y: auto;
      background: #fff;
      border-radius: 4px;
    }
  }
</style>

<template>
  <div>
    <div class="header" id="header">
      <div class="logo">
        <img :src="logo"/>
      </div>
      <div class="navicon">
        <el-tooltip placement="right" :content="collpaseTip" :enterable="false">
          <i class="fa fa-navicon fa-2x" @click="collapse"></i>
        </el-tooltip>
      </div>
      <div class="userInfo">
        <span class="mr10">{{timeText}}</span>
        <span class="mr10">{{user.userName}}({{user.userId}})</span>
        <el-button type="text" @click="logout">注销</el-button>
      </div>
    </div>
    <div class="main" id="main">
      <div :class="leftClass" id="left">
        <div>
          <el-menu :default-active="$route.path" unique-opened router>
            <template v-for="(item,index) in $router.options.routes" v-if="!item.meta.hidden">
              <el-submenu :index="item.name">
                <template slot="title">
                  <span>{{item.name}}</span>
                </template>
                <template v-for="(child) in item.children" v-if="!child.meta.hidden">
                  <el-menu-item :index="child.path">
                    <a :href="`#${child.path}`" style="color:inherit;">{{child.name}}</a>
                  </el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </div>
      </div>
      <div :class="rightClass" id="right">
        <div class="breadcrumb" id="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/con/index' }">应用中心</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path :$route.path}">{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import localStore from 'store';
  import Api from '../../api';
  import {formatTimeText} from '../../filters/moment';

  export default {
    data() {
      return {
        logo: require('../../assets/img/logo.png'),
        timeText: formatTimeText(),
        user: localStore.get('user') || {},
        isCollapse: false,
        routes: []
      };
    },
    computed: {
      leftClass() {
        return {
          'left-part': true,
          collapse: this.isCollapse
        };
      },
      rightClass() {
        return {
          'right-part': true,
          collapse: this.isCollapse
        };
      },
      collpaseTip() {
        return this.isCollapse ? '显示菜单' : '隐藏菜单';
      }
    },
    methods: {
      collapse() {
        this.isCollapse = !this.isCollapse;
      },
      logout() {
        Api.logout().then((res) => {
          const {dataMap} = res.data;
          localStore.remove('user');
          const currentUrl = encodeURIComponent(`${window.location.origin}/#/con/index`);
          window.location.href = `${dataMap}${currentUrl}`;
        });
      },
      allRoutesHiddenTrue(items) {
        items.forEach((item) => {
          if (!item.meta.public) {
            item.meta.hidden = true;
            const {children} = item;
            if (children && children.length) {
              this.allRoutesHiddenTrue(children);
            }
          }
        });
      },
      filterRoutes(items) {
        items.forEach((item) => {
          const {name, children} = item;
          this.showRoute(name);
          if (children && children.length) {
            this.filterRoutes(children);
          }
        });
      },
      findRoute(routeNmae, items) {
        items.some((item) => {
          const {name, children} = item;
          if (name === routeNmae) {
            item.meta.hidden = false;
            return true;
          }
          if (children && children.length) {
            this.findRoute(routeNmae, children);
          }
          return false;
        });
      },
      showRoute(routeName) {
        const defaultRoutes = this.$router.options.routes;
        this.findRoute(routeName, defaultRoutes);
      }
    },
    created() {
      const powerSwitch = localStore.get('powerSwitch');
      if (powerSwitch) {
        const powers = localStore.get('powers') || [];
        const defaultRoutes = this.$router.options.routes;
        this.allRoutesHiddenTrue(defaultRoutes);
        this.filterRoutes(powers);
      }
    }
  };
</script>
