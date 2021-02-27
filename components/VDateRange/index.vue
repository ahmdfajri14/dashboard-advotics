<template>
    <div class="v-date-range">
            <v-card-text>
                <div
                    :data-days="highlightDates.length"
                    :class="{
                        'v-date-range__pickers': true,
                        'v-date-range--highlighted': highlightDates.length,
                    }"
                >
                    <v-card-title v-if="$slots.title" style="font-size: 14px;">
                        <slot v-if="$slots.title" name="title" />
                    </v-card-title>
                    <v-card-text>
                        <div class="v-date-range__content">
                            <v-list v-if="!noPresets" class="mr-4">
                                <v-subheader style="font-size: 14px;">
                                     <img src="@/assets/images/calendar.png" height="18px"  style="padding-right: 10px"/>
                                     Period
                                </v-subheader>
                                <v-list-item
                                    v-for="(preset, index) in presets"
                                    :key="index"
                                    v-model="isPresetActive[index]"
                                    @click="selectPreset(index)"
                                    style="font-size: 14px; border-right: 1px solid grey;"
                                >
                                    <v-list-item-content style="border-bottom: 1px solid grey;">
                                        {{ preset.label }}
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <v-date-picker
                                v-model="pickerStart"
                                :locale="locale"
                                :min="min"
                                :max="pickerEnd || max"
                                :no-title="noTitle"
                                :next-icon="nextIcon"
                                :prev-icon="prevIcon"
                                :events="highlightDates"
                                :event-color="highlightClasses"
                                 color="green lighten-1"
                                class="mr-4 v-date-range__picker--start v-date-range__picker"
                                style="font-size: 14px;"
                            />
                            <v-date-picker
                                v-model="pickerEnd"
                                :locale="locale"
                                :min="pickerStart || min"
                                :max="max"
                                :no-title="noTitle"
                                :next-icon="nextIcon"
                                :prev-icon="prevIcon"
                                :events="highlightDates"
                                :event-color="highlightClasses"
                                 color="green lighten-1"
                                class="v-date-range__picker--end v-date-range__picker"
                                style="font-size: 14px;"
                            />
                        </div>
                    </v-card-text>
                </div>
            </v-card-text>
    </div>
</template>

<script>
import moment from 'moment';
const isoFormat = 'yyyy-MM-dd';
const defaultDate = moment(new Date()).format(isoFormat);

export default {
    name: 'VDaterange',
    props: {
        // Take start and end as the input. Passable via v-model.
        value: {
            type: Object,
            default: () => {
                return { start: defaultDate, end: defaultDate };
            },
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        presets: {
            type: Array,
            default: () => {
                return [];
            },
        },
        noPresets: {
            type: Boolean,
            default: false,
        },
        // Denotes the Placeholder string for start date.
        startLabel: {
            type: String,
            default: 'Start Date',
        },
        // Denotes the Placeholder string for start date.
        endLabel: {
            type: String,
            default: 'End Date',
        },
        // The string that gets placed between `startLabel` and `endLabel`
        separatorLabel: {
            type: String,
            default: 'To',
        },
        presetLabel: {
            type: String,
            default: '',
        },
        /**
         * Following values are all passable to vuetify's own datepicker
         * component.
         */
        // Min selectable date.
        min: {
            type: String,
            default: undefined,
        },
        // Max selectable date
        max: {
            type: String,
            default: undefined,
        },
        // Locale
        locale: {
            type: String,
            default: 'en-us',
        },
        noTitle: {
            type: Boolean,
            default: false,
        },
        displayFormat: {
            type: String,
            default: isoFormat,
        },
        highlightColor: {
            type: String,
            default: 'blue lighten-5',
        },
        showReset: {
            type: Boolean,
            default: true,
        },
        /**
         * Icons
         */
        nextIcon: {
            type: String,
            default: '$vuetify.icons.next',
        },
        prevIcon: {
            type: String,
            default: '$vuetify.icons.prev',
        },
        inputProps: {
            type: Object,
            default: () => {
                return {};
            },
        },
        menuProps: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
            menu: false,
            pickerStart: this.value.start,
            pickerEnd: this.value.end,
            highlightDates: [],
            highlightClasses: {},
        };
    },
    computed: {
        inputValue() {
            if (this.isValueEmpty) {
                return '';
            }
            const start = this.displayFormat ? this.formatDate(this.value.start, this.displayFormat) : this.value.start;
            const end = this.displayFormat ? this.formatDate(this.value.end, this.displayFormat) : this.value.end;
            return `${start}    ${this.separatorLabel}     ${end}`;
        },
        placeholder() {
            return `${this.startLabel}    ${this.separatorLabel}    ${this.endLabel}`;
        },
        /**
         * If the value prop doesn't have any start value,
         * its most likely that an empty object was passed.
         */
        isValueEmpty() {
            return !this.value.start;
        },
        /**
         * If the user has selected both the dates or not
         */
        bothSelected() {
            return this.pickerStart && this.pickerEnd;
        },
        isPresetActive() {
            return this.presets.map(
                preset => preset.range[0] === this.pickerStart && preset.range[1] === this.pickerEnd
            );
        },
    },
    watch: {
        // Watching to see if the menu is closed.
        menu(isOpen) {
            if (!isOpen) {
                this.closeMenu();
            } else {
                this.highlight();
            }
        },
        pickerStart() {
            this.highlight();
            this.emitRange();
        },
        pickerEnd() {
            this.highlight();
            this.emitRange();
        },
    },
    methods: {
        /**
         * Emit the input event with the updated range data.
         * This makes v-model work.
         */
        applyRange() {
            this.menu = false;
            this.emitRange();
        },
        /**
         * Called every time the menu is closed.
         * It also emits an event to tell the parent
         * that the menu has closed.
         *
         * Upon closing the datepicker values are set
         * to the current selected value.
         */
        closeMenu() {
            // Reset the changed values for datepicker models.
            this.pickerStart = this.value.start;
            this.pickerEnd = this.value.end;
            this.highlight();
            this.$emit('menu-closed');
        },
        formatDate(date, fmt) {
            const parsed = moment(date, 'yyyy-MM-dd');
            return moment(parsed).format(fmt);
        },
        highlight() {
            if (!this.bothSelected) {
                return;
            }
            const dates = [];
            const classes = {};
            const start = moment(this.pickerStart, 'yyyy-MM-dd');
            const end = moment(this.pickerEnd, 'yyyy-MM-dd');
            const diff = start.diff(end, 'days');

            // Loop though all the days in range.
            for (let i = 0; i <= diff; i++) {
                const date = moment(start)
                    .add(i, 'days')
                    .format(isoFormat);
                dates.push(date);
                const classesArr = [];
                classesArr.push('v-date-range__in-range');
                classesArr.push(this.highlightColor);
                i === 0 && classesArr.push('v-date-range__range-start');
                i === diff && classesArr.push('v-date-range__range-end');
                classes[date] = classesArr.join(' ');
            }
            this.highlightDates = dates;
            this.highlightClasses = classes;
        },
        selectPreset(presetIndex) {
            this.pickerStart = this.presets[presetIndex].range[0];
            this.pickerEnd = this.presets[presetIndex].range[1];
        },
        reset() {
            // Reset Picker Values
            this.pickerStart = '';
            this.pickerEnd = '';
            this.highlightDates = [];
            this.highlightClasses = {};
            this.emitRange();
        },
        emitRange() {
            this.$emit('input', {
                start: this.pickerStart,
                end: this.pickerEnd,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.v-date-range__input-field input {
    text-align: center;
}

.v-date-range__content {
    display: flex;

    .v-date-picker-table {
        .v-btn {
            border-radius: 0;
        }
    }
}

.v-date-range__pickers .v-date-picker-table__events {
    height: 100%;
    width: 100%;
    top: 0;
    z-index: -1;
}

.v-date-range__pickers .v-date-picker-table table {
    width: auto;
    margin: auto;
    border-collapse: collapse;

    & th,
    & td {
        height: 32px;
        width: 32px;
    }

    & td {
        .v-btn {
            &.v-btn--outline {
                border: none;
                box-shadow: 0 0 0 1px currentColor inset;
            }

            &.v-btn--active::before {
                background-color: transparent !important;
            }
        }
    }
}

.v-date-range__pickers .v-date-range__in-range {
    height: 100%;
    width: 100%;
    margin: 0;
    border-radius: 0;
}
</style>
