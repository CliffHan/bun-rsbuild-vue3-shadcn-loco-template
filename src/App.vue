<template>
  <Toaster />
  <RouterView />
</template>

<script setup>
import { onMounted, onUnmounted } from "vue"
import { emitter, AuthEvents } from "@/lib/events"
import { toast } from "vue-sonner"
import { Toaster } from "@/components/ui/sonner"
import "vue-sonner/style.css"

onMounted(() => {
  console.log("App mounted")
  emitter.on(AuthEvents.UNAUTHORIZED, () => {
    toast.error("Authentication failed", {
      description: "If the problem persists, please logout & log in again.",
    })
  })

  emitter.on(AuthEvents.FORBIDDEN, () => {
    toast.error("Access denied", {
      description: "You don't have permission to access this resource.",
    })
  })
})

onUnmounted(() => {
  emitter.off(AuthEvents.UNAUTHORIZED)
  emitter.off(AuthEvents.FORBIDDEN)
})
</script>
