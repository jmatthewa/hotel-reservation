<template>
  <div id="app">

    <HeaderSection />
    <router-view />
    <FooterSection />

  </div>

</template>

<script>

import HeaderSection from './components/HeaderSection.vue';
import FooterSection from './components/FooterSection.vue';

export default{
    components: { 
      HeaderSection, 
      FooterSection 
    },
}


</script>

<style>
:root {
    --dp-input-padding: 22.5px 30px 22.5px 12px; /*Padding in the input*/
 

}
</style>
