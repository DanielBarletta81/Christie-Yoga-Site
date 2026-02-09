# Soma Living Wellness App MVP (Expo, iOS First)

## Goals
- Deliver a premium, calming wellness app that mirrors the website experience.
- Reuse existing WordPress content via WPGraphQL.
- Support accounts, favorites, offline usage, push reminders, and basic analytics.

## Tech Stack
- Expo + React Native + TypeScript
- React Navigation
- TanStack Query (React Query)
- SecureStore for auth tokens
- Expo Push Notifications
- Analytics: Firebase or Segment (TBD)

## Core Screens
1. Home (featured rituals, highlights, daily focus)
2. Yoga (pose library + flows)
3. Chakras (chakra explorer + ritual guidance)
4. Sound Bowl (player + playlists)
5. Favorites (saved content)
6. Settings (account, reminders, preferences)

## Authentication
- Preferred: WordPress JWT plugin (token-based auth)
- Fallback: Application Passwords (read-only content + limited personalization)
- Store tokens in SecureStore

## Data Layer
- WPGraphQL for content lists and detail screens
- New endpoints for:
  - favorites (CRUD)
  - push token registration
- Rate limiting + auth validation at the API layer

## Offline Strategy
- Cache last N items per section
- Allow offline playback for last used audio if available
- Graceful UI to indicate offline mode

## Push Notifications
- Daily ritual reminder
- User-configured time
- Store tokens server-side

## Analytics
- Track: app opens, content views, favorites, audio play starts
- No PII events without consent

## MVP Acceptance Criteria
- iOS app builds and runs with real WPGraphQL content
- Login works
- Favorites persist across sessions
- Push notification delivered to test device
- Offline mode loads cached content
