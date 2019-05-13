<template>
  <div>
    <v-breadcrumbs :items="itemsCrumb">
      <template v-slot:divider>
        <v-icon>chevron_right</v-icon>
      </template>
    </v-breadcrumbs>
    <p>{{ user.username }}</p>
		<p>ID: {{ user.id }}</p>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card>
            <v-card-text>
              <v-form v-model="valid" ref="form" validation>
								<v-textarea
									name="username"
									label="Posttext"
									value=""
									type="textarea"
									v-model="username"
									:counter="10"
									:rules="textRules"
								></v-textarea>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="onSubmit" :loading="loading" :disabled="!valid">Update Post</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  middleware: ["admin-auth"],
  layout: "admin",
  head() {
    return {
      title: `User | ${this.user.username}`
    };
  },
  async asyncData({ store, params }) {
    const user = await store.dispatch("user/fetchAdminById", params.id);
    return { user };
  },
  data() {
    return {
      text: "",
      valid: false,
      loading: false,
      textRules: [v => v.length >= 10 || "Text must be equal 10 characters"],

      itemsCrumb: [
        {
          text: "User",
          disabled: false,
          to: "/admin/user"
        },
        {
          text: `User | `,
          disabled: true
        }
      ]
    };
	},
	mounted(){
		this.text = this.user.username
	},
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const formData = {
            username: this.username,
            id: this.user.id
          };
          await this.$store.dispatch("user/updateUser", formData);
          this.loading = false;
        } catch (e) {
          console.log("e", e);
          this.loading = false;
        }
      }
    }
  }
};
</script>
