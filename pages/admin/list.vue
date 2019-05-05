<template>
  <v-card>
    <v-card-title>
      Posts
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
        <td>{{ props.item.comments }}</td>
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
      ]
    };
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
    }
  }
};
</script>
