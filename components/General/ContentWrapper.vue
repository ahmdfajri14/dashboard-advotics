<template>
    <div>
        <div v-if="!detail" class="content-wrapper">
            <slot />
        </div>
        <div v-else class="detail-wrapper">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        detail: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
.content-wrapper {
    background: #f6f9ff;
    padding: 32px;
    min-height: 850px;
    width: auto;
}
.detail-wrapper {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
    background-color: #F7F7F7;
    padding: 19px 38px;
}
</style>
