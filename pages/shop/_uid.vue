<template>
    <main>
        <NuxtLink to="/shop">Back</NuxtLink>
        <h1>{{ product.name }}</h1>
        <figure>
            <img :src="product.images[0].formats.small.url" alt="" />
        </figure>
        <p>{{ product.description }}</p>
        <p>{{ product.credits }}</p>
        <p>{{ formatedPrice }}</p>
        <label for="count"></label>
        <input id="count" v-model="count" type="number" name="count" />
        <button @click="addItemToCart">Add to cart</button>
    </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    async asyncData({ params, $axios }) {
        const productUid = params.uid;
        const product = (
            await $axios.$get(
                `${process.env.STRAPI_URL}/products?uid=${productUid}`
            )
        )[0];
        return {
            product,
        };
    },
    data() {
        return {
            count: 1,
        };
    },
    computed: {
        formatedPrice() {
            return `${this.product.price}€`;
        },
    },
    methods: {
        ...mapActions({
            addToCart: 'cart/addToCart',
        }),
        addItemToCart() {
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
