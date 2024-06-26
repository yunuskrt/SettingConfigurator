<template>
    <div class="table-container">
        <table>
            <thead>
                <tr v-show="!isMobileView" class="desktop-row">
                    <th style="width: 20%">Country</th>
                    <th style="width: 20%">Parameter Key</th>
                    <th style="width: 10%">Value</th>
                    <th style="width: 35%">Description</th>
                    <th style="width: 15%"></th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(row, index) in tableData.countryBased">
                    <tr v-if="isMobileView" :key="`mobile-${index}`" class="mobile-row">
                        <td colspan="5">
                            <div class="mobile-card">
                                <div class="country-title"><span>Country:</span>
                                    <span class="link-item" @click="() => redirectToCountryView(row.code)">
                                        {{ row.country }}
                                    </span>
                                </div>
                                <div><span>Parameter Key:</span> {{ row.key }}</div>
                                <div><span>Value:</span> {{ row.value }}</div>
                                <div><span>Description:</span> {{ row.description }}</div>
                                <div style="display: flex; gap: 10px; justify-content: center;">
                                    <GradientButton leftColor="#3d5dec" rightColor="#4385f0" text="Edit"
                                        @btn-click="() => openEditModal(row) " />
                                    <GradientButton leftColor="#da4030" rightColor="#e86489" text="Del"
                                        @btn-click="() => openDeleteModal(row) " />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-else :key="`desktop-${index}`" class="desktop-row">
                        <td class="country-title link-item" @click="() => redirectToCountryView(row.code) ">
                            {{row.country }}
                        </td>
                        <td>{{ row.key }}</td>
                        <td>{{ row.value }}</td>
                        <td>{{ row.description }}</td>
                        <td style="display: flex; gap: 10px;">
                            <GradientButton leftColor="#3d5dec" rightColor="#4385f0" text="Edit"
                                @btn-click="() => openEditModal(row)" />
                            <GradientButton leftColor="#da4030" rightColor="#e86489" text="Delete"
                                @btn-click="() => openDeleteModal(row) " />
                        </td>
                    </tr>
                </template>
                <tr v-if="isMobileView" class="mobile-row default-row">
                    <td colspan="5">
                        <div class="mobile-card">
                            <div><span>Default Parameter Key:</span>{{ tableData.default.key }}</div>
                            <div><span>Default Value:</span>{{ tableData.default.value }}</div>
                            <div><span>Default Description:</span>{{ tableData.default.description }}</div>
                        </div>
                    </td>
                </tr>
                <tr v-else class="desktop-row default-row">
                    <td class="country-title">Default Value</td>
                    <td>{{ tableData.default.key }}</td>
                    <td>{{ tableData.default.value }}</td>
                    <td>{{ tableData.default.description }}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <Modal v-show="editModal.visible" @close="closeEditModal" @confirm="confirmEditModal"
            title="Edit Country Value of Parameter">
            <template v-slot:body>
                <div class="modal-body">
                    <div class="modal-input-container">
                        <div class="input-group">
                            <label for="key">Parameter Key</label>
                            <input type="text" v-model="editModal.key" name="key" placeholder="Parameter Key"
                                class="modal-input" />
                        </div>
                        <div class="input-group">
                            <label for="value">Value</label>
                            <input type="text" v-model="editModal.value" name="value" placeholder="Value"
                                class="modal-input" />
                        </div>
                        <div class="input-group">
                            <label for="description">Description</label>
                            <input type="text" v-model="editModal.description" name="description"
                                placeholder="Description" class="modal-input" />
                        </div>
                    </div>
                </div>
            </template>
        </Modal>
        <Modal v-show="deleteModal.visible" @close="closeDeleteModal" @confirm="confirmDeleteModal"
            title="Delete Country Value for Parameter">
            <template v-slot:body>
                <div class="modal-body">
                    <span>Are you sure deleting the parameter for the country?</span>
                </div>
            </template>
        </Modal>
    </div>

</template>

<script>
import GradientButton from '@/components/GradientButton.vue';
import Modal from '@/components/Modal.vue';

export default {
    name: 'ParameterTable',
    props: {
        tableData: {
            type: Array,
        },
        breakpoint: {
            type: Number,
            default: 768
        }
    },
    data() {
        return {
            editModal: {
                countryCode: '',
                key: '',
                value: '',
                description: '',
                visible: false,
            },
            deleteModal: {
                countryCode: '',
                visible: false
            },
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
        redirectToCountryView(code) {
            this.$router.push(`/country/${code}`);
        },
        openDeleteModal(row) {
            this.deleteModal = {
                countryCode: row.code,
                visible: true
            }
        },
        closeDeleteModal() {
            this.deleteModal.visible = false;
        },
        confirmDeleteModal() {
            this.$emit('delete-country', this.deleteModal.countryCode);
            this.clearDeleteModal();
        },
        clearDeleteModal(){
            this.deleteModal =  {
                countryCode: '',
                visible: false
            }
        },
        openEditModal(row) {
            this.editModal = {
                countryCode: row.code,
                key: row.key,
                value: row.value,
                description: row.description,
                visible: true
            }
        },
        closeEditModal() {
            this.editModal.visible = false;
        },
        confirmEditModal() {
            const emitData = {
                countryCode: this.editModal.countryCode,
                key: this.editModal.key,
                value: this.editModal.value,
                description: this.editModal.description
            }
            this.$emit('edit-country', emitData);
            this.clearEditModal();
        },
        clearEditModal(){
            this.editModal = {
                countryCode: '',
                key: '',
                value: '',
                description: '',
                visible: false,
            }
        }
    },
    components: {
        GradientButton,
        Modal
    }
};
</script>

<style scoped>
.country-title {
    font-size: 18px;
        font-weight: bold;
    }
.default-row{
    color: #d74d4d;
}
.modal-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 300px;
}
</style>
