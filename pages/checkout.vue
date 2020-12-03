<template>
    <main class="main checkout">
        <div class="page-container">
            <h1>Confirm your order</h1>
            <h2>Do you want to confirm your order of {{ price }}€ ?</h2>
            <div class="options">
                <NuxtLink to="/cart"><button>Back</button></NuxtLink>
                <button @click="order">Confirm</button>
            </div>
            <p class="error">{{ errorMessage }}</p>
        </div>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            errorMessage: '',
        };
    },
    computed: {
        ...mapGetters({
            price: 'cart/totalPrice',
            cartProducts: 'cart/cartProducts',
        }),
    },
    methods: {
        ...mapActions({ clearCart: 'cart/clearCart' }),
        async order() {
            try {
                this.errorMessage = '';
                const itemProducts = await Promise.all(
                    this.cartProducts.map(async (item) => {
                        const product = (
                            await this.$strapi.$products.find({
                                uid: item.product.uid,
                            })
                        )[0];
                        product.count = item.count;
                        return product;
                    })
                );
                await this.$strapi.$orders.create({
                    price: this.price,
                    placed_at: new Date(),
                    user: await this.$auth.user,
                    products: itemProducts,
                });
                this.clearCart();
                this.$router.push('/account');
            } catch (error) {
                this.errorMessage = 'Something went wrong !';
            }
        },
    },
};
</script>

<style lang="scss">
.checkout {
    .page-container {
        @include flex(center, center, column);

        h1 {
            font-size: 4rem;
        }

        h2 {
            font-size: 2.5rem;
            text-align: center;
            margin: 2rem;
        }

        button {
            margin: 2rem 0;
            font-size: 2rem;

            &:hover {
                background-color: $text;
                color: $background-primary;
            }
        }
    }
}

@include mobile {
    .checkout {
        h1 {
            font-size: 3rem;
        }

        h2 {
            font-size: 1.8rem;
        }
    }
}
</style>
