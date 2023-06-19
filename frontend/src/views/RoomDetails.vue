<template>
    <section>

        <ScrollToTop />
        
       <div class="bg-room bg-cover bg-center h-[560px] relative flex justify-center items-center">

            <div class="absolute w-full h-full bg-black/70"></div>

            <h1 class="text-6xl text-white z-20 font-primary text-center">{{ room.roomName }} Details</h1>

       </div>
       <div class="container mx-auto">

            <div class="flex flex-col lg:flex-row h-full py-24">
                <div class="w-full h-full lg:w-[60%] px-6" >

                   <h2 class="font-primary text-[45px] mb-4">{{ room.roomName }}</h2>
                   <p class="mb-8">{{ room.description }}</p>
                    <img class="mb-8" :src="`/img/${room.image}`">
                 
                    <div class="mt-12">
                        <h3 class="mb-3 text-2xl font-primary font-semibold tracking-[1px]">Room Facilities</h3>
              
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-12">
                            <div class="flex items-center gap-x-3 flex-1"
                            v-for="(facility, index) in room.facilities" :key="index">
                                <div class="text-3xl text-accent">
                                    <fa :icon="facility.icon" />
                                </div>
                                <div class="text-base">
                                    {{ facility.name }}
                                </div>                               
                             
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full h-full lg:w-[40%]">

                  <form @submit.prevent="handleSubmit" v-if="!confirmation">
                    <div class="py-8 px-6 bg-accent/20 mb-12">
                        <div class="flex flex-col space-y-4 mb-4">
                            <h3>Your reservation</h3>
                            <div v-if="error" class="p-3 rounded bg-red-200 inline">
                                    <strong>{{ error }}</strong>
                                </div>
                            <div class="h-[60px]">
                                <CheckIn />
                            </div>
                            <div class="h-[60px]">
                                <CheckOut />
                            </div>
                            <div class="h-[60px]">
                                <AdultsDropdown />
                            </div>
                            <div class="h-[60px]">
                                <KidsDropdown/>
                            </div>
                        </div>
                   

                            <button 
                            type="submit"
                            class="w-full text-[15px] tracking-[3px] font-tertiary uppercase text-white flex-1 transition-all px-8 flex justify-center items-center h-[60px] bg-accent hover:bg-accent-hover">book now for ${{room.price * days }}</button>
                        
                    
                    
                    </div>
                  </form>
                  <ReservationDetails v-else
                  :roomId = "roomId"
                  :room = "room"

                  />
                  <div v-if="anotherDialog1">
                                <div class="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-40 "></div>
                                <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-md z-50 text-sm lg:text-xl whitespace-nowrap">
                                    <p>Please login first</p>
                            
                                </div>
                        </div>

                    <div class=" p-2">
                        <h3 class="text-2xl font-primary font-semibold tracking-[1px] mb-2">Hotel Rules</h3>
                        <p class="mb-6">
                            Welcome to our MATTress! To ensure that all of our guests have a comfortable and enjoyable stay, we kindly ask that you follow these rules during your visit:
                        </p>
                        <ul class="flex flex-col gap-y-4">
                            <li class="flex items-center gap-x-4">
                                <fa :icon="['fas', 'check']" />
                                Check-in time is at 3:00 pm and check-out time is at 12:00 pm. If you require an early check-in or late check-out, please contact the front desk in advance.
                            </li>
                            <li class="flex items-center gap-x-4">
                                <fa :icon="['fas', 'check']" />
                                Smoking is strictly prohibited in all rooms and indoor areas of the hotel. Any guests caught smoking will be subject to a cleaning fee.
                            </li>
                            <li class="flex items-center gap-x-4">
                                <fa :icon="['fas', 'check']" />
                                Pets are not allowed in the hotel, with the exception of service animals.
                            </li>
                            <li class="flex items-center gap-x-4">
                                <fa :icon="['fas', 'check']" />
                                Please keep noise levels to a minimum, especially between the hours of 10:00 pm and 7:00 am.
                            </li>
                        </ul>
                    </div>
                </div>
     
            </div>

       </div>
      
       
       <div >

       </div>

    </section>
</template>
<script>


import { useRoute } from 'vue-router'

import CheckIn from '@/components/CheckIn.vue';
import CheckOut from '@/components/CheckOut.vue';
import AdultsDropdown from '@/components/AdultsDropdown.vue'
import KidsDropdown from '@/components/KidsDropdown.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
import ReservationDetails from '@/components/ReservationDetails.vue'


export default {
    components: {
        ScrollToTop,
        CheckIn,
        CheckOut,
        AdultsDropdown,
        KidsDropdown,
        ReservationDetails
    },
    setup(){
  
        const confirmation = computed(() => store.state.confirmation)
        const store = useStore()
        const route = useRoute()
        const roomId = route.params.id
        const room = computed(() => store.state.room)
        const startDate = computed(() => store.getters.startDate)
        const endDate = computed(() => store.getters.endDate)
        const days = computed(() => store.state.totalDays)
        const user = computed(() => store.getters.user)
        const error = ref('')
        const anotherDialog1 = ref(false)

        onMounted(() => {
            store.dispatch('fetchRoom', roomId)
          
        })
        const handleSubmit = () => {
            setTimeout(()=> {
                error.value = ''
            }, 2500)
            if(!startDate.value || !endDate.value){
                return error.value = 'Please check your check in or check out date'
            }
            if(!user.value) {
                
                anotherDialog1.value = true
                setTimeout(() => {
                        anotherDialog1.value = false
                        return router.push({ name: 'login' })
                    }, 2000);
            } 
                
            store.commit('setConfirmation', true)
            
            
        }
      
      
        return{
      
              room, 
              days, 
              user,
              handleSubmit,
              error,
              confirmation,
              roomId,
              anotherDialog1
            

              
        }
    }
}
</script>
