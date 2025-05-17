<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    img_url: string[]
}>();

const pageIndex = ref<number>(0);
const renderingUrl = ref<string | undefined>();

const hasImage = () => (props.img_url && props.img_url.length > 0);

</script>

<template>
    <div v-if="hasImage()" class="img-slides">
        <div class="img-slides-bar">
            hey judy
        </div>
    </div>
    <!-- <div>"hey"</div> -->
</template>