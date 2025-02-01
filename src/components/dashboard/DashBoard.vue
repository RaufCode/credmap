<script setup>
    import { ref, onMounted } from "vue";
    import { useCategoryStore } from "@/stores/category";
    import { useCustomerStore } from "@/stores/customer";
    import { useAuthStore } from "@/stores/auth";
    import { useRouter } from "vue-router";
    import CustomerList from "@/components/dashboard/CustomerList.vue";
    import CategoryList from "@/components/dashboard/CategoryList.vue";
    import { useToast } from "vue-toastification";

    const categoryStore = useCategoryStore();
    const customerStore = useCustomerStore();
    const authStore = useAuthStore();
    const router = useRouter();
    const toast = useToast();

    const activeTab = ref("customers");

    onMounted(async () => {
        if (!authStore.isAuthenticated) {
            router.push("/signin");
            return;
        }
    });

    const handleLogout = () => {
        authStore.logout();
        router.push("/signin");
        toast.success("Logged out successfully");
        console.log("Logged out successfully");
    };
</script>

<template>
    <div class="min-h-screen bg-gray-100">
        <nav class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <div class="flex-shrink-0 flex items-center">
                            <h3 class="text-xl font-bold">Dashboard</h3>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <button
                            @click="handleLogout"
                            class="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-400 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <div class="border-b border-gray-200">
                    <nav class="-mb-px flex space-x-8">
                        <button
                            @click="activeTab = 'customers'"
                            :class="[
                                activeTab === 'customers'
                                    ? 'border-blue-700 text-blue-700'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm',
                            ]"
                        >
                            Customers
                        </button>
                        <button
                            @click="activeTab = 'categories'"
                            :class="[
                                activeTab === 'categories'
                                    ? 'border-blue-700 text-blue-700'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm',
                            ]"
                        >
                            Categories
                        </button>
                    </nav>
                </div>

                <div class="mt-6">
                    <CustomerList v-if="activeTab === 'customers'" />
                    <CategoryList v-if="activeTab === 'categories'" />
                </div>
            </div>
        </div>
    </div>
</template>
