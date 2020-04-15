<template>
  <div class="container">
    <Header/>

    <nuxt/>

    <Footer/>

  </div>
</template>

<script>
    import Header from '~/components/Header.vue'
    import Footer from '~/components/Footer.vue'

    export default {
        components: {
            Header, Footer
        },
        mounted () {
            if(this.$route.path === '/') {
                if (this.$store.state.token)  {
                    this.$router.push({ path: '/posts' });
                } else{
                    this.$router.push({ path: '/sign-in' });
                }
            }
        },
    }
</script>

<style>
  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

</style>
