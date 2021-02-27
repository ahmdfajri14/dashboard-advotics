<template>
    <component :is="marketInsight" />
</template>

<script>
export default {
    name: 'MarketInsight',

    computed: {
        marketInsight() {
            return () => import('@/src/MarketInsight/index.vue');
        },
    },
};
</script>
