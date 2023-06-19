<template >
    <div class="flex items-center justify-end h-full">
     
        <VueDatePicker v-model="startDate" 
        @update:model-value="handleDate"
        auto-apply :close-on-auto-apply="true"
         placeholder="Check in" 
         :no-close-on-select="true"
        :min-date="new Date()"
        :enable-time-picker="false"
        class="w-full h-full"
    
        ></VueDatePicker>

   
    </div>
</template>
<script>
import {ref,  } from 'vue';
import { useStore } from 'vuex';



export default {


    setup() {
        const store = useStore()
        const startDate = ref(store.getters.startDate)

        const handleDate = () => {
            const newDate = startDate.value.getFullYear() + '/' + (startDate.value.getMonth() + 1) + '/' + (startDate.value.getDate() + 1)
            
            store.dispatch('setStartDate', startDate.value)
            store.commit('setStartMin', newDate)
       
        }

        return {
            startDate,
            handleDate
        }
    }

}
</script>


<style>

</style>