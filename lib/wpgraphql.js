const WP_GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

function getGraphQLEndpoint() {
  if (typeof window !== 'undefined') {
    return '/api/graphql';
  }
  return WP_GRAPHQL_URL;
}

if (!WP_GRAPHQL_URL) {
  // eslint-disable-next-line no-console
  console.warn('Missing NEXT_PUBLIC_WORDPRESS_API_URL');
}

export async function fetchGraphQL(
  query,
  { variables, revalidate, tags, cache, headers } = {}
) {
  const endpoint = getGraphQLEndpoint();
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(headers || {}) },
    body: JSON.stringify({ query, variables }),
    ...(cache ? { cache } : {}),
    ...(revalidate || tags ? { next: { revalidate, tags } } : {}),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WPGraphQL error ${res.status}: ${text}`);
  }

  const payload = await res.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((err) => err.message).join('; '));
  }

  return payload.data;
}

function getPreviewAuthHeaders() {
  const raw = process.env.WP_PREVIEW_BASIC_AUTH;
  if (!raw) return null;

  if (typeof window === 'undefined') {
    return { Authorization: `Basic ${Buffer.from(raw).toString('base64')}` };
  }

  if (typeof btoa === 'function') {
    return { Authorization: `Basic ${btoa(raw)}` };
  }

  return null;
}

export async function fetchGraphQLPreview(query, { variables } = {}) {
  const headers = getPreviewAuthHeaders();
  if (!headers) {
    throw new Error('Missing WP_PREVIEW_BASIC_AUTH for preview requests.');
  }

  return fetchGraphQL(query, {
    variables,
    cache: 'no-store',
    headers,
  });
}

export const GET_ALL_SOUNDS = `#graphql
  query GetAllSounds {
    sounds {
      nodes {
        id
        title
        soundDetails {
          frequencyHz
          frequencyCopy
          audioUrl
          colorHex
        }
      }
    }
  }
`;

export const GET_CHAKRA_SUGGESTION = `#graphql
  query GetChakraSuggestion($slug: ID!) {
    chakra(id: $slug, idType: SLUG) {
      title
      slug
      suggestedSounds {
        nodes {
          frequencyHz
          audioUrl
          colorHex
        }
      }
    }
  }
`;

export const GET_RITUAL_TRAY = `#graphql
  query GetRitualTray($chakraSlug: String) {
    rituals(where: { metaQuery: { key: "is_active", value: "1" } }) {
      nodes {
        id
        title
        ritualDetails {
          ritualLabel
        }
        supportsChakra {
          nodes {
            slug
          }
        }
        supportsDosha {
          nodes {
            slug
          }
        }
      }
    }
  }
`;

export const GET_ALL_CHAKRAS = `#graphql
  query GetAllChakras {
    chakras {
      nodes {
        id
        title
        slug
        chakraFields {
          order
          themeColor
          shortDescription
          isActive
          element
          themes {
            label
          }
          imbalances {
            label
          }
          practices {
            label
          }
          mantra
          sanskrit
          governs {
            label
          }
          tone
          image {
            sourceUrl
          }
          suggestedSounds {
            nodes {
              id
              slug
            }
          }
        }
      }
    }
  }
`;

export const GET_PRACTICES = `#graphql
  query GetPractices($first: Int = 30) {
    practices(first: $first) {
      nodes {
        id
        title
        practiceDetails {
          instructor
          difficulty
          props
          sequenceNotes
        }
        somaContentCore {
          summary
        }
      }
    }
  }
`;
