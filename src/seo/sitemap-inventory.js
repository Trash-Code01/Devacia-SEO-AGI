const isoDate = value => {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(+date) ? undefined : date.toISOString();
};
export function normalizeSitemapInventory(rawCategories, rawPosts) {
  const posts = rawPosts.filter(post => post.status === 'published' && post.category && post.slug).map(post => ({
    category: post.category, slug: post.slug,
    categories: [...new Set([post.category, ...(Array.isArray(post.categories) ? post.categories : [])])],
    updatedAt: isoDate(post.updatedAt), publishedAt: isoDate(post.publishedAt),
  }));
  const categories = rawCategories.filter(category => category.isPublished !== false && category.slug && posts.some(post => post.categories.includes(category.slug))).map(category => ({ slug: category.slug }));
  return { categories, posts };
}
