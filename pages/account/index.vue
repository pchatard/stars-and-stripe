<template>
    <main class="main account">
        <div class="page-container">
            <h1 class="title">Welcome, {{ user.username }}!</h1>
            <section class="orders">
                <h2 class="orders__title">Orders</h2>
                <ul v-if="orders.length" class="order__list">
                    <li
                        v-for="order in orders"
                        :key="order.id"
                        class="order__item"
                    >
                        <div class="order">
                            <h3 class="order__title">
                                {{ order.title }} n°{{ order.id }}
                            </h3>
                            <p class="order__date">
                                Placed on {{ formatedDate(order.placed_at) }}
                            </p>
                            <NuxtLink :to="`/account/orders/${order.id}`">
                                <button class="order__button">
                                    See order details
                                </button>
                            </NuxtLink>
                        </div>
                    </li>
                </ul>
                <p v-else class="order__none">You don't have any order yet.</p>
            </section>
        </div>
    </main>
</template>

<script>
export default {
    async asyncData({ $strapi, $auth }) {
        const user = await $auth.user;
        const orders = await $strapi.$orders.find({ 'user.id': user.id });
        return {
            user,
            orders,
        };
    },
    methods: {
        formatedDate(orderDate) {
            const date = new Date(orderDate);
            return `${date.getDay() - 1}/${
                date.getMonth() + 1
            }/${date.getFullYear()}`;
        },
    },
};
</script>

<style lang="scss">
.account {
    .page-container {
        padding: 3rem;
        width: 100%;
        @include flex(flex-start, center, column);

        .title {
            font-size: 4rem;
        }

        .orders {
            margin-top: 2rem;

            .orders__title {
                display: inline-block;
                font-size: 2.5rem;
                padding-bottom: 0.2rem;
                border-bottom: 2px solid $text;
            }

            .order__list {
                list-style: none;
                margin-top: 1.5rem;

                .order__item {
                    margin: 2rem 0;
                    padding-bottom: 2rem;
                    border-bottom: 1px solid $text;

                    .order {
                        &__title {
                            margin: 1rem 0;
                        }
                        &__date {
                            margin: 1rem 0;
                        }
                    }
                }
            }

            .order__none {
                padding: 2rem;
                font-size: 1.8rem;
            }
        }
    }
}

@media (min-width: 900px) {
    .account {
        .page-container {
            .orders {
                .order__list {
                    .order__item {
                        .order {
                            &__button {
                                &:hover {
                                    color: $background-primary;
                                    background-color: $text;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@include tablet {
    .account {
        .page-container {
            justify-content: center;
        }
    }
}
</style>
