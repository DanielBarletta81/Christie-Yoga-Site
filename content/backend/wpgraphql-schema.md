# Soma Backend Schema (WPGraphQL + ACF)

This is a pragmatic starter schema for a WordPress + WPGraphQL backend. It keeps content modular, cleanly typed, and easy to query from Next.js.

## Custom Post Types (CPTs)

1) **ritual**
- Purpose: Short, 2–10 minute actions (chips)

2) **practice**
- Purpose: Yoga, breathwork, meditation, movement sessions

3) **sound**
- Purpose: Sound bowl / audio experiences

4) **guide**
- Purpose: Long-form explanations / educational content

5) **recipe**
- Purpose: Ayurvedic food / nourishment

6) **blog** (optional)
- Purpose: Editorial content

---

## Taxonomies

- **chakra** (root, sacral, solar, heart, throat, third-eye, crown)
- **dosha** (vata, pitta, kapha)
- **season** (late-winter, spring, summer, late-summer, autumn, early-winter)
- **intention** (calm, grounding, clarity, sleep, energy, digestion, reset)
- **duration** (short, medium, long) — optional, can be derived from minutes
- **format** (audio, video, text) — optional if stored in ACF field

---

## Core ACF Field Group (shared across CPTs)

**Group:** `Soma Content Core`

- `summary` (Text)
- `duration_minutes` (Number)
- `media_type` (Select: audio | video | text)
- `media_url` (URL)
- `hero_image` (Image)
- `cta_label` (Text, optional)
- `cta_url` (URL, optional)
- `is_free_weekly` (True/False)
- `free_window_start` (DateTime)
- `free_window_end` (DateTime)
- `paid_after_window` (True/False)

---

## Ritual ACF Field Group (ritual CPT)

**Group:** `Ritual Details`

- `ritual_label` (Text) — short label for chip
- `ritual_steps` (Repeater)
  - `step_title` (Text)
  - `step_body` (Textarea)
- `supports_chakra` (Taxonomy: chakra)
- `supports_dosha` (Taxonomy: dosha)
- `biases` (Select: vata | pitta | kapha) — optional

---

## Practice ACF Field Group (practice CPT)

**Group:** `Practice Details`

- `instructor` (Text)
- `difficulty` (Select: gentle | steady | strong)
- `props` (Text)
- `sequence_notes` (Textarea)

---

## Sound ACF Field Group (sound CPT)

**Group:** `Sound Details`

- `frequency_hz` (Number)
- `frequency_copy` (Text)
- `audio_url` (URL)
- `loopable` (True/False)

---

## Guide ACF Field Group (guide CPT)

**Group:** `Guide Details`

- `sections` (Repeater)
  - `section_title` (Text)
  - `section_body` (Textarea)
- `citations` (Repeater)
  - `citation_label` (Text)
  - `citation_url` (URL)

---

## Recipe ACF Field Group (recipe CPT)

**Group:** `Recipe Details`

- `prep_time` (Text)
- `cook_time` (Text)
- `ingredients` (Repeater)
  - `ingredient` (Text)
- `instructions` (Repeater)
  - `instruction` (Textarea)
- `servings` (Text)

---

## WPGraphQL Notes

- Enable **Show in GraphQL** for each CPT and taxonomy.
- Prefer **single source of truth** in ACF (avoid duplicated fields in post content unless needed).
- Use GraphQL fragments for `Soma Content Core` fields across content types.

---

## Suggested GraphQL Query Shape (example)

```graphql
query Rituals {
  rituals {
    nodes {
      id
      title
      summary
      durationMinutes
      mediaType
      mediaUrl
      supportsChakra { nodes { name slug } }
      supportsDosha { nodes { name slug } }
    }
  }
}
```
