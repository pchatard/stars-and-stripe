<template>
    <main class="main product">
        <div class="page-container">
            <NuxtLink to="/shop" class="back__button">Back</NuxtLink>

            <h1 class="title">{{ product.name }}</h1>

            <figure class="img__container">
                <img
                    :src="product.images[0].formats.small.url"
                    :alt="product.name"
                />
            </figure>

            <p class="description">{{ product.description }}</p>
            <p class="credits">{{ product.credits }}</p>
            <p class="price">{{ formatedPrice }}</p>
            <fieldset class="count">
                <label for="count-ipt">Count</label>
                <input
                    id="count-ipt"
                    v-model="count"
                    type="number"
                    name="count"
                />
            </fieldset>
            <button class="cart__button" @click="addItemToCart">
                Add to cart
            </button>
        </div>
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

<style lang="scss">
.product {
    .back__button {
    }
    .title {
    }
    .img__container {
        img {
        }
    }
    .description {
    }
    .credits {
    }
    .price {
    }
    .count {
        label {
        }
        input {
        }
    }
    .cart__button {
    }
}
</style>
