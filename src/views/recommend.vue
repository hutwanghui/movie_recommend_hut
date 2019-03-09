<template>
    <ul class="movies-recommend__list">
        <li v-for="(movie, index) in movies" :key="movies" class="movies-item-recommend">
          <a class="movies-item-recommend__link" :class="{'no-image': noImage}" :href="'/movie/' + movie.id"
             @click.prevent="openMoviePopup(movie.id, true)">
              <img v-if="!noImage" class="movies-item-recommend__img" src="../assets/placeholder.png" v-img="poster(movie.poster_path)" alt="">
              <img v-if="noImage" class="movies-item-recommend__img is-loaded" src="../assets/no-image.png" alt="">
            <div class="movies-item-recommend__content">
              <p class="movies-item-recommend__title">{{ movie.title }}</p>
            </div>
          </a>
        </li>
    </ul>
</template>

<script>
  import axios from 'axios'
  import numeral from 'numeral'
  import storage from '../storage.js'
  import img from '../directives/v-image.js'

  export default {
    name: "recommend",
    props: ['type', 'mode', 'category', 'shortList','movie'],
    directives: {
      img: img
    },
    beforeRouteLeave(to, from, next) {
      if (from.name === 'search') {
        this.$root.eventHub.$emit('setSearchQuery', true)
      }
      next()
    },
    data() {
      return {
        listTitle: '',
        movies: [],
        pages: '',
        results: '',
        currentPage: 1,
        listLoaded: false,
        noImage: false
      }
    },
    computed: {
      pageTitle() {
        return this.listTitle + storage.pageTitlePostfix
      },
      query() {
        return this.$route.params.query || ''
      },
      request() {
        return `https://api.themoviedb.org/3/movie/popular?api_key=${storage.apiKey}&language=zh-cn&page=${this.currentPage}`
      },
      countResults() {
        if (this.results > 1) {
          return numeral(this.results).format('0,0') + ' results'
        } else {
          return numeral(this.results).format('0,0') + ' result'
        }
      }
    },
    methods: {
      poster(path) {
        if (path) {
          return 'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + path
        } else {
          this.noImage = true
        }
      },
      openMoviePopup(id, event) {

        this.$root.eventHub.$emit('openMoviePopup', id, event)
      },
      fetchCategory() {
        axios.get(this.request, {headers: {'Authorization': 'beraer ' + storage.sessionId}})
          .then(function (resp) {
            let data = resp.data
            if (this.shortList) {
              this.movies = data.results.slice(0, 5)
              this.pages = 1
              this.results = 5
            } else {
              this.movies = data.results
              this.pages = data.total_pages
              this.results = data.total_results
            }
            this.listLoaded = true
            // Change Page title
            if (this.type == 'page') {
              document.title = this.pageTitle
            }
          }.bind(this))
          .catch(function (error) {
            this.$router.push({name: '404'})
          }.bind(this))
      },
      updateFavorite() {
        if (this.mode == 'favorite') {
          let promises = [], movies = [], pages, results
          for (let i = 1; i <= this.currentPage; i++) {
            promises.push(axios.get(`https://api.themoviedb.org/3/account/${storage.userId}/favorite/movies?api_key=${storage.apiKey}&session_id=${storage.sessionId}&language=zh-cn&sort_by=created_at.desc&page=${i}`))
          }
          axios.all(promises).then(function (results) {
            results.forEach(function (resp) {
              // window.alert(resp.data)
              let data = resp.data
              movies = movies.concat(data.results)
              pages = data.total_pages
              results = data.total_results
            })
            this.movies = movies
            this.pages = pages
            if (this.currentPage > pages) {
              this.currentPage -= 1
            }
            this.results = results
          }.bind(this))
        }
      }
    },
    watch: {
      query(value) {
        this.fetchCategory(value)
      }
    },
    created() {
      // Set List Title
      this.fetchCategory()
      // this.$root.eventHub.$on('updateFavorite', this.updateFavorite)
    }
  }
</script>
<style lang="scss">
  @import "../scss/variables";
  @import "../scss/media-queries";
  .movies-recommend {

    @include tablet-min {
      padding: 15px;
    }
    @include tablet-landscape-min {
      padding: 25px;
    }
    @include desktop-min {
      padding: 30px;
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @include tablet-min {
        padding: 23px 15px;
      }
      @include tablet-landscape-min {
        padding: 16px 25px;
      }
      @include desktop-min {
        padding: 8px 30px;
      }
    }
    &__title {
      margin: 0;
      font-size: 16px;
      line-height: 16px;
      color: $c-dark;
      font-weight: 300;
      @include tablet-min {
        font-size: 18px;
        line-height: 18px;
      }
    }
    &__results {
      font-size: 12px;
      font-weight: 300;
      letter-spacing: 0.5px;
      color: rgba($c-dark, 0.5);
    }
    &__link {
      font-size: 12px;
      font-weight: 300;
      letter-spacing: 0.5px;
      color: rgba($c-dark, 0.5);
      text-decoration: none;
      transition: color 0.5s ease;
      &:after {
        content: " →";
      }
      &:hover {
        color: $c-dark;
      }
    }
    &__list {
      padding: 0;
      margin: 0;
      width:80px;
      list-style: none;
      display: table;
      flex-wrap: wrap;
    }
    &__item {
      width: 50%;
      @include tablet-min {
        padding: 15px;
      }
      @include tablet-landscape-min {
        padding: 20px;
        width: 25%;
      }
      @include desktop-min {
        padding: 30px;
        width: 20%;
      }
    }
    &__nav {
      padding: 25px 0;
      text-align: center;
      &.is-hidden {
        display: none;
      }
    }
  }
  .movies-item-recommend {
    &__link {
      text-decoration: none;
      color: rgba($c-dark, 0.5);
      font-weight: 300;
    }
    &__content {
      padding-top: 15px;
    }
    &__img {
      width: 100%;
      opacity: 0;
      transform: scale(0.97) translateZ(0);
      transition: opacity 0.5s ease, transform 0.5s ease;
      &.is-loaded {
        opacity: 1;
        transform: scale(1);
      }
    }
    &__link:not(.no-image):hover &__poster {
      transform: scale(1.03);
      box-shadow: 0 0 10px rgba($c-dark, 0.1);
    }
    &__title {
      margin: 0;
      font-size: 11px;
      letter-spacing: 0.5px;
      color: rgba($c-white, 0.7);
      @include mobile-ls-min {
        font-size: 12px;
      }
      @include tablet-min {
        font-size: 14px;
      }
    }
    &__link:hover &__title {
      color: rgba($c-green, 0.7);
    }
  }
  ul{

  }
</style>
