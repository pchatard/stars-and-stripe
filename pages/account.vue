<template>
    <main class="main account">
        <div class="page-container">
            <h1 class="title">Welcome, {{ $auth.user.username }}!</h1>
            <section class="orders">
                <h2 class="orders__title">Orders</h2>
                <ul v-if="$auth.user.orders" class="order__list">
                    <li
                        v-for="order in $auth.user.orders"
                        :key="order.id"
                        class="order__item"
                    >
                        {{ order.number }}
                    </li>
                </ul>
                <p v-else class="order__none">You don't have any order.</p>
            </section>
        </div>
    </main>
</template>

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
