# Copilot / AI Agent Instructions

Purpose: provide concise, actionable guidance so an AI coding agent can be productive immediately in this Next.js portfolio site.

1) Project overview
- Framework: Next.js (hybrid static) + React. Entry points: `pages/` (SSG via `getStaticProps` / `getStaticPaths`).
- Content: Markdown posts live in `content/blog/*.md` and are transformed by `lib/posts.js` (uses `gray-matter` + `remark` -> `remark-html`).
- Styling: TailwindCSS configured in `tailwind.config.js`. A custom color key `solana-green` is defined.
- Hosting/observability: Vercel analytics and `@vercel/speed-insights` are integrated in `_app.js` and `package.json` deps.

2) Key workflows & commands
- Local dev: `npm run dev` (Next dev server).
- Build: `npm run build` then `npm run start` for production.
- Lint: `npm run lint` (uses Next/Eslint config).
- There are no automated tests in the repo.

3) Important files to inspect (quick map)
- `pages/index.js` — main homepage, imports `components/*`.
- `pages/blog/index.js` — blog listing; calls `getSortedPostsData()` from `lib/posts.js` at build time.
- `pages/blog/[slug].js` — blog post page; uses `getStaticPaths/getStaticProps` and renders `postData.contentHtml` via `dangerouslySetInnerHTML`.
- `lib/posts.js` — canonical place to handle markdown: parsing frontmatter, generating `excerpt`, converting markdown to HTML.
- `components/` — UI components (Header/Footer/Hero/Contact, all default-exported React functional components in JSX).
- `styles/globals.css` — global Tailwind import + `article-custom` rules used on blog posts.
- `public/sitemap.xml` — static sitemap served; note `_app.js` explicitly returns `null` for `/sitemap.xml` requests.

4) Conventions and patterns to follow
- Blog posts: each file in `content/blog` is named `slug.md` and must include frontmatter (`title`, `date`, `author`, optional `keywords`, `excerpt`). `lib/posts.js` will trim/produce an excerpt automatically (first ~200 chars) if not provided.
- Data flow: markdown -> `gray-matter` (frontmatter + content) -> `remark` -> `remark-html` -> injected into React via `dangerouslySetInnerHTML` in `pages/blog/[slug].js`.
- Routing: the codebase uses raw `<a href="...">` anchors for internal navigation (not `next/link`). Keep this pattern unless there is a clear reason to convert to `Link`.
- Styling: utility-first Tailwind classes everywhere. Use the `article-custom` CSS class for blog article spacing and heading styles (already referenced in `pages/blog/[slug].js`).
- SEO/Meta: pages set `<Head>` tags inline (see `pages/index.js` and blog post header). When editing titles/descriptions prefer updating those files directly.

5) What to change and how (examples)
- Add a new blog post: create `content/blog/your-new-post.md` with frontmatter and markdown body. No code changes required — Next.js SSG will include it on build.
- Modify markdown rendering: update `lib/posts.js` (it centralizes markdown -> HTML). Example: to add MDX support, update `lib/posts.js` and the build pipeline accordingly.
- Add a component: place a new file in `components/` as a default-exported React function (JSX). Import it in pages using relative paths (e.g., `import MyComp from '../components/MyComp'`).

6) Project-specific gotchas / notes
- `pages/_app.js` includes a guard: it returns `null` for requests to `/sitemap.xml`. Do not remove this unless you understand why the sitemap is served statically from `public/`.
- `tailwind.config.js` registers `./pages`, `./components`, and `./app` directories in `content` — if you add a new folder with JSX/TSX files, update this config.
- The project uses `remark` + `remark-html` (not MDX). Introducing MDX will require dependency and runtime changes.
- The color name `solana-green` maps to `#9945FF` in `tailwind.config.js` (it's actually a purple-like hex). Use that key if following existing theme.
- Internal links use simple anchors; search-and-replace to `next/link` is a safe refactor but may need QA for behavior with hash anchors (`/#expertise`).

7) Examples of code references
- Markdown parsing: `lib/posts.js` (see `getSortedPostsData`, `getPostData`, `getAllPostSlugs`).
- Blog listing: `pages/blog/index.js` (uses `getStaticProps`).
- Blog post renderer: `pages/blog/[slug].js` (calls `getStaticPaths` / `getStaticProps`, renders `contentHtml` in an `article` with `article-custom`).

8) How to run safety-preserving edits
- Make small, focused changes and run `npm run dev` to verify local behavior.
- When changing markdown parsing or HTML insertion, inspect rendered output in browser for XSS risks (the project intentionally uses `dangerouslySetInnerHTML`). Keep transformations limited to trusted/controlled markdown sources.

If anything above is unclear or you want the doc to include more examples (e.g., sample PR template, branch naming, or adding MDX), tell me which area to expand and I will iterate.
