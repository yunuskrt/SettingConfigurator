<template>
    <Layout>
        <template v-slot:content>
            <div>
                <EmailPasswordForm @form-submit="handleSignIn" title="Sign in" />
                <span class="form-link-container">
                    Don't have an account? <router-link to="/register">Register</router-link>
                </span>

            </div>
        </template>
    </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';
import EmailPasswordForm from '@/components/EmailPasswordForm.vue';

import { auth } from '@/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default {
    name: 'SigninView',
    components: {
        Layout,
        EmailPasswordForm,
    },
    methods: {
        async handleSignIn(formData) {
            // input validation
            if (formData.email != '' && formData.password != '') {
                // successful sign in redirect
                try {
                    await signInWithEmailAndPassword(auth, formData.email, formData.password)
                    this.$router.push('/')
                } catch (err) {
                    alert('Invalid User')
                }
            } else {
                alert('Please fill in the form')
            }
        }
    }
};
</script>
