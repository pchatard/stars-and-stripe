<template>
    <div>
        <h1>Product page</h1>
        <p>{{ id }}</p>
        <button @click="addItemToCart">Add to cart</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    asyncData({ params }) {
        const productId = params.id;
        // Retrieve product data here
        return {
            id: productId,
        };
    },
    methods: {
        ...mapActions({
            addToCart: 'cart/addToCart',
        }),
        addItemToCart() {
            const orderItem = {
                product: 'Name',
                count: 3,
                price: 0.05,
            };
            this.addToCart(orderItem);
        },
    },
};
</script>
