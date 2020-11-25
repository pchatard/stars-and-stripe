<template>
    <div class="cart__item">
        <h2 class="item__name">{{ item.product.name }}</h2>
        <figure class="item__img">
            <img :src="item.product.img" />
        </figure>
        <input
            id="count"
            v-model="count"
            type="number"
            @change="updateItemCount(count)"
            class="item__count-ipt"
        />
        <p class="item__price">{{ item.price * item.count }}</p>
        <button class="item__remove" @click="updateItemCount(0)">Remove</button>
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

<style lang="scss">
.cart__item {
    .item__name {
    }
    .item__img {
        img {
        }
    }
    .item__count-ipt {
    }
    .item__price {
    }
    .item__remove {
    }
}
</style>
