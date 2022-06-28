<template>
    <div id="app">
        <transition name="slide2-fade">
            <router-view/>
        </transition>
    </div>
</template>

<script>
  export default {
    name: "app",
  }
</script>