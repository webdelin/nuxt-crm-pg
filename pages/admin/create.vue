<template>
  <div>
    <v-breadcrumbs :items="itemsCrumb">
      <template v-slot:divider>
        <v-icon>chevron_right</v-icon>
      </template>
    </v-breadcrumbs>
    <h1>New Post</h1>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card>
            <v-card-text>
              <v-form v-model="valid" ref="form" validation>
                <v-text-field
                  name="title"
                  label="Post Title"
                  type="text"
                  v-model="title"
                  :counter="10"
                  :rules="titleRules"
                ></v-text-field>
                <v-textarea
                  name="text"
                  label="Textarea"
                  v-model="text"
                  :counter="10"
                  :rules="textRules"
                ></v-textarea>
              </v-form>
            </v-card-text>

            <template>
              <div>
                <img :src="imageSrc" height="100" v-if="imageSrc">
              </div>
            </template>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-dialog v-model="dialog" max-width="680px">
                <template v-slot:activator="{ on }">
                  <v-btn color="success" dark class="mb-2" v-on="on">Forschau</v-btn>
                </template>
                <v-card>
                  <v-card-text>
                    <v-card-title>
                      <span class="headline">{{this.title}}</span>
                    </v-card-title>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <div :key="this.text">
                          <img :src="this.imageSrc" height="100">
                          <vue-markdown>{{this.text}}</vue-markdown>
                        </div>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="close">close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-spacer></v-spacer>
              <template>
                <v-btn color="warning" dark class="mb-2" @click="triggerUpload">
                  Upload
                  <v-icon right>cloud_upload</v-icon>
                  <input
                    ref="fileInput"
                    type="file"
                    style="display:none;"
                    accept="image/*"
                    @change="onFileChange"
                  >
                </v-btn>
              </template>
              <v-spacer></v-spacer>
              <v-btn
                @click="onSubmit"
                :loading="loading"
                :disabled="!valid || !imageSrc"
              >Create Post</v-btn>
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
      title: `Create Post`
    };
  },
  data() {
    return {
      dialog: false,
      title: "",
      text: "",
      valid: false,
      loading: false,
      image: null,
      imageSrc: "",
      titleRules: [
        v => !!v || "Title is required",
        v => v.length >= 10 || "Title must be equal 10 characters"
      ],
      textRules: [v => v.length >= 10 || "Text must be equal 10 characters"],

      itemsCrumb: [
        {
          text: "Posts",
          disabled: false,
          to: "/admin/list"
        },
        {
          text: `Create new Post`,
          disabled: true
        }
      ]
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    clear() {
      this.$refs.form.reset();
    },
    async onSubmit() {
      if (this.$refs.form.validate() && this.image) {
        this.loading = true;
        const formData = {
          title: this.title,
          text: this.text,
          image: this.image
        };
        try {
          await this.$store.dispatch("post/createPost", formData)(
            (this.title = "")
          ),
            (this.text = ""),
            (this.image = ""),
            (this.imageSrc = "");
          this.msg = "New Post created";
          this.snackbar = true;
        } catch (e) {
        } finally {
          this.loading = false;
        }
      }
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
      this.image = file;
    }
  }
};
</script>
