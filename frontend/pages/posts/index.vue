<template>
  <div class="middle">
    <ul class="post__list">
      <li
        class="post__list"
        v-for="post of posts "
        :key="post.id"
      >
        <div class="post">{{ post.title }}</div>
        <nuxt-link
          class="post__link"
          tag="a"
          :to="'/posts/' + post.id"

        >
          подробнее
        </nuxt-link>
      </li>
      <Loader v-if="loading"/>
    </ul>
  </div>
</template>

<script>

    import Loader from "../../components/Loader"

    export default {
        mounted() {
            if (!this.$store.state.token) {
                this.$router.push({path: '/sign-in'});
            }
        },
        data() {
            return {
                posts: null,
                loading: true,
            }
        },
        components: {
            Loader
        },
        methods: {
            async getPosts() {
                const res = await this.$axios.$get('https://jsonplaceholder.typicode.com/posts');
                this.posts = res;
                this.loading = false;
            }
        },
        created() {
            this.getPosts();
        }
    }
</script>

<style scoped>

  .middle {
    flex: 1 1 auto;
    background: rgb(66, 184, 132);
  }

  .post__list {
    max-width: 1200px;
    margin: 30px auto;
    padding: 0;
    list-style-type: none;
  }

  .post__link {
    display: inline-block;
    border: 1px solid #ffffff;
    padding: 3px 10px;
    color: #ffffff;
    text-decoration: none;
    transition: .3s;
  }

  .post__link:hover {
    color: #000000;
    background-color: #ffffff;
  }

  .post {
    font-size: 22px;
    padding: 10px 0;

  }
</style>
