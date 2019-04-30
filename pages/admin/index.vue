<template>
  <h1>Admin Index</h1>
</template>

<script>
export default {
  middleware: ["admin-auth"],
  layout: "admin"
};
</script>

<style scoped>
</style>
