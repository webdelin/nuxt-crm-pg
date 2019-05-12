<template>
  <v-card>
    <v-card-title>
      <v-dialog v-model="dialog" max-width="680px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Post</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">New Post</span>
          </v-card-title>

          <v-card-text>
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
                      <v-btn color="blue" dark @click="close">Cancel</v-btn>
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
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="posts" :search="search">
      <template v-slot:items="props">
        <td>
          <img width="60" :src="getPic(props.item.image || no_image)">
        </td>
        <td>{{ props.item.title }}</td>

        <td>{{ new Date(props.item.createdAt).toLocaleString('de-DE', dateDetail) }}</td>
        <td>{{ props.item.views }}</td>
        <td>{{ props.item.comment }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item.id)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item.id)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-results>
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  middleware: ["admin-auth"],
  layout: "admin",
  async asyncData({ store }) {
    const posts = await store.dispatch("post/fetchAdmin");
    return { posts };
  },
  data() {
    return {
      vorschau: false,
      dialog: false,
      title: "",
      text: "",
      valid: false,
      loading: false,
      image: null,
      imageSrc: "",
      dateDetail: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      },
      no_image: "/no_image.png",
      search: "",
      headers: [
        {
          text: "Bild",
          align: "left",
          sortable: false,
          prop: "image",
          value: "image"
        },
        {
          text: "Name",
          align: "left",
          sortable: false,
          prop: "title",
          value: "title"
        },
        { text: "Date", value: "date", prop: "date" },
        { text: "Views", value: "views", prop: "views" },
        { text: "Comments", value: "comments", prop: "comments" },
        { sortable: false, text: "Actions" }
      ],
      titleRules: [
        v => !!v || "Title is required",
        v => v.length >= 10 || "Title must be equal 10 characters"
      ],
      textRules: [v => v.length >= 10 || "Text must be equal 10 characters"]
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    async editItem(id) {
      this.$router.push(`/admin/post/${id}`);
    },
    getPic(image) {
      return require("@/storage" + image);
    },
    async deleteItem(id) {
      try {
        const index = await this.posts.indexOf(id);
        confirm(`Delete Post with ID ${id} ?`) && this.posts.splice(index, 1);
        await this.$store.dispatch("post/deleteItem", id);
      } catch (e) {}
    },
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
            (this.title = ""),
            (this.text = ""),
            (this.image = ""),
            (this.imageSrc = "")
          ),
            (this.msg = "New Post created");
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