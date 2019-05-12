<template>
  <v-card>
    <v-card-title>
      <v-dialog v-model="dialog" max-width="680px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New User</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">New User</span>
          </v-card-title>
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
                :rules="confirmPasswordRules"
              ></v-text-field>

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
                <v-btn color="blue" dark @click="close">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="onSubmit" :loading="loading" :disabled="!valid">Create User</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="users" :search="search">
      <template v-slot:items="props">
        <td>
          <img width="60" :src="getPic(props.item.image || no_image)">
        </td>
        <td>{{ props.item.username }}</td>

        <td>{{ new Date(props.item.createdAt).toLocaleString('de-DE', dateDetail) }}</td>
        <td>{{ props.item.role }}</td>
        <td>{{ props.item.email }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item.id)">edit</v-icon>
          <v-icon small @click="deleteUser(props.item.id)">delete</v-icon>
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
    const users = await store.dispatch("user/fetchAdmin");
    return { users };
  },
  data() {
    return {
      confirmPassword: "",
      role: "",
      username: "",
      email: "",
      password: "",
      valid: false,
      loading: false,
      select: { role: "USER" },
      items: [
        { role: "USER" },
        { role: "READER" },
        { role: "ADMIN" },
        { role: "MANAGER" }
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
        v => !!v || "Password is required",
        v => v === this.password || "Password should match"
      ],
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
          text: "Username",
          align: "left",
          sortable: false,
          prop: "username",
          value: "username"
        },
        { text: "Register", value: "date", prop: "date" },
        { text: "Role", value: "role", prop: "role" },
        { text: "Email", value: "email", prop: "email" },
        { sortable: false, text: "Actions" }
      ]
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    async editItem(id) {
      this.$router.push(`/admin/user/${id}`);
    },
    getPic(image) {
      return require("@/storage/users" + image);
    },
    async deleteUser(id) {
      try {
        const index = await this.users.indexOf(id);
        confirm(`Delete User with ID ${id} ?`) && this.users.splice(index, 1);
        await this.$store.dispatch("user/deleteUser", id);
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
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const formData = {
            username: this.username,
            email: this.email,
            password: this.confirmPassword,
            role: this.select.role
          };
          console.log(this.$refs.form);
          await this.$store.dispatch("user/create", formData);
          this.msg = "New User created";
          this.snackbar = true;
          this.username = "";
          this.password = "";
          this.confirmPassword = "";
          this.email = "";
          this.$refs.form.validate().reset();
        } catch (e) {
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
<style scoped>
</style>
