<template>
    <main class="main order">
        <div class="page-container">
            <h1 class="order__title">Order n° {{ order.id }}</h1>
            <p class="order__date">Date: {{ formatedDate }}</p>
            <p class="order__status">Status: Processed</p>
            <p class="order__price">
                Total Price: {{ order.price.toFixed(2) }}€
            </p>

            <ul class="order__products">
                <li
                    v-for="product in products"
                    :key="product.id"
                    class="order__product"
                >
                    <figure>
                        <img
                            :src="product.images[0].formats.thumbnail.url"
                            alt=""
                        />
                    </figure>
                    <NuxtLink :to="`/shop/${product.uid}`">
                        {{ product.name }} - {{ product.price.toFixed(2) }}€ /
                        unit
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </main>
</template>

<script>
export default {
    async asyncData({ params, $strapi }) {
        const order = await $strapi.$orders.findOne(parseInt(params.id));
        return {
            order,
        };
    },
    computed: {
        products() {
            return this.order.products;
        },
        formatedDate() {
            const date = new Date(this.order.placed_at);
            return `${date.getDay() - 1}/${
                date.getMonth() + 1
            }/${date.getFullYear()}`;
        },
    },
};
</script>

<style lang="scss">
.order {
    .page-container {
        padding-top: 3rem;
        width: 100%;
        @include flex(flex-start, center, column);

        .order {
            &__title {
                font-size: 4rem;
                margin: 1rem 0;
            }

            &__status {
                margin: 1rem 0;
            }

            &__price {
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }

            &__products {
                font-size: 2rem;

                .order__product {
                    @include flex(space-between, center);
                    margin: 1rem 0;

                    figure {
                        margin-right: 3rem;
                    }
                }
            }
        }
    }
}

@include mobile {
    .order {
        .page-container {
            padding-top: 1rem;

            .order {
                &__products {
                    .order__product {
                        flex-direction: column;
                    }
                }
            }
        }
    }
}
</style>
