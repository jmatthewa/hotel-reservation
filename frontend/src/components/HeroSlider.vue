<template>
<section id="home">
        
    <Swiper :modules="[EffectFade, Autoplay]" 
    :effect="'fade'" 
    :loop="true"
    :autoplay="{
        delay: 3000,
        disableOnInteraction: false
    }"    
    class=" h-[600px] lg:h-[860px]">
        <SwiperSlide 
        class="h-full relative flex justify-center items-center"
        v-for="(slide,index) in slides" :key="index">
           <div class="z-20 text-white text-center">
                <div class="uppercase font-tertiary tracking-[6px] mb-6">Just Enjoy and Relax</div>
                <h1 class="text-[32px] font-primary uppercase tracking-[2px] max-w-[920px] lg:text-[68px] mb-10">{{ slide.title }}</h1>
          <button class="text-[15px] tracking-[3px] font-tertiary uppercase text-white flex-1 transition-all px-8 flex justify-center items-center
          h-[60px] bg-accent hover:bg-accent-hover mx-auto"
          @click="scroll('rooms')"
          >{{ slide.btnText }}</button>
            </div>
           <div class="absolute top-0 w-full h-full">
                <img :src="slide.bg" class="object-cover h-full w-full">
           </div>
           <div class="absolute w-full h-full bg-black/70">

           </div>


        </SwiperSlide>
    </Swiper>
</section>
</template>
<script>

import img1 from '@/assets/1.jpg'
import img2 from '@/assets/5.jpg'
import img3 from '@/assets/8.jpg'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectFade, Autoplay } from 'swiper';
import 'swiper/css';
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";

export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
        const slides = [
            {
         
                title: 'Heroic Luxury Mattress',
                bg: img1,
                btnText: 'See our rooms'
            },
            {
      
                title: 'Heroic Luxury Mattress',
                bg: img2,
                btnText: 'See our rooms'
            },
            {
       
                title: 'Heroic Luxury Mattress',
                bg: img3,
                btnText: 'See our rooms'
            },
        ]

        function scroll(id) {
     
            const element = document.getElementById(id);
            element.scrollIntoView({ behavior: 'smooth' });
         }


        return {
            slides,EffectFade,Autoplay, scroll
        }
    }
}
</script>
