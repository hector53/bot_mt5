<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="bg-white text-primary">
      <q-toolbar>
      
        <q-toolbar-title style="    flex:2; cursor: pointer;">
          <q-img
          src="https://uploads-ssl.webflow.com/616c304ef1493f7d6005ee62/616d9d362627deb1ff49b1a9_logo-fintelligentia_Mesa%20de%20trabajo%201-p-500.png"
          loading="lazy"
          spinner-color="white"
          class="brandF"
          style="max-width: 190px"
          @click="toggleLeftDrawer"
          />
        </q-toolbar-title>
        <q-space/>
        <div class="q-gutter-sm row items-center no-wrap">
        
          
          <q-btn round dense flat  icon="notifications" size="20px">
            <q-badge color="red"  floating>
              5
            </q-badge>
            <q-menu
            >
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense
                         class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="30px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
             <q-menu >
              <q-list >
                <q-item clickable v-close-popup @click="logOut">
                  <q-item-section>
                    <q-item-label>Salir</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      width="250"
    >
      <q-list>
        
        <q-item to="/" active-class="qitemSidebar" :class="{'active': $route.path == '/'}">
          <q-item-section avatar>
            <q-icon name="home"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Overview</q-item-label>
          </q-item-section>
        </q-item>

         <q-item to="/Trade" class="qitemSidebar" :class="{'active': $route.path == '/Trade'}">
          <q-item-section avatar>
            <q-icon name="local_atm"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Trade</q-item-label>
          </q-item-section>
        </q-item>

         <q-item to="/History" class="qitemSidebar" :class="{'active': $route.path == '/History'}">
          <q-item-section avatar>
            <q-icon name="history"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>History</q-item-label>
          </q-item-section>
        </q-item>



        
      </q-list>
        
       
    </q-drawer>

    <q-page-container class="bg-white">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import Messages from "./Messages";
import { Cookies } from 'quasar'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }, 

  methods: {
    logOut(){
      Cookies.remove("authToken");
      this.$router.push("/login")
    }
  },
})
</script>
