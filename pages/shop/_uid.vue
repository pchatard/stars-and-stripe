<template>
    <main class="main details">
        <div class="page-container">
            <section class="details__header">
                <NuxtLink to="/shop" class="back__button">
                    <button>
                        <font-awesome-icon
                            icon="arrow-left"
                            class="back__icon"
                        />
                        Back
                    </button>
                </NuxtLink>
                <h1 class="title">{{ product.name }}</h1>
            </section>

            <section class="details__content">
                <figure class="img__container">
                    <img
                        :src="product.images[0].formats.small.url"
                        :alt="product.name"
                    />
                </figure>

                <div class="text">
                    <div class="description"></div>
                    <p class="credits">{{ product.credits }}</p>
                </div>
            </section>

            <div class="cart__controls">
                <p class="price">{{ formatedPrice }}</p>
                <Counter :count="count" @change="setCount" />
                <button class="cart__button" @click="addItemToCart">
                    <font-awesome-icon icon="cart-plus" class="cart__icon" />
                    Add to cart
                </button>
            </div>
        </div>
    </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    async asyncData({ params, $strapi }) {
        const productUid = params.uid;
        const product = (await $strapi.$products.find({ uid: productUid }))[0];
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
        description() {
            return this.product.description
                .split('\n')
                .map((p) => `<p>${p}</p>`)
                .join('');
        },
    },
    mounted() {
        document.querySelector('.description').innerHTML = this.description;
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
        setCount(value) {
            this.count = value;
        },
    },
};
</script>

<style lang="scss">
.details {
    .page-container {
        padding: 3rem;
        width: 100%;
    }

    &__header {
        @include flex(flex-start, center);
        margin-bottom: 4rem;

        .back__button {
            button {
                text-transform: uppercase;
                font-size: 2rem;
            }

            .back__icon {
                margin-right: 1rem;
            }

            &:hover {
                background-color: $text;

                button {
                    color: $background-primary;
                }
            }
        }

        .title {
            text-align: center;
            flex: auto;
            font-size: 4rem;
            font-family: 'Bondi';
        }
    }

    &__content {
        @include flex(flex-start, center);

        .img__container {
            flex: 1;

            img {
                max-width: 100%;
                height: auto;
                object-fit: cover;
            }
        }

        .text {
            flex: 1;
            @include flex(center, center, $direction: column);

            .description {
                font-size: 1.8rem;
                margin: 2rem 0;

                p {
                    margin: 2rem 0;
                }
            }
            .credits {
                font-size: 1.4rem;
            }
        }
    }

    .cart__controls {
        @include flex($align: stretch);
        margin-top: 2rem;

        .price {
            font-size: 3rem;
            margin-right: 8rem;
        }

        .cart__button {
            margin-left: 1rem;
            font-size: 1.8rem;
            text-transform: uppercase;
            .cart__icon {
                margin-right: 1rem;
            }

            &:hover {
                background-color: $primary;
            }
        }
    }
}

@include tablet {
    .details {
        .page-container {
            max-width: 100%;
        }

        &__content {
            flex-direction: column;
        }

        .cart__controls {
            .counter {
                margin-left: auto;
            }
        }
    }
}

@include mobile {
    .details {
        &__header {
            flex-direction: column;
            align-items: flex-start;

            .back__button {
                margin-bottom: 1rem;
                button {
                    font-size: 1.6rem;
                }
            }

            .title {
                text-align: left;
                font-size: 3rem;
            }
        }

        .cart__controls {
            flex-direction: column;
            align-items: flex-end;

            .price {
                margin: 1rem 0;
            }

            .counter {
                margin: 1rem 0;
            }
        }
    }
}
</style>
