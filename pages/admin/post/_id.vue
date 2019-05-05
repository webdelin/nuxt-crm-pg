<template>
  <div>
    <v-breadcrumbs :items="itemsCrumb">
      <template v-slot:divider>
        <v-icon>chevron_right</v-icon>
      </template>
    </v-breadcrumbs>
    <p>{{ post.title }}</p>
		<p>ID: {{ post.id }}</p>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card>
            <v-card-text>
              <v-form v-model="valid" ref="form" validation>
								<v-textarea
									name="text"
									label="Posttext"
									value=""
									type="textarea"
									v-model="text"
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
      title: `Post | ${this.post.title}`
    };
  },
  async asyncData({ store, params }) {
    const post = await store.dispatch("post/fetchAdminById", params.id);
    return { post };
  },
  data() {
    return {
      text: "",
      valid: false,
      loading: false,
      textRules: [v => v.length >= 10 || "Text must be equal 10 characters"],

      itemsCrumb: [
        {
          text: "Posts",
          disabled: false,
          to: "/admin/list"
        },
        {
          text: `Post | `,
          disabled: true
        }
      ]
    };
	},
	mounted(){
		this.text = this.post.text
	},
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const formData = {
            text: this.text,
            id: this.post.id
          };
          await this.$store.dispatch("post/updatePost", formData);
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
