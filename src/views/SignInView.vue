<template>
    <div class="home-container">
        <header>
            <img src="../assets/icon.png" alt="Codeway" class="icon" />
        </header>
        <div class="form-container">
            <h3 class="form-title">Please sign in</h3>
            <form>
                <div class="form-group">
                    <input type="email" v-model="email" id="name" name="name" required placeholder="E-mail address" class="form-input"/>
                    <input type="password" v-model="password" id="email" name="email" required placeholder="Password" class="form-input"/>
                </div>
                <GradientButton leftColor="#3a4ab1" rightColor="#6578f3" text="Sign in" @btn-click="handleSignIn" />
            </form>
        </div>
        <footer>
            Codeway &copy; 2021
        </footer>
    </div>

</template>

<script>
import GradientButton from '@/components/GradientButton.vue'
export default {
    name: 'SignInView',
    components: {
        GradientButton
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        handleSignIn() {
            // input validation for now
            if (this.email != '' && this.password != '') {
                this.$router.push('/about')
                console.log({ email: this.email, password: this.password })
            } else {
                alert('Please fill in the form')
            }

        }
    }
}
</script>
<style scoped>
.home-container {
    width: 20%;
    padding: 45px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
    text-align: center;
    gap: 40px;
}

.icon {
    width: 80%;
}

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

footer {
    color: #6b7279;
}

@media (max-width: 1200px) {
    .home-container {
        width: 30%;
    }
}

@media (max-width: 992px) {
    .home-container {
        width: 40%;
    }
}

@media (max-width: 768px) {
    .home-container {
        width: 50%;
    }
}

@media (max-width: 576px) {
    .home-container {
        width: 90%;
    }
}

@media (max-width: 375px) {
    .home-container {
        width: 100%;
    }
}
</style>