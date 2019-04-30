<template>
  <v-container>
    <v-layout row>
      <v-flex xs-12>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login</v-toolbar-title>
                </v-toolbar>
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
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="onSubmit" :loading="loading" :disabled="!valid">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: "empty",
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
          await this.$store.dispatch("auth/login", formData);
          this.$router.push("/admin");
        } catch (e) {
          console.log("e", e);
          this.loading = false;
        }
      }
    }
  }
};
</script>

<style>
</style>
