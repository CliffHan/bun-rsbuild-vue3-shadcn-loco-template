<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import RegisterForm from "@/components/views/RegisterForm.vue"
import { authApi } from "@/api/auth"
import { toast } from "vue-sonner"

const router = useRouter()
const email = ref("")
const name = ref("")
const password = ref("")

const handleSubmit = async () => {
  const user = {
    email: email.value,
    name: name.value,
    password: password.value,
  }
  // 处理注册逻辑
  try {
    await authApi.register(user)
    // 后端正常运行时，注册总会成功
    router.push("/login")
  } catch (error) {
    console.error("Registration failed:", error)
    toast.error("Registration failed", {
      description: error.message,
    })
  }
}

const handleSignIn = () => {
  router.push("/login")
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <RegisterForm
      v-model:email="email"
      v-model:name="name"
      v-model:password="password"
      @submit="handleSubmit"
      @sign-in="handleSignIn"
    />
  </div>
</template>
