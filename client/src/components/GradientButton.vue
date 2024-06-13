<template>
    <button :style="gradientStyle" @click="onClick()">
        {{text}}
    </button>
</template>

<script>
export default {
    name: 'GradientButton',
    props: {
        leftColor: {
            type: String,
            required: true
        },
        rightColor: {
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
                background: `linear-gradient(to right top, ${this.leftColor}, ${this.rightColor})`
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
    button:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
    }
</style>
