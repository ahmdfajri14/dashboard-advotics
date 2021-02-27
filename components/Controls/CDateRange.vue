<template>
    <v-menu v-model="menu" :close-on-content-click="false" left>
        <template v-slot:activator="{ on }">
            <span style="margin:20px 0px;">
                <template>
                    <img src="~/assets/images/calendar.png" height="20px"  style="padding-right: 10px"/>
                    <span class="calendar__text" style="font-size:18px !important">
                        Period
                    </span>
                    <span class="calendar__date">
                        {{ $moment(date[0]).format('DD MMM YYYY') }}
                    </span>
                    <span class="calendar__text" style="font-size:18px !important">-</span>
                    <span class="calendar__date">
                        {{ $moment(date[1]).format('DD MMM YYYY') }}
                    </span>
                    <v-icon  v-on="on">mdi-chevron-down</v-icon>
                </template>
            </span>
        </template>
        <v-card>
                <v-date-range
                    :value="{ start: option.startDate, end: option.endDate }"
                    :presets="option.presets"
                    :max="option.maxDate"
                    :display-format="option.format"
                    @input="onDateRangeChange"
                />

            <v-card-actions class="action-button-cdaterange">
                <v-btn
                    @click="
                        $emit('apply-filter', date);
                        menu = false;
                    "
                    text
                    outlined
                    color="white"
                    style="font-size: 14px; background-color: #37B04C; margin-left: 20px"
                >
                    Apply
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
import VDateRange from '~/components/VDateRange/index.vue';

export default {
    components: {
        VDateRange
    },
    name: 'CustomDateRange',

    props: {
        range: {
            type: Array,
            default: () => [],
        },
        icon: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            option: {
                startDate: this.range[0] || this.$moment().format('YYYY-MM-DD'),
                endDate: this.range[1] || this.$moment().format('YYYY-MM-DD'),
                maxDate: this.$moment()
                    .add(3, 'month')
                    .format('YYYY-MM-DD'),
                format: 'YYYY-MM-DD',
                presets: [
                    {
                        label: 'Today',
                        range: [this.$moment().format('YYYY-MM-DD'), this.$moment().format('YYYY-MM-DD')],
                    },
                    {
                        label: 'Yesterday',
                        range: [
                            this.$moment()
                                .subtract(1, 'day')
                                .format('YYYY-MM-DD'),
                            this.$moment()
                                .subtract(1, 'day')
                                .format('YYYY-MM-DD'),
                        ],
                    },
                    {
                        label: 'Last 7 Days',
                        range: [
                            this.$moment()
                                .subtract(7, 'day')
                                .format('YYYY-MM-DD'),
                            this.$moment().format('YYYY-MM-DD'),
                        ],
                    },
                    {
                        label: 'Last 30 Days',
                        range: [
                            this.$moment()
                                .subtract(30, 'day')
                                .format('YYYY-MM-DD'),
                            this.$moment().format('YYYY-MM-DD'),
                        ],
                    },
                    {
                        label: 'This Month',
                        range: [
                            this.$moment()
                                .startOf('month')
                                .format('YYYY-MM-DD'),
                            this.$moment().format('YYYY-MM-DD'),
                        ],
                    },
                    {
                        label: 'Last Month',
                        range: [
                            this.$moment()
                                .subtract(1, 'month')
                                .startOf('month')
                                .format('YYYY-MM-DD'),
                            this.$moment()
                                .subtract(1, 'month')
                                .endOf('month')
                                .format('YYYY-MM-DD'),
                        ],
                    }
                ],
            },
            menu: false,
            date: this.range,
        };
    },

    methods: {
        onDateRangeChange(range) {
            this.date[0] = range.start;
            this.date[1] = range.end;
        },
    },
};
</script>

<style lang="scss" scoped>
.calendar__date {
    background-color: white;
    padding: 10px;
    margin: 0px 10px;
    color: #6A6A6A;
    font-size: 18px;
    font-weight: normal;
    vertical-align: middle;

    .icon {
        margin-left: 15px;
    }

    &:hover {
        cursor: pointer;
    }
}
.calendar__text {
    color: #4d4f5c;
    font-size: 12px;
    font-family: 'lato';
}

.action-button-cdaterange {
    padding: 0 26px 20px 26px;
}
</style>
