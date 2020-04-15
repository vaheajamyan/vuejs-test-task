<template>
  <div class="middle">
    <form class="sing-in__form" v-on:submit="login">
      <h2 class="sign-in__title"> Sign In</h2>
      <label class="sign-in__label">
        <span class="login__title">Username</span>
        <input type="text" class="login" v-model="userName">
      </label>
      <label class="sign-in__label">
        <span class="password__title">Password</span>
        <input type="password" class="password" v-model="password">
      </label>
      <div v-if="error" class="error">Incorrect Username or Password</div>
      <button type="submit" class="sign-in__submit"> Submit</button>
    </form>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                userName: '',
                password: '',
                error: false,
            }
        },
        mounted () {
            if (this.$store.state.token && this.$route.name === 'Sign-in')  {
                this.$router.push({ path: '/posts' });
            }
        },
        methods: {
            login: async function(evt) {
                evt.preventDefault();
                if (!this.userName || !this.password) {
                    this.error = true;
                    return;
                }
                const params = {
                    username: this.userName,
                    password: this.password,
                };
                const response = await this.$axios.post('http://localhost:8880/api/login', params);
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    this.error = false;
                    this.$store.dispatch('setToken', response.data.token);
                    this.$router.push({ path: '/posts' });
                } else if(response.data.errors) {
                    this.error = true;
                }
            }
        }
    }
</script>

<style scoped>
  .middle {
    flex: 1 1 auto;
    background: rgb(66, 184, 132);
    background: linear-gradient(135deg, rgba(66, 184, 132, 1) 0%, rgba(72, 99, 110, 1) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sing-in__form {
    display: flex;
    flex-direction: column;
    padding: 30px 40px 50px;
    background-color: #37495f;
    color: #ffffff;
    border-radius: 15px;
    overflow: hidden;
  }

  .sign-in__title {
    margin: 0;
    font-size: 25px;
    padding: 10px 0;
    text-align: center;
  }

  .sign-in__label {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
  }

  .sign-in__submit {
    background-color: #ffffff;
    border: 0;
    width: 85px;
    padding: 5px 0;
    border-radius: 15px;
    margin: 10px auto;
  }

  .login__title {
    padding-bottom: 5px;
  }

  .error {
    font-size: 13px;
    color: red;
    text-align: center;
  }

</style>
