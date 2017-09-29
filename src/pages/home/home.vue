<style type="text/scss" lang="scss" scoped>
  .header {
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    z-index: 101;
    border-bottom: 1px solid #eef1f6;
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
    width: 100%;
    position: absolute;
    top: 60px;
    bottom: 0;
  }

  .left-part {
    position: fixed;
    top: 60px;
    bottom: 0;
    width: 200px;
    background-color: #eef1f6;
    z-index: 102;
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
    overflow: hidden;
    &.collapse {
      left: 0;
    }
    .breadcrumb {
      margin: 15px 0 15px 15px;
    }
    .content {
      position: absolute;
      top: 45px;
      left: 15px;
      right: 15px;
      bottom: 0;
      overflow: hidden;
      overflow-y: auto;
      background: #fff;
      border-radius: 4px;
    }
  }
</style>

<template>
  <div>
    <div class="header">
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
        <span class="mr10">{{username}}({{userId}})</span>
        <el-button type="text" @click="logout">注销</el-button>
      </div>
    </div>
    <div class="main">
      <div :class="leftClass">
        <div>
          <el-menu :default-active="$route.path" unique-opened router>
            <template v-for="(item,index) in $router.options.routes" v-if="!item.meta.hidden">
              <el-submenu :index="item.name">
                <template slot="title">
                  <span>{{item.name}}</span>
                </template>
                <template v-for="(child,childIndex) in item.children" v-if="!child.meta.hidden">
                  <el-menu-item :index="child.path">{{child.name}}</el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </div>
      </div>
      <div :class="rightClass">
        <div class="breadcrumb">
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
  import localStore from 'store'
  import Api from '@/api'
  import {formatTimeText} from '@/filters/moment'

  const user = localStore.get('user') || {}
  const logo = require('../../assets/img/logo.png')

  export default {
    data() {
      return {
        logo,
        timeText: formatTimeText(),
        username: user.userName,
        userId: user.userId,
        isCollapse: false
      }
    },
    computed: {
      leftClass() {
        return {
          'left-part': true,
          'collapse': this.isCollapse
        }
      },
      rightClass() {
        return {
          'right-part': true,
          'collapse': this.isCollapse
        }
      },
      collpaseTip() {
        return this.isCollapse ? '显示菜单' : '隐藏菜单'
      }
    },
    methods: {
      collapse() {
        this.isCollapse = !this.isCollapse
      },
      logout() {
        Api.logout().then((res) => {
          const {dataMap} = res.data
          localStore.remove('user')
          const currentUrl = encodeURIComponent(`${window.location.origin}/#/con/index`)
          window.location.href = `${dataMap}${currentUrl}`
        })
      }
    }
  }
</script>
