<template>
    <section class="py-24" id="rooms">

        <div v-if="loading" class="h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center">
            <RingLoader :loading="loading" :color="color"></RingLoader>
        </div>
        <div class="text-center">
            <div class="font-tertiary uppercase text-[15px] tracking-[6px]">
                Hotel
            </div>
            <h2 class="font-primary text-[45px] mb-4">
                Room & Suites
            </h2>

        </div>
        <div class="container mx-auto lg:px-0">
            <div class="grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0 p-2">
                <div  v-for="room in filtered" :key="room._id">
                    <RoomSection 
                    :roomId="room._id"
                    :room="room"
                />
                </div>
     
              
            </div>
        </div>
    </section>
</template>
<script>

import RoomSection from './RoomSection.vue';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
// import { roomData } from '@/data/roomData.js'

import  RingLoader  from 'vue-spinner/src/RingLoader.vue'

export default {

    components: {
        RoomSection,
        RingLoader
    },

    setup() {
        const color = ref('#FFFFFF')
        const store = useStore()
        const loading = computed(() => store.state.loading)
        const filtered = computed(() => store.getters.setRooms)
   
        onMounted(() => {
            store.dispatch('fetchRooms')
          
        }) 

        return {
            filtered, loading, color,
        }
    }
}
</script>
