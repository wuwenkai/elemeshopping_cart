<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from './pages/header/header';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        seller: {}
      };
    },
    created() {
      this.$http.get('./api/seller').then((res) => {
        let temp = res.data;
        if (temp.errno === ERR_OK) {
          this.seller = temp.data;
        };
      });
    },
    components: {
      'v-header': Header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './assets/stylus/mixin.styl'
  #app
    .tab
      display: flex
      width: 100%
      height: .8rem
      line-height: .8rem
      border-1px(rgba(7, 17, 27, .1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: .28rem
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
