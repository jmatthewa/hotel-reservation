<template>
    <section>

        <div class="bg-room bg-cover bg-center h-[560px] relative flex justify-center items-center ">

                <div class="absolute w-full h-full bg-black/70"></div>

                <h1 class="text-6xl text-white z-20 font-primary text-center">Welcome</h1>

        </div>

        <div class="mt-10 container mx-auto mb-10">
            <div class="flex flex-col lg:flex-row h-full py-24 relative">
                <div class="w-full h-full lg:w-[60%]  text-white relative hidden md:block">
                    <div class="absolute w-full h-full bg-black/70"></div>
                    <div class="absolute top-[25%] left-[10%] flex flex-col">
                        <h1 class="text-6xl font-primary my-4 ">Welcome to MATTress hotel</h1>
                        <p>Stay with us, feel at home.</p>
                    </div>
                 
                    <img  :src="img">
            
                </div>

                <div v-if="anotherDialog">
                                <div class="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-90"></div>
                                <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-md z-50 text-sm lg:text-xl whitespace-nowrap">
                                    <p>Successfully Login!</p>
                            
                                </div>
                            </div>
                <div class="w-full h-full lg:w-[40%]">

                    <div class="py-8 px-9 bg-[#f5f5f5] mb-12">
                        <form @submit.prevent="loginUser">

                            <div class="flex flex-col space-y-4 mb-4 justify-between">
                                <h3 class="text-xl font-semibold mb-10">Welcome</h3>
                                <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                    <strong>{{ error }}</strong>
                                </div>
                                <div class="w-full flex flex-col">
                                    <h3 class="text-3xl font-semibold mb-4">Login</h3>
                                    <p class="text-sm mb-2">Welcome back! Please Enter your details.</p>
                                </div>
        
                                <div class="w-full flex flex-col">
                                    <input class="w-full border-b bg-transparent text-black border-black outline-non focus:outline-none py-4 my-4" 
                                    type="email" 
                                    placeholder="Enter your email"
                                    required
                                    v-model="email"
                                    :autofocus="true"
                                   >
    
                                    <input class=" w-full border-b bg-transparent text-black border-black outline-non focus:outline-none py-4" 
                                    type="password" 
                                    placeholder="Enter your password"
                                    required
                                    v-model="password">
                                </div>
                                <div class=" w-full flex items-center justify-between">
                                    <div class=" mb-10 w-full flex items-center " >
                                        <input type="checkbox" class="w-4 h-4 mr-2">
                                        <p class="text-sm "
                                        >Remember Me</p>
    
                                    </div>
                                    
                                    <div class="whitespace-nowrap text-sm font-medium cursor-pointer underline underline-offset-2">Forgot Password</div>
                            
                                </div>
                                <button 
                                type="submit"
                                class=" py-4 w-full text-[15px] tracking-[3px] font-tertiary uppercase text-white flex-1 transition-all px-8 flex justify-center items-center h-[60px] bg-accent hover:bg-accent-hover">Login</button>
                        
                                <div class="w-full flex items-center justify-center ">
                                    <p class="mt-6 text-sm font-normal">Don't have an account? <router-link :to="{name : 'signup'}">Sign up for free.</router-link> </p>
                                </div>
                             
                            </div>
                        </form>
                     
                    </div>
            
                </div>
     
            </div>
        </div>
    </section>
</template>
<script>

import img from '@/assets/8.jpg'
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router'


export default {
    
    setup (){
        const store = useStore()
        const email = ref('')
        const password = ref('')
        const error = ref('')
        const anotherDialog = ref(false)
        const loginUser = async () => {
      
            const login = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            }
            await fetch('http://localhost:3000/users/login', login)
            .then((res) => res.json())
            .then((data) => {
                if(data.error) {            
                    email.value = ''
                    password.value= '' 
                    error.value = data.error 

                } else{
                    localStorage.setItem('access_token' , data.access_token)                 
                    store.dispatch('user',data.user) 
                    anotherDialog.value= true
                    setTimeout(() => {
                        anotherDialog.value = false      
                        router.push({name: 'home'})
                    }, 2000);
                 
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
        return {
            img, 
            loginUser,
            password,
            email, 
            error,
            anotherDialog
        }
    }
}
</script>
