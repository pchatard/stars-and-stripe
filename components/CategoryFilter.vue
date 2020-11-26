<template>
    <fieldset class="filter">
        <input
            :id="category.id"
            type="checkbox"
            :name="category.title.toLowerCase()"
            :checked="active"
            @change="$emit('change', category.id)"
        />
        <label :for="category.id">{{ category.title }}</label>
    </fieldset>
</template>

<script>
export default {
    props: {
        category: {
            default: () => ({}),
            type: Object,
        },
        active: {
            default: () => false,
            type: Boolean,
        },
    },
};
</script>

<style lang="scss">
.filter {
    border: none;
    margin-right: 2rem;

    input {
        display: none;
    }

    label {
        display: inline-block;
        text-align: center;
        width: 12rem;
        border: 1px solid $text;
        padding: 1.2rem 0;
        cursor: pointer;

        &:hover {
            background-color: $text;
            color: $background-primary;
        }
    }

    input:checked ~ label {
        background-color: $text;
        color: $background-primary;

        &:hover {
            color: $text;
            background-color: $background-primary;
        }
    }
}
</style>
