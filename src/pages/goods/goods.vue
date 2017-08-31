<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, $index) in goods" class="menu-item" :class="{'current': currentIndex === $index}"
            @click="selectMenu($index, $event)">
    			<span class="text border-1px">
    				<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{ item.name }}
    			</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{ food.price }}</span><span class="old" v-show="food.oldPrice">¥{{ food.oldPrice
                  }}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('./api/goods').then((res) => {
        let temp = res.data;
        if (temp.errno === ERR_OK) {
          this.goods = temp.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calulateHeight();
          });
        }
        ;
      });
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calulateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        ;
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/stylus/mixin'

  .goods
    display: flex
    position: absolute
    top: 3.48rem
    bottom: .92rem
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 1.6rem
      width: 1.6rem
      background: #f3f5f7
      .menu-item
        display: table
        height: 1.08rem
        width: 1.12rem
        padding: 0 .24rem
        line-height: .28rem
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: .24rem
          height: .24rem
          margin-right: .04rem
          background-size: .24rem .24rem
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 1.12rem
          vertical-align: middle
          border-1px(rgba(7, 17, 27, .1))
          font-size: .24rem
    .foods-wrapper
      flex: 1
      .title
        padding-left: .28rem
        height: .52rem;
        line-height: .52rem
        border-left: 2px solid #d9dde1
        font-size: .24rem
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: .36rem
        padding-bottom: .36rem
        border-1px(rgba(7, 17, 27, .1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 1.14rem
          width: 1.14rem
          height: 1.14rem
          margin-right: .2rem
          img
            width: 100%
            height: 100%
        .content
          flex: 1
          .name
            margin: .04rem 0 .16rem
            height: .28rem
            line-height: .28rem
            font-size: .28rem
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: .2rem
            font-size: .2rem
            color: rgb(147, 153, 159)
          .desc
            line-height: .24rem
            margin-bottom: .16rem
          .extra
            .count
              margin-right: .24rem
          .price
            font-weight: 700
            line-height: .48rem
            .now
              margin-right: .36rem
              font-size: .28rem
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: .2rem
              color: rgb(147, 153, 159)
</style>
