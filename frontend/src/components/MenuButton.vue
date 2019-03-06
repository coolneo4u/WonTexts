<template>
  <div v-if="items.length > 0" class="text-xs-center menu-button">
    <v-menu offset-y v-model="togglePopover">
      <v-btn
        @click="resetButtons()"
        slot="activator"
        color="blue-grey darken-1"
        dark
      >{{buttonTitle}}</v-btn>
      <v-list class="menu-list">
        <v-list-tile v-for="(item, index) in items" :key="index" @click="handleClick(item)">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: ['level', 'title'],
  data() {
    return {
      selector: '#test',
      handleClick: item => {
        console.log('item: ', item)
        item.level = this.level
        this.$store.commit('updateButtonState', item)
      },
      resetButtons: () => {
        this.$store.commit('updateButtonLevel', this.level)
        this.togglePopover = true
      }
    }
  },
  computed: {
    buttonTitle: function() {
      const selectedValue = this.$store.state.buttonState[this.level]
      if (selectedValue) {
        return this.$store.state.selectedIndex[selectedValue]
      } else {
        if (this.level === 0) {
          return this.$t('message.selectBook')
        }
        return this.$t('message.select')
      }
    },
    togglePopover: function() {
      const selectedValue = this.$store.state.buttonState[this.level]
      if (selectedValue) return false
      return this.level !== 0
    },
    items: function() {
      const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true })
      const { level } = this
      if (level === 0) {
        return this.$store.state.books
      }
      const key = this.$store.state.buttonState[level - 1] + '-'
      console.log('key: ', key)
      let indexes = Object.keys(this.$store.state.selectedIndex).filter(k => k.includes(key))
      console.log('indexes before: ', indexes)
      indexes = indexes.map(i => {
        const comps = i.split('-').slice(0, level + 1)
        if (comps.length <= level) return
        return comps.join('-')
      })
      indexes = [...new Set(indexes.filter(i => i))].sort(sortAlphaNum)
      console.log('indexes: ', indexes)
      const items = indexes.map(i => {
        const item = {}
        item.title = this.$store.state.selectedIndex[i]
        item.code = i
        item.level = level + 1
        return item
      })
      if (items.length === 0) this.$store.commit('selectVerse')
      return items
    }
  }
}
</script>

<style>
.menu-button {
  margin-right: -10px;
}
.menu-list {
  max-height: calc(100vh - 100px);
}
</style>
