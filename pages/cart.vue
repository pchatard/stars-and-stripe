<template>
    <main class="cart">
        <h1>Cart page</h1>
        <section class="products">
            <CartItem
                v-for="item in cartProducts"
                :key="item.id"
                :item="item"
            />
        </section>
        <p>{{ price }}</p>
        <button @click="clear">Clear my cart</button>
        <NuxtLink to="/checkout"> Checkout </NuxtLink>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            price: 'cart/totalPrice',
            cartProducts: 'cart/cartProducts',
        }),
    },
    methods: {
        ...mapActions({ clear: 'cart/clearCart' }),
    },
};
</script>
