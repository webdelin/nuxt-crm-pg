<template>
<div>
    <v-breadcrumbs :items="itemsCrumb">
      <template v-slot:divider>
        <v-icon>chevron_right</v-icon>
      </template>
    </v-breadcrumbs>
  <v-layout row>
    <v-flex xs12 sm12>
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        >
        </v-img>

        <v-card-title primary-title>
          <div>
            <div class="headline">{{ post.title }}</div>
            <span class="grey--text">{{ post.id }}</span>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat>Share</v-btn>
          <v-btn flat color="purple">Explore</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="show">{{ post.id }}</v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
	</div>
</template>



<script>
export default {
  head() {
    return {
      title: `Post | ${this.post.title}`
    };
  },
  async asyncData({ store, params }) {
    const post = await store.dispatch("post/fetchById", params.id);
    return { post };
  },
  data() {
    return {

      show: true,
      text: "",
      valid: false,
      loading: false,
      textRules: [v => v.length >= 10 || "Text must be equal 10 characters"],

      itemsCrumb: [
        {
          text: "Posts",
          disabled: false,
          to: "/"
        },
        {
          text: "`${this.post.title}`",
          disabled: true
        }
      ]
    };
	}
};
</script>
