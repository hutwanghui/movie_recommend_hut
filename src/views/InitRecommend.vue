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
          :style="`background-image:url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/${data.key.poster_path})`"
        >
        </div>

      </template>
      <img class="like-pointer" slot="like" src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/like-txt.png">
      <img class="nope-pointer" slot="nope" src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/nope-txt.png">
      <img class="super-pointer" slot="super"
           src="https://johnnydan.oss-cn-beijing.aliyuncs.com/vue-tinder/super-txt.png">

    </tinder>
    <div class="movieMsg" v-if="movie&&show==false" >
      <p>片名：{{movie.title}}</p>
      <p>简介：{{movie.overview}}</p>
      <p>大众评分：{{movie.vote_average}}</p>
      <p>上映日期：{{movie.release_date}}</p>
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
  import API from '../api'

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
        movies: [],
        movie: {
          id: 433059,
          myindex: 0,
          vote_count: 9,
          video: "false",
          vote_average: 7.3,
          title: "Take Every Wave: The Life of Laird Hamilton",
          popularity: 2.724,
          poster_path: "/ietXVQSdd7vF9i5WyZXgLEO3Aei.jpg",
          original_language: "en",
          original_title: "Take Every Wave: The Life of Laird Hamilton",
          backdrop_path: "/6quxvRdLkpsaONtVxCUO3Sx1nnu.jpg",
          adult: "false",
          overview: "迈克（迈克•比尔比利亚 Mike Birbiglia 饰）自小梦想当一名喜剧演员，尚处在起步期的他面对演绎事业的重重失败，总是安慰鼓励着自己勇敢前进。生存的现实，让他不得不在一家有喜剧演出的酒吧当酒保来赚取外快。和他相恋八年的女友艾比（劳伦•艾波罗丝 Lauren Ambrose 饰）在布鲁克林一家工作室当声乐老师，迟迟未有结婚打算的麦克让艾比很是着急，而麦克妹妹珍妮特的订婚更成了两人关系的导火索。面对事业的不如意，艾比和家人逼婚的压力，现实让麦克难以面对，一而再，再而三的遭遇神秘的梦游事件，甚至危害到了他的人身安全…\\r 　　该片改编自迈克•比尔比利亚从喜剧演员到导演的真实故事，由麦克自导自演，讲述着他对梦想的追逐。",
          release_date: "2018-05-07"
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
        API.movie.initGet().then(({data}) => {
          let list = [];
          this.movies = data.movies;
          for (let j = 0; j < 10; j++) {
            this.movies[j].myindex=j+1;
          }
          for (let i = 0; i < 10; i++) {
            list.push({
              key: data.movies[i],
            })
          }
          this.queue = this.queue.concat(list)
        });
      },
      showMe() {
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, this.timeOut)
      },
      changeMovieInfo(data) {
        this.movie.id = data.id;
        this.movie.title = data.title;
        this.movie.overview = data.overview;
        this.movie.vote_average = data.vote_average;
        this.movie.release_data = data.release_date;
        this.movie.poster_path=data.poster_path;
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
        console.info("===="+choice.key.myindex);
        this.changeMovieInfo(this.movies[choice.key.myindex<10?choice.key.myindex:10]);
        switch (choice.type) {
          case 'nope': // 左滑
            console.info("【用户：" + localStorage.getItem('user_id') + "】触发左移事件");
            break;
          case 'like': // 右滑
            console.info("【用户：" + localStorage.getItem('user_id') + "】触发右滑事件");
            break;
          case 'super': // 上滑收藏
            var params_favourite = {
              'username': localStorage.getItem('user_id'),
              'movieId': this.movie.id,
              'favorite': 'true'
            }
            API.movie.addOrRemoveFavorite(params_favourite).then(({data}) => {
              console.info("【用户：" + localStorage.getItem('user_id') + "】触发上滑事件");
            });
            break;
        }
        var params = {
          'user_id': localStorage.getItem('user_id'),
          'movie_id': this.movie.id,
          'likeOrnot': choice.type
        };
        API.movie.initSave(params).then(({data}) => {
          console.info("回调结果哦：" + data);
        });
        if (this.queue.length == 1) {
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
    width: 1000px;
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
