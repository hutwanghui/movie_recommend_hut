<template>
  <section class="tinder">
    <loading :show="show"
             :label="label"
             :overlay="overlay">
    </loading>
    <tinder class="tinder"
            ref="tinder"
            :queue.sync="queue"
            @submit="submit"
            v-if="show==false"
    >
      <template slot-scope="{data}">
        <div
          class="picture"
          :style="`background-image:url(https://picsum.photos/710/1152/?random=${data.key})`">
        </div>

      </template>
      <img class="like-pointer" slot="like" src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/like-txt.png">
      <img class="nope-pointer" slot="nope" src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/nope-txt.png">
      <img class="super-pointer" slot="super"
           src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/super-txt.png">
    </tinder>
    <div class="movieMsg" v-if="movie&&show==false">
      <p>{{movie.title}}</p>
      <p>{{movie.overview}}</p>
      <p>{{movie.vote_average}}</p>
      <p>{{nestedDataToString(movie.genres)}}</p>
      <p>{{movie.release_date}}</p>
    </div>
    <div class="btns" v-if="show==false">
      <img src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/nope.png" @click="decide('nope')">
      <img src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/super-like.png" @click="decide('super')">
      <img src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/like.png" @click="decide('like')">
    </div>
  </section>

</template>

<script>
  import TinderCard from "vue-tinder/src/components/TinderCard";
  import Tinder from "vue-tinder/src/components/Tinder";
  import Loading from "vue-full-loading"

  export default {
    name: "InitRecommend",
    components: {Loading, Tinder, TinderCard},
    data() {
      return {
        queue: [],
        show: false,
        overlay: true,
        label: '感谢您的配合...',
        timeOut: 2000,
        movie: {
          title: "test",
          overview: "这是电影简介！！！！",
          genres: [
            {id: 28, name: "动作"}, {id: 16, name: "动画"}, {id: 878, name: "科幻"}
          ],
          release_date: "2018-12-14",
          vote_average: 7.5
        },
      }
    },
    created() {
      this.getData()
    },
    methods: {
      /**
       * 用于产生demo用的数据
       * @method getData
       */
      getData() {
        const list = []
        for (let i = 0; i < 5; i++) {
          list.push({
            key: Math.random()
          })
        }
        this.queue = this.queue.concat(list)
      },
      // 获取标签名称
      nestedDataToString(data) {
        let nestedArray = [], resultString
        data.forEach((item) => nestedArray.push(item.name))
        resultString = nestedArray.join(', ')
        return resultString
      },
      showMe() {
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, this.timeOut)
      },
      /**
       * 点击按钮所绑定的方法，此方法为调用vue-tinder组件内方法的示例，仅供参考
       * @method submit
       * @param  {String} choice
       */
      decide(choice) {
        this.$refs.tinder.decide(choice)
      },
      /**
       * 自定义事件submit绑定的方法，移除卡片的回调
       * @method submit
       * @param  {Object} choice {type,key}
       */
      submit(choice) {
        switch (choice) {
          case 'nope': // 左滑
            break;
          case 'like': // 右滑
            break;
          case 'super': // 上滑
            break;
        }
        if (this.queue.length == 0) {
          this.showMe();
          console.info("完成初始化");
          this.getData();
        }
      }
    },
  }
</script>

<style scoped>
  /* 此样式可能仅适用本demo，仅供参考，可根据具体设计稿或喜好自定义 */
  html, body {
    height: 100%;
  }

  body {
    background: #20262E;
    overflow: hidden;
  }

  /* 注意！组件的宽高必须设置，不然出不来！！！ */
  .tinder {
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 23px;
    margin: auto;
    width: calc(100% - 20px);
    height: calc(100% - 23px - 18%);
    min-width: 300px;
    max-width: 355px;
    min-height: 500px;
    max-height: 555px;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  /* 卡片内的3种状态指示器位置，透明度会由组件自动调整 */
  .nope-pointer {
    right: 10px;
  }

  .like-pointer {
    left: 10px;
  }

  .nope-pointer,
  .like-pointer {
    position: absolute;
    z-index: 1;
    top: 20px;
    width: 64px;
    height: 64px;
  }

  .super-pointer {
    position: absolute;
    z-index: 1;
    bottom: 80px;
    left: 0;
    right: 0;
    margin: auto;
    width: 112px;
    height: 78px;
  }

  /* slot内图片样式 */
  .picture {
    width: 100%;
    height: 100%;
    background-size: cover;
  }

  /* 按钮样式 */
  .btns {
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 18%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 300px;
    max-width: 355px;
  }

  .movieMsg {
    position: absolute;
    z-index: 1;
    left: 400px;
    right: 0;
    top: 23px;
    margin-top: 40px;
    max-width: 400px;
    min-width: 200px;
    max-height: 400px;
    min-height: 200px;
  }

  .btns img {
    width: 80px;
  }


</style>
