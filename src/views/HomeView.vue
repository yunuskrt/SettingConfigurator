<template>
  <div>
    <Header />
    <CongifurationTable :tableData="data" />
    <!-- <button type="button" class="btn" @click="showModal">
      Open Modal!
    </button>  -->
    <!-- <Modal v-show="modalVisible" @close="closeModal" @confirm="confirmModal" title="Modal Header">
      <template v-slot:body>
        <div>
          asdad
        </div>
      </template>
    </Modal> -->
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Modal from '@/components/Modal.vue';
import CongifurationTable from '@/components/ConfigurationTable.vue';

export default {
    name: 'HomeView',
    components: {
        Header,
        Modal,
        CongifurationTable
    },
  data() {
    return {
      data: [],
      modalVisible: false,
    }
  },
  methods: {
    fetchConfiguration() {
      // fetch configurations from the server
      const fetchedData = {
        min_version: {
          value: '1.4.4',
          description: 'Minimum required version of the app',
          create_date: '10/05/2021 01:58'
        },
        latest_version: {
          value: '1.4.7',
          description: 'Latest version of the app',
          create_date: '10/05/2021 01:58'
        },
        pricing_tier: {
          value: 't6',
          description: 'Pricing tier of the user',
          create_date: '07/07/2021 11:13'
        },
        scroll: {
          value: '5',
          description: 'Index of Scroll Paywall for free users',
          create_date: '25/08/2021 10:22'
        },
        scroll_limit: {
          value: '13',
          description: 'Index of Scroll Limit Paywall for free users',
          create_date: '25/08/2021 10:33'
        }
      }
      // convert object to array to use in table
      this.data = Object.keys(fetchedData).map(key => {
        return {
          key,
          ...fetchedData[key]
        }
      })
    },
    showModal() {
      this.modalVisible = true
    },
    closeModal() {
      this.modalVisible = false
    },
    confirmModal() {
      console.log('Modal confirmed!')
    }
  },
  created() {
    this.fetchConfiguration()
  },
}
</script>

<style scoped>
 .centered-div {
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 90%;
   max-width: 400px;
   height: 400px;
   z-index: 1;
   background-color: #ffffff;
 }
</style>