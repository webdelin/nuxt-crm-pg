<template>
  <v-app :dark="isDark">
    <v-toolbar :clipped-left="clipped" app>
      <v-btn icon @click="drawer = !drawer">
        <v-icon>{{ `${drawer ? 'more_vert' : 'menu'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-if="drawer">{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>


      <v-toolbar-title v-text="title" />
      <v-spacer />

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
          <v-list-tile v-for="(item, index) in items" :key="index" @click="">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>build</v-icon>
      </v-btn>
    </v-toolbar>


    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" hide-overlay stateless app>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-navigation-drawer v-model="rightDrawer" :right="right" fixed>
      <v-list>
        <v-list-tile>
          <v-list-tile-action @click="rightDrawer=null">
            <v-icon>close</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            Einstellungen</v-list-tile-title>
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
  export default {
    data() {
      return {
        isDark: false,
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          {
            icon: 'apps',
            title: 'Welcome',
            to: '/'
          },
          {
            icon: 'bubble_chart',
            title: 'Inspire',
            to: '/inspire'
          }
        ],
        miniVariant: true,
        right: true,
        rightDrawer: false,
        title: 'Nuxt-CRM'
      }
    }
  }
</script>
