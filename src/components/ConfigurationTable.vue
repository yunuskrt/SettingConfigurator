<template>
    <div class="table-container">
        <table>
            <thead>
                <tr v-show="!isMobileView" class="desktop-row">
                    <th style="width: 20%">Parameter Key</th>
                    <th style="width: 20%">Value</th>
                    <th style="width: 35%">Description</th>
                    <th style="width: 15%">Create Date</th>
                    <th style="width: 10%"></th>
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
                                <div style="display: flex; gap: 10px; justify-content: center;">
                                    <GradientButton leftColor="#3d5dec" rightColor="#4385f0" text="Edit"
                                        @btn-click="() => handleEdit(row)" />
                                    <GradientButton leftColor="#da4030" rightColor="#e86489" text="Del"
                                        @btn-click="() => handleDelete(row)" />
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-else :key="`desktop-${index}`" class="desktop-row">
                        <td>{{ row.key }}</td>
                        <td>{{ row.value }}</td>
                        <td>{{ row.description }}</td>
                        <td>{{ row.create_date }}</td>
                        <td style="display: flex; gap: 10px;">
                            <GradientButton leftColor="#3d5dec" rightColor="#4385f0" text="Edit"
                                @btn-click="() => handleEdit(row)" />
                            <GradientButton leftColor="#da4030" rightColor="#e86489" text="Delete"
                                @btn-click="() => handleDelete(row)" />
                        </td>
                    </tr>
                </template>
                <tr v-if="isMobileView" class="mobile-row">
                    <td colspan="5" class= "mobile-add-container">
                        <input type="text" v-model="addParameter.key" placeholder="New Parameter" class="form-input" />
                        <input type="text" v-model="addParameter.value" placeholder="Value" class="form-input" />
                        <input type="text" v-model="addParameter.description" placeholder="New Description"
                            class="form-input" />
                        <GradientButton leftColor="#469ee6" rightColor="#6ce8c7" text="ADD" @btn-click="handleCreate" />
                    </td>
                </tr>
                <tr v-else class="desktop-row">
                    <td>
                        <input type="text" v-model="addParameter.key" placeholder="New Parameter" class="form-input" />
                    </td>
                    <td>
                        <input type="text" v-model="addParameter.value" placeholder="Value" class="form-input" />
                    </td>
                    <td colspan="2">
                        <input type="text" v-model="addParameter.description" placeholder="New Description"
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
                    <input type="text" v-model="editModal.key" name="key" placeholder="Parameter Key"
                        class="modal-input" />
                    <input type="text" v-model="editModal.value" name="value" placeholder="Value" class="modal-input" />
                    <input type="text" v-model="editModal.description" name="description" placeholder="Description"
                        class="modal-input" />
                    <input type="text" v-model="editModal.create_date" name="createDate" placeholder="Create Date"
                        class="modal-input" />
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
export default {
    name: 'ConifgurationTable',
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
            data: [],
            editModal: {
                key: '',
                value: '',
                description: '',
                create_date: '',
                visible: false,
            },
            deleteModal:{
                id: {},
                visible: false,
            },
            addParameter: {
                key: '',
                value: '',
                description: '',
                create_date: '',
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
        handleEdit(row) {
            console.log(row.key, row.value, row.description, row.create_date);
            this.editModal = {
                ...row,
                visible: true
            }
        },
        closeEditModal() {
            this.editModal.visible = false;
        },
        confirmEditModal() {
            const { key, value, description, create_date } = this.editModal;
            if ( key != '' && value != '' && description != '' && create_date != '') {
                const editData = {key,value,description,create_date};
                console.log(editData);
                // send POST request to the server

                // clear the modal afetr successful edit
                this.clearEditModal();
            } else {
                alert('Please fill in the form');
            }
        },
        clearEditModal(){
            this.editModal = {
                key: '',
                value: '',
                description: '',
                create_date: '',
                visible: false,
            }
        },
        handleDelete(row) {
            console.log('delete clicked');
            this.deleteModal = {
                ...row,
                visible: true
            }
        },
        closeDeleteModal() {
            this.deleteModal.visible = false;
        },
        confirmDeleteModal() {
            console.log(this.deleteModal)
            console.log('delete confirmed');

            // send DELETE request to the server

            // clear the modal after successful delete
            this.clearDeleteModal();
        },
        clearDeleteModal(){
            this.deleteModal = {
                id: {},
                visible: false,
            }
        },
        handleCreate(){
            const { key, value, description, create_date } = this.addParameter;
            if ( key != '' && value != '' && description != '') {
                const addData = {key,value,description,create_date};
                console.log(addData);
                // send POST request to the server

                // clear the modal afetr successful add
                this.clearAddParameter();
            } else {
                alert('Please fill in the form');
            }
        },
        clearAddParameter(){
            this.addParameter = {
                key: '',
                value: '',
                description: '',
                create_date: '',
            }
        }
        
    },
    components:{
        GradientButton,
        Modal
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

th,td{
    text-align: left;
}
th{
    color: #7a899f;
    font-size: 22px;
    font-weight: normal;
}

.modal-body{
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 300px;
}

.modal-input{
    padding: 10px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
}
.form-input{
    border-radius: 5px;
}

.mobile-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 20px;
    border: 1px solid #ddd;
    padding: 15px
}
.mobile-card span{
    font-weight: bold;
}
.desktop-row td,
th {
    padding: 20px;
}
.mobile-row td {
    padding: 5px 20px;
}
.mobile-add-container{
    display:flex; 
    flex-direction: column; 
    gap: 15px;
}
</style>
