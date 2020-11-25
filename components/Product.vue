<template>
    <div>
        <NuxtLink :to="`/shop/${product.uid}`">
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
            const orderItem = {
                product: {
                    uid: this.product.uid,
                    name: this.product.name,
                    img: this.product.images[0].formats.thumbnail.url,
                },
                price: this.product.price,
                count: this.count,
            };
            this.addToCart(orderItem);
        },
    },
};
</script>
