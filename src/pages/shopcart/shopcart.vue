<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="log-wrapper">
          <div class="log" :class="{'heighlight': totalCount > 0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{ totalCount }}</div>
        </div>
        <div class="price" :class="{'heighlight': totalPrice > 0}">¥{{ totalPrice }}元</div>
        <div class="desc">另需配送费¥{{ deliveryPrice }}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{ payDesc }}</div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group name="drop">
        <div v-for="ball in balls" v-show="ball.show" class="ball" :key="ball.id">
          <div class="inner"></div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ]
      };
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `¥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差¥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: .96rem
    background: #000
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, .4)
      .content-left
        flex: 1
        .log-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -.2rem
          margin: 0 .24rem
          padding: .12rem
          width: 1.12rem
          height: 1.12rem
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .num
            position: absolute
            top: 0
            right: 0
            width: .48rem
            height: .32rem
            line-height: .32rem
            text-align: center
            border-radius: .32rem
            font-size: .18rem
            font-weight: 400
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 .08rem .16rem 0 rgba(0, 0, 0, .4)
          .log
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.heighlight
              background: rgb(0, 160, 220)
              .icon-shopping_cart
                color: #fff
            .icon-shopping_cart
              line-height: .88rem
              font-size: .48rem
              color: #80858a
        .price
          display: inline-block
          vertical-align: top
          margin-top: .24rem
          line-height: .48rem
          padding-right: .24rem
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, .1)
          font-size: .32rem
          font-weight: 700
          &.heighlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: .24rem 0 0 .24rem
          line-height: .48rem
          font-size: .2rem
      .content-right
        flex: 0 0 2.1rem
        width: 2.1rem
        .pay
          height: .96rem
          line-height: .96rem
          text-align: center
          font-size: .24rem
          font-weight: 700
          background: #2b333b
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: .64rem
        bottom: .44rem
        z-index: 200
        &.drop-transition
          transition: all .4s
          .inner
            width: .32rem
            height: .32rem
            border-radius: 50%
            background: rgb(0, 160, 220)
            transition: all .4s
</style>
