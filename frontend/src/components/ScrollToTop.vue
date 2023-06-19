<template>  <div></div>

</template>
<script>

import { onMounted } from 'vue';
export default {
    setup() {

        onMounted(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
    }
}
</script>
