<template>
  <v-app>
    <v-snackbar :timeout="4000" top :color="color" v-model="snackbar">
      {{msg}}
      <v-btn @click="snackbar=false" dark>Close</v-btn>
    </v-snackbar>
    <v-toolbar>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>

      <v-toolbar-items>
        <v-btn v-for="item of itemsNav" :key="item.title" flat>{{ item.title }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>

    <v-footer fixed app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "empty",
  data() {
    return {
      msg: "",
      snackbar: false,
      color: "info",
      title: "Nuxt-CRM",
      itemsNav: [
        {
          icon: "apps",
          title: "Home",
          to: "/"
        },
        {
          icon: "bubble_chart",
          title: "Login",
          to: "/admin/login"
        },
        {
          icon: "bubble_chart",
          title: "Register",
          to: "/admin/register"
        }
      ]
    };
  },
  mounted() {
    if (this.$route.query) {
      const { message } = this.$route.query;

      switch (message) {
        case "login":
          this.msg = "Plase loggin";
          this.snackbar = true;
          this.color = "info";
          break;
        case "logout":
          this.msg = "Logout Success!";
          this.snackbar = true;
          this.color = "success";
          break;
        case "session":
          this.msg = "Login expired nitte log in again";
          this.snackbar = true;
          this.color = "warning";
          break;
      }
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    message() {
      return this.$store.getters.message;
    }
  },
  watch: {
    error(value) {
      this.msg = value;
      this.snackbar = true;
      this.color = "error";
    },
    message(value) {
      this.msg = value;
      this.snackbar = true;
      this.color = "success";
    }
  }
};
</script>

<style scoped>
</style>
