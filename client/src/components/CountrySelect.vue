<template>
    <div class="form-container">
        <div>
            <input type="radio" value="all" v-model="selectValues.option" />
            <label for="html">Apply for all countries</label>
        </div>
        <div>
            <input type="radio" value="custom" v-model="selectValues.option">
            <label for="css">Apply for selected countries</label>
        </div>
        <div v-show="selectValues.option == 'custom'" class="select-input-container">

            <select v-model="selectValues.country">
                <option disabled value="">Select a country</option>
                <option v-for="country in countryData" :key="country.code" :value="country">
                    {{ country.name }}
                </option>
            </select>
        </div>
    </div>

</template>

<script>

export default {
    name: 'CountrySelect',
    data() {
        return {
            countryData: [
                { code: "fr", name: "France" },
                { code: "it", name: "Italy" },
                { code: "es", name: "Spain" },
                { code: "tr", name: "Turkey" },
                { code: "us", name: "United States" },
            ],            
        }
    },
    props: {
        selectValues:{
            type: Object,
            default: () => ({
                option: 'all',
                country: {},
            })
        }
    },
}
</script>

<style scoped>
.form-container{
    display: flex;
    flex-direction: column;
    gap: 15px;
}
select{
    padding: 10px;
    width: 100%;
}
.select-input-container{
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}
.btn-close-country{
    cursor: pointer;
}
</style>