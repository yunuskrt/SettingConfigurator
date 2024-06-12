<template>
    <header>
        <img src="../assets/icon.png" alt="Codeway" />
        <div class="dropdown">
            <div class="dropdown-btn" @click="toggleDropdown">
                <i class="fa-solid fa-user"></i>
                <span class="dropdown-arrow">
                    <i class="fa-solid fa-caret-down"></i>
                </span>
            </div>
            <div class="dropdown-content" v-if="showDropdown">
                <ProfileDropdownItem icon="fa-right-from-bracket" text="Log out" color="red" @item-click="logOut" />
            </div>
        </div>
    </header>
</template>

<script>
import ProfileDropdownItem from '@/components/ProfileDropdownItem.vue';
export default {
    name: 'IconDropdown',
    data() {
        return {
            showDropdown: false
        };
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
        logOut() {
            this.$emit('logout')
        },
    },
    components: {
        ProfileDropdownItem
    }
};
</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}
img{
    width: 50px;
}
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-btn {
    color: white;
    padding: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
}


.dropdown-arrow {
    margin-left: auto;
}
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    right: 0;
    z-index: 1;
}
.dropdown-content a {
    text-decoration: none;
}

.dropdown-content {
    display: block;
}
</style>
