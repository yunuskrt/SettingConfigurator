<template>
  <div>
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else>
      <Header @logout="handleLogout" />
      <CongifurationTable :tableData="data" @edit-config="handleEdit" @delete-config="handleDelete"
        @add-config="handleCreate" />
    </div>
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
      isLoading: false
    }
  },
  methods: {
    async handleLogout(){
      try {
        await signOut(auth)
        this.$router.push('/signin')
      } catch (err) {
        alert(err.message)
      }
    },
    async fetchConfiguration() {
      // handle GET request
      this.isLoading = true

      const fetchParams = {method:'GET'}
      const fetchedData = await this.fetchData(fetchParams)

      if (fetchedData.status === 'success'){
        this.data = fetchedData.data.map((item) => {
          const date = new Date(item.create_date);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear().toString();
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          return {
            ...item,
            create_date: `${day}/${month}/${year} ${hours}:${minutes}`
          }
        })
      }
      else{
        alert(fetchedData.data)
      }
      this.isLoading = false
      
    },
    async handleEdit(editData){
      // TODO - send updated data with PATCH request
      console.log({editData})
      // // handle PATCH request
      // const originalData = this.data.find((item) => item.id === editData.id)
      
      // const differencesKeys = Object.keys(editData).filter((key) => editData[key] !== originalData[key])
      // const modifiedFields = {}
      // let modifiedQuery = ""
      // differencesKeys.forEach((key) => {
      //   modifiedFields[key] = editData[key]
      //   modifiedQuery += `${key}=${editData[key]}&`
      // })
      // modifiedQuery = modifiedQuery.slice(0, -1)

      // const fetchParams = {method:'PATCH', id:editData.id, query:modifiedQuery}
      // const fetchedData = await this.fetchData(fetchParams)

      // if (fetchedData.status === 'success'){
      //   this.fetchConfiguration()
      // }
      // else{
      //   alert(fetchedData.data)
      // }
    },
    async handleDelete(rowId){
      // handle DELETE request
      const fetchParams = {method:'DELETE', id:rowId}
      const fetchedData = await this.fetchData(fetchParams)
      
      if (fetchedData.status === 'success'){
        this.fetchConfiguration()
      }
      else{
        alert(fetchedData.data)
      }
      this.fetchConfiguration()
    },
    async handleCreate(addData){
      console.log({addData})
      // TODO - send updated data with POST request

      // // handle POST request
      // const fetchParams = {method:'POST', data:addData}
      // const fetchedData = await this.fetchData(fetchParams)
      // if (fetchedData.status === 'success'){
      //   this.fetchConfiguration()
      // }
      // else{
      //   alert(fetchedData.data)
      // }     
    },

    async fetchData(fetchParams){
      // generic fetch function to interact with the API
      try {
        const idToken = await auth.currentUser.getIdToken()
        const fetchOptions = {
          method: fetchParams.method,
          headers: {
            'Content-Type': 'application/json',
            'authorization': idToken,
          },
        }
        if ('data' in fetchParams) {
          fetchOptions.body = JSON.stringify(fetchParams.data)
        }
       
        let fetchUrl = 'http://localhost:3000/api/v1/configuration'
        if ('id' in fetchParams){
          fetchUrl += `/${fetchParams.id}`
        }
        if ('query' in fetchParams){
          fetchUrl += `?${fetchParams.query}`
        }
        const response = await fetch(fetchUrl, fetchOptions)
        if (fetchParams.method === 'DELETE'){
          // api do not send json in delete 
          return {status:'success', data:'Deleted successfully'}
        }
        const responseJson = await response.json()

        return {status:'success', data:responseJson}
      }catch (error) {
        return {status:'error', data:error.message}
      }
    }
  },
  created() {
    this.fetchConfiguration()
  },
}
</script>
