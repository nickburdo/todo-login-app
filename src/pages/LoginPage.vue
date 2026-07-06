<script setup lang="ts">
import Input from "../components/UI/input.vue";
import Button from "../components/UI/button.vue";
import {ref} from "vue";
import {getUsers} from "../api/jsonPlaceholderApi.ts";
import {useAuth} from "../composables/authContext.ts";
import {useRouter} from "vue-router";

// TODO: Remove default values
const username = ref('Moriah.Stanton');
const phone = ref('024-648-3804');
const errors = ref ({
  username: '',
  phone: '',
});
const isSubmitting = ref(false);
const { setCurrentUser } = useAuth();
const router = useRouter();

function validateUsername() {
  const isValid = /^[A-Za-z.]+$/.test(username.value);
  if (!username.value?.trim()) {
    errors.value.username = 'Username required';
  } else if(!isValid) {
    errors.value.username = 'Username must be alphabets only';
  } else {
    errors.value.username = ''
  }
}

function validatePhone() {
  const isValid = /^[0-9+\-()x ]+$/.test(phone.value);
  if (!phone.value?.trim()) {
    errors.value.phone = 'Phone Number required';
  } else if(!isValid) {
    errors.value.phone = 'Phone Number must have only numbers and + - ( )';
  } else {
    errors.value.phone = ''
  }
}

function clearPhoneNumber(phone: string) {
  return phone.trim().toLowerCase().replace(/[^0-9]/g, '');
}

async function onSubmit() {
  if (isSubmitting.value) return;
  validateUsername();
  validatePhone();
  if (errors.value.username || errors.value.phone) return;

  isSubmitting.value = true;
  try {
    const users = await getUsers();
    const matchUser = users.find(user =>
        user.username.toLowerCase() === username.value.trim().toLowerCase()
        && clearPhoneNumber(user.phone) === clearPhoneNumber(phone.value));

    if (!matchUser) {
      errors.value.username = 'Username or Phone Number does not match';
      return;
    }

    setCurrentUser(matchUser);
    await router.push('/todos');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    isSubmitting.value = false;
  }
}


</script>

<template>
  <div class="bg-(--bg-overlay) min-h-screen flex flex-col">
    <header class="h-15 bg-(--bg-overlay-accent)"></header>
    <main class="grow flex justify-center items-center p-4">
      <section class="w-111.75 bg-(--bg-main) rounded-[5px]">
        <header class="bg-(--bg-header) p-3.75 text-center rounded-t-[5px]">
          <h1 class="font-normal text-[17px] leading-5.25">Log In</h1>
        </header>
        <div class="px-6.25 pb-6.25">
          <p class="py-3.75 font-normal text-[15px] leading-5.25">Enter Username and Phone number to view todos</p>
          <form @submit.prevent="onSubmit">
            <div class="flex flex-col gap-5">
              <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  v-model="username"
                  @input="validateUsername"
                  :error="errors.username"
              />
              <Input
                  id="phone"
                  type="text"
                  placeholder="Phone Number"
                  v-model="phone"
                  @input="validatePhone"
                  :error="errors.phone"
              />
              <Button type="submit">Register</Button>
            </div>
          </form>
        </div>
      </section>
    </main>
    <footer class="h-67.5 bg-(--bg-overlay-accent)"></footer>
  </div>
</template>
