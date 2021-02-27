<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
                <img src="~/assets/images/advotics-logo.jpg" height="45" alt="Advotics" />
    <div class="presented">
    <label>Powered by</label>
         <img src="~/assets/images/advotics-logo.jpg" height="20" style="padding-left:5px; padding-top:5px" />
    </div>
    <div class="profil">
      <v-row>
        <v-col sm="4">
         <span class="userProfile_name">Username</span>
                <span class="userProfile_role">Company Name</span>
        </v-col>
        <v-col sm="3">
       <v-avatar size="40px" style="margin-right: 12px;">
                <img src='~/assets/images/Profile.svg' />
            </v-avatar>
             </v-col>
        <v-col sm="2">
            <v-icon style="padding-right: 20px; padding-top: 10px">mdi-logout-variant</v-icon>
     </v-col>
      </v-row>
    </div>
     <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-line',
          title: 'Market',
          to: '/Market'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
<style scoped>
.presented {
  padding-top: 20px;
  padding-left: 10px;
}
.profil {
     position: absolute;
  right: 0;
}
.userProfile_name {
  font-size: 14px;
  color: #727272;
      padding-right: 20px;
      margin-top: 30px;
}
.userProfile_role {
    font-size: 10px;
      color: #727272;
      padding-right: 20px;
}
</style>
