<template>
    <Layout>
        <template v-slot:content>
            <div class="auth-form-container">
                <EmailPasswordForm @form-submit="handleRegister" title="Sign up" />
                <span  class="form-link-container">
                    Already have an account? <router-link to="/signin">Sign in</router-link>
                </span>

            </div>
        </template>
    </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';
import EmailPasswordForm from '@/components/EmailPasswordForm.vue';

import { auth } from '@/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default {
    name: 'RegisterView',
    components: {
        Layout,
        EmailPasswordForm,
    },
    methods: {
        async handleRegister(formData) {
            // input validation
            if (formData.email != '' && formData.password != '') {
                // successful sign up redirect
                try {
                    await createUserWithEmailAndPassword(auth, formData.email, formData.password)
                    this.$router.push('/signin')
                    alert('User created successfully')
                } catch (err) {
                    alert(err.message)
                }
            } else {
                alert('Please fill in the form')
            }
        }
    }
};
</script>
