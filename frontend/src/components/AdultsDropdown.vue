<template>
    <Menu as="div" class="w-full h-full bg-white relative">
        <MenuButton class="w-full h-full flex items-center justify-between px-8"> {{ adult }}
            <fa :icon="['fas','chevron-down']" class="text-base text-accent-hover"/>
        </MenuButton>
   
        <MenuItems as="ul" class="bg-white absolute w-full flex flex-col z-40 ">
            <MenuItem as="li" v-for="(li, index) in lis" :key="index" 
                @click="updateAdultCount(li.name)"
                class="border-b last-of-type:border-b-0 h-12 hover:bg-accent hover:text-white w-full flex justify-center items-center cursor-pointer">
                {{ li.name }}
            </MenuItem>
        </MenuItems>
    </Menu>
</template>
<script>
 import { Menu, MenuButton, MenuItems, MenuItem  } from '@headlessui/vue'

 import { computed, watchEffect } from 'vue';
 import { useStore } from 'vuex';

export default {
    components: {
        Menu, MenuButton, MenuItems, MenuItem 
    },
    props: {
        updateCount: String
    },
    setup() {
    
        const store = useStore()
        const adult = computed(() => store.state.adults)
        const kid = computed(() => store.state.kids)
  

        const updateAdultCount = (count) => {
            store.commit('setAdults', count)
    
        }
        
        watchEffect(()=> {
            const result = Number(adult.value[0]) + Number(kid.value[0])
            store.commit('setTotal', result)
       
        
        })
        const lis = [
            {name: '1 Adult'},
            {name: '2 Adults'},
            {name: '3 Adults'},
            {name: '4 Adults'},
        ]
       

        return {
            lis,
            updateAdultCount, adult
           
         
  
        }
    }
}
</script>
