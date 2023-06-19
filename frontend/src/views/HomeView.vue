<template>
  <HeroSlider />
  <div class="container mx-auto relative">
      <div class="container mx-auto">
        <div class="lg:-top-12 bg-accent/20 mt-4 p-4 lg:shadow-xl lg:absolute lg:left-0 lg:right-0 lg:p-0 lg:z-30">
          <BookForm />
        </div>

    </div>
  </div>


  <RoomsSection/>

</template>
<script>

import RoomsSection from '@/components/RoomsSection.vue'
import BookForm from '@/components/BookForm.vue';
import HeroSlider from '@/components/HeroSlider.vue'

export default {
  components: {
    RoomsSection,
    BookForm,
    HeroSlider
  }
}
</script>
