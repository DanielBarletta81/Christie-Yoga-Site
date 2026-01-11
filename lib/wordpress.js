



const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://somalivingwellness.com/wp-json/wp/v2';

export async function fetchWordPressContent(endpoint) {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}${endpoint}`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from WordPress: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('WordPress API Error:', error);
    return null;
  }
}

// Fetch posts
export async function fetchPosts(limit = 10) {
  return await fetchWordPressContent(`/posts?per_page=${limit}&_embed`);
}

// Fetch single post
export async function fetchPost(slug) {
  const posts = await fetchWordPressContent(`/posts?slug=${slug}&_embed`);
  return posts && posts.length > 0 ? posts[0] : null;
}

// Fetch pages
export async function fetchPages() {
  return await fetchWordPressContent('/pages?_embed');
}

// Fetch single page
export async function fetchPage(slug) {
  const pages = await fetchWordPressContent(`/pages?slug=${slug}&_embed`);
  return pages && pages.length > 0 ? pages[0] : null;
}

// Fetch media
export async function fetchMedia(id) {
  return await fetchWordPressContent(`/media/${id}`);
}

// Fetch categories
export async function fetchCategories() {
  return await fetchWordPressContent('/categories');
}

// Extract featured image URL from post
export function getFeaturedImage(post) {
  if (post._embedded && post._embedded['wp:featuredmedia']) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return null;
}

// Extract excerpt
export function getExcerpt(post, length = 150) {
  if (post.excerpt && post.excerpt.rendered) {
    const text = post.excerpt.rendered.replace(/<[^>]*>/g, '');
    return text.length > length ? text.substring(0, length) + '...' : text;
  }
  return '';
}
