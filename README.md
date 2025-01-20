# Unlock horrible

See it in action at [https://unlock.horrible.workers.dev](https://unlock.horrible.workers.dev).

Small example of implementing passkeys using durable objects. This uses the `@passwordless-id/webauthn` package that does all the heavy lifting that has to do with passkeys.

## Register flow

- Get challenge from `/auth/challenge`
- Create local passkey with challenge
- Send registration to `/auth/register`

## Unlock flow

- Get challenge from `/auth/challenge`
- Authenticate with local passkey with challenge
- Send verification to `/auth/verify`
