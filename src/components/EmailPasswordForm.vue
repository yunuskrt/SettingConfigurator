<template>
    <div class="form-container">
        <h3 class="form-title">{{title}}</h3>
        <form @submit.prevent="handleSubmit()">
            <div class="form-group">
                <input type="email" v-model="email" id="name" name="name" required placeholder="E-mail address"
                    class="form-input" />
                <input type="password" v-model="password" id="email" name="email" required placeholder="Password"
                    class="form-input" />
            </div>
            <GradientButton leftColor="#3a4ab1" rightColor="#6578f3" :text="title"/>
        </form>
    </div>
</template>

<script>
import GradientButton from '@/components/GradientButton.vue'
export default {
    name: 'EmailPasswordForm',
    components: {
        GradientButton
    },
    data(){
        return {
            email: '',
            password: ''
        }
    },
    props: {
        title: {
            type: String,
            required: true
        }
    },
    methods: {
        handleSubmit() {
            this.$emit('form-submit', { email: this.email, password: this.password });
        }
    }
}
</script>

<style scoped>
.form-container {
    width: 100%;
}
.form-container form {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.form-title {
    color: #33335a;
    font-weight: normal;
}

.form-group {
    width: 100%;
    margin-bottom: 5px;
}

.form-group input:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.form-group input:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}

</style>