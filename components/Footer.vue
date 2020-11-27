<template>
    <footer class="footer">
        <div class="page-container">
            <div class="footer__links">
                <a
                    href="https://www.github.com/pchatard"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src="~assets/github.png" alt="GitHub Logo" />
                </a>
                <a
                    href="https://twitter.com/pierre_codes"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src="~assets/twitter.png" alt="Twitter Logo" />
                </a>
            </div>
            <p class="footer__copyright">
                Stars and Stripe © {{ new Date().getFullYear() }}
            </p>
            <p class="footer__credits">
                Tous droits réservés. Créé par Pierre Chatard
            </p>
        </div>
    </footer>
</template>

<style lang="scss">
.footer {
    position: relative;
    bottom: 0;
    box-shadow: 0 0 3px rgba($background-secondary, 1);
    .page-container {
        padding: 1rem 0;
        @include flex(center, center, column);

        .footer__links {
            a img {
                width: 3.5rem;
                height: 3.5rem;
                filter: grayscale(1);
                border-radius: 50%;
                object-fit: cover;
                transition: all 0.2s;

                &:hover {
                    filter: grayscale(0);
                }
            }
        }
    }
}
</style>
