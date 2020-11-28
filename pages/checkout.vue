<template>
    <main class="main checkout">
        <div class="page-container">
            <h1>Checkout page</h1>
            <h2>
                This is a mock-up e-commerce website, of course you can't buy a
                planet!
            </h2>
            <NuxtLink to="/"><button>Home</button></NuxtLink>
        </div>
    </main>
</template>

<style lang="scss">
.checkout {
    .page-container {
        @include flex(center, center, column);

        h1 {
            font-size: 4rem;
        }

        h2 {
            font-size: 2.5rem;
            text-align: center;
            margin: 2rem;
        }

        button {
            margin: 2rem 0;
            font-size: 2rem;

            &:hover {
                background-color: $text;
                color: $background-primary;
            }
        }
    }
}

@include mobile {
    .checkout {
        h1 {
            font-size: 3rem;
        }

        h2 {
            font-size: 1.8rem;
        }
    }
}
</style>
