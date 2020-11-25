<template>
    <main class="cart">
        <div class="page-container">
            <h1 class="title">Cart page</h1>
            <section class="cart__products">
                <CartItem
                    v-for="item in cartProducts"
                    :key="item.id"
                    :item="item"
                />
            </section>

            <p class="cart__price">{{ price }}</p>
            <button class="clear" @click="clear">Clear my cart</button>
            <NuxtLink to="/checkout" class="checkout"> Checkout </NuxtLink>
        </div>
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

<style lang="scss">
.cart {
    .title {
    }
    &__products {
    }
    &__price {
    }
    .clear {
    }
    .checkout {
    }
}
</style>
