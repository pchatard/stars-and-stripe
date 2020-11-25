<template>
    <fieldset>
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
