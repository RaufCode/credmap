<script setup>
    defineProps({
        modelValue: String,
        label: String,
        id: String,
        labelName: String,
        required: Boolean,
        type: {
            type: String,
            default: "text",
        },
    });

    const emit = defineEmits(["update:modelValue"]);
</script>

<template>
    <label
        :for="label"
        class="text-base block pb-2 text-gray-900 font-normal md:pb-3"
        >{{ labelName }}<br />
        <input
            :value="modelValue"
            :type="type"
            :id="id"
            :required="required"
            autocomplete="on"
            @input="(event) => emit('update:modelValue', event.target.value)"
            class="block mt-1 w-full mx-auto border border-gray-400 rounded outline-none focus:border-blue-700 h-10 p-1 md:h-11"
        />
    </label>
</template>
