<template>
    <div class="home-container">
        <header>
            <img src="../assets/icon.png" alt="Codeway" class="icon" />
        </header>
        <slot name="content"></slot>
        <footer>
            Codeway &copy; 2021
        </footer>
    </div>

</template>

<script>
    export default {
        name: 'Layout',
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