/** Site-wide constants — metadata, sitemap, robots, structured data, feed. */

export const siteUrl = 'https://adamsulemanji.com';

export const siteName = 'Adam Sulemanji';

export const siteDescription =
  'Adam Sulemanji — Software Engineer at Amazon in Seattle. Writing, projects, and the occasional over-engineered side project.';

/** Absolute URL for a site-relative path, e.g. `abs('/writing/x/')`. */
export function abs(path: string) {
  return new URL(path, siteUrl).toString();
}
