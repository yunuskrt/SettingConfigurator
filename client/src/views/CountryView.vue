<template>
    <div v-if="isLoading">
        Loading...
    </div>
    <div v-else>
        <Header @logout="handleLogout" />
        <div v-if="res.status >= 200 && res.status < 300">
            <CountryConfigurationTable :tableData="res.data" />
        </div>
        <div v-else class="not-found">
            <p>404: Country Not Found</p>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import CountryConfigurationTable from '@/components/CountryConfigurationTable.vue';

import { auth } from '@/firebaseConfig'
import { signOut } from 'firebase/auth';

export default {
    name: 'CountryView',
    data() {
        return {
            id: this.$route.params.code,
            res: {status: 200, data: []},
            isLoading: false
        }
    },
    watch: {
        $route(to, from) {
            this.id = to.params.code
            this.fetchCountryConfiguration()
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
        async fetchCountryConfiguration() {
            this.isLoading = true
            try {
                const idToken = await auth.currentUser.getIdToken()
                const response = await fetch(`http://localhost:3000/api/v1/configuration/${this.id.toLowerCase()}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': idToken,
                    },
                })
                const result = await response.json()
                this.res = {status: response.status, data: result}
            } catch (error) {
                alert(error.message)
            }
            this.isLoading = false
        }
    },
    created() {
        this.fetchCountryConfiguration()
    },
    components: {
        Header,
        CountryConfigurationTable
    },

}
</script>

<style scoped>
.not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    font-size: 1.5rem;
    font-weight: bold;
}
</style>
