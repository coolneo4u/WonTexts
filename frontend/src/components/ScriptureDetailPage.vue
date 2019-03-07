<template>
  <div class="verse-view-container">
    <div ref="verseView" v-bind:style="{ fontSize: fontSize + 'px', lineHeight: lineHeight + 'px' }" class="verse-view" v-html="currentVerse.value"/>
    <div class="right-panel">
      <div class="bookmark-wrapper">
        <svg fill="#E74C3C" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m81.25 6.25h-62.5c-1.7266 0-3.125 1.3984-3.125 3.125v81.25c0 1.2031 0.6875 2.2969 1.7734 2.8164 1.082 0.51953 2.3672 0.375 3.3047-0.37891l29.297-23.438 29.297 23.438c0.9375 0.75391 2.2227 0.89844 3.3047 0.37891 1.0859-0.51953 1.7734-1.6133 1.7734-2.8164v-81.25c0-0.82812-0.32812-1.625-0.91406-2.2109-0.58594-0.58594-1.3828-0.91406-2.2109-0.91406z"
          ></path>
        </svg>
      </div>
      <div class="favorite-mark-wrapper">
        <svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m76.133 62.965 23.047-21.398c1.6445-1.6445 0.41016-4.5273-1.6445-4.9375l-31.277-4.5273-13.992-27.984c-0.82422-2.0586-3.7031-2.0586-4.9375 0l-13.582 27.984-31.277 4.5273c-2.4688 0.41016-3.293 3.293-1.6445 4.9375l22.633 21.398-5.3516 31.277c-0.41016 2.0586 2.0586 4.1133 4.1133 2.8789l27.57-14.816 27.984 14.816c2.0586 1.2344 4.1133-0.41016 3.7031-2.8789l-5.3516-31.277z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
    <div class="bottom-panel">
      <div class="font-size-container">
        <v-btn @click="decreaseFontSize" flat small>&mdash;</v-btn>
        <div class="font-size-icon">
          <svg
            fill="#757575"
            version="1.1"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="m97.051 79.461c-1.082-0.23438-2.0352-0.58594-2.8555-1.0547-1.0859-0.64453-1.9219-1.3281-2.5117-2.043-0.58984-0.72266-1.0703-1.5156-1.457-2.4023-2.2891-5.3984-5.0586-12.199-8.3164-20.418-3.2617-8.2148-7.7617-19.395-13.512-33.543h-8.8047c-4.1367 9.9805-7.918 19.102-11.328 27.375-3.4219 8.2734-6.8281 16.535-10.234 24.781-0.55859 1.4062-1.2539 2.6289-2.0898 3.6523-0.83594 1.0312-1.8555 1.8945-3.0586 2.5977-0.70703 0.44141-1.668 0.78516-2.8828 1.0352-1.2148 0.24609-2.3086 0.40234-3.2812 0.46484v3.4258h25.621v-3.4297c-3.3164-0.29297-5.6914-0.76953-7.1094-1.4336-1.4258-0.65625-2.1367-1.4609-2.1367-2.3984 0-0.29297 0.050781-0.80859 0.15625-1.543 0.097656-0.73047 0.42969-1.9219 0.98828-3.5586 0.44141-1.2617 0.96094-2.6992 1.5625-4.3164 0.46484-1.2383 0.88281-2.3242 1.2852-3.3203h22.305l4.9531 12.035c0.20312 0.49219 0.32812 0.89453 0.37109 1.1836 0.046875 0.29297 0.070312 0.55859 0.070312 0.79297 0 0.67578-1.0703 1.2383-3.2148 1.6914-2.1445 0.45703-3.3164 0.74219-4.9023 0.85938v3.4375h33.332v-3.4297c-0.87891-0.058594-1.8672-0.20312-2.9492-0.44141zm-30.402-22.793h-16.879l8.3789-21.215z"
              ></path>
              <path
                d="m55.156 80.48c-0.80078-0.17578-1.5039-0.42969-2.1094-0.78125-0.80078-0.47656-1.418-0.97656-1.8516-1.5039-0.42969-0.53516-0.78516-1.1211-1.0664-1.7695-1.6875-3.9766-3.7305-8.9883-6.1328-15.047-2.3984-6.0547-5.7148-14.289-9.9531-24.715h-6.4844c-3.0469 7.3516-5.832 14.078-8.3516 20.176-2.5195 6.0938-5.0352 12.18-7.5391 18.258-0.41016 1.0352-0.92188 1.9336-1.5391 2.6953-0.61719 0.75781-1.3672 1.3945-2.2539 1.9062-0.51953 0.32812-1.2266 0.57812-2.125 0.76562-0.89844 0.18359-1.707 0.29297-2.418 0.33984l-0.003906 2.5273h18.875v-2.5273c-2.4414-0.21484-4.1914-0.56641-5.2383-1.0547-1.043-0.48828-1.5742-1.0742-1.5742-1.7695 0-0.21484 0.039063-0.59375 0.11719-1.1328 0.070313-0.53906 0.3125-1.4141 0.72656-2.625 0.32422-0.92969 0.70703-1.9922 1.1523-3.1836 0.11328-0.30859 0.78906-2.0234 1.7188-4.375h14.93l4.3789 10.801c0.14844 0.36328 0.23828 0.65625 0.27344 0.875 0.035156 0.21484 0.054688 0.41016 0.054688 0.58594 0 0.49219-0.79297 0.91016-2.3711 1.25-1.582 0.33203-2.9531 0.54688-4.1211 0.63281l0.007812 2.5234h24.41v-2.5273c0 0.003906-0.71094-0.14844-1.5117-0.32422zm-34.727-17.148c2.6484-6.6914 6.0586-15.281 6.0586-15.281l6.1992 15.281z"
              ></path>
            </g>
          </svg>
        </div>
        <v-btn @click="increaseFontSize" flat small>+</v-btn>
      </div>
      <div class="line-space-container">
        <v-btn @click="decreaseLineHeight" flat small>&mdash;</v-btn>
        <div class="line-space-icon">
          <svg
            fill="#757575"
            version="1.1"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="m56.488 86.848h-11.625l-2.0312 4.7344c-0.50391 1.1719-0.75391 2.043-0.75391 2.6172 0 0.45703 0.21875 0.85938 0.65234 1.207 0.4375 0.34375 1.375 0.57422 2.8203 0.67188v0.82422h-9.4531v-0.82422c1.2578-0.21875 2.0703-0.50391 2.4375-0.85938 0.75-0.71484 1.5859-2.1523 2.5-4.3242l10.559-24.695h0.76953l10.453 24.969c0.83984 2.0039 1.6055 3.3125 2.293 3.9062 0.6875 0.59766 1.6406 0.92969 2.8633 1.0039v0.82422h-11.844v-0.82422c1.1992-0.058594 2.0078-0.25391 2.4297-0.59766 0.42188-0.33594 0.62891-0.75 0.62891-1.2422 0-0.64453-0.29688-1.6758-0.88672-3.0781zm-0.61719-1.6328l-5.0938-12.133-5.2266 12.133z"
              ></path>
              <path
                d="m56.488 22.828h-11.625l-2.0312 4.7344c-0.5 1.168-0.75 2.043-0.75 2.6133 0 0.46094 0.21484 0.85938 0.64844 1.2031 0.4375 0.35156 1.3789 0.57422 2.8203 0.67969v0.81641h-9.4531v-0.81641c1.2578-0.22656 2.0703-0.51172 2.4375-0.86719 0.75781-0.70703 1.5898-2.1445 2.5-4.3164l10.559-24.699h0.77734l10.453 24.969c0.83594 2.0078 1.6016 3.3086 2.2852 3.9062 0.6875 0.60156 1.6445 0.93359 2.8711 1.0078v0.81641h-11.844v-0.81641c1.1914-0.058594 2-0.25781 2.4219-0.60156 0.42188-0.33594 0.62891-0.75 0.62891-1.2383 0-0.64453-0.29688-1.6758-0.88672-3.0781zm-0.61719-1.6367l-5.0938-12.129-5.2266 12.129z"
              ></path>
              <path
                d="m50.312 39.801v18.719l-1.1719-1.1719-2.2383 2.2461 5.1328 5.1367 5.1406-5.1367-2.2422-2.2461-1.1836 1.1953v-18.758l1.1875 1.1875 2.2383-2.2422-5.1328-5.1367-5.1406 5.1367 2.2383 2.2422z"
              ></path>
            </g>
          </svg>
        </div>
        <v-btn @click="increaseLineHeight" flat small>+</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import * as SharedFunctions from '../sharedFunctions'

export default {
  computed: {
    currentVerse: function() {
      return this.$store.state.currentVerse
    }
  },
  data() {
    return {
      fontSize: parseInt(SharedFunctions.getCookie('fontSize'), 10) || 18,
      lineHeight: parseInt(SharedFunctions.getCookie('lineHeight'), 10) || 30,
      saveFontSize: () => {
        SharedFunctions.setCookie('fontSize', this.$data.fontSize, -1)
      },
      saveLineHeight: () => {
        SharedFunctions.setCookie('lineHeight', this.$data.lineHeight, -1)
      },
      decreaseFontSize: () => {
        this.$data.fontSize -= 1
        const sizeString = `${this.$data.fontSize}px`
        this.$refs.verseView.style.fontSize = sizeString
        this.$data.saveFontSize()
      },
      increaseFontSize: () => {
        this.$data.fontSize += 1
        const sizeString = `${this.$data.fontSize}px`
        this.$refs.verseView.style.fontSize = sizeString
        this.$data.saveFontSize()
      },
      decreaseLineHeight: () => {
        this.$data.lineHeight -= 1
        const sizeString = `${this.$data.lineHeight}px`
        this.$refs.verseView.style.lineHeight = sizeString
        this.$data.saveLineHeight()
      },
      increaseLineHeight: () => {
        this.$data.lineHeight += 1
        const sizeString = `${this.$data.lineHeight}px`
        this.$refs.verseView.style.lineHeight = sizeString
        this.$data.saveLineHeight()
      }
    }
  }
}
</script>

<style>
.verse-view-container {
  margin: 20px;
  display: flex;
  flex: 1 0;
  background: #fafafa;
  padding: 20px;
  position: relative;
}
.verse-view {
  padding-top: 0;
  padding-left: 20px;
  padding-right: 20px;
  flex: 1 0;
}
.right-panel {
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.verse-view-container .d3 {
  margin-bottom: 10px;
  margin-top: 20px;
  font-weight: bold;
}
.bookmark-wrapper {
  width: 30px;
}
.bookmark-wrapper svg path {
  fill: white;
  stroke: #e64a19;
  stroke-width: 8;
}
.bookmark-wrapper.marked svg path {
  fill: #e64a19;
  stroke: #e64a19;
  stroke-width: 8;
}
.favorite-mark-wrapper {
  width: 30px;
  margin-top: 10px;
}
.favorite-mark-wrapper svg path {
  fill: white;
  stroke: #ffd600;
  stroke-width: 8;
}
.favorite-mark-wrapper.marked svg path {
  fill: #ffd600;
  stroke: #ffd600;
  stroke-width: 8;
}
.bottom-panel {
  position: absolute;
  bottom: 0;
  display: flex;
}
.line-space-container,
.font-size-container {
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
}
.line-space-container button,
.font-size-container button {
  max-width: 40px;
  min-width: 0;
}
.line-space-icon,
.font-size-icon {
  width: 25px;
  height: 25px;
}
</style>
