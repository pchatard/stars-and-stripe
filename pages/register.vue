<template>
    <main class="main register">
        <div class="page-container">
            <h1 class="register__title">Become a universe owner!</h1>
            <form class="register__form" @submit.prevent="handleRegistration">
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
                <fieldset class="form__fieldset">
                    <label for="pwc" class="form__label"
                        >Confirm Password</label
                    >
                    <input
                        id="pwc"
                        v-model="passwordConfirmation"
                        class="form__input"
                        type="password"
                        placeholder="password"
                    />
                </fieldset>
                <button type="submit" class="form__submit">Register</button>
            </form>
            <p class="register__link">
                Already an owner,
                <NuxtLink to="/login" class="link">check in</NuxtLink>!
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
            passwordConfirmation: '',
            errorMessage: '',
        };
    },
    methods: {
        async handleRegistration() {
            if (this.password !== this.passwordConfirmation) {
                this.errorMessage = "Passwords don't match";
                return;
            }
            try {
                this.errorMessage = '';
                await this.$axios.$post(`/auth/local/register`, {
                    username: this.email.split('@')[0],
                    email: this.email,
                    password: this.password,
                });
                await this.$auth.loginWith('local', {
                    data: { identifier: this.email, password: this.password },
                });
                this.$router.go(-2);
            } catch (error) {
                this.errorMessage = 'Invalid email';
            }
        },
    },
};
</script>

<style lang="scss">
.register {
    .page-container {
        padding: 3rem 0;
        @include flex(center, center, column);

        .register {
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
    .register {
        .page-container {
            .register {
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
    .register {
        .page-container {
            width: 85%;

            .register {
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
