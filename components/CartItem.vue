<template>
    <div class="cart__item">
        <figure class="item__img">
            <img :src="item.product.img" />
        </figure>

        <NuxtLink :to="`/shop/${item.product.uid}`">
            <h2 class="item__name">{{ item.product.name }}</h2>
        </NuxtLink>

        <div class="recap">
            <Counter :count="count" @change="updateItemCount" />

            <p class="item__price">
                {{ (item.price * item.count).toFixed(2) }}€
            </p>
            <button class="item__remove" @click="updateItemCount(0)">
                <font-awesome-icon icon="times" class="icon__remove" />
                Remove
            </button>
        </div>
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
    margin: 1rem 0;
    padding-right: 1rem;
    @include flex(flex-start, center);
    border: 1px solid transparent;
    transition: all 0.2s;

    &:hover {
        border: 1px solid rgba($text, 0.5);
        box-shadow: 0 0 5px rgba($background-secondary, 1);
    }

    .item__img {
        padding: 3rem;
        img {
            width: 10rem;
            height: 10rem;
            object-fit: cover;
        }
    }

    .recap {
        @include flex(center, center);
        margin-left: auto;

        .item__price {
            font-size: 3rem;
            margin: 0 2rem;
        }

        .item__remove {
            font-size: 2rem;

            .icon__remove {
                margin-right: 1rem;
            }

            &:hover {
                color: $background-primary;
                background-color: $text;
            }
        }
    }
}

@include tablet {
    .cart__item {
        padding-right: 0.5rem;

        .item__img {
            padding: 2rem;
        }

        a {
            width: 30%;
        }

        .recap {
            .item__price {
                font-size: 2rem;
                margin: 0 1rem;
            }

            .item__remove {
                font-size: 1.6rem;

                .icon__remove {
                    margin-right: 0rem;
                }
            }
        }
    }
}

@include mobile {
    .cart__item {
        padding: 1rem;
        flex-direction: column;
        align-items: flex-start;

        .item__img {
            padding: 1rem;
            width: 100%;

            img {
                width: 100%;
                height: auto;
            }
        }

        a {
            width: 100%;
        }

        .recap {
            margin: 1rem 0;
            flex-direction: column;
            align-items: flex-start;

            .item__price {
                margin: 1rem 0;
            }

            .counter {
                margin: 0;
            }

            .item__remove {
                .icon__remove {
                    margin-right: 0.5rem;
                }
            }
        }
    }
}
</style>
