<template>
        <div class="flex items-center justify-end h-full">
        
            <VueDatePicker v-model="endDate" 
            auto-apply :close-on-auto-apply="true"
            placeholder="Check out" 
            @update:model-value="handleDate"
            :min-date="startMin"
            :enable-time-picker="false"
            :disabled="!startDate"
            >
            </VueDatePicker>

   
    </div>
</template>
<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore()      
        const endDate = ref(store.getters.endDate)
        const startDate = computed(() => store.getters.startDate)
        const startMin = computed(() => store.state.startMin)

        const handleDate = () => {
            const start = store.getters.startDate
            
            const days = endDate.value

            const total = days - start

            let inDays
            // const newDate = endDate.value.getFullYear() + '/' + (endDate.value.getMonth() + 1) + '/' + endDate.value.getDate()
            if(start.getDate() == days.getDate()) {
                inDays = 1
            } else {
                inDays = total / (1000 * 60 * 60 * 24)
            }
            store.dispatch('setEndDate', endDate.value)
            store.commit('setTotalDays',inDays)

        }

        return {
            endDate,
            handleDate,
            startDate,
            startMin
       
            
        }
    }

}
</script>
