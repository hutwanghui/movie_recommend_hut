<template>
  <div class="rating">
    <ul class="list">
      <li class="star" v-for="(star,index) in maxStars" :class="{'active':star <= stars}" :key="index"
          @click="rate(star)">
        <icon :name="star <= stars ? 'star':'star'"/>
      </li>
    </ul>
    <span v-if="hasCounter"> {{ stars }} of {{ maxStars }} </span>
  </div>
</template>

<script>
  // 导入星星图标
  import 'vue-awesome/icons'
  import API from '../api'
  // 导入Icon组件,name属性来定义图标
  import Icon from 'vue-awesome/components/Icon'
  // export default模块将对象文字导出为组件的视图模型
  export default {
    // props传参
    // prop验证：检查类型，要求定义一个prop属性，设置默认值，执行已定义验证
    //props: ['grade','maxStars','hasCounter'],
    props: {
      movieId: Number,
      grade: {
        type: Number,
        required: true
      },
      maxStars: {
        type: Number,
        default: 5
      },
      hasCounter: {
        type: Boolean,
        default: true
      }
    },
    name: 'Rating',
    components: {Icon},
    data() {
      return {
        stars: this.grade,
      }
    },
    methods: {
      rate(star) {
        // 设置star为数字，小于最大值并且大于等于0
        if (typeof star === 'number' && star <= this.maxStars && star >= 0) {
          this.stars = this.stars === star ? star - 1 : star
        }
        var params = {
          'username': localStorage.getItem('user_id'),
          'movieId': this.movieId,
          'score': this.stars
        }
        API.movie.score(params)
          .then(function (resp) {
          }.bind(this))
      },

    }

  }
</script>
<style scoped>
  /* scoped 告诉vue去范围化样式，样式范围不会覆盖到其他地方 */
  .rating {
    font-family: 'Avenir', Arial, Helvetica, sans-serif;
    font-size: 14px;
    color: #a7a8a8;
  }

  .list {
    margin: 0 0 5px 0;
    padding: 0;
    list-style-type: none;
  }

  .list:hover .star {
    color: #f3d23e;
  }

  .star {
    display: inline-block;
    cursor: pointer;
  }

  .star:hover ~ .star:not(.active) {
    color: inherit;
  }

  .active {
    color: #f3d23e;
  }
</style>

