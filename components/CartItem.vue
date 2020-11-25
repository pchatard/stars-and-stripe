<template>
    <div>
        <h2>{{ item.product.name }}</h2>
        <img :src="item.product.img" />
        <input
            id="count"
            v-model="count"
            type="number"
            @change="updateItemCount(count)"
        />
        <p>{{ item.price * item.count }}</p>
        <button @click="updateItemCount(0)">Remove</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props: {
        item: {
            default: () => ({}),
            type: Object,
        },
    },
    data() {
        return { count: this.item.count };
    },
    methods: {
        ...mapActions({ updateCount: 'cart/changeProductCount' }),
        updateItemCount(count = 0) {
            const updatedItem = {
                uid: this.item.product.uid,
                count: parseInt(count),
            };
            this.updateCount(updatedItem);
        },
    },
};
</script>
