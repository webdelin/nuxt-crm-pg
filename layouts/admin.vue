<template>
  <v-app :dark="isDark">
    <v-snackbar :timeout="4000" top color="primary" v-model="snackbar">
      {{msg}}
      <v-btn @click="snackbar=false" dark>Close</v-btn>
    </v-snackbar>
    <v-toolbar :clipped-left="clipped" app>
      <v-btn icon @click="drawer = !drawer">
        <v-icon>{{ `${drawer ? 'more_vert' : 'menu'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-if="drawer">{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title"/>
      <v-spacer/>

      <v-menu>
        <template #activator="{ on: menu }">
          <v-tooltip bottom>
            <template #activator="{ on: tooltip }">
              <v-btn icon v-on="{ ...tooltip, ...menu }">
                <v-icon>face</v-icon>
              </v-btn>
            </template>
            <span>Im A ToolTip</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-tile v-for="(item, index) in items" :key="index" @click>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>build</v-icon>
      </v-btn>
    </v-toolbar>

    <app-aside/>

    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>

    <v-navigation-drawer v-model="rightDrawer" :right="right" fixed>
      <v-list>
        <v-list-tile>
          <v-list-tile-action @click="rightDrawer=null">
            <v-icon>close</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Einstellungen</v-list-tile-title>
        </v-list-tile>
        <v-container fluid>
          <v-switch ligth label="Toggle dark them" v-model="isDark"></v-switch>
        </v-container>
      </v-list>
    </v-navigation-drawer>
    <v-footer fixed app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>


<script>
import AppAside from "@/components/admin/Aside";
export default {
  data() {
    return {
      msg: "",
      snackbar: false,
      isDark: false,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "bubble_chart",
          title: "Inspire",
          to: "/inspire"
        }
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: "Nuxt-CRM"
    };
  },
  components: {
    AppAside
  },
  watch: {
    error(value) {
      this.msg = value;
      this.snackbar = true;
    }
  }
};
</script>
