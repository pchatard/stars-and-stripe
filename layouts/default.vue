<template>
    <div>
        <Header />
        <Nuxt />
        <Footer />
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    mounted() {
        this.initializeCart();
    },
    methods: {
        ...mapActions({ initializeCart: 'cart/initializeCart' }),
    },
};
</script>

<style lang="scss"></style>
