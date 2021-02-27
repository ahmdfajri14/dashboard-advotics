<template>
    <div :class="justify(align)" class="header-wrapper">
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        align: {
            type: String,
            default: 'right',
        },
    },
    methods: {
        justify(val) {
            switch (val) {
                case 'left':
                    return 'start';
                case 'center':
                    return 'center';
                case 'between':
                    return 'between';
                default:
                    return 'end';
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.header-wrapper {
    display: flex;
    width: 100%;
    margin-bottom: 2px;
    align-items: center;
    &.end {
        justify-content: flex-end;
    }
    &.start {
        justify-content: flex-start;
    }
    &.center {
        justify-content: center;
    }
    &.between {
        justify-content: space-between;
    }
}
</style>
