<template>
  <v-card-text>
    <v-form v-model="valid" ref="form" validation>
      <v-text-field
        prepend-icon="account_circle"
        name="username"
        label="Username"
        type="username"
        v-model="username"
        :rules="usernameRules"
      ></v-text-field>

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
			<v-text-field
				prepend-icon="lock" 
				name="confirmPassword"
				label="Confirm Password"
				type="password"
				v-model="confirmPassword"
				:counter="6"
				:rules="confirmPasswordRules">
			</v-text-field>
		
      <v-flex xs12 sm6 d-flex>
			<v-select
          v-model="select"
          :hint="`Client register as ${select.role}`"
          :items="items"
          item-text="role"
          item-value="abbr"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </v-flex>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="onSubmit" :loading="loading" :disabled="!valid">Create User</v-btn>
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
      confirmPassword: "",
      role: "",
      username: "",
      email: "",
      password: "",
      valid: false,
      loading: false,
        select: { role: 'User' },
        items: [
          { role: 'User' },
          { role: 'Reader' },
          { role: 'Admin' },
          { role: 'Manager' },
        ],
      usernameRules: [
        v => !!v || "Username is required",
        v => v.length >= 3 || "Min must be equal 3 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Password must be equal 6 characters"
      ],
				confirmPasswordRules: [
					v => !!v || 'Password is required',
					v => v === this.password || 'Password should match'
				],

    }
  },
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          const formData = {
            username: this.username,
            email: this.email,
						password: this.confirmPassword,
						role: this.select.role
					}
					console.log(this.$refs.form)
          await this.$store.dispatch("auth/create", formData)
          this.msg = "New User created"
          this.snackbar = true
          this.username = ""
          this.password = ""
          this.confirmPassword = ""
          this.email = "";
          this.$refs.form.validate().reset()
        } catch (e) {
          this.loading = false
        }
      }
    }
  }
};
</script>
<style scoped>
</style>
