<script setup>
    defineProps({
        btnName: {
            type: String,
            required: true,
            default: "button",
        },
    });
</script>
<template>
    <button
        type="submit"
        class="bg-blue-700 font-medium mt-4 block mx-auto w-full h-9 rounded text-white border border-blue-700 hover:bg-blue-600 hover:cursor-pointer md:max-2xl:h-10"
    >
        {{ btnName }}
    </button>
</template>
