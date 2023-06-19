<template>
    <footer class="bg-primary py-12">
        <div class="container mx-auto text-white flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:gap-y-0">
            <router-link :to="{name : 'home'}">
                <span class="w-[160px] font-signature text-6xl">Mattress </span>
            </router-link>
            created by: James Matthew &copy; {{ new Date().getFullYear() }}
        </div>

    </footer>
</template>
<script>
export default {
    
}
</script>
