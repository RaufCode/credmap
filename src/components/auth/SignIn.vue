<script setup>
    import axios from "axios";
    import { reactive } from "vue";
    import { useRouter, RouterLink } from "vue-router";
    import { useAuthStore } from "@/stores/auth";
    import PrimaryField from "../ui/PrimaryField.vue";
    import PrimaryBtn from "../ui/PrimaryBtn.vue";
    import { useToast } from "vue-toastification";

    const router = useRouter();
    const authStore = useAuthStore();
    const toast = useToast();

    const form = reactive({
        email: "",
        password: "",
    });

    const validate = () => {
        const passwordRegex =
            /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        try {
            if (!form.password || !form.email) throw "All fields are required";
            if (!emailRegex.test(form.email)) throw "invalid email";
            if (!passwordRegex.test(form.password))
                throw "Password must be at least 8 characters long and include at least one special character (e.g., !@#$%^&*)";
            signin();
        } catch (error) {
            toast.error(error);
        }
    };

    const signin = async () => {
        try {
            await authStore.signIn(form);
            toast.success("Sign in successful");
        } catch (error) {
            toast.error("no account found with the provided credentials");
        }
    };
</script>

<template>
    <main>
        <div class="py-8 w-full min-h-screen flex justify-center items-center">
            <form
                @submit.prevent="validate"
                class="w-11/12 max-w-[500px] mx-auto p-5 shadow sm:max-2xl:p-8"
            >
                <h3>Sign in</h3>
                <PrimaryField
                    v-model="form.email"
                    labelName="Email"
                    label="email"
                    id="email"
                    type="email"
                />
                <PrimaryField
                    v-model="form.password"
                    labelName="Password"
                    label="password"
                    id="password"
                    type="password"
                />
                <p class="mt-3 text-sm text-gray-700 md:max-2xl:text-base">
                    Don't have an account?
                    <a href="/signup" class="text-blue-700 font-semibold"
                        >Sign up</a
                    >
                </p>
                <PrimaryBtn btnName="Sign in" />
            </form>
        </div>
    </main>
</template>
