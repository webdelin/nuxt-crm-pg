<template>
  <v-app>
    <v-snackbar :timeout="4000" top color="primary" v-model="snackbar">
      {{msg}}
      <v-btn @click="snackbar=false" dark>Close</v-btn>
    </v-snackbar>
    <v-toolbar>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>

      <v-toolbar-items>
        <v-btn v-for="item of itemsNav" :key="itemsNav.title" flat>{{ item.title }}</v-btn>
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
    const { message } = this.$route.query;

    switch (message) {
      case "login":
        this.msg = "Plase loggin";
        this.snackbar = true;
        break;
      case "logout":
        this.msg = "Logout Success!";
        this.snackbar = true;
        break;
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(value) {
      this.msg = value;
      this.snackbar = true;
    }
  }
};
</script>

<style scoped>
</style>
