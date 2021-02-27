<template>
<div>
     <div class="content">
        <label style="padding-left: 10px; font-size: 16px; color: #4D4F5C; font-family: system-ui">
            {{chartTitle}}
        </label>
        <v-icon>mdi-dots-vertical</v-icon>
        </div>
        <div style="margin: 40px">
          <v-sparkline
     :gradient="['#37B04C','#37B04C']"
     type="bar"
     show-labels
     auto-line-width
     :labels="['Mon', 'Tue', 'Wed', 'Thru', 'Fri', 'Sat', 'Sun']"
     :value="value"
  ></v-sparkline>
        </div>
</div>
</template>

<script>
export default {
    props: {
        chartTitle: {
             type: String,
             default: ''
        },
        product: {
            type: Array,
            default: () => {},
        }
    },
    data: () => ({
      value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
      ],
    }),
}
</script>
<style scoped>
.content {
    display: flex;
    justify-content: space-between;
}
.card-product {
    background-color: #ffff;
    margin: 20px 10px 10px 10px
}
.product-title {
    font-size: 14px;
}
.product-price {
    font-size: 12px;
    padding-left: 12px;
        color: #00000099;
}
.product-amount {
    font-size: 12px;
     position: absolute;
  right: 0;
  padding-right: 20px;
      color: #00000099;
}
</style>