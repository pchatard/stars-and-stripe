<template>
    <header class="header">
        <h1 class="logo">Stars and Stripe</h1>
        <nav v-show="showNavbar" class="navbar">
            <ul class="navbar__list">
                <li class="navbar__list__item">
                    <NuxtLink to="/" class="nav-link"> Home </NuxtLink>
                </li>
                <li class="navbar__list__item">
                    <NuxtLink to="/products" class="nav-link"> Shop </NuxtLink>
                </li>
                <!-- <li class="navbar__list__item">
                    <NuxtLink to="?type=stars" class="nav-link">
                        Stars
                    </NuxtLink>
                </li>
                <li class="navbar__list__item">
                    <NuxtLink to="?type=constellations" class="nav-link">
                        Constellations
                    </NuxtLink>
                </li>
                <li class="navbar__list__item">
                    <NuxtLink to="?type=planets" class="nav-link">
                        Planets
                    </NuxtLink>
                </li> -->
                <li class="navbar__list__item">
                    <NuxtLink to="/cart" class="nav-link"> Cart </NuxtLink>
                </li>
            </ul>
        </nav>
        <Hamburger :checked="showNavbar" @hamburger="toggleNavbar" />
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
        window.addEventListener('load', this.initializeNavbar);
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
    },
};
</script>

<style lang="scss">
.header {
    border: 1px solid red;

    .logo {
    }
    .navbar {
        &__list {
            &__item {
            }
            .nav-link {
            }

            .nuxt-link-exact-active {
                background-color: red;
            }
        }
    }
}
</style>
