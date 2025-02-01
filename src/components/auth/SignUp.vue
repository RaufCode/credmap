<script setup>
    import { ref, reactive, onMounted } from "vue";
    import { useRouter } from "vue-router";
    import axios from "axios";
    import PrimaryBtn from "../ui/PrimaryBtn.vue";
    import PrimaryField from "../ui/PrimaryField.vue";
    import { useToast } from "vue-toastification";

    const router = useRouter();
    const toast = useToast();

    let markets = ref([]);

    onMounted(() => {
        axios.get("https://staging.afcfta.app/api/market").then((res) => {
            markets.value = res.data;
        });
    });

    const form = reactive({
        name: "",
        type: "",
        market: "",
        address: "",
        admin_first_name: "",
        admin_last_name: "",
        admin_other_names: "",
        admin_phone: "",
        admin_password: "",
        admin_email: "",
    });

    const userValidation = () => {
        const nameRegex = /^[A-Za-z]{3,}(-[A-Za-z]{3,})*$/;
        const addressRegex = /^[A-Za-z]{3,},\s[A-Za-z]{3,}$/;
        const passwordRegex =
            /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        try {
            if (
                !form.name ||
                !form.type ||
                !form.market ||
                !form.address ||
                !form.admin_first_name ||
                !form.admin_last_name ||
                !form.admin_phone ||
                !form.admin_password ||
                !form.admin_email
            )
                throw "All fields except other names are required";
            if (!nameRegex.test(form.admin_first_name.trim()))
                throw "Admin first name can not contain special characters or numbers";
            if (!nameRegex.test(form.admin_last_name.trim()))
                throw "Admin last name can not contain special characters or numbers";
            if (!emailRegex.test(form.admin_email.trim()))
                throw "invalid email";
            if (!passwordRegex.test(form.admin_password.trim()))
                throw "Password must be at least 8 characters long and include at least one special character (e.g., !@#$%^&*)";
            console.log("Validated");
            console.log(form);
            signup();
        } catch (error) {
            toast.error(error);
        }
    };

    const signup = async () => {
        try {
            const response = await axios.post("entity/signup", form);
            console.log(response);

            toast.success("Sign up successful");
            router.push("/signin");
        } catch (error) {
            console.log(error);
        }
    };
</script>

<template>
    <main>
        <div class="py-8 w-full min-h-screen flex justify-center items-center">
            <form
                @submit.prevent="userValidation"
                class="w-11/12 max-w-[500px] mx-auto p-3 shadow md:max-2xl:p-8"
            >
                <h3>Create an account</h3>
                <PrimaryField
                    v-model="form.name"
                    labelName="Name"
                    label="name"
                    id="name"
                />
                <label
                    >Type<br />
                    <select
                        v-model="form.type"
                        class="block mt-1 mb-3 mv-3 w-full mx-auto border border-gray-400 rounded outline-none focus:border-blue-700 h-10 p-1 md:h-11"
                    >
                        <option value="" disabled selected>Select Type</option>
                        <option>Agency</option>
                        <option>Organisation</option>
                    </select>
                </label>
                <label
                    >Market<br />
                    <select
                        v-model="form.market"
                        class="block mt-1 mb-3 mv-3 w-full mx-auto border border-gray-400 rounded outline-none focus:border-blue-700 h-10 p-1 md:h-11"
                    >
                        <option value="" disabled selected>
                            Select Market
                        </option>
                        <option
                            v-for="market in markets"
                            :key="market.id"
                            :value="market.id"
                        >
                            {{ market.name }}
                        </option>
                    </select>
                </label>
                <PrimaryField
                    v-model="form.address"
                    labelName="Address Eg (kumasi, Ghana)"
                    label="Address"
                    id="address"
                />
                <PrimaryField
                    v-model="form.admin_first_name"
                    labelName="Admin First Name"
                    label="admin_first_name"
                    id="admin_first_name"
                />
                <PrimaryField
                    v-model="form.admin_last_name"
                    labelName="Admin Last Name"
                    label="admin_last_name"
                    id="admin_Last_name"
                />
                <PrimaryField
                    v-model="form.admin_other_names"
                    labelName="Admin Other Names"
                    label="admin_other_names"
                    id="admin_other_names"
                />
                <PrimaryField
                    v-model="form.admin_phone"
                    labelName="Admin Phone"
                    label="admin_phone"
                    id="admin_phone"
                    type="tel"
                />
                <PrimaryField
                    v-model="form.admin_password"
                    labelName="Admin Password"
                    label="admin_password"
                    id="admin_password"
                    type="password"
                />
                <PrimaryField
                    v-model="form.admin_email"
                    labelName="Admin Email"
                    label="admin_email"
                    id="admin_email"
                    type="email"
                />

                <p class="mt-3 text-sm text-gray-700 md:max-2xl:text-base">
                    Already have an account?
                    <a href="/signin" class="text-blue-700 font-semibold"
                        >Sign in</a
                    >
                </p>

                <PrimaryBtn btnName="Sign up" />
            </form>
        </div>
    </main>
</template>
