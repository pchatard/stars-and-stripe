<template>
    <main class="main home">
        <div class="page-container">
            <h1 class="title">Stars and Stripe</h1>
            <h2 class="subtitle">
                Buy the most beautiful nebulas, planets, galaxies and more, for
                a few cents.
            </h2>
            <NuxtLink to="/shop" class="shop__link">
                <button>Shop</button>
            </NuxtLink>
        </div>
    </main>
</template>

<style lang="scss">
.home {
    .page-container {
        padding-top: 3rem;
        @include flex(center, center, column);
    }

    .title {
        text-align: center;
        opacity: 0;
        font-size: 5rem;
        font-family: 'Bondi';
        animation: fade-in 1.5s forwards;
    }

    .subtitle {
        text-align: center;
        opacity: 0;
        margin: 2rem;
        animation: fade-in 1.5s forwards;
        animation-delay: 0.5s;
    }

    .shop__link {
        opacity: 0;
        margin: 2rem;
        animation: fade-in 1.5s forwards;
        animation-delay: 1s;
        button {
            font-size: 3rem;
        }

        &:hover {
            background-color: $primary;
        }
    }
}

@include mobile {
    .home {
        .title {
            font-size: 4rem;
        }
        .subtitle {
            font-size: 2rem;
        }
    }
}
</style>
