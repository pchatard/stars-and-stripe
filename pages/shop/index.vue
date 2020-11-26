<template>
    <main class="main shop">
        <div class="page-container">
            <h1 class="title">Products</h1>
            <div class="filters">
                <CategoryFilter
                    v-for="category in types"
                    :key="category.id"
                    :category="category"
                    :active="activeFilters.includes(category.id)"
                    @change="filterProductList"
                />
            </div>
            <section class="products">
                <Product
                    v-for="product in typedProducts"
                    :key="product.uid"
                    :product="product"
                />
            </section>
        </div>
    </main>
</template>

<script>
export default {
    async asyncData({ query, $axios }) {
        const products = await $axios.$get(
            `${process.env.STRAPI_URL}/products`
        );
        const types = await $axios.$get(`${process.env.STRAPI_URL}/types`);
        return {
            products,
            types,
        };
    },
    data() {
        return {
            activeFilters: [],
        };
    },
    computed: {
        typedProducts() {
            return this.products.filter((product) => {
                if (this.activeFilters.length) {
                    return this.activeFilters.includes(product.type.id);
                }
                return true;
            });
        },
        queryParams() {
            return this.activeFilters.join(',');
        },
    },
    methods: {
        filterProductList(eventId) {
            const inputIndex = this.activeFilters.findIndex(
                (id) => id === eventId
            );
            if (inputIndex < 0) {
                this.activeFilters.push(eventId);
            } else {
                this.activeFilters.splice(inputIndex, 1);
            }
        },
    },
};
</script>

<style lang="scss">
.shop {
    .title {
    }

    .filters {
    }

    .products {
    }
}
</style>
