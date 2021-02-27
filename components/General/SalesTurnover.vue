<template>
    <div>
        <div class="content">
        <span style="padding-left: 20px; font-size: 14px; color: grey">
            {{dataTitle}}
        </span>
        <v-icon>mdi-dots-vertical</v-icon>
        </div>
        <div class="content">
            <div>
            <span class="total">{{this.$defaultHelpers.toCurrency(total)}}</span>
            <div class="content">
            <span class="percentage">
                <v-icon color="red">mdi-arrow-down</v-icon>
                {{percentage}}%</span>
            <span class="wording-percentage">Last period in product sold</span>
            </div>
            </div>
            <img src="~/assets/images/cart.png" height="43px" width="48px" style="margin-right:30px" />
        </div>
    </div>
</template>

<script>

export default {
     props: {
         dataTitle: {
             type: String,
             default: ''
         },
         total: {
             type: Number,
             default: null
         },
         percentage: {
              type: Number,
             default: null
         }
     }
}
</script>
<style scoped>
.content {
    display: flex;
    justify-content: space-between;
}
.total {
    font-size: 18px;
    font-weight: bold;
    padding-left: 20px;
}
.percentage {
    font-size: 10px;
    font-weight: bold;
    color: red;
    padding-left: 20px;
}
.wording-percentage{
     font-size: 10px;
    padding-left: 5px;
    padding-top: 3px;
}
</style>