<template>
    <div class="product">
        <NuxtLink :to="`/shop/${product.uid}`" class="product__link">
            <div class="product__img">
                <img :src="product.images[0].formats.small.url" alt="" />
            </div>
            <h1 class="product__title">{{ product.name }}</h1>
            <p class="product__price">{{ product.price.toFixed(2) }}€</p>
        </NuxtLink>
        <div class="cart__controls">
            <Counter :count="count" @change="setCount" />

            <button class="cart__button" @click="addProductToCart">
                <font-awesome-icon icon="cart-plus" class="cart__icon" />
                Add to Cart
            </button>
        </div>
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
        setCount(value) {
            this.count = parseInt(value);
        },
    },
};
</script>

<style lang="scss">
.product {
    width: 100%;
    @include flex($align: center, $direction: column);
    transition: all 0.2s;
    border: 1px solid transparent;

    &:hover {
        border: 1px solid rgba($text, 0.5);
        box-shadow: 0 0 5px rgba($background-secondary, 0.5);

        .product__img img {
            transform: scale(1);
        }

        .product__title,
        .product__price {
            padding-left: 1rem;
        }
    }

    &:nth-of-type(2n) {
        opacity: 0;
        animation: fade-in 1s forwards;
        animation-delay: 0.3s;
    }

    &:nth-of-type(2n + 1) {
        opacity: 0;
        animation: fade-in 1s forwards;
        animation-delay: 0.6s;
    }

    &__img {
        display: grid;
        place-items: center;
        overflow: hidden;

        img {
            width: 100%;
            height: 35rem;
            transform: scale(1.25);
            object-fit: cover;
            transition: all 0.2s;
        }
    }

    &__title {
        font-family: 'Bondi';
        margin: 1rem 0;
        transition: all 0.2s;
    }

    &__price {
        font-size: 2rem;
        margin: 1rem 0;
        transition: all 0.2s;
    }

    .cart__controls {
        width: 100%;
        padding: 1rem;
        @include flex(flex-end, center);
    }

    .cart__button {
        .cart__icon {
            margin-right: 1rem;
        }
        margin-left: 1rem;
        text-transform: uppercase;
        font-size: 1.6rem;

        &:hover {
            border: 1px solid transparent;
            background-color: $primary;
        }
    }
}

@include tablet {
    .product {
        .cart__button {
            padding: 1rem;

            .cart__icon {
                margin-right: 0.5rem;
            }
        }
    }
}

@include mobile {
    .product {
        border: 1px solid rgba($text, 0.5);

        .cart__controls {
            flex-direction: column;
            align-items: flex-end;

            .cart__button {
                margin: 1rem 0;
            }
        }

        .product__title,
        .product__price {
            padding-left: 1rem;
        }
    }
}
</style>
