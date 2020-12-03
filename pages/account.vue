<template>
    <main class="main account">
        <div class="page-container">
            <h1 class="title">Welcome, {{ user.username }}!</h1>
            <section class="orders">
                <h2 class="orders__title">Orders</h2>
                <ul v-if="orders" class="order__list">
                    <li
                        v-for="order in orders"
                        :key="order.id"
                        class="order__item"
                    >
                        <div class="order">
                            <h3>{{ order.title }} n°{{ order.id }}</h3>
                            <NuxtLink :to="`/account/order/${ordr_id}`">
                                See order details
                            </NuxtLink>
                        </div>
                    </li>
                </ul>
                <p v-else class="order__none">You don't have any order.</p>
            </section>
        </div>
    </main>
</template>

<script>
export default {
    async asyncData({ $strapi, $auth }) {
        const user = await $auth.user;
        const orders = await $strapi.$orders.find({ user });
        return {
            user,
            orders,
        };
    },
};
</script>

<style lang="scss">
.account {
    .page-container {
        padding: 3rem;
        width: 100%;

        .title {
            font-size: 4rem;
        }

        .orders {
            margin-top: 2rem;

            .order__title {
                font-size: 2rem;
            }
            .order__list {
                list-style: none;

                .order__item {
                }
            }
            .order__none {
                padding: 2rem;
                font-size: 1.8rem;
            }
        }
    }
}
</style>
