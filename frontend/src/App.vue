<template>
  <v-app>
    <div class="app-container">
      <div id="nav-bar" class="grey darken-4 elevation-4">
        <div class="logo-container">
          <img src="./assets/ilwonsang.png" class="logo">
        </div>
        <div class="title-container">{{ $t('message.title') }}</div>
        <div class="right-buttons-container">
          <LoginView v-show="!account.status.loggedIn"/>
          <v-btn
            flat
            small
            color="grey lighten-5"
            @click.prevent="checkLogout"
            v-show="account.status.loggedIn"
          >{{ $t('login.logout')}}</v-btn>
          <div class="text-xs-center">
            <v-menu ref="languageMenu" offset-y>
              <v-btn slot="activator" flat small color="grey lighten-5">Language</v-btn>
              <v-list>
                <v-list-tile
                  v-for="language in [{ title: '한글', code: 'ko' }, { title: 'English', code: 'en' }]"
                  :key="language.code"
                  @click="selectLanguage(language)"
                >
                  <v-list-tile-title>{{ language.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
        </div>
      </div>
      <div id="app">
        <div
          v-if="alert.message"
          class="alert"
          :class="{ show: !!alert.message }"
          :style="{ background: alert.type }"
        >{{$t(`alert.${alert.message}`)}}</div>
        <router-view/>
      </div>
    </div>
  </v-app>
</template>

<script>
import LoginView from './components/LoginView'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  components: { LoginView },
  created() {
    this.getIndexes()
    // TODO: comment below
    window.theStore = this.$store
  },
  computed: {
    ...mapState({
      account: state => state.account,
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions({
      clearAlert: 'alert/clear',
      logout: 'account/logout',
      checkLogout: function() {
        const check = window.confirm('Are you sure?')
        if (check) this.logout()
      }
    })
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      this.clearAlert()
    }
  },
  data() {
    return {
      indexes: [],
      selectLanguage: language => {
        this.$store.commit('setLocale', language.code)
        this.getIndexes()
      },
      getIndexes() {
        const { locale } = this.$i18n
        const params = { doc_id: `index-${locale}` }
        this.$http.get('http://localhost:3844/api/scriptures/indexes', { params }).then(response => {
          console.log('response: ', response)
          const { data } = response
          this.$store.state.indexes = data.map(i => {
            i.value = JSON.parse(i.value)
            return i
          })
          this.getBooks()
        })
      },
      getBooks() {
        function compare(a, b) {
          const titleA = a.title.toUpperCase()
          const titleB = b.title.toUpperCase()
          if (a.index > 0 && b.index > 0) {
            return a.index > b.index ? 1 : -1
          }
          if (a.index > 0 && b.index < 0) return -1
          if (b.index > 0 && a.index < 0) return 1
          return titleA > titleB ? 1 : -1
        }
        this.$store.state.books = this.$store.state.indexes
          .map(i => {
            const { doc_id, doc_name } = i // eslint-disable-line camelcase
            const book = { doc_id, doc_name }
            book.title = i.value[i.doc_name]
            book.index = -1
            if (doc_name === 'jj') book.index = 1 // eslint-disable-line camelcase
            if (doc_name === 'dj') book.index = 2 // eslint-disable-line camelcase
            if (doc_name === 'jb') book.index = 3 // eslint-disable-line camelcase
            book.code = i.doc_name
            return book
          })
          .sort(compare)
      }
    }
  }
}
</script>

<style>
body {
  background: #eee;
}
@keyframes notification {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.alert {
  color: white;
  position: absolute;
  z-index: 11;
  right: 0;
  padding: 10px;
}
.alert.show {
  animation-name: notification;
  animation-duration: 0.3s;
  animation-delay: 3s;
  animation-fill-mode: forwards;
}
.app-container {
  /* height: 150vh; */
}
#app {
  display: flex;
  flex-direction: column;
  background: #eeeeee;
}
#nav-bar {
  height: 50px;
  display: flex;
  position: sticky;
  top: 0;
  z-index: 10;
}
.logo-container {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
.title-container {
  display: flex;
  margin-left: 15px;
  color: white;
  align-items: center;
  font-size: 1.5em;
  font-weight: 300;
  flex: 1;
}
.right-buttons-container {
  display: flex;
  align-items: center;
}
img.logo {
  width: 40px;
  height: 40px;
}
</style>
