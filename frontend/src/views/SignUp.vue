<template >
    <section>
        <ScrollToTop />
    <div class="bg-room bg-cover bg-center h-[560px] relative flex justify-center items-center">

        <div class="absolute w-full h-full bg-black/70"></div>

        <h1 class="text-6xl text-white z-20 font-primary text-center">Welcome</h1>

</div>

<div class="mt-10 container mx-auto mb-10">
    <div class="flex flex-col lg:flex-row h-full py-24 relative">
        <div class="w-full h-full lg:w-[60%]  text-white relative hidden md:block">
            <div class="absolute w-full h-full bg-black/70"></div>
            <div class="absolute top-[25%] left-[10%] flex flex-col">
                <h1 class="text-6xl font-primary my-4">Welcome to MATTress hotel</h1>
                <p>Stay with us, feel at home.</p>
            </div>
         
            <img  :src="img">
    
        </div>
        <div class="w-full h-full lg:w-[40%]">

            <div class="py-8 px-9 bg-[#f5f5f5] mb-12">
                <div class="flex flex-col space-y-4 mb-4 justify-between">
               
                    <div class="w-full flex flex-col">
                        <h3 class="text-3xl font-semibold mb-4">Register</h3>
                        <p class="text-sm mb-2">Create your account. It's free and only take a minute</p>
                        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                    <strong>{{ error }}</strong>
                                </div>
                    </div>

                    <form @submit.prevent="addNewUser">

                        
                        <div class="w-full flex flex-col ">
                            <div class="flex gap-3 justify-between">
                                <input class="w-full border-b bg-transparent text-black border-black outline-non focus:outline-none py-4" 
                            type="text" 
                            placeholder="First Name"
                            v-model="users.fName"
                            required
                            >
                               
    
                            <input class=" w-full border-b bg-transparent text-black border-black outline-non focus:outline-none py-4" 
                            type="text" 
                            placeholder="Last Name"
                            v-model="users.lName"
                            required>
                         
                            </div>
                            <input class="w-full border-b bg-transparent text-black border-black outline-non focus:outline-none py-4 my-4" 
                            type="email" 
                            placeholder="Email"
                            v-model="users.email"
                            required>
                    
                            <input class=" w-full border-b bg-transparent text-black border-black outline-non focus:outline-none py-4" 
                            type="password" 
                            placeholder="Password"
                            v-model="users.password"
                            required>
                     
                            <input class="mb-10 w-full border-b bg-transparent text-black border-black outline-non focus:outline-none py-4" 
                            type="password" 
                            placeholder="Confirm Password"
                            v-model="users.passwordConfirm">
              
                        </div>
                        <div class="w-full flex items-center " >
                                        <input 
                                        v-model="isChecked"
                                        type="checkbox" class="w-4 h-4 mr-2 mb-8" required>
                                        <p class="text-sm mb-8">I accept the <span class="text-accent font-semibold">Terms of Use</span>  & <span class="text-accent font-semibold">Privacy Policy</span></p>
    
                                    </div>
                        <button 
                        type="submit"
                        class=" py-4 w-full text-[15px] tracking-[3px] font-tertiary uppercase text-white flex-1 transition-all px-8 flex justify-center items-center h-[60px] bg-accent hover:bg-accent-hover">Register</button>
                

                    </form>
                
                 
                </div>
             
            </div>
    
        </div>
        <div v-if="anotherDialog1">
                                <div class="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-40 "></div>
                                <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-md z-50 text-sm lg:text-xl whitespace-nowrap">
                                    <p>Successfully Registered!</p>
                               
                            
                                </div>
       </div>

    </div>
</div>
</section>
</template>
<script>
import ScrollToTop from '@/components/ScrollToTop.vue'
import img from '@/assets/8.jpg'

import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import router from '@/router'

export default {
    components: {
        ScrollToTop
    },
        setup (){
            const store = useStore()
            const users = computed(() => store.state.newUsers)
            const message = computed(() => store.state.error)
            const error = ref('')
            const isChecked = ref(false)
            const anotherDialog1 = ref(false)

            const timer = () => {
                setInterval(() => {
                        error.value = ''
                    }, 2000);
            }

            const validate =  () => {

            

                if(!users.value.fName) {
                    error.value = 'First Name is required.';
                    timer()
                }
                if(!users.value.lName) {
                    error.value = 'Last Name is required.';
                    timer()
                }
                if(!users.value.email) {
                    error.value = 'Email is required.';
                    timer()
                } else if(!/\S+@\S+\.\S+/.test(users.value.email)) {
                    error.value = 'Email is invalid.';
                    timer()
                }
                if(!users.value.password) {
                    error.value = 'Password is required.'
                    timer()
                } else if (users.value.password < 8) {
                    error.value = 'Password must be at least 8 characters.'
                    users.value.password = ''
                    users.value.passwordConfirm = ''
                    timer()
                }
                if(!users.value.passwordConfirm){
                    error.value = 'Password is required.'
                    users.value.password = ''
                    users.value.passwordConfirm = ''
                    timer()
            
                } else if(users.value.password !== users.value.passwordConfirm) {
                    error.value= 'Password is not match'
                    users.value.password = ''
                    users.value.passwordConfirm = ''
                    timer()
                }
                return Object.keys(error.value).length === 0;
            }
            const addNewUser = async () => {
                if(validate()) {
                    store.dispatch('addNewUser')
                    if(message.value) {
                        users.value.email = ''
                        users.value.password = ''
                        users.value.passwordConfirm = ''
                        isChecked.value = false
                        return error.value= message.value
                    } else {
                        users.value.fName = ''
                        users.value.lName = ''
                        users.value.email = ''
                        users.value.password = ''
                        users.value.passwordConfirm = ''
                        isChecked.value = false
                        anotherDialog1.value = true
                        setTimeout(() => {
                            anotherDialog1.value = false
                            router.push({name: 'login'})
                        }, 2000);
                    }
     
                }
            }
        return {
            img,
            addNewUser,
            validate,
            users,
            error,
            isChecked,
            anotherDialog1
        }
    }
}
</script>
