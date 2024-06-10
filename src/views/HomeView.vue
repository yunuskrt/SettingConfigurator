<template>
  <div>
    Home page
    
    <button @click="handleRouting">Go to Sign In</button>
  </div>
</template>
<script>
export default {
  name: 'HomeView',
  methods: {
    handleRouting() {
      this.$router.push('/signin')
    }
  }
}
</script>
