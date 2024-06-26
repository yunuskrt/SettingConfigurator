<template>
    <div v-if="isLoading">
        Loading...
    </div>
    <div v-else>
        <Header @logout="handleLogout" />
        <div v-if="res.status >= 200 && res.status < 300">
            <CountryConfigurationTable :tableData="res.data" :ascending="ascending"
                @toggle-order="handleToggleOrder" />
            <div class="download-btn-container">
                <GradientButton leftColor="#469ee6" rightColor="#6ce8c7" text="Download JSON"
                    @btn-click="handleDownload" />
            </div>
        </div>
        <div v-else class="not-found">
            <p>404: Country Not Found</p>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import CountryConfigurationTable from '@/components/CountryConfigurationTable.vue';
import GradientButton from '@/components/GradientButton.vue';

import { auth } from '@/firebaseConfig'
import { signOut } from 'firebase/auth';

export default {
    name: 'CountryView',
    data() {
        return {
            id: this.$route.params.code,
            res: {status: 200, data: []},
            ascending: true,
            isLoading: false,
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
                const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:3000'
                const response = await fetch(`${apiUrl}/api/v1/configuration/${this.id.toLowerCase()}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': idToken,
                    },
                })
                const result = await response.json()
                const data = result.map((item) => {
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
                this.res = {status: response.status, data: data}
                
            } catch (error) {
                console.error('Error:', error)
                this.res = {status: 404, data: []}
            }
            this.isLoading = false
        },
        handleToggleOrder() {
            this.ascending = !this.ascending
            this.res.data = this.res.data.reverse()
        },
        handleDownload(){
            const downloadJson = {}
            this.res.data.forEach((item) => {
                downloadJson[item.key] = item.value
            })
       
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(downloadJson));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "configuration.json");
            document.body.appendChild(downloadAnchorNode); // required for firefox
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        }
    },
    created() {
        this.fetchCountryConfiguration()
    },
    components: {
        Header,
        CountryConfigurationTable,
        GradientButton,
    },

}
</script>

<style scoped>
    .download-btn-container {
        padding: 20px;
    }
</style>
