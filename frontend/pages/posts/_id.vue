<template>
  <div class="middle">
    <div class="post__field">
      <div class="post__body" v-if="post">
        <h2 class="post__title">{{post.title}}</h2>
        <div class="post__text">{{post.body}}</div>
      </div>
      <div class="post__head">
        <button class="back" @click="goBack()"> Back</button>
      </div>
    </div>
    <Loader v-if="loading"/>
  </div>
</template>

<script>
    import Loader from "../../components/Loader"
    export default {
        data() {
            return {
                id: this.$route.params['id'],
                post: null,
                loading: true,
            }
        },
        mounted() {
            if (!this.$store.state.token) {
                this.$router.push({path: '/sign-in'});
            }
        },
        components: {
            Loader,
        },
        watch: {
            $route(toR) {
                this.id = toR.params['id']
            }
        },
        methods: {
            goBack() {
                this.$router.push('/posts')
            },
            async getPost(id) {
                console.log(this.$store.state.data[id]);
                if(!this.$store.state.data[id]) {
                    const res = await this.$axios.$get(`https://jsonplaceholder.typicode.com/posts/${id}`);
                    this.post = res;
                    this.$store.dispatch('setData', this.post);
                } else {
                    this.post = this.$store.state.data[id];
                }
                this.loading = false;
            }
        },
        created() {
            this.getPost(this.id);
        }
    }
</script>

<style scoped>

  .middle {
    flex: 1 1 auto;
    background: rgb(66, 184, 132);
    background: linear-gradient(135deg, rgba(66, 184, 132, 1) 0%, rgba(72, 99, 110, 1) 100%);
  }

  .post__field {
    max-width: 1200px;
    margin: 30px auto;
    padding: 0;
  }

  .back {
    display: inline-block;
    border: 1px solid #ffffff;
    padding: 3px 10px;
    color: #ffffff;
    text-decoration: none;
    transition: .3s;
    background-color: transparent;
    cursor: pointer;
  }

  .back:hover {
    color: #000000;
    background-color: #ffffff;
  }

  .post__head {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .post__title {
    color: #ffffff;
    font-size: 25px;
    font-weight: 700;
    text-align: center;
    text-transform: capitalize;
  }

  .post__text {
    text-align: center;
    color: #ffffff;
    font-size: 20px;
  }

</style>
