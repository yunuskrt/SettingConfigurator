<template>
    <button :style="gradientStyle" @click="onClick()">
        {{text}}
    </button>
</template>

<script>
export default {
    name: 'GradientButton',
    props: {
        color1: {
            type: String,
            required: true
        },
        color2: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    },
    methods: {
        onClick() {
            this.$emit('btn-click')
        }
    },
    computed: {
        gradientStyle() {
            return {
                background: `linear-gradient(to right top, ${this.color1}, ${this.color2})`
            };
        }
    }
};
</script>
<style scoped>
button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
}
</style>
