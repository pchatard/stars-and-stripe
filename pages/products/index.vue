<template>
    <main class="shop">
        <h1>Products</h1>
        <!-- Include filters directly here -->
        <section class="products">
            <label for="stars">Stars</label>
            <input
                id="stars"
                v-model="inputValues.stars"
                type="checkbox"
                name="product-type"
                @change.prevent="filterProductList"
            />
            <label for="planets">Planets</label>
            <input
                id="planets"
                v-model="inputValues.planets"
                type="checkbox"
                name="product-type"
                @change.prevent="filterProductList"
            />
            <label for="constellations">Constellations</label>
            <input
                id="constellations"
                v-model="inputValues.constellations"
                type="checkbox"
                name="product-type"
                @change.prevent="filterProductList"
            />
            <Product
                v-for="product in typedProducts"
                :key="product.id"
                :product="product"
            />
        </section>
    </main>
</template>

<script>
export default {
    asyncData({ query }) {
        // const type = query.type || '';
        const products = [
            { id: 1, name: 'Star 1', type: 'stars', price: 0.05 },
            { id: 2, name: 'Star 2', type: 'constellations', price: 0.05 },
            { id: 3, name: 'Star 3', type: 'constellations', price: 0.05 },
            { id: 4, name: 'Star 4', type: 'planets', price: 0.05 },
            { id: 5, name: 'Star 5', type: 'stars', price: 0.05 },
            { id: 6, name: 'Star 6', type: 'planets', price: 0.05 },
            { id: 7, name: 'Star 7', type: 'planets', price: 0.05 },
            { id: 8, name: 'Star 8', type: 'constellations', price: 0.05 },
        ];
        // Retrieve products here with an optional type
        return {
            // types: type.split(','),
            products,
        };
    },
    data() {
        return {
            filters: [],
        };
    },
    computed: {
        inputValues() {
            return {
                stars: this.filters.includes('stars'),
                constellations: this.filters.includes('constellations'),
                planets: this.filters.includes('planets'),
            };
        },
        typedProducts() {
            return this.products.filter((product) => {
                if (this.filters.length) {
                    return this.filters.includes(product.type);
                }
                return true;
            });
        },
        queryParams() {
            return this.filters.join(',');
        },
    },
    watchQuery: ['type'],
    methods: {
        filterProductList(event) {
            const inputId = event.target.id;
            const inputIndex = this.filters.findIndex(
                (input) => input === inputId
            );
            if (inputIndex < 0) {
                this.filters.push(inputId);
            } else {
                this.filters.splice(inputIndex, 1);
            }
            this.$router.push({
                path: this.$route.path,
                query: { type: this.queryParams },
            });
        },
    },
};
</script>
