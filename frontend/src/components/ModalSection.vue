<template>
<!-- 
        <div class="fixed inset-0 z-50 flex justiy-center items-center ">
            <div class="mx-auto h-full w-full lg:max-w-2xl p-5">
                <div class="overflow-y-auto bg-white w-full rounded shadow-2xl p-5 flex flex-col">
                    <div class="text-2xl font-bold mb-5">{{ room.roomName }}</div>
                  {{ room.description }}
                  <img class="mb-8 mt-8" :src="`/img/${room.image}`">
                  <div>
                        <h3 class="mb-3 text-2xl font-primary font-semibold tracking-[1px]">Room Facilities</h3>
              
                        <div class="grid grid-cols-3 gap-6 mb-12">
                            <div class="flex items-center gap-x-3 flex-1"
                            v-for="(facility, index) in room.facilities" :key="index">
                                <div class="text-2xl text-accent">
                                    <fa :icon="facility.icon" />
                                </div>
                                <div class="text-base">
                                    {{ facility.name }}
                                </div>                               
                             
                            </div>
                        </div>
                    </div>
                <button @click.prevent="$emit('closeModal')" class="rounded bg-green-500 text white px-6 mt-5 py-2 mx-auto mb-5 ">Close</button>
                </div>
            </div>
      
        </div>
        <div class="opacity-30 fixed inset-0 z-40 bg-black">
            
        </div>   -->


    
            <div class=" p-5 pointer-events-auto z-50 mx-auto inset-0 fixed flex items-center justify-center overflow-hidden overscroll-contain bg-slate-700/30 transition-all duration-200 ease-in-out">
                <div class="max-h-[calc(100vh)] h-fit max-w-lg scale-100 overflow-y-auto overscroll-contain rounded-md bg-white p-6 shadow-2xl transition">
                    <div class="text-2xl font-bold mb-5">{{ room.roomName }}</div>
                    {{ room.description }}
                    <img class="mb-8 mt-8" :src="`/img/${room.image}`">
                    <div>
                        <h3 class="mb-3 text-2xl font-primary font-semibold tracking-[1px]">Room Facilities</h3>
              
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-1 mb-12">
                            <div class="flex items-center gap-x-3 flex-1"
                            v-for="(facility, index) in room.facilities" :key="index">
                                <div class="text-2xl text-accent">
                                    <fa :icon="facility.icon" />
                                </div>
                                <div class="text-base">
                                    {{ facility.name }}
                                </div>                               
                             
                            </div>
                            
                        </div>
                     
                        <button @click.prevent="$emit('closeModal')" class="rounded bg-green-500 hover:bg-green-700 text white px-6 mt-5 py-2 mx-auto mb-5 ">Close</button>
              
                    </div>
                </div>
            </div>
        

</template>
<script>


// import { onMounted } from 'vue'

export default {
    props: ['room','user'],

}
</script>
