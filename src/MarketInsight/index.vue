<template>
   <content-wrapper>
             <header-wrapper align="between">
                 <v-col cols="2" class="header-title">
                     Dashboard
                 </v-col>
                   <v-col cols="7" class="with-border" width="481px" height="48px" >
                      <c-date-range
                            :range="dateRange"
                            class="dateFilter"
                        />
                   </v-col>
             </header-wrapper>
             <header-wrapper align="between" style="background-color: #37B04C; margin-top: 20px">
                  <v-col cols="5" class="market-title">
                     MARKET INSIGHTS
                 </v-col>
                   <v-col cols="3" >
                       <v-icon color="white">mdi-help-circle-outline</v-icon>
                  <a style="color:#FFFFFF; font-size:12px; text-decoration: underline">Click Here for Help</a>
                   </v-col>
             </header-wrapper>
             <header-wrapper align="left" style="margin-top: 20px">
                  <v-card class="with-border" width="276px" height="104px" elevation="0.5">
                      <sales-turnover data-title='Sales Turnover' :total="1000000" :percentage="12.5"/>
                  </v-card>
             </header-wrapper>
              <header-wrapper align="between" style="margin-top: 20px">
                  <v-col cols="6" class="header-title">
                   <v-card class="with-border" width="auto" height="auto" elevation="0.5" style="padding-bottom: 10px">
                    <chart-content chartTitle="AVERAGE PURCHASE VALUE" :product="product"/>
                     </v-card>
                 </v-col>
                 <v-col cols="3.5" class="header-title">
                     <v-card class="with-border" width="auto" height="auto" elevation="0.5" style="padding-bottom: 10px">
                    <product-content productTitle="Best Selling SKU" :product="product"/>
                     </v-card>
                 </v-col>
                 <v-col cols="3.5" class="header-title">
                      <v-card class="with-border" width="550px" height="auto" elevation="0.5" style="padding-bottom: 10px">
                    <product-content productTitle="Top Competitor SKU" :product="productCompetitor"/>
                     </v-card>
                 </v-col>
              </header-wrapper>
   </content-wrapper>
</template>
<script>
import ContentWrapper from '@/components/General/ContentWrapper';
import HeaderWrapper from '@/components/General/HeaderWrapper';
import CDateRange from '@/components/Controls/CDateRange';
import SalesTurnover from '@/components/General/SalesTurnover';
import ProductContent from  '@/components/General/ProductContent';
import ChartContent from  '@/components/General/ChartContent';

export default {
    components: {
        ContentWrapper,
        HeaderWrapper,
        CDateRange,
        SalesTurnover,
        ProductContent,
        ChartContent
    },
    data(){
        return {
        dateRange: [
                this.$moment()
                    .subtract(1, 'months')
                    .format('YYYY-MM-DD'),
                this.$moment().format('YYYY-MM-DD'),
            ],
        product: [
            {
                name: 'Produk A',
                src: '~/assets/images/stock.png',
                price: 10000,
                amount: 10
            },
            {
                name: 'Produk B',
                src: '~/assets/images/stock.png',
                price: 20000,
                amount: 20
            },
            {
                name: 'Produk C',
                 src: '~/assets/images/stock.png',
                price: 30000,
                amount: 30
            },
            {
                name: 'Produk D',
                 src: '~/assets/images/stock.png',
                price: 30000,
                amount: 30
            }
        ],
        productCompetitor: [
            {
                name: 'Produk A',
                src: '~/assets/images/stock.png',
                price: 10000,
                amount: 10
            },
            {
                name: 'Produk B',
                src: '~/assets/images/stock.png',
                price: 20000,
                amount: 20
            },
            {
                name: 'Produk C',
                 src: '~/assets/images/stock.png',
                price: 30000,
                amount: 30
            },
            {
                name: 'Produk D',
                 src: '~/assets/images/stock.png',
                price: 30000,
                amount: 30
            }
        ]
        }
    }
}
</script>
<style lang="scss" scoped>
.header-title {
top: 94px;
left: 96px;
width: 187px;
height: 50px;
text-align: left;
font: normal normal 600 40px/28px;
font-size: 26px;
font-family: sans-serif;
letter-spacing: 0px;
color: #707070C4;
font-weight: bold;
opacity: 1;
}
.with-border {
    padding-top:10px; 
    background-color: #ffff;
}
.market-title{
    color: #ffff;
    font-weight: bold;
    font-size: 18px;
}
</style>
