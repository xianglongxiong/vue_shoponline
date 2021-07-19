<!--
 * @Author: your name
 * @Date: 2021-07-18 22:48:40
 * @LastEditTime: 2021-07-19 10:38:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_shoponline\src\components\Home.vue
-->
<template>
  <el-container class="homeContainer">
    <el-header>
      <div>
          <img :src="bearImg" alt="bear" width="160px" height="60px">
          <span>熊孩子后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
    <el-aside width="200px">
    <el-col>
      <el-menu background-color="#545c64" text-color="white" v-for="item in menuList" :index="item.id+''"  :key="item.id">
          <el-submenu>
              <template slot="title">
                <i :class="iconList[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="submenu in item.children" :index="submenu.id+''" :key="submenu.id">
                 <template slot="title">
                  <i class="el-icon-menu"></i>
                   <span>{{submenu.authName}}</span>
                 </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
       </el-menu>
       </el-col>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () {
    this.menuGetlist()
  },
  name: 'home',
  data: function () {
    return {
      bearImg: require('../assets/bear___images.china.png'),
      menuList: [],
      iconList: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      }
    }
  },
  methods: {
    logout: function () {
      window.sessionStorage.clear('token')
      this.$router.push('/login')
    },
    async menuGetlist () {
      const { data: res } = await this.$http.get('/menus')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      console.log(this.menuList)
    }
  }

}
</script>

<style lang="less"  scoped>
.homeContainer{
  height: 100%;
}
.el-header{
  display: flex;
  justify-content: space-between;
  background-color: #545c64;
  align-items: center;
  > div {
     display: flex;
     align-items: center;
      font-size: 26px;
      color: white;
      span{
        margin-left: 20px;
      }
  }
}
.el-aside{
  background: #545c64;
  .iconfont{
    margin-right: 10px;
  }
}
</style>
