<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail()">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail()">
      <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{ seller.name }}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, $index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
                <span class="text">{{ seller.supports[$index].description }}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star';
  
  export default {
    components: {
      star
    },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/stylus/mixin'

  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7, 17, 27, .5)
    .content-wrapper
      position: relative
      padding: .48rem .24rem .36rem .48rem
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          width: 1.28rem
          height: 1.28rem
          border-radius: .04rem
      .content
        margin-left: .32rem
        display: inline-block
        .title
          margin: .04rem 0 .08rem 0
          .brand
            display: inline-block
            vertical-align: top
            width: .6rem
            height: .36rem
            bg-image('brand')
            background-size: .6rem .36rem
            background-repeat: no-repeat
          .name
            margin-left: .12rem
            font-size: .32rem
            line-height: .36rem
            font-weight: bold
        .description
          margin-bottom: .2rem
          line-height: .24rem
          font-size: .24rem
        .support
          .icon
            display: inline-block
            vertical-align: top
            width: .24rem
            height: .24rem
            margin-right: .08rem
            background-size: .24rem .24rem
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height: .24rem
            font-size: .2rem

      .support-count
        position: absolute
        right: .24rem
        bottom: .28rem
        padding: .16rem
        height: .48rem
        line-height: .48rem
        border-radius: .25rem
        background: rgba(0, 0, 0, .2)
        text-align: center
        .count
          vertical-align: top
          font-size: .2rem
        .icon-keyboard_arrow_right
          margin-left: .04rem
          line-height: .48rem
          font-size: .2rem
    .bulletin-wrapper
      position: relative
      height: .56rem
      line-height: .56rem
      padding: 0 .44rem 0 .24rem
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(7, 17, 27, .2)
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: .14rem
        width: .44rem
        height: .24rem
        bg-image('bulletin')
        background-size: .44rem .24rem
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        margin: 0 .08rem
        font-size: .2rem
      .icon-keyboard_arrow_right
        position: absolute
        font-size: .2rem
        right: .24rem
        top: .16rem
        line-height: .3rem
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(.2rem)
      img
        width: 100%
        height: 100%
    .detail
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      transition: all .5s
      backdrop-filter: blur(.2rem)
      background: rgba(7, 17, 27, .8)
      &.fade-transition
        opacity: 1
      &.fade-enter,&.fade-leave-to
        opacity: 0
      .detail-wrapper
        min-height: 100%
        width: 100%
        .detail-main
          padding: 1.28rem 0 1.28rem
          .name
            line-height: .32rem
            text-align: center
            font-size: .32rem
            font-weight: 700
          .star-wrapper
            margin-top: .36rem
            padding: .04rem 0
            text-align: center
          .title
            display: flex
            width: 80%
            margin: .56rem auto .48rem
            .line
              flex: 1
              position: relative
              top: -.12rem
              border-bottom: 1px solid rgba(255, 255, 255, .2)
            .text
              padding: 0 .24rem
              font-weight: 700
              font-size: .28rem
          .supports
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 .24rem
              margin-bottom: .24rem
              font-size: 0
              &:last-child
                margin-bottom: 0
              .icon
                display: inline-block
                width: .32rem
                height: .32rem
                vertical-align: top
                margin-right: .12rem
                background-size: .32rem .32rem
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height: .24rem
                font-size: .24rem
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              padding: 0 .24rem
              line-height: .48rem;
              font-size: .24rem
      .detail-close
        position: relative
        width: .64rem
        height: .64rem
        margin: -1.28rem auto
        clear: both
        font-size: .64rem
</style>
