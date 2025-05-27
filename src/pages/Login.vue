<script setup>
import LoginForm from "@/components/views/LoginForm.vue"
import { ref, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { authApi } from "@/api/auth"
import { useAuthStore } from "@/stores/auth"
import { toast } from "vue-sonner"

const router = useRouter()
const route = useRoute()
const email = ref("")
const password = ref("")

// 处理 magic link 登录
const handleMagicLink = async (token) => {
  try {
    const result = await authApi.verifyMagicLink(token)
    const authStore = useAuthStore()
    authStore.setUser(result)
    const redirect = route.query.redirect || "/"
    router.push(redirect)
    toast.success("Login successful")
  } catch (error) {
    console.error("Magic link verification failed:", error)
    toast.error("Login failed", {
      description: "Invalid or expired magic link",
    })
  }
}

// 检查 URL 参数
onMounted(() => {
  const { token, type } = route.query
  if (token && type === "magic") {
    handleMagicLink(token)
  }
})

const handleSubmit = async () => {
  const user = { email: email.value, password: password.value }
  // 处理登录逻辑
  try {
    const result = await authApi.login(user, true)
    console.log("Login succeeded, result=", result)
    const authStore = useAuthStore()
    authStore.setUser(result)
    const redirect = route.query.redirect || "/"
    router.push(redirect)
  } catch (error) {
    console.error("Login failed:", error)
    toast.error("Login failed", {
      description: error.message,
    })
  }
}

const handleForgotPassword = () => {
  router.push("/forgot-password")
}

const handleSignUp = () => {
  router.push("/register")
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <LoginForm
      v-model:email="email"
      v-model:password="password"
      @submit="handleSubmit"
      @forgot-password="handleForgotPassword"
      @sign-up="handleSignUp"
    />
  </div>
</template>
