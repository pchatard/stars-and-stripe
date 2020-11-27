<template>
    <main class="main cart">
        <div class="page-container">
            <section class="cart__header">
                <NuxtLink to="/shop" class="continue">
                    <button>
                        <font-awesome-icon
                            icon="cart-plus"
                            class="icon__cart"
                        />
                        Continue shopping
                    </button>
                </NuxtLink>
                <h1 class="title">My Cart</h1>
                <NuxtLink :to="price > 0 ? '/checkout' : ''" class="checkout">
                    <button>
                        Checkout
                        {{ price }}€
                    </button>
                </NuxtLink>
            </section>
            <section class="cart__products">
                <CartItem
                    v-for="item in cartProducts"
                    :key="item.id"
                    :item="item"
                />
            </section>

            <div class="cart__actions">
                <button class="clear" @click="clear">Clear my cart</button>

                <NuxtLink :to="price > 0 ? '/checkout' : ''" class="checkout">
                    <button>
                        Checkout
                        {{ price }}€
                    </button>
                </NuxtLink>
            </div>
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
    .page-container {
        padding-top: 3rem;
        width: 100%;
    }

    &__header {
        @include flex($align: stretch);
        margin-bottom: 4rem;

        .continue {
            button {
                font-size: 2rem;

                .icon__cart {
                    margin-right: 1rem;
                }
            }

            &:hover {
                background-color: $text;
                button {
                    color: $background-primary;
                }
            }
        }

        .title {
            flex: auto;
            text-align: center;
            font-size: 3rem;
        }
    }

    &__products {
        @include flex(flex-start, stretch, column);
    }

    &__actions {
        @include flex(flex-end, center);

        .clear {
            font-size: 1.6rem;
            &:hover {
                color: $background-primary;
                background-color: $text;
            }
        }
    }

    .checkout {
        margin-left: 2rem;
        background-color: $primary;

        button {
            font-size: 2rem;
        }

        &:hover {
            background-color: rgba($primary, 0.8);
        }
    }
}

@include tablet {
    .cart {
        &__header {
            .continue {
                button {
                    font-size: 1.8rem;
                }
            }
        }
    }
}

@include mobile {
    .cart {
        &__header {
            flex-direction: column;
            align-items: stretch;

            .title {
                flex: none;
                margin: 1rem 0;
            }
        }

        &__products {
            margin: 2rem 0;
        }

        &__actions {
            flex-direction: column;
            align-items: stretch;
        }

        .checkout {
            margin: 1rem 0;

            button {
                width: 100%;
            }
        }
    }
}
</style>
