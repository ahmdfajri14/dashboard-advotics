<template>
<div>
     <div class="content">
        <label style="padding-left: 10px; font-size: 16px; color: #4D4F5C; font-family: system-ui">
            {{productTitle}}
        </label>
        <v-icon>mdi-dots-vertical</v-icon>
        </div>
        <v-hover v-for="(item, key) in product" :key="key" v-slot="{ hover }">
         <v-card  :class="`${hover? 'card-product-hover' : 'card-product'}`" width="230px" height="80px" :elevation="hover ? 12 : 2">
            <v-row>
                  <v-col  sm="3">
                 <img :src="item.src" height="43px" width="48px"  />
                   </v-col>
                    <v-col sm="6" >
                        <label class="product-title">{{item.name}}</label>
                        <v-row>
                          <div  class="content">
                        <label class="product-price">Rp {{item.price}}</label>
                        <label class="product-amount">{{item.amount}} Jumlah</label>
                          </div>
                        </v-row>
                   </v-col>
            </v-row>
         </v-card>
          </v-hover>
</div>
</template>

<script>
export default {
    props: {
        productTitle: {
             type: String,
             default: ''
        },
        product: {
            type: Array,
            default: () => {},
        }
    }
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
.card-product-hover {
    background-color: #FFE7BD;
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