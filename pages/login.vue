<template>
    <main class="main login">
        <div class="page-container">
            <h1 class="login__title">Glad to see you back!</h1>
            <form class="login__form" @submit.prevent="handleLogin">
                <p class="form__error">{{ errorMessage }}</p>
                <fieldset class="form__fieldset">
                    <label for="email" class="form__label">E-mail</label>
                    <input
                        id="email"
                        v-model="email"
                        class="form__input"
                        type="email"
                        placeholder="your.email@example.com"
                    />
                </fieldset>
                <fieldset class="form__fieldset">
                    <label for="pw" class="form__label">Password</label>
                    <input
                        id="pw"
                        v-model="password"
                        class="form__input"
                        type="password"
                        placeholder="password"
                    />
                </fieldset>
                <button type="submit" class="form__submit">Login</button>
            </form>
            <p class="login__link">
                Become a universe owner,
                <NuxtLink to="/register" class="link">register here</NuxtLink>!
            </p>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
        };
    },
    methods: {
        async handleLogin() {
            try {
                this.errorMessage = '';
                await this.$auth.loginWith('local', {
                    data: {
                        identifier: this.email,
                        password: this.password,
                    },
                });
                this.$router.push('/account');
            } catch (error) {
                this.errorMessage = 'Email or password incorrect';
            }
        },
    },
};
</script>

<style lang="scss">
.login {
    .page-container {
        padding: 3rem 0;
        @include flex(center, center, column);

        .login {
            &__title {
                margin-bottom: 1rem;
            }

            &__form {
                margin-bottom: 2rem;
                @include flex(center, stretch, column);
                width: 100%;

                .form {
                    &__error {
                        color: red;
                        margin-top: 1rem;
                    }

                    &__fieldset {
                        border: none;
                        margin-top: 2rem;
                        @include flex(center, stretch, column);
                    }

                    &__label {
                        margin-bottom: 1rem;
                        font-size: 1.8rem;
                    }

                    &__input {
                        padding: 1rem;
                        background: $background-primary;
                        color: white;
                        border: 1px solid $text;
                        font-family: inherit;
                        font-size: 2rem;
                        outline: none;

                        &:focus {
                            border: 1px solid $background-secondary;
                        }
                    }
                    &__submit {
                        margin-top: 3rem;
                        font-size: 2rem;
                    }
                }
            }

            &__link {
                .link {
                    text-decoration: underline;
                }
            }
        }
    }
}

@media (min-width: 900px) {
    .login {
        .page-container {
            .login {
                &__form {
                    .form__submit:hover {
                        color: $background-primary;
                        background: $text;
                    }
                }
            }
        }
    }
}

@include mobile {
    .login {
        .page-container {
            width: 85%;

            .login {
                &__title {
                    font-size: 2.5rem;
                    text-align: center;
                    margin-bottom: 1rem;
                }

                &__form {
                    .form {
                        &__fieldset {
                            margin-top: 1rem;
                        }
                    }
                }
            }
        }
    }
}
</style>
