<script lang="ts">
export const description = "A forgot password form with email input. Users can request a password reset link."
export const containerClass = "w-full h-screen flex items-center justify-center px-4"
</script>

<script setup lang="ts">
import { ref, watch } from "vue"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const props = defineProps<{
  email: string
}>()

const emit = defineEmits<{
  "update:email": [value: string]
  "reset-password": []
  "magic-link": []
  "back-to-login": []
}>()

const emailInput = ref(props.email)
const activeTab = ref("reset")

watch(emailInput, (value) => {
  emit("update:email", value)
})
</script>

<template>
  <Card class="mx-auto w-full max-w-md">
    <CardHeader>
      <CardTitle class="text-2xl">Forgot Password</CardTitle>
      <CardDescription>Choose how you want to recover your account access.</CardDescription>
    </CardHeader>
    <CardContent>
      <Tabs v-model="activeTab" class="w-full">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="reset">Reset Password</TabsTrigger>
          <TabsTrigger value="magic">Magic Link</TabsTrigger>
        </TabsList>
        <TabsContent value="reset">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email-reset">Email</Label>
              <Input
                id="email-reset"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="m@example.com"
                required
                v-model="emailInput"
              />
            </div>
            <Button @click="emit('reset-password')">Send Reset Link</Button>
          </div>
          <CardDescription class="mt-2">We'll send you a link to reset your password.</CardDescription>
        </TabsContent>
        <TabsContent value="magic">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email-magic">Email</Label>
              <Input
                id="email-magic"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="m@example.com"
                required
                v-model="emailInput"
              />
            </div>
            <Button @click="emit('magic-link')">Send Magic Link</Button>
          </div>
          <CardDescription class="mt-2">We'll send you a link to sign in without a password.</CardDescription>
        </TabsContent>
      </Tabs>
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
