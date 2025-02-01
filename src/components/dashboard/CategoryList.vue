<script setup>
    import { ref, onMounted } from "vue";
    import { useCategoryStore } from "@/stores/category";
    import { useAuthStore } from "@/stores/auth";
    import axios from "axios";

    const authStore = useAuthStore();
    const categoryStore = useCategoryStore();

    const categories = ref([]);
    const showAddModal = ref(false);
    const newCategory = ref({
        category_name: "",
        entity_id: authStore.getEntityId,
    });

    const error = ref(null);
    const loading = ref(false);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                `inventory/category/list/${authStore.getEntityId}/`,
                {
                    headers: { Authorization: `${authStore.token}` },
                }
            );
            categories.value = response.data.categories;
        } catch (error) {
            throw error.response?.data?.message || "Failed to fetch categories";
        } finally {
        }
    };

    fetchCategories();

    const handleAddCategory = async () => {
        try {
            loading.value = true;
            await categoryStore.createCategory(newCategory.value);
            await fetchCategories();
            showAddModal.value = false;
            newCategory.value = {
                category_name: "",
            };
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };
</script>

<template>
    <div>
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h2 class="text-xl font-semibold text-gray-900">Category</h2>
                <p class="mt-2 text-sm text-gray-700">
                    A list of all customer categories in your inventory system
                </p>
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                    @click="showAddModal = true"
                    class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-indigo-700"
                >
                    Add Category
                </button>
            </div>
        </div>
        <div class="mt-8 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div
                    class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
                >
                    <div
                        class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
                    >
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Category Name
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Entity Name
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Entity Type
                                    </th>
                                    <th
                                        scope="col"
                                        class="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                    >
                                        <span class="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-500 bg-white">
                                <tr
                                    v-for="category in categories"
                                    :key="category.id"
                                >
                                    <td
                                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900"
                                    >
                                        {{ category.category_name }}
                                    </td>
                                    <td
                                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                    >
                                        {{ category.entity.name }}
                                    </td>
                                    <td
                                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                    >
                                        {{ category.entity.type }}
                                    </td>
                                    <td
                                        class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                                    >
                                        <button
                                            @click="
                                                async () => {
                                                    await axios.delete(
                                                        `inventory/category/${category.id}/delete/`,
                                                        {
                                                            headers: {
                                                                Authorization: `${authStore.token}`,
                                                            },
                                                        }
                                                    );
                                                }
                                            "
                                            class="text-blue-700 hover:text-indigo-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="showAddModal"
            class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
        >
            <div class="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">
                    Add New Category
                </h3>
                <form @submit.prevent="handleAddCategory" class="space-y-4">
                    <div>
                        <label
                            for="name"
                            class="block text-sm font-medium text-gray-700"
                            >Name</label
                        >
                        <input
                            type="text"
                            id="name"
                            v-model="newCategory.category_name"
                            required
                            class="block mt-1 w-full mx-auto border border-gray-400 rounded outline-none focus:border-blue-700 h-10 p-1 md:h-11"
                        />
                    </div>
                    <div v-if="error" class="text-red-600 text-sm">
                        {{ error }}
                    </div>

                    <div class="mt-5 sm:mt-6 space-x-3">
                        <button
                            type="submit"
                            :disabled="loading"
                            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {{ loading ? "Adding..." : "Add Category" }}
                        </button>
                        <button
                            type="button"
                            @click="showAddModal = false"
                            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
