<script setup>
import { onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { authApi } from "@/api/auth"
import { toast } from "vue-sonner"

const router = useRouter()
const route = useRoute()

onMounted(async () => {
  console.log("Verify::onMounted()")
  const token = route.query.token

  if (!token) {
    toast.error("Invalid verification link")
    router.replace("/login")
    return
  }

  try {
    await authApi.verify(token)
    toast.success("Email verified", {
      description: "You can now login with your account",
    })
    router.replace("/login")
  } catch (error) {
    console.error("Email verification failed:", error)
    toast.error("Verification failed", {
      description: error.message,
    })
    router.replace("/login")
  }
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="flex flex-col items-center gap-4">
      <div class="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
      <p class="text-sm text-muted-foreground">Verifying your email...</p>
    </div>
  </div>
</template>
