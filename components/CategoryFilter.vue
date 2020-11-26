<template>
    <fieldset class="filter">
        <label :for="category.id">{{ category.title }}</label>
        <input
            :id="category.id"
            type="checkbox"
            :name="category.title.toLowerCase()"
            :checked="active"
            @change="$emit('change', category.id)"
        />
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
    label {
    }
    input {
    }
}
</style>
