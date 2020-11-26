<template>
    <div class="counter">
        <button class="counter__minus" @click="decrement">
            <font-awesome-icon icon="minus" />
        </button>
        <input
            v-model="currentCount"
            class="counter__input"
            type="number"
            min="0"
            step="1"
            @change="$emit('change', currentCount)"
        />
        <button class="counter__plus" @click="increment">
            <font-awesome-icon icon="plus" />
        </button>
    </div>
</template>

<script>
export default {
    props: {
        count: {
            default: () => 1,
            type: Number,
        },
    },
    data() {
        return {
            currentCount: this.count,
        };
    },
    methods: {
        increment() {
            this.currentCount++;
            this.$emit('change', this.currentCount);
        },
        decrement() {
            this.currentCount--;
            this.$emit('change', this.currentCount);
        },
    },
};
</script>

<style lang="scss">
.counter {
    @include flex(center, stretch);

    &__plus,
    &__minus {
        padding: 1rem;
        margin: 0 0.4rem;

        &:hover {
            background-color: $text;
            color: $background-primary;
        }
    }
    &__input {
        text-align: right;
        font-family: inherit;
        width: 6rem;
        font-size: 2rem;
        padding: 0.6rem;
        border: 1px solid white;
    }
}
</style>
