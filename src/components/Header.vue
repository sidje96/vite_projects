<template>
    <svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" @click="goback">
        <title>arrow-left-bold-outline</title><path d="M13,22L3,12L13,2V8H21V16H13V22M6,12L11,17V14H19V10H11V7L6,12Z" />
    </svg>
    <svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" @click="goforward">
        <title>arrow-right-bold-outline</title><path d="M11,16H3V8H11V2L21,12L11,22V16M13,7V10H5V14H13V17L18,12L13,7Z" />
    </svg>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

function goback() {
    router.back();
}

function goforward() {
    router.forward();
}

</script>