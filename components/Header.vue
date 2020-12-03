<template>
    <header class="header">
        <div class="page-container">
            <NuxtLink to="/">
                <h1 class="app__title">Stars and Stripe</h1>
            </NuxtLink>
            <nav v-show="showNavbar" class="navbar">
                <ul class="navbar__list">
                    <li class="navbar__list__item" @click="toggleNavbar">
                        <NuxtLink to="/" class="nav-link"> Home </NuxtLink>
                    </li>
                    <li class="navbar__list__item" @click="toggleNavbar">
                        <NuxtLink to="/shop" class="nav-link"> Shop </NuxtLink>
                    </li>
                    <li class="navbar__list__item" @click="toggleNavbar">
                        <NuxtLink to="/cart" class="nav-link">
                            <font-awesome-icon icon="shopping-cart" />
                        </NuxtLink>
                    </li>
                    <li class="navbar__list__item" @click="toggleNavbar">
                        <NuxtLink
                            :to="$auth.loggedIn ? '/account' : '/login'"
                            class="nav-link"
                        >
                            <font-awesome-icon icon="user" />
                        </NuxtLink>
                    </li>
                    <li
                        v-show="$auth.loggedIn"
                        class="navbar__list__item"
                        @click="handleLogout"
                    >
                        <NuxtLink to="/shop" class="nav-link">
                            Logout
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
            <Hamburger :checked="showNavbar" @hamburger="toggleNavbar" />
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            showNavbar: false,
            isMobileView: false,
        };
    },
    mounted() {
        this.initializeNavbar();
        window.addEventListener('resize', this.initializeNavbar);
    },
    methods: {
        initializeNavbar() {
            this.isMobileView = window.innerWidth <= 900;
            this.showNavbar = !this.isMobileView;
        },
        toggleNavbar() {
            if (this.isMobileView) {
                this.showNavbar = !this.showNavbar;
            }
        },
        async handleLogout() {
            await this.$auth.logout();
            this.toggleNavbar();
        },
    },
};
</script>

<style lang="scss">
.header {
    background-color: $background-primary;
    z-index: 10;
    box-shadow: 0 0 3px rgba($background-secondary, 1);
    width: 100%;
    position: fixed;
    top: 0;

    .page-container {
        height: 8rem;
        @include flex(space-between, center);
    }

    .app__title {
        position: relative;
        z-index: 5;
    }

    .navbar {
        font-size: 2rem;

        &__list {
            @include flex;

            &__item {
                margin-left: 3rem;

                .nav-link {
                    padding: 0.8rem 0;
                    border-bottom: 2px solid transparent;

                    &:hover {
                        color: $background-secondary;
                    }
                }

                .nuxt-link-exact-active {
                    // color: $background-secondary;
                    border-bottom: 2px solid $background-secondary;
                }
            }
        }
    }
}

@include tablet {
    .header {
        .page-container {
            justify-content: center;
        }

        .navbar {
            position: absolute;
            background-color: $background-secondary;
            height: 100vh;
            top: 0;
            left: 0;
            right: 0;
            display: grid;
            place-items: center;
            font-size: 3rem;

            &__list {
                flex-direction: column;
                align-items: center;

                &__item {
                    margin: 0;

                    &:not(:last-of-type) {
                        margin-bottom: 4rem;
                    }

                    .nav-link:hover {
                        color: $background-primary;
                    }

                    .nuxt-link-exact-active {
                        border-bottom: 2px solid $background-primary;
                    }
                }
            }
        }
    }
}

@include mobile {
    .header {
        .app__title {
            font-size: 2.5rem;
        }
    }
}
</style>
