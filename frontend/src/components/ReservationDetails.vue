<template>
    <div>
        <div class="py-8 px-6 bg-accent/20 mb-12">
                        <div class="flex flex-col space-y-4 mb-4">
                            <h3 class="mb-4 uppercase">Your reservation details</h3>
                            <p> {{  room.roomName }}</p>
                            <p class="">Check-In: {{ formattedStart }} </p>
                            <p>Check-Out: {{ formattedEnd }}</p>
                            <p>Total Guest: {{ total }}</p>
                        </div>
                   

                            <button 
                            @click="handleConfirmation"
                            class="w-full text-[15px] tracking-[3px] font-tertiary uppercase text-white flex-1 transition-all px-8 flex justify-center items-center h-[60px] bg-accent hover:bg-accent-hover">Confirm</button>
                            <button 
                            @click="handleCancel"
                            class="mt-5 w-full text-[15px] tracking-[3px] font-tertiary uppercase text-white flex-1 transition-all px-8 flex justify-center items-center h-[60px] bg-accent hover:bg-accent-hover">Cancel</button>
                    
                    
        </div>
        <div v-if="anotherDialog1">
                                <div class="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-40 "></div>
                                <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-md z-50 text-sm lg:text-xl whitespace-nowrap">
                                    <p>You have Successfully Reserved this Room!</p>
                            
                                </div>
                            </div>
                     
    </div>
</template>
<script>
import {  computed,ref  } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';

export default {
    props: ['room','roomId'],

    setup(props) {
        const store = useStore()
        const startDate = computed(() => store.getters.startDate)
        const endDate = computed(() => store.getters.endDate)
        const adult = computed(() => store.state.adult)
        const kid = computed(() => store.state.kid)
        const user = computed(() => store.getters.user)
        const total = computed(() => store.state.total)
 
        const anotherDialog1 = ref(false)

        const formatDate= (date) => {
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            return date.toLocaleString('en-US', options); 
        }

        const formattedStart = formatDate(startDate.value)
        const formattedEnd = formatDate(endDate.value)

        const handleConfirmation = async () => {
            const reservationDetails = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    checkIn: formattedStart,
                    checkOut: formattedEnd,
                    totalGuest: total.value,
                    guestDetails: user.value._id,
                    roomDetails: props.roomId
                })
            }
            await fetch('http://localhost:3000/reservation/new', reservationDetails)
            .then((res) => res.json())
            .then((data) => {
                if(data.error) {
                    alert(data.error)
                } else {
                    

                    anotherDialog1.value = true
                    setTimeout(() => {
                 
                        anotherDialog1.value = false
                        store.dispatch('user', data.user)
                        store.commit('setConfirmation', false)
                        store.commit('setStartDate', null)
                        store.commit('setEndDate', null)
                        store.commit('setTotal', 0)
                        store.commit('setAdults', '1 Adult')
                        store.commit('setKids', '0 Kids')
                        store.commit('setTotalDays',1)
                        router.push({ name: 'info'})
                    }, 2000);

                  
                }
            })
        }
        const handleCancel = () => {
            store.commit('setConfirmation', false)
            store.commit('setStartDate', null)
            store.commit('setEndDate', null)
            store.commit('setTotal', 0)
            store.commit('setAdults', '1 Adult')
            store.commit('setKids', '0 Kids')
            router.push({ name: 'home'})
        }
        return {
            formattedStart,
            formattedEnd,
            adult,
            kid,
            user,
            total,
            handleCancel,
            handleConfirmation,
            props,
            anotherDialog1
        }
    }
}
</script>