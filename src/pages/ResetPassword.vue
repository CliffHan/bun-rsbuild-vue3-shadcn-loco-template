<script setup>
import { ref, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { authApi } from "@/api/auth"
import { toast } from "vue-sonner"
import ResetPasswordForm from "@/components/views/ResetPasswordForm.vue"

const router = useRouter()
const route = useRoute()
const password = ref("")

const handleSubmit = async () => {
  const token = route.query.token
  if (!token) {
    toast.error("Invalid reset link")
    router.push("/login")
    return
  }

  try {
    await authApi.resetPassword({ token, password: password.value })
    toast.success("Password reset successful", {
      description: "Please login with your new password",
    })
    router.push("/login")
  } catch (error) {
    console.error("Password reset failed:", error)
    toast.error("Reset failed", {
      description: error.message,
    })
  }
}

const handleBackToLogin = () => {
  router.push("/login")
}

onMounted(() => {
  const token = route.query.token
  if (!token) {
    toast.error("Invalid reset link")
    router.push("/login")
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <ResetPasswordForm v-model:password="password" @submit="handleSubmit" @back-to-login="handleBackToLogin" />
  </div>
</template>
