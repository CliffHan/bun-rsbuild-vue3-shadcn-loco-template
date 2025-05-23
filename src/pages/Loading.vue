<script setup>
import { onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import { authApi } from "@/api/auth"

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

onMounted(async () => {
  console.log("Loading::onMounted()")
  const redirect = route.query.redirect || "/"

  try {
    const user = await authApi.getCurrentUser()
    console.log("Current user:", user)
    authStore.setUser(user)
    router.replace(redirect)
  } catch (error) {
    console.log("Loading::onMounted(), error")
    // token 无效或过期，清理并跳转到登录
    authStore.logout()
    router.replace({
      name: "login",
      query: { redirect },
    })
  }
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="flex flex-col items-center gap-4">
      <div class="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
      <p class="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
</template>
