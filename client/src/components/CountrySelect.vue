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

            <div class="selected-countries">
                <div v-for="country in selectValues.countries" :key="country.code" class="country-label">
                    <span>{{ country.name }}</span>
                    <i class="fa-solid fa-circle-xmark btn-close-country" @click="removeCountry(country.code)"></i>
                </div>
            </div>
            <select v-model="selectValues.country" @change="addCountry">
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
                { code: "FR", name: "France" },
                { code: "IT", name: "Italy" },
                { code: "ES", name: "Spain" },
                { code: "TR", name: "Turkey" },
                { code: "US", name: "United States" },
            ],            
        }
    },
    props: {
        selectValues:{
            type: Object,
            default: () => ({
                option: 'all',
                country: {},
                countries: [],
            })
        }
    },
    methods:{
        addCountry(){
            this.$emit('add-country')
        },
        removeCountry(code){
            this.$emit('remove-country',code)
        }
    }
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
.selected-countries{
    max-height: 60px;
    overflow: scroll;
    padding: 5px;
    display: flex;
    gap: 5px;
}
.country-label{
    background-color: #d9d9d9;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    gap: 3px;
}
.btn-close-country{
    cursor: pointer;
}
</style>