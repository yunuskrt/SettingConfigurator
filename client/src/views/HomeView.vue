<template>
  <div>
    <Header @logout="handleLogout" />
    <CongifurationTable :tableData="data" 
      @edit-config="handleEdit" @delete-config="handleDelete" @add-config="handleCreate"/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import CongifurationTable from '@/components/ConfigurationTable.vue';

import { auth } from '@/firebaseConfig'
import { signOut } from 'firebase/auth';

export default {
    name: 'HomeView',
    components: {
        Header,
        CongifurationTable
    },
  data() {
    return {
      data: [],
    }
  },
  methods: {
    fetchConfiguration() {
      // fetch configurations from the server
      const fetchedData = [
        {
          id: 1,
          key: 'min_version',
          value: '1.4.4',
          description: 'Minimum required version of the app',
          create_date: '10/05/2021 01:58'
        },
        {
          id: 2,
          key: 'latest_version',
          value: '1.4.7',
          description: 'Latest version of the app',
          create_date: '10/05/2021 01:58'
        },
        {
          id: 3,
          key: 'pricing_tier',
          value: 't6',
          description: 'Pricing tier of the user',
          create_date: '07/07/2021 11:13'
        },
        {
          id: 4,
          key: 'scroll',
          value: '5',
          description: 'Index of Scroll Paywall for free users',
          create_date: '25/08/2021 10:22'
        },
        {
          id: 5,
          key: 'scroll_limit',
          value: '13',
          description: 'Index of Scroll Limit Paywall for free users',
          create_date: '25/08/2021 10:33'
        }
      ]
      this.data = fetchedData

      // TODO - get data from the api
    },
    async handleLogout(){
      console.log('Logging out')
      try {
        await signOut(auth)
        this.$router.push('/signin')
      } catch (err) {
        alert(err.message)
      }
    },
    handleEdit(editData){
      // TODO - send PATCH request to the api
      console.log("PATCH request will be sent with data", editData);
    },
    handleDelete(rowId){
      // TODO - send DELETE request to the api
      console.log("DELETE request will be sent with data:", rowId)
    },
    handleCreate(addData){
      // TODO - send POST request to the api
      console.log('POST request will be sent with data:', addData)
    }
  },
  created() {
    this.fetchConfiguration()
  },
}
</script>
