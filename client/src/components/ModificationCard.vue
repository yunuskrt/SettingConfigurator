<template>
    <div class="card-content">
        <div class="card-title">
            <i v-if="modification.type === 'Create'" class="fa-solid fa-plus"></i>
            <i v-else-if="modification.type === 'Edit'" class="fa-solid fa-pen"></i>
            <i v-else class="fa-solid fa-trash"></i>
            <span>{{ modification.message }}</span>
        </div>

        <div class="field-info"> <span>Author:</span>
            <div>{{ modification.author }}</div>
        </div>
        <div class="field-info"> <span>Modification Date:</span>
            <div>{{ modification.create_date }}</div>
        </div>
        <div class="card-info">
            <span>
                Info:
            </span>
            <div class="info-code">
                <pre><code>{{ JSON.stringify(modification.info, null, 2) }}</code></pre>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    name: 'ModificationCard',
    props: {
        modification: {
            type: Object,
            required: true
        }
    }
};

</script>

<style scoped>
.card-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80%;
    overflow: scroll;
}

.card-title {
    display: flex;
    gap: 10px;
    font-size: 16px;
    font-weight: bold;
}

.field-info {
    display: flex;
    gap: 10px;
}

span {
    font-weight: bold;
}

.card-info{
    margin-top: 20px;
}

.info-code {
    background-color: #1e1e1e;
    border-radius: 10px;
}
</style>