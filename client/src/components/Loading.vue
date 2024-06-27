<template>
    <div class="loading-container">
        <div class="wave-container">
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <img src="@/assets/icon.png" alt="icon" class="loading-icon" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Loading",
};
</script>

<style scoped>
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
}

.wave-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loading-icon {
    width: 50px;
    height: 50px;
    z-index: 10;
}

.wave {
    position: absolute;
    border: 5px solid rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    animation: wave 2s infinite;
}

.wave:nth-child(1) {
    width: 50px;
    height: 50px;
    animation-delay: 0s;
}

.wave:nth-child(2) {
    width: 70px;
    height: 70px;
    animation-delay: 0.5s;
}

.wave:nth-child(3) {
    width: 90px;
    height: 90px;
    animation-delay: 1s;
}

@keyframes wave {
    0% {
        transform: scale(0);
        opacity: 1;
    }

    100% {
        transform: scale(2);
        opacity: 0;
    }
}
</style>
