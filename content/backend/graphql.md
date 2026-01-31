# WPGraphQL Fragments + Example Queries

Use these fragments as a shared base for Next.js queries. They match the CPTs and ACF groups defined in `content/backend/wpgraphql-schema.md`.

## Fragments

```graphql
fragment SomaContentCoreFields on SomaContentCore {
  summary
  durationMinutes
  mediaType
  mediaUrl
  heroImage {
    sourceUrl
    altText
  }
  ctaLabel
  ctaUrl
  isFreeWeekly
  freeWindowStart
  freeWindowEnd
  paidAfterWindow
}
```

```graphql
fragment ChakraTaxonomyFields on Chakra {
  name
  slug
}
```

```graphql
fragment DoshaTaxonomyFields on Dosha {
  name
  slug
}
```

```graphql
fragment RitualDetailsFields on RitualDetails {
  ritualLabel
  ritualSteps {
    stepTitle
    stepBody
  }
}
```

```graphql
fragment SoundDetailsFields on SoundDetails {
  frequencyHz
  frequencyCopy
  audioUrl
  colorHex
  loopable
}
```

```graphql
fragment GuideDetailsFields on GuideDetails {
  sections {
    sectionTitle
    sectionBody
  }
  citations {
    citationLabel
    citationUrl
  }
}
```

```graphql
fragment RecipeDetailsFields on RecipeDetails {
  prepTime
  cookTime
  servings
  ingredients {
    ingredient
  }
  instructions {
    instruction
  }
}
```

## Example Queries

### Sounds (Sound Bowls)

```graphql
query SoundBowls($first: Int = 20) {
  sounds(first: $first) {
    nodes {
      id
      title
      soundDetails {
        ...SoundDetailsFields
      }
    }
  }
}
```

### Ritual Library

```graphql
query Rituals($first: Int = 50) {
  rituals(first: $first) {
    nodes {
      id
      title
      somaContentCore {
        ...SomaContentCoreFields
      }
      ritualDetails {
        ...RitualDetailsFields
      }
      supportsChakra {
        nodes {
          ...ChakraTaxonomyFields
        }
      }
      supportsDosha {
        nodes {
          ...DoshaTaxonomyFields
        }
      }
    }
  }
}
```

### Practices (Yoga/Breath/Meditation)

```graphql
query Practices($first: Int = 30) {
  practices(first: $first) {
    nodes {
      id
      title
      somaContentCore {
        ...SomaContentCoreFields
      }
      practiceDetails {
        instructor
        difficulty
        props
        sequenceNotes
      }
      supportsChakra {
        nodes {
          ...ChakraTaxonomyFields
        }
      }
      supportsDosha {
        nodes {
          ...DoshaTaxonomyFields
        }
      }
    }
  }
}
```

### Guides

```graphql
query Guides($first: Int = 20) {
  guides(first: $first) {
    nodes {
      id
      title
      somaContentCore {
        ...SomaContentCoreFields
      }
      guideDetails {
        ...GuideDetailsFields
      }
    }
  }
}
```

### Recipes

```graphql
query Recipes($first: Int = 20) {
  recipes(first: $first) {
    nodes {
      id
      title
      somaContentCore {
        ...SomaContentCoreFields
      }
      recipeDetails {
        ...RecipeDetailsFields
      }
    }
  }
}
```
