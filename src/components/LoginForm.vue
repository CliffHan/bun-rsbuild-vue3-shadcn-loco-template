<script lang="ts">
export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."
export const containerClass = "w-full h-screen flex items-center justify-center px-4"
</script>

<script setup lang="ts">
import { ref, watch } from "vue"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-vue-next"

const props = defineProps<{
  email: string
  password: string
}>()

const emit = defineEmits<{
  "update:email": [value: string]
  "update:password": [value: string]
  "forgot-password": []
  submit: []
  "sign-up": []
}>()

const emailInput = ref(props.email)
const passwordInput = ref(props.password)
const showPassword = ref(false)

watch(emailInput, (value) => {
  emit("update:email", value)
})

watch(passwordInput, (value) => {
  emit("update:password", value)
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <Card class="mx-auto w-full max-w-md">
    <CardHeader>
      <CardTitle class="text-2xl">Login</CardTitle>
      <CardDescription>Enter your email below to login to your account</CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="emit('submit')" autocomplete="on">
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="m@example.com"
              required
              v-model="emailInput"
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <Button
                type="button"
                variant="link"
                class="ml-auto text-sm underline h-auto p-0 font-normal"
                @click="emit('forgot-password')"
              >
                Forgot your password?
              </Button>
            </div>
            <div class="relative">
              <Input
                id="password"
                name="current-password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                v-model="passwordInput"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                @click="togglePassword"
              >
                <EyeIcon v-if="showPassword" class="h-4 w-4" />
                <EyeOffIcon v-else class="h-4 w-4" />
                <span class="sr-only">
                  {{ showPassword ? "Hide password" : "Show password" }}
                </span>
              </Button>
            </div>
          </div>
          <Button type="submit" class="w-full">Login</Button>
        </div>
      </form>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <Button variant="link" class="px-1 underline h-auto p-0 font-normal" @click="emit('sign-up')">Sign up</Button>
      </div>
    </CardContent>
  </Card>
</template>
