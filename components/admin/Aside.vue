<template>


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
</template>

<script>
    export default {
      name: "Aside",
      data() {
        return {
          clipped: false,
          drawer: true,
          items: [
            {
              icon: 'home',
              title: 'Home',
              to: '/admin'
            },
            {
              icon: 'insert_chart_outlined',
              title: 'Analytic',
              to: '/admin/analytic'
            },
            {
              icon: 'create',
              title: 'Create',
              to: '/admin/create'
            },
            {
              icon: 'perm_identity',
              title: 'User',
              to: '/admin/user'
            },
            {
              icon: 'view_agenda',
              title: 'Blog',
              to: '/admin/list'
            },
            {
              icon: 'lock_open',
              title: 'Logout',
              to: '/admin/logout'
            }
          ],
          miniVariant: true,
        }
      }
    }
</script>

<style scoped>

</style>
