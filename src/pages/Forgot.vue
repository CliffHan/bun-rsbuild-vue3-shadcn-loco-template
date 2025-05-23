<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { authApi } from "@/api/auth"
import { toast } from "vue-sonner"
import ForgotForm from "@/components/ForgotForm.vue"

const router = useRouter()
const email = ref("")

const handleResetPassword = async () => {
  try {
    await authApi.forgotPassword({ email: email.value })
    toast.success("Reset link sent", {
      description: "Please check your email for the password reset link.",
    })
  } catch (error) {
    console.error("Password reset request failed:", error)
    toast.error("Request failed", {
      description: error.message,
    })
  }
}

const handleMagicLink = async () => {
  try {
    await authApi.requestMagicLink({ email: email.value })
    toast.success("Magic link sent", {
      description: "Please check your email for the magic sign-in link.",
    })
  } catch (error) {
    console.error("Magic link request failed:", error)
    toast.error("Request failed", {
      description: error.message,
    })
  }
}

const handleBackToLogin = () => {
  router.push("/login")
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <ForgotForm
      v-model:email="email"
      @reset-password="handleResetPassword"
      @magic-link="handleMagicLink"
      @back-to-login="handleBackToLogin"
    />
  </div>
</template>
