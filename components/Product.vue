<template>
    <div>
        <NuxtLink :to="`/products/${product.id}`">
            <h1>{{ product.name }}</h1>
        </NuxtLink>
        <input id="count" v-model="count" type="number" name="count" />
        <button @click="addProductToCart">Add to Cart</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props: {
        product: {
            default: () => ({}),
            type: Object,
        },
    },
    data() {
        return { count: 1 };
    },
    methods: {
        ...mapActions({ addToCart: 'cart/addToCart' }),
        addProductToCart() {
            const orderItem = { product: this.product, count: this.count };
            this.addToCart(orderItem);
        },
    },
};
</script>
