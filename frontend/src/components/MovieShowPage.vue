<template>
  <div>
    <h1>상세 내용</h1>
    {{movie}}
  </div>
</template>

<script>
export default {
  created: function () { // if you use arrow function here, this.$route becomes undefined
    const { id } = this.$route.params
    this.$http.get(`http://localhost:3844/api/movies/${id}`).then(response => {
      this.movie = response.data
    })
  },
  data: () => {
    return {
      movie: {}
    }
  }
}
</script>
