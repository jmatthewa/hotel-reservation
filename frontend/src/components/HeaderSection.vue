<template>
    <header :class="header ? 'bg-white py-6 shadow-lg' : 'bg-transparent py-8'"
    class=" fixed z-40 w-full transition-all duration-500">
        <div class="container mx-auto  flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
            <router-link :to="{name : 'home'}" @click="scrollToElement('home')">
                <span :class="header ? 'text-accent' : 'text-white'" class="w-[160px] font-signature text-6xl">Mattress </span>
            </router-link>

            <nav v-if="!user" :class="header ? 'text-primary' : 'text-white'" class="flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8">
                <router-link :to="{name : 'home'}" @click="scrollToElement('home')" class="hover:text-accent transition"> Home</router-link>
                <router-link :to="{name : 'home'}" @click="scrollToElement('')" class="hover:text-accent transition"> Contact</router-link>
                <router-link :to="{name : 'login'}" @click="scrollToElement('')" class="hover:text-accent transition"> Login</router-link>
            </nav>
            <nav v-else :class="header ? 'text-primary' : 'text-white'" class="flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8">
                Hi, <router-link :to="{name : 'info'}" class="hover:text-accent transition">{{ user.lName }} , {{ user.fName }}</router-link>
                <a href="javascript:void(0)" class="hover:text-accent transition" @click="handleClick">Logout</a>

             </nav>
            
        </div>
        <div v-if="user">

                <div v-if="anotherDialog1">
                        <div class="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-40"></div>
                                <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-md z-50 text-sm lg:text-xl whitespace-nowrap">
                                    <p>You have Successfully logout!</p>
                            
                                </div>
                         </div>
                </div>
    </header>
</template>
<script>
import VueScrollTo from 'vue-scrollto'
import {  computed, onMounted, ref,watchEffect } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';

// const isObjectEmpty = (obj) => {
//   return Object.keys(obj).length === 0;
// };
export default {

    directives: {
    scrollTo: VueScrollTo.directive
        },
    setup() {
        const store = useStore()
        const header = ref(false)
        const user = computed(() => store.getters.user)
        const anotherDialog1 = ref (false)

        const scrollToElement = (elementId) => {
            VueScrollTo.scrollTo({ elementId, behavior: 'smooth' });
        }
        const handleClick = () => {

            anotherDialog1.value = true
            

            setTimeout(() => {
                anotherDialog1.value = false
                store.dispatch('user', null)
                localStorage.removeItem('access_token')
                router.push({name: 'login'})
            }, 2000);
        }

        onMounted( async () => {
            await fetch('http://localhost:3000/users/user', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token')
                }
            })
            .then(response => response.json())
            .then(data => {
                store.dispatch('user',data)
            })

        }),

    
        watchEffect( ()=>{
            window.addEventListener('scroll', ()=> {
                window.scrollY > 50 ? header.value= true : header.value = false
            })
        })
    

        return {
            header, 
            scrollToElement , 
           anotherDialog1,
            user,
            handleClick
        }
    }
}
</script>
