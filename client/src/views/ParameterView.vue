<template>
    <div>
        <div v-if="isLoading">
            <Loading />
        </div>
        <div v-else>
            <Header @logout="handleLogout" />
            <h1 class="heading">
                {{ id }}
            </h1>
            
            <div v-if="res.status >= 200 && res.status < 300">
                <ParameterTable :tableData="res.data" 
                    @delete-country="handleDeleteCountry" 
                    @edit-country="handleEditCountry"
                    />
            </div>
            <div v-else class="not-found">
                <p>404: Parameter Not Found</p>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import Header from '@/components/Header.vue'
import ParameterTable from '@/components/ParameterTable.vue'

import { auth } from '@/firebaseConfig'
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default {
    name: 'ParameterView',
    components: {
        Loading,
        Header,
    },
    data() {
        return {
            id: this.$route.params.id,
            res: { status: 200, data: []},
            isLoading: false,
            email: '',
        }
    },
    watch: {
        $route(to, from) {
            this.id = to.params.id
            this.fetchParameterData()
        }
    },
    methods: {
        async handleLogout() {
            try {
                await signOut(auth)
                this.$router.push('/signin')
            } catch (err) {
                alert(err.message)
            }
        },
        async fetchData(fetchParams) {
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
                const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:3000'
                let fetchUrl = `${apiUrl}/api/v1/configuration/parameter`
                if ('id' in fetchParams) {
                    fetchUrl += `/${fetchParams.id}`
                }
                if ('query' in fetchParams) {
                    fetchUrl += `?${fetchParams.query}`
                }
                const response = await fetch(fetchUrl, fetchOptions)
                if (fetchParams.method === 'DELETE') {
                    // api do not send json in delete 
                    return { status: 'success', data: 'Deleted successfully' }
                }
                const responseJson = await response.json()

                return { status: 200, data: responseJson }
            } catch (error) {
                return { status: 404, data: error.message }
            }
        },
        async fetchParameterData(){
            try {
                this.isLoading = true;
                const fetchParams = { method: 'GET', id: this.id}
                const fetchedData = await this.fetchData(fetchParams)
                this.res = { status: fetchedData.status, data: fetchedData.data }  
            } catch (error) {
                console.error(error);
                this.res = {
                    status: 404,
                    data: []
                }
            }
            this.isLoading = false;
        },
        async handleDeleteCountry(code) {
            // send DELETE request to the API
            try {
                const fetchParams = { method: 'DELETE', id: this.id, data: { code } }
                await this.fetchData(fetchParams)
                this.fetchParameterData()
            } catch (error) {
                console.log({error:error.message})
            }
        },
        async handleEditCountry(emittedData){
            // send PATCH request to the API
            try {
                const fetchParams = { method: 'PATCH', id: this.id, data: emittedData,query:`userMail=${this.email}` } 
                await this.fetchData(fetchParams)
                this.fetchParameterData()
            } catch (error) {
                console.log({ error: error.message })
            }
        }
    },
    created() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.email = user.email
            }
        });
        this.fetchParameterData()
    },
    components: {
        Header,
        ParameterTable,
    },
}
</script>

<style scoped>
    .heading {
        display: flex;
        align-items: center;
        column-gap: 10px;
        width: 75%;
        font-weight: 400;
        color: #e5e5e5;
        margin: auto
    }

    .heading::before,
    .heading::after {
        flex: 1;
        content: "";
        border: 1px solid #e5e5e5;
    }
</style>