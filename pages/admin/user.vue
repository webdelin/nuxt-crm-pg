<template>
  <v-card-text>
    <v-form v-model="valid" ref="form" validation>
      <v-text-field
        prepend-icon="email"
        name="email"
        label="Email"
        type="email"
        v-model="email"
        :rules="emailRules"
      ></v-text-field>

      <v-text-field
        prepend-icon="lock"
        name="password"
        label="Password"
        type="password"
        v-model="password"
        :counter="6"
        :rules="passwordRules"
      ></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="onSubmit" :loading="loading" :disabled="!valid">Login</v-btn>
      </v-card-actions>
    </v-form>
  </v-card-text>
</template>

<script>
export default {
  middleware: ["admin-auth"],
  layout: "admin",
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      loading: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Password must be equal 6 characters"
      ]
    };
  },
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const formData = {
            email: this.email,
            password: this.password
          };
          await this.$store.dispatch("auth/createUser", formData);
          this.msg = "New User created";
          this.snackbar = true;
          this.password = "";
          this.email = "";
          this.$refs.form.validate().reset();
        } catch (e) {
          this.loading = false;
        }
      }
    }
  }
};
</script>
<style scoped>
</style>
