<template>
    <div v-if="isLoading">
        Loading...
    </div>
    <div v-else>
        <Header @logout="handleLogout" />
        <div v-if="res.status >= 200 && res.status < 300" class="cards-container">


            <div v-for="modification in res.data" :key="modification.id" class="card">
                <ModificationCard :modification="modification" />
            </div>

        </div>
        <div v-else class="not-found">
            <p>500: An Error Occured</p>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import ModificationCard from '@/components/ModificationCard.vue';

import { auth } from '@/firebaseConfig'
import { signOut } from 'firebase/auth';

export default {
    name: 'CountryView',
    data() {
        return {
            res: { status: 200, data: [] },
            isLoading: false,
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
        async fetchModifications() {
            this.isLoading = true
            try {
                const idToken = await auth.currentUser.getIdToken()
                const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:3000'
                const response = await fetch(`${apiUrl}/api/v1/modification`, {
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

                this.res = { status: response.status, data: data }

            } catch (error) {
                alert(error.message)
            }
            this.isLoading = false
        },

    },
    created() {
        this.fetchModifications()
    },
    components: {
        Header,
        ModificationCard
    },

}
</script>

<style scoped>
.cards-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding:20px;
}
.card{
    border-radius: 10px;
    border: 2px solid #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80%;
    overflow: scroll;
}
.not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    font-size: 1.5rem;
    font-weight: bold;
}

</style>
