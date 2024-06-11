<template>
    <transition name="modal-fade">
        <div class="modal-container">
            <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                <header class="modal-header" id="modalTitle">
                    <div name="header">
                        {{ title }}
                    </div>
                    <i class="fa-solid fa-circle-xmark btn-close" @click="handleClose" aria-label="Close modal"></i>
                </header>

                <section class="modal-body" id="modalDescription">
                    <slot name="body">
                    </slot>
                </section>

                <footer class="modal-footer">
                    <GradientButton leftColor="#323232" rightColor="#000" text="Deny" @btn-click="handleClose" />
                    <GradientButton leftColor="#0ba360" rightColor="#3cb692" text="Confirm"
                        @btn-click="handleConfirm" />
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
import GradientButton from '@/components/GradientButton.vue';
export default {
    name: 'Modal',
    methods: {
        handleClose() {
            this.$emit('close');
        },
        handleConfirm() {
            this.$emit('confirm');
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    components: {
        GradientButton
    }
};
</script>

<style>
    .modal-container {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        
    }
    .modal {
        background: #fff;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        min-width: 300px;
        color: #000;
    }
    .modal-header{
        padding: 15px;
        display: flex;
        position: relative;
        border-bottom: 1px solid #eeeeee;
        justify-content: space-between;
    }
    .btn-close {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 20px;
        padding: 10px;
        cursor: pointer;
        font-weight: bold;
        background: transparent;
    }
    .modal-body {
        position: relative;
        padding: 20px 10px;
    }
    .modal-footer {
        padding: 15px;
        display: flex;
        justify-content: end;
        gap:5px;
        border-top: 1px solid #eeeeee;
    }
</style>