<template>
    <div class="table-container">
        <table>
            <thead>
                <tr v-show="!isMobileView" class="desktop-row">
                    <th style="width: 20%">Parameter Key</th>
                    <th style="width: 20%">Value</th>
                    <th style="width: 40%">Description</th>
                    <th style="width: 20%">
                        <div class="date-header" @click="handleToggleOrder">
                            <span>Create Date</span>
                            <i v-if="ascending" class="fa-solid fa-arrow-down-long"></i>
                            <i v-else class="fa-solid fa-arrow-up-long"></i>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(row, index) in tableData">
                    <tr v-if="isMobileView" :key="`mobile-${index}`" class="mobile-row">
                        <td colspan="5">
                            <div class="mobile-card">
                                <div><span>Parameter Key:</span> {{ row.key }}</div>
                                <div><span>Value:</span> {{ row.value }}</div>
                                <div><span>Description:</span> {{ row.description }}</div>
                                <div><span>Create Date:</span> {{ row.create_date }}</div>
                            </div>
                        </td>
                    </tr>
                    <tr v-else :key="`desktop-${index}`" class="desktop-row">
                        <td>{{ row.key }}</td>
                        <td>{{ row.value }}</td>
                        <td>{{ row.description }}</td>
                        <td>{{ row.create_date }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>

</template>

<script>
import GradientButton from '@/components/GradientButton.vue';

export default {
    name: 'CountryConfigurationTable',
    props: {
        tableData: {
            type: Array,
        },
        ascending: {
            type: Boolean,
            default: true
        },
        breakpoint: {
            type: Number,
            default: 768
        }
    },
    data() {
        return {
            windowWidth: window.innerWidth,
        }
    },
    computed: {
        isMobileView() {
            return this.windowWidth <= this.breakpoint;
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.windowWidth = window.innerWidth;
        },
        handleToggleOrder() {
            this.$emit('toggle-order');
        },
    },
    components: {
        GradientButton,
    }
};
</script>

<style scoped>
    .table-container {
        width: 100%;
        overflow-x: auto;
        margin-top: 1%;
    }

    table {
        width: 100%;
    }

    th,
    td {
        text-align: left;
    }
    th {
        color: #7a899f;
        font-size: 22px;
        font-weight: normal;
    }
    .input-group label {
        font-weight: bold;
    }

    .mobile-card {
        display: flex;
        flex-direction: column;
        gap: 10px;
        border-radius: 20px;
        border: 1px solid #ddd;
        padding: 15px
    }

    .mobile-card span {
        font-weight: bold;
    }

    .desktop-row td,th {
        padding: 20px;
    }

    .mobile-row td {
        padding: 5px 20px;
    }
</style>
