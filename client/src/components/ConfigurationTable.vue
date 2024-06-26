<template>
    <div class="table-container">
        <table>
            <thead>
                <tr v-show="!isMobileView" class="desktop-row">
                    <th style="width: 20%">Parameter Key</th>
                    <th style="width: 20%">Value</th>
                    <th style="width: 35%">Description</th>
                    <th style="width: 15%">
                        <div class="date-header" @click="handleToggleOrder">
                            <span>Create Date</span>
                            <i v-if="ascending" class="fa-solid fa-arrow-down-long"></i>
                            <i v-else class="fa-solid fa-arrow-up-long"></i>
                        </div>
                    </th>
                    <th style="width: 10%"></th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(row, index) in tableData">
                    <tr v-if="isMobileView" :key="`mobile-${index}`" class="mobile-row">
                        <td colspan="5">
                            <div class="mobile-card">
                                <div>
                                    <span>Parameter Key:</span> 
                                    <span class="link-item" @click="() => redirectToParameterView(row.id) ">
                                        {{ row.key }}
                                    </span>
                                </div>
                                <div><span>Value:</span> {{ row.value }}</div>
                                <div><span>Description:</span> {{ row.description }}</div>
                                <div><span>Create Date:</span> {{ row.create_date }}</div>
                                <div style="display: flex; gap: 10px; justify-content: center;">
                                    <GradientButton leftColor="#3d5dec" rightColor="#4385f0" text="Edit"
                                        @btn-click="() => openEditModal(row)" />
                                    <GradientButton leftColor="#da4030" rightColor="#e86489" text="Del"
                                        @btn-click="() => openDeleteModal(row)" />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-else :key="`desktop-${index}`" class="desktop-row">
                        <td class="link-item" @click="()=>redirectToParameterView(row.id)">{{ row.key }}</td>
                        <td>{{ row.value }}</td>
                        <td>{{ row.description }}</td>
                        <td>{{ row.create_date }}</td>
                        <td style="display: flex; gap: 10px;">
                            <GradientButton leftColor="#3d5dec" rightColor="#4385f0" text="Edit"
                                @btn-click="() => openEditModal(row)" />
                            <GradientButton leftColor="#da4030" rightColor="#e86489" text="Delete"
                                @btn-click="() => openDeleteModal(row)" />
                        </td>
                    </tr>
                </template>
                <tr v-if="isMobileView" class="mobile-row">
                    <td colspan="5" class="mobile-add-container">
                        <input type="text" v-model="createParams.key" placeholder="New Parameter" class="form-input" />
                        <input type="text" v-model="createParams.value" placeholder="Value" class="form-input" />
                        <input type="text" v-model="createParams.description" placeholder="New Description"
                            class="form-input" />
                        <GradientButton leftColor="#469ee6" rightColor="#6ce8c7" text="ADD" @btn-click="handleCreate" />
                    </td>
                </tr>
                <tr v-else class="desktop-row">
                    <td>
                        <input type="text" v-model="createParams.key" placeholder="New Parameter" class="form-input" />
                    </td>
                    <td>
                        <input type="text" v-model="createParams.value" placeholder="Value" class="form-input" />
                    </td>
                    <td colspan="2">
                        <input type="text" v-model="createParams.description" placeholder="New Description"
                            class="form-input" />
                    </td>
                    <td>
                        <GradientButton leftColor="#469ee6" rightColor="#6ce8c7" text="ADD" @btn-click="handleCreate" />
                    </td>
                </tr>
            </tbody>
        </table>
        <Modal v-show="editModal.visible" @close="closeEditModal" @confirm="confirmEditModal" title="Edit Parameter">
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

                        <div class="input-group">
                            <label for="createDate">Create Date</label>
                            <input type="text" v-model="editModal.create_date" name="createDate"
                                placeholder="Create Date" class="modal-input" disabled />
                        </div>
                    </div>
                    <CountrySelect :selectValues="editModal.selectValues" />
                </div>
            </template>
        </Modal>
        <Modal v-show="deleteModal.visible" @close="closeDeleteModal" @confirm="confirmDeleteModal"
            title="Delete Parameter">
            <template v-slot:body>
                <div class="modal-body">
                    <span>Are you sure deleting the parameter?</span>
                </div>
            </template>
        </Modal>
    </div>

</template>

<script>
import GradientButton from '@/components/GradientButton.vue';
import Modal from '@/components/Modal.vue';
import CountrySelect from '@/components/CountrySelect.vue';

export default {
    name: 'ConfigurationTable',
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
            editModal: {
                id: '',
                key: '',
                value: '',
                description: '',
                create_date: '',
                visible: false,
                selectValues: {
                    option: 'all',
                    country: {},
                },
            },
            deleteModal:{
                id: '',
                visible: false,
            },
            createParams: {
                key: '',
                value: '',
                description: '',
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
        handleToggleOrder() {
            this.$emit('toggle-order');
        },

        openEditModal(row) {
            this.editModal = {
                id: row.id,
                key: row.key,
                value: row.value,
                description: row.description,
                create_date: row.create_date,
                visible: true,
                selectValues: this.editModal.selectValues
            }
        },
        openDeleteModal(row) {
            this.deleteModal = {
                ...row,
                visible: true
            }
        },
        handleCreate() {
            // input validation
            const {key, value, description } = this.createParams;
            if (key != '' && value != '' && description != ''){
                this.$emit('add-config', this.createParams); // emit to send POST on page level
                this.clearCreateParams();
            }        
            else
                alert('Please fill in the form');
        },

        closeEditModal() {
            this.editModal.visible = false;
        },
        closeDeleteModal() {
            this.deleteModal.visible = false;
        },
        closeCreateModal() {
            this.createModal.visible = false;
        },

        confirmEditModal() {
            // input validation 
            const {id, key, value, description, create_date } = this.editModal;
            if ( key != '' && value != '' && description != '' && create_date != '') {
                const editData = {id, key,value,description,create_date};
                const option = this.editModal.selectValues.option;
                const emitData = {
                    ...editData,
                    type: option,
                    country: option === 'all' ? "" :
                        this.editModal.selectValues.country.code,
                }
                this.$emit('edit-config', emitData); // emit to send PATCH on page level
                
                // clear the modal after input validation
                this.clearEditModal();
            } else {
                alert('Please fill in the form');
            }
        },
        confirmDeleteModal() {
            this.$emit('delete-config', this.deleteModal.id);
            this.clearDeleteModal();
        },

        clearEditModal(){
            this.editModal = {
                id: '',
                key: '',
                value: '',
                description: '',
                create_date: '',
                visible: false,
                selectValues: {
                    option: 'all',
                    country: {},
                },
            }
        },
        clearDeleteModal(){
            this.deleteModal = {
                id: {},
                visible: false,
            }
        },
        clearCreateParams(){
            this.createParams = {
                key: '',
                value: '',
                description: '',
            }
        },

        redirectToParameterView(id){
            this.$router.push(`/parameter/${id}`)
        }
    },
    components:{
        GradientButton,
        Modal,
        CountrySelect
    }
};
</script>

<style scoped>
.modal-body{
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 300px;
}
.form-input{
    border-radius: 5px;
}
.mobile-add-container{
    display:flex; 
    flex-direction: column; 
    gap: 15px;
}
</style>
