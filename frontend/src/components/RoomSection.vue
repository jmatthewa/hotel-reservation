<template>
    <div class="bg-white shadow-2xl min-h-[500px]  group pb-2">
        <div class="overflow-hidden">
            <img class="group-hover:scale-110 transition-all duration-300 w-full" :src="require(`../assets/${room.image}`)">
        </div>

        <div class="bg-white shadow-lg max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center uppercase
        font-tertiary tracking-[1px] font-semibold text-base">
            <div class="flex justify-between w-[80%]">

                <div class="gap-x-2">
                    <div class="text-accent">
                        <fa :icon="['fas','expand']" class="text-[15px]"/>
                    </div>
                </div>
                <div class="flex gap-x-1">
                    <div>Size</div>
                    <div>{{ room.size }}m2</div>
                </div>

                <div class="gap-x-2">
                    <div class="text-accent">
                        <fa :icon="['fas','person']" class="text-[18px]"/>
                    </div>
                </div>
                <div class="flex gap-x-1">
                    <div>Max People</div>
                    <div>{{ room.maxPerson }}</div>
                </div>

            </div>
        </div>
        <div class="text-center">
            <router-link :to="{name : 'room' , params: { id: roomId}}">
                <h3 class="text-2xl font-primary font-semibold tracking-[1px] mb-2">{{ room.roomName }}</h3>
            </router-link>
            <p class="max-w-[300px] mx-auto mb-3 lg:mb-6">{{ room.description.slice(0,56) + '...' }}</p>
        </div>
        <div>
            <router-link :to="{name : 'room' , params: { id: roomId}}" class="mx-auto max-w-[240px] h-[48px] bg-primary hover:bg-accent text-[15px] tracking-[3px] font-tertiary uppercase text-white flex-1 transition-all px-8 flex justify-center items-center ">
                Book now from $ {{ room.price }}
            </router-link>
        </div>
    </div>
</template>
<script>



export default {
    props: ['room','roomId'],

}
</script>
