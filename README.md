# Bun-Rsbuild-Vue3-Shadcn-Loco-Template

A template works as frontend with [loco.rs](https://loco.rs). Supports loco's `SaaS app with client side rendering`.

## How to use

```
bun install
bun run dev
```

## Changes to be done in loco.rs backend project

To make this frontend fully works with loco.rs generated Saas project, you'll need to:

1. update url template in mail template.

For magic link in `src/mailers/auth/magic_link`: Change to `"{{host}}/login?token={{token}}&type=magic"`

For reset password link in `src/mailers/auth/forgot`: Change to `"{{domain}}/reset-password?token={{resetToken}}"`

For welcome mail in `src/mailers/auth/welcome`: Change to `"{{domain}}/verify?token={{verifyToken}}"`
