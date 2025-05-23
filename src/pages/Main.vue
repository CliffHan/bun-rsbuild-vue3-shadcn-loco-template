<template>
  <div class="content">
    <h1>Rsbuild with Vue</h1>
    <p>Start building amazing things with Rsbuild.</p>
    <h1 class="text-3xl font-bold underline">Hello Tailwind v4!</h1>
    <Button class="mx-auto" variant="destructive" @click="handleLogout">Logout</Button>
  </div>
</template>

<script setup>
import { Button } from "@/components/ui/button"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"

const router = useRouter()
const authStore = useAuthStore()
// import { useColorMode } from "@vueuse/core"
// const mode = useColorMode()
// mode.value = "dark"

const handleLogout = () => {
  authStore.logout()
  router.push("/login")
}
</script>

<style scoped>
.content {
  display: flex;
  min-height: 100vh;
  line-height: 1.1;
  text-align: center;
  flex-direction: column;
  justify-content: center;
}

.content h1 {
  font-size: 3.6rem;
  font-weight: 700;
}

.content p {
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.5;
}
</style>
