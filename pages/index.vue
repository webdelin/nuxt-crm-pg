<template>
  <div>
    <v-card>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex
            v-for="card in posts"
            :key="card.id"
            v-bind="{ [`xs${card.flex}`]: true }"
            post="post"
          >
            <v-card color="cyan darken-2" class="white--text">
              <v-layout>
                <v-flex xs5>
                  <v-img :src="getPic(card.image || no_image)" height="125px" contain></v-img>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline" v-text="card.title"></div>
                      <div>{{card.text}}</div>
                      <div>{{ new Date(card.createdAt).toLocaleString('de-DE', dateDetail) }}</div>
                      <div>Ansichten: {{card.views}}</div>
                      <div>user_id: {{card.user_id}}</div>
                      <div>card id: {{card.id}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                <v-btn color="info" @click="openPost(card.id)">Info</v-btn>
                <v-spacer></v-spacer>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      require: true
    }
  },
  head: {
    title: "Home"
  },
  async asyncData({ store }) {
    const posts = await store.dispatch("post/fetchUser");
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
      no_image: "/no_image.png"
    };
  },
  methods: {
    getPic(image) {
      return require("@/storage" + image);
    },
    openPost(id) {
      this.$router.push(`/post/${id}`);
    }
  }
};
</script>
