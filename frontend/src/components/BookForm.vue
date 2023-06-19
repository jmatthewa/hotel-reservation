<template>
    <form class="h-[300px] w-full lg:h-[70px]">
        <div class="flex flex-col  w-full h-full lg:flex-row">
            <div class="flex-1 border-r">
                <CheckIn />
            </div>
            <div class="flex-1 border-r">
                <CheckOut />
            </div>
            <div class="flex-1 border-r">
                <AdultsDropdown/>
            </div>
            <div class="flex-1 border-r">
                <KidsDropdown/>
            </div>
            <button @click.prevent="handleClick" type="submit" class="text-[15px] tracking-[3px] font-tertiary uppercase text-white flex-1 transition-all px-8 flex justify-center items-center bg-accent hover:bg-accent-hover">Check now</button>
        </div>
    </form>
</template>
<script>
import CheckIn from './CheckIn.vue';
import CheckOut from './CheckOut.vue';
import AdultsDropdown from './AdultsDropdown.vue'
import KidsDropdown from './KidsDropdown.vue'
import { useStore } from 'vuex';





export default {

    components: {
        CheckIn,
        CheckOut,
        AdultsDropdown,
        KidsDropdown

    }, setup() {
        const store = useStore()


       const handleClick = () => {
       
            store.commit('setLoading', true)
            store.dispatch('filteredRooms')
 
       }
        return {
            // adult,
            // kid,
            // total,
            handleClick,
            // updateAdultCount,
            // updateKidCount
        }
    }
}
</script>
