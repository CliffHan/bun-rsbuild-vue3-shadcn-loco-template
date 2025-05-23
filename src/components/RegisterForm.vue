<script lang="ts">
export const description =
  "A sign up form with email, name and password inside a card. There's a link to login if you already have an account"
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
  name: string
  password: string
}>()

const emit = defineEmits<{
  "update:email": [value: string]
  "update:name": [value: string]
  "update:password": [value: string]
  submit: []
  "sign-in": []
}>()

// 使用 ref 来跟踪输入值
const emailInput = ref(props.email)
const nameInput = ref(props.name)
const passwordInput = ref(props.password)

// 监听输入值的变化
watch(emailInput, (value) => {
  emit("update:email", value)
})

watch(nameInput, (value) => {
  emit("update:name", value)
})

watch(passwordInput, (value) => {
  emit("update:password", value)
})

const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <Card class="mx-auto w-full max-w-md">
    <CardHeader>
      <CardTitle class="text-xl">Sign Up</CardTitle>
      <CardDescription>Enter your information to create an account</CardDescription>
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
            <Label for="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              placeholder="Your Name"
              required
              v-model="nameInput"
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <div class="relative">
              <Input
                id="password"
                name="new-password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
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
          <Button type="submit" class="w-full">Create an account</Button>
        </div>
      </form>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <Button variant="link" class="px-1 underline h-auto p-0 font-normal" @click="emit('sign-in')">Sign in</Button>
      </div>
    </CardContent>
  </Card>
</template>
