<script setup lang="ts">
import { ref, watch } from "vue"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-vue-next"

const props = defineProps<{
  password: string
}>()

const emit = defineEmits<{
  "update:password": [value: string]
  submit: []
  "back-to-login": []
}>()

const passwordInput = ref(props.password)
const confirmPassword = ref("")
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errorMessage = ref("")

watch(passwordInput, (value) => {
  emit("update:password", value)
  validatePasswords()
})

watch(confirmPassword, () => {
  validatePasswords()
})

const validatePasswords = () => {
  if (confirmPassword.value && passwordInput.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match"
    return false
  }
  errorMessage.value = ""
  return true
}

const handleSubmit = (e: Event) => {
  e.preventDefault()
  if (validatePasswords()) {
    emit("submit")
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}
</script>

<template>
  <Card class="mx-auto w-full max-w-md">
    <CardHeader>
      <CardTitle class="text-2xl">Reset Password</CardTitle>
      <CardDescription>Enter your new password below</CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="handleSubmit" autocomplete="off">
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="password">New Password</Label>
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

          <div class="grid gap-2">
            <Label for="confirm-password">Confirm Password</Label>
            <div class="relative">
              <Input
                id="confirm-password"
                name="confirm-password"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                v-model="confirmPassword"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                @click="toggleConfirmPassword"
              >
                <EyeIcon v-if="showConfirmPassword" class="h-4 w-4" />
                <EyeOffIcon v-else class="h-4 w-4" />
                <span class="sr-only">
                  {{ showConfirmPassword ? "Hide password" : "Show password" }}
                </span>
              </Button>
            </div>
          </div>

          <p v-if="errorMessage" class="text-sm text-destructive">
            {{ errorMessage }}
          </p>

          <Button type="submit" class="w-full" :disabled="!!errorMessage || !passwordInput || !confirmPassword">
            Reset Password
          </Button>
        </div>
      </form>
      <div class="mt-4 text-center text-sm">
        Remember your password?
        <Button
          type="button"
          variant="link"
          class="px-1 underline h-auto p-0 font-normal"
          @click="emit('back-to-login')"
        >
          Back to login
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
