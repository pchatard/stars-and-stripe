<template>
    <main class="main shop">
        <div class="page-container">
            <h1 class="title">Shop a piece of the universe</h1>
            <div class="filters">
                <p class="filters__title">Filter by:</p>
                <div class="filters__container">
                    <CategoryFilter
                        v-for="category in types"
                        :key="category.id"
                        :category="category"
                        :active="activeFilters.includes(category.id)"
                        @change="filterProductList"
                    />
                </div>
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
    async asyncData({ query, $strapi }) {
        const products = await $strapi.$products.find();
        const types = await $strapi.$types.find();
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
    .page-container {
        padding-top: 3rem;
        max-width: 100%;
    }

    .title {
        margin-bottom: 2rem;
    }

    .filters {
        @include flex($align: center);
        margin-bottom: 2rem;

        &__title {
            font-size: 2rem;
            margin-right: 2rem;
        }

        &__container {
            @include flex;
        }
    }

    .products {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 5rem;
    }
}

@include tablet {
    .shop {
        .products {
            grid-template-columns: 1fr 1fr;
        }
    }
}

@include mobile {
    .shop {
        .products {
            grid-template-columns: 1fr;
        }
        .filters {
            flex-direction: column;
            align-items: flex-start;

            &__title {
                margin-bottom: 1rem;
            }
        }
    }
}
</style>
