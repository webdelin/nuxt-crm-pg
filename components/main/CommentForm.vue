<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-form v-model="valid" ref="form" validation>
            <v-text-field
              name="title"
              label="Commentar Title"
              type="text"
              v-model="title"
              :counter="2"
              :rules="titleRules"
            ></v-text-field>
            <v-textarea
              name="text"
              label="Commentar Text"
              v-model="text"
              :counter="10"
              :rules="textRules"
            ></v-textarea>
            <v-spacer></v-spacer>
            <v-btn @click="onSubmit" :loading="loading" :disabled="!valid">Create Commentar</v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: {
    post_id: { type: String, required: true }
  },
  data() {
    return {
      title: "",
      text: "",
      valid: false,
      loading: false,
      titleRules: [
        v => !!v || "Title is required",
        v => v.length >= 2 || "Title must be equal 2 characters"
      ],
      textRules: [v => v.length >= 10 || "Text must be equal 10 characters"]
    };
  },

  methods: {
    clear() {
      this.$refs.form.reset();
    },
    async onSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const formData = {
          title: this.title,
          text: this.text,
          post_id: this.post_id
        };
        try {
          await this.$store.dispatch("comment/createComment", formData);
          (this.title = ""),
            (this.text = ""),
            (this.message = "New Commentar created");
          this.snackbar = true;
        } catch (e) {
        } finally {
          this.loading = false;
        }
      }
    }
  }
};
</script>
