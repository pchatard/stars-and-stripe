<template>
    <div>
        <p>Product: {{ item.product }}</p>
        <p>Price: {{ item.price }}</p>
        <p>Price: {{ item.count }}</p>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            default: () => ({}),
            type: Object,
        },
    },
};
</script>
