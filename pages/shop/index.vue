<template>
    <main class="shop">
        <h1>Products</h1>
        <!-- Include filters directly here -->
        <CategoryFilter
            v-for="category in types"
            :key="category.id"
            :category="category"
            :active="activeFilters.includes(category.id)"
            @change="filterProductList"
        />
        <section class="products">
            <Product
                v-for="product in typedProducts"
                :key="product.uid"
                :product="product"
            />
        </section>
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
