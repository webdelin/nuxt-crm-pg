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
          <img width="200px" :src="getPic(post.image || no_image)">
          <v-card-title primary-title>
            <div>
              <div class="headline">{{ post.title }}</div>
              <span class="grey--text">{{ post.views }}</span>
              <span class="grey--text">Comments {{ post.comments }}</span>
            </div>
          </v-card-title>
          <app-comment-form v-if="canAddComment" @created="createComentHandler" :post_id="post.id"/>

          <app-comments v-for="comment in post.comments" :key="comment.id" :comment="comment"/>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import AppCommentForm from "@/components/main/CommentForm";
import AppComments from "@/components/main/Comments";
export default {
  head() {
    return {
      title: `Post | ${this.post.title}`
    };
  },

  validate({ params }) {
    return Boolean(params.id);
  },
  async asyncData({ store, params }) {
    const post = await store.dispatch("post/fetchById", params.id);
    await store.dispatch("post/addView", post);
    return {
      post: { ...post, views: ++post.views }
    };
  },
  data() {
    return {
      canAddComment: true,
      no_image: "/no_image.png",
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
  },
  methods: {
    getPic(image) {
      return require("@/storage" + image);
    },
    createComentHandler(comment) {
      //this.post.comments.unshift(comment);
      this.canAddComment = false;
    }
  },
  components: { AppCommentForm, AppComments }
};
</script>
