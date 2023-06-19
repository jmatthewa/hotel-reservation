<template>
                <ModalSection v-if="toggleModal"
                         
                         :room = "room"
                         :user = "user"
                         @closeModal = "closeModal"
                         />
        <section>

            <div class="bg-room bg-cover bg-center h-[560px] relative flex justify-center items-center ">

                    <div class="absolute w-full h-full bg-black/70"></div>

                    <h1 class="text-6xl text-white z-20 font-primary text-center">Welcome</h1>

            </div>

        

            <div v-if="user!=null" class="container mx-auto">
                <div class="flex flex-col h-full py-24">
                 <div class="w-full h-full  px-6" >

                    <h2 class="font-primary text-[45px] mb-4">{{ user.lName }} , {{ user.fName }}</h2>
                    <p class="mb-8 uppercase">you have {{ user.reservationDetails.length }} reservation</p>
 
    
                    <div class="mt-12">
                     <h3 class="mb-8 text-2xl font-primary font-semibold tracking-[1px]" v-if="user.reservationDetails.length!=0">Reservation Details</h3>

                        <div class="mb-4 p-10 border-b-4" v-for="reservation in user.reservationDetails" :key="reservation._id">
                            <p> Check-In : {{ reservation.formattedCheckIn }}</p>
                            <p> Check-Out : {{ reservation.formattedCheckOut }}</p>
                            <p> Total Guest: {{ reservation.totalGuest }}</p>
                            <div class="flex justify-between">
                                <p @click="handleClick(reservation.roomDetails)" class="cursor-pointer mt-5 ml-5 text-[15px] md:tracking-[3px] font-tertiary text-xs uppercase md:text-base hover:hover:bg-green-100">Click here for more info</p>
                                <p @click="showConfirmationDialog" class="cursor-pointer mt-5 ml-5 text-[15px] tracking-[3px] font-tertiary uppercase ">  <fa :icon="['fas', 'trash']" /></p>

                            </div>
                            <div v-if="showDialog">
                                <div class="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-40"></div>
                                <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md z-50 text-sm lg:text-xl">
                                    <p>Are you sure you want to delete this reservation?</p>
                                    <div class="flex justify-center gap-5 mt-5">
                                        <button @click="handleDelete(reservation._id)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Yes</button>
                                        <button @click="cancelDelete" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">No</button>

                                    </div>
                                </div>
                            </div>
 
                        </div>
                        <div v-if="anotherDialog1">
                                <div class="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-40 "></div>
                                <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-md z-50 text-sm lg:text-xl whitespace-nowrap">
                                    <p>Successfully Deleted!</p>
                            
                                </div>
                        </div>
                     </div>
         
       
                </div>
                </div>
             
            </div>
            <div v-else>
                Please Login first
            </div>
        </section>
</template>
<script>
import { computed,onMounted,ref } from 'vue';
import { useStore } from 'vuex';
import ModalSection from '@/components/ModalSection.vue';

export default {
    components: {
        ModalSection
    }, 
    setup() {
        const store = useStore()
        const user = computed(() => store.getters.user)
        const room = ref('')
        const toggleModal = ref(false)
        const date = ref('')
        const showDialog = ref(false)
        const anotherDialog1 =ref(false)
        
        const handleClick = async (id) => {
           await fetch(`http://localhost:3000/rooms/get/${id}`)
           .then(res => res.json())
           .then(data => {
            room.value = data
            toggleModal.value = !toggleModal.value
            date.value = user.value.reservationDetails
 
           })

        }
        const showConfirmationDialog = () => {
                showDialog.value = true;

        }
        const cancelDelete = () => {
            showDialog.value = false;
        };
        
        const handleDelete = async (id) => {

            const deleteReservation = {
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json"
                }
            }

            await fetch(`http://localhost:3000/reservation/delete/${id}`, deleteReservation)
            .then((res) => res.json())
            .then((data) => {
                if(data.message) {
               
                    showDialog.value = false;
        
                    anotherDialog1.value = true
                    store.dispatch('user', data.user)
                    setTimeout(() => {
                        anotherDialog1.value = false
                    }, 2000);

                    
                } else {
                    alert(data.error)
                }
            })
            .catch(err => console.log(err))
        }

        const closeModal = () => {
            toggleModal.value = !toggleModal.value
        }
        onMounted(() => {
            store.dispatch('user', user.value)
        })

        return {
            user,
            handleClick,
            toggleModal,
            room,
            closeModal,
            showDialog,
            handleDelete,
            cancelDelete,
            showConfirmationDialog,
            anotherDialog1
        
        }
    }
}
</script>
