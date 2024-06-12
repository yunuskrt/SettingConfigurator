<template>
    <div class="dropdown-item" @click="onClick()">
        <i :class="iconClass" :style="{color: color}"></i>
        <span :style="{ color: color }">{{ text }}</span>
    </div>
</template>
<script>
export default {
    name: 'ProfileDropdownItem',
    props: {
        icon: String,
        text: String,
        color: {
            type: String,
            default: 'grey'
        }
    },
    methods: {
        onClick() {
            this.$emit('item-click')
        }
    },
    computed:{
        iconClass(){
            return `fa-solid ${this.icon}`
        }
    }
};

</script>

<style scoped>
.dropdown-item {
    display: flex;
    gap: 5px;
    color: red;
    padding: 12px 16px;
    text-decoration: none;
    cursor: pointer;
}
.dropdown-item:hover {
    background-color: #f1f1f1;
}
</style>