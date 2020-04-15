<template>
  <header class="header">
    <div class="header__field">
      <div @click="navigate" class="header__logo">
        <img src="../assets/logo.png" alt="Logo" class="header__logo-img">
      </div>
      <div class="header__menu">Здесь будет навигация</div>
    </div>
  </header>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            navigate() {
                if (localStorage.getItem('token')) {
                    this.$router.push('/posts')
                } else {
                    this.$store.dispatch('setToken', '');
                    this.$router.push('/sign-in');
                }
            }
        }
    }
</script>

<style scoped>
  .header {
    background-color: #37495f;
    color: #ffffff;
  }

  .header__field {
    width: 95%;
    margin: 0 auto;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header__menu {
    font-size: 30px;
    margin-right: 20%;
    letter-spacing: 10px;
  }

  .header__logo {
    width: 70px;
  }

  .header__logo-img {
    width: 100%;
    height: auto;
  }
</style>
