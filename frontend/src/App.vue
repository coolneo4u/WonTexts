<template>
  <v-app>
    <div id="nav-bar" class="grey darken-4 elevation-4">
      <div class="logo-container">
        <img src="./assets/ilwonsang.png" class="logo">
      </div>
      <div class="title-container">{{ $t('message.title') }}</div>
      <div class="selectors-container">
        <template v-for="(button, index) in buttons">
          <component v-bind:is="button" :key="index" :level="index"/>
        </template>
      </div>
      <div class="right-buttons-container">
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
      <router-view/>
    </div>
  </v-app>
</template>

<script>
import MenuButton from './components/MenuButton'

export default {
  name: 'App',
  components: {
    MenuButton
  },
  created() {
    this.getIndexes()
  },
  computed: {
    buttons: function() {
      const currentLevel = this.$store.state.buttonState.level
      const buttons = []
      for (let i = 0; i <= currentLevel; i += 1) {
        buttons.push('MenuButton')
      }
      return buttons
    }
  },
  data() {
    return {
      toggled: true,
      indexes: [],
      books: () => {
        return this.$store.state.books
      },
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
#nav-bar {
  height: 58px;
  display: flex;
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
}
.selectors-container {
  display: flex;
  margin-left: 15px;
  align-items: center;
  flex: 1 0;
}
.right-buttons-container {
  display: flex;
  align-items: center;
}
img.logo {
  width: 50px;
  height: 50px;
}
</style>
