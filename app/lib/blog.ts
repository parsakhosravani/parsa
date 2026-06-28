// Blog content for Parsa Khosravani's portfolio.
// Posts are authored as structured content blocks so they can be rendered
// consistently with the site's design system (no external MDX dependency).

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; lang: string; code: string };

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readingMinutes: number;
  tags: string[];
  accent: string;
  content: ContentBlock[];
}

export const blogIntro = {
  heading: "Writing",
  subtitle:
    "Notes from the trenches of frontend engineering — performance, architecture, and the framework trade-offs I have lived through across React, Vue, and Angular.",
};

export const posts: BlogPost[] = [
  {
    slug: "stop-fighting-react-rerenders",
    title: "Stop Fighting Re-renders: A Pragmatic Guide to React Performance",
    description:
      "memo, useMemo, and useCallback are not magic. Here is the mental model I use to decide when they actually help — and when they just add noise.",
    date: "2025-11-18",
    readingMinutes: 9,
    tags: ["React", "Performance", "Hooks"],
    accent: "#06b6d4",
    content: [
      {
        type: "p",
        text: "Every React codebase I have joined eventually accumulates a layer of `useMemo` and `useCallback` calls that nobody can explain. They were added during a performance scare, they never got removed, and now they are just ambient anxiety in the diff. Let me share the model I use to keep this under control.",
      },
      {
        type: "h2",
        text: "First, understand what a re-render actually costs",
      },
      {
        type: "p",
        text: "A re-render is React calling your component function again and diffing the result against the previous tree. For most components this is cheap — a few microseconds. The expensive part is almost never the render itself; it is one of three things: a genuinely heavy computation in the render path, a large subtree re-rendering when it did not need to, or an effect firing more often than it should.",
      },
      {
        type: "p",
        text: "So before reaching for memoization, profile. The React DevTools Profiler will tell you which components render and how long they take. If a component renders in 0.3ms, wrapping it in `React.memo` buys you nothing and costs you a comparison on every render.",
      },
      {
        type: "h2",
        text: "The reference-equality trap",
      },
      {
        type: "p",
        text: "The real reason re-renders bite you is reference equality. Every render creates new object and function literals, and any child that depends on those references will re-render or re-run effects. Consider this innocent-looking component:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `function Dashboard({ userId }: { userId: string }) {
  // New object every render — breaks memoized children downstream.
  const filters = { userId, status: "active" };

  return <ExpensiveList filters={filters} />;
}`,
      },
      {
        type: "p",
        text: "Even if `ExpensiveList` is wrapped in `React.memo`, it re-renders every time `Dashboard` does, because `filters` is a brand new object each time. This is where `useMemo` earns its keep:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `function Dashboard({ userId }: { userId: string }) {
  const filters = useMemo(
    () => ({ userId, status: "active" }),
    [userId],
  );

  return <ExpensiveList filters={filters} />;
}`,
      },
      {
        type: "p",
        text: "Now `filters` keeps a stable reference until `userId` changes. The memo is not about the cost of creating the object — that is trivial — it is about preserving identity so the memoized child can bail out.",
      },
      {
        type: "h2",
        text: "useCallback follows the same rule",
      },
      {
        type: "p",
        text: "`useCallback` is just `useMemo` for functions. It matters only when the function is passed to a memoized child or used as a dependency of another hook. A callback passed straight to a native `<button onClick>` does not need it — the DOM does not care about reference identity.",
      },
      {
        type: "code",
        lang: "tsx",
        code: `// Pointless: the button re-renders with the parent anyway.
const onClick = useCallback(() => setOpen(true), []);
return <button onClick={onClick}>Open</button>;

// Worth it: handler flows into a memoized, expensive child.
const onSelect = useCallback(
  (id: string) => dispatch({ type: "select", id }),
  [dispatch],
);
return <VirtualizedTable onSelect={onSelect} />;`,
      },
      {
        type: "h2",
        text: "A decision checklist",
      },
      {
        type: "ol",
        items: [
          "Is there a measured performance problem? If not, stop here.",
          "Is the cost in computation or in re-rendering a subtree? Profile to find out.",
          "If computation: memoize the value with `useMemo` and a precise dependency array.",
          "If subtree re-renders: wrap the child in `React.memo`, then stabilize the props feeding it with `useMemo`/`useCallback`.",
          "Re-profile. If the numbers did not move, revert the change — dead memoization is a liability, not a safety net.",
        ],
      },
      {
        type: "h2",
        text: "The structural fix you should reach for first",
      },
      {
        type: "p",
        text: "Before any memoization, ask whether you can move state down or lift content up. The cheapest re-render is the one that never happens. If a piece of state only affects a small part of the tree, colocate it there. If a large static subtree sits inside a frequently-updating parent, pass it as `children` so it keeps its identity:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `function Ticker({ children }: { children: React.ReactNode }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <span>{tick}</span>
      {children /* does NOT re-render when tick changes */}
    </div>
  );
}`,
      },
      {
        type: "quote",
        text: "Memoization is a tool for preserving identity, not a substitute for good component boundaries. Get the structure right and you will reach for it far less often.",
      },
      {
        type: "p",
        text: "The React 19 compiler is starting to automate a lot of this, and that is genuinely exciting — but the mental model still matters. Understanding why a re-render happens will always beat sprinkling hooks until the profiler turns green.",
      },
    ],
  },
  {
    slug: "composables-that-scale-vue-3",
    title: "Composables That Scale: Reusable Logic in Vue 3",
    description:
      "The Composition API gives you freedom — and the freedom to make a mess. Here are the conventions I use to keep composables predictable as a codebase grows.",
    date: "2025-09-30",
    readingMinutes: 8,
    tags: ["Vue", "Composition API", "Architecture"],
    accent: "#10b981",
    content: [
      {
        type: "p",
        text: "When I led the move to Vue 3 at Khanoumi, the Composition API was the feature everyone was excited about and nobody had conventions for. Six months in, we had composables that returned refs, composables that mutated shared state, and composables that quietly started intervals you could never clean up. Here is what we standardized on.",
      },
      {
        type: "h2",
        text: "A composable is a function, not a mixin",
      },
      {
        type: "p",
        text: "The whole point of moving off mixins is explicitness. A composable should take inputs as arguments and return everything it exposes. No implicit `this`, no merged option soup. The shape I insist on:",
      },
      {
        type: "code",
        lang: "ts",
        code: `import { ref, onUnmounted } from "vue";

export function useInterval(callback: () => void, delayMs: number) {
  const isRunning = ref(false);
  let id: ReturnType<typeof setInterval> | null = null;

  function start() {
    if (id !== null) return;
    isRunning.value = true;
    id = setInterval(callback, delayMs);
  }

  function stop() {
    if (id === null) return;
    clearInterval(id);
    id = null;
    isRunning.value = false;
  }

  // Always clean up after yourself.
  onUnmounted(stop);

  return { isRunning, start, stop };
}`,
      },
      {
        type: "p",
        text: "Notice three things: it returns a plain object, it owns its own cleanup via `onUnmounted`, and the consumer decides when to start. A composable that starts side effects on creation is a composable that will leak.",
      },
      {
        type: "h2",
        text: "Return refs, accept getters",
      },
      {
        type: "p",
        text: "The most common reactivity bug I reviewed was passing `props.userId` into a composable and watching it never update. Primitives are passed by value — by the time the composable reads it, the binding is gone. Accept a getter instead, and use `toValue` to support both plain values and reactive sources:",
      },
      {
        type: "code",
        lang: "ts",
        code: `import { ref, watchEffect, toValue, type MaybeRefOrGetter } from "vue";

export function useUser(id: MaybeRefOrGetter<string>) {
  const user = ref<User | null>(null);
  const loading = ref(false);

  watchEffect(async () => {
    loading.value = true;
    user.value = await fetchUser(toValue(id));
    loading.value = false;
  });

  return { user, loading };
}`,
      },
      {
        type: "code",
        lang: "vue",
        code: `<script setup lang="ts">
const props = defineProps<{ userId: string }>();

// Pass a getter so the composable tracks changes reactively.
const { user, loading } = useUser(() => props.userId);
</script>`,
      },
      {
        type: "h2",
        text: "Shared state vs. instance state",
      },
      {
        type: "p",
        text: "This is the distinction that trips people up. State declared inside the composable function is per-call — each component gets its own. State declared in module scope is shared across every consumer. Both are valid; you just have to be deliberate.",
      },
      {
        type: "code",
        lang: "ts",
        code: `import { reactive } from "vue";

// Module scope = one instance shared everywhere it is imported.
const session = reactive({ token: "", user: null as User | null });

export function useSession() {
  function login(token: string) {
    session.token = token;
  }
  return { session, login };
}`,
      },
      {
        type: "p",
        text: "I use module-scoped state for genuinely global concerns — auth, feature flags, a toast queue — and per-call state for everything else. If you find yourself reaching for a store library to do what a module-scoped composable already does, pause and reconsider.",
      },
      {
        type: "h2",
        text: "Naming and boundaries",
      },
      {
        type: "ul",
        items: [
          "Prefix with `use` — it signals reactivity rules to readers and tooling.",
          "One responsibility per composable. `useUser` fetches a user; it does not also manage a modal.",
          "Return readonly refs when consumers should not mutate state directly — `readonly(state)` makes intent enforceable.",
          "Keep composables framework-pure: no direct DOM queries that assume a single mount, no global event listeners without cleanup.",
        ],
      },
      {
        type: "quote",
        text: "A good composable reads like a small, honest contract: here is what I need, here is what I give you, and I clean up when you are done with me.",
      },
      {
        type: "p",
        text: "Get these conventions in place early and the Composition API delivers on its promise — logic you can actually extract, test, and reuse, instead of the mixin tangle it was meant to replace.",
      },
    ],
  },
  {
    slug: "going-standalone-modernizing-angular",
    title: "Going Standalone: Modernizing Angular Without NgModules",
    description:
      "Standalone components changed how I structure Angular apps. A field guide to migrating incrementally without freezing feature work.",
    date: "2025-07-22",
    readingMinutes: 10,
    tags: ["Angular", "Standalone", "Migration"],
    accent: "#ef4444",
    content: [
      {
        type: "p",
        text: "At Mofid I inherited a large Angular application built the classic way: a forest of NgModules, a shared module that imported everything, and a dependency graph nobody fully understood. Standalone components offered a way out — but you cannot stop the world to rewrite an app in production. Here is how we migrated incrementally.",
      },
      {
        type: "h2",
        text: "What standalone actually removes",
      },
      {
        type: "p",
        text: "An NgModule did three jobs: it declared components, it imported dependencies, and it provided services. Standalone components fold the first two into the component itself. Instead of declaring a component in a module and importing that module elsewhere, the component states its own dependencies:",
      },
      {
        type: "code",
        lang: "ts",
        code: `import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-user-card",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: \`
    <a [routerLink]="['/users', user.id]">{{ user.name }}</a>
  \`,
})
export class UserCardComponent {
  @Input({ required: true }) user!: User;
}`,
      },
      {
        type: "p",
        text: "The dependency list lives next to the thing that uses it. No more hunting through a shared module to figure out why a pipe is or is not available.",
      },
      {
        type: "h2",
        text: "Bootstrap without a root module",
      },
      {
        type: "p",
        text: "The migration starts at the entry point. Replace `platformBrowserDynamic().bootstrapModule(AppModule)` with `bootstrapApplication`, and move your providers into the application config:",
      },
      {
        type: "code",
        lang: "ts",
        code: `import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import { authInterceptor } from "./app/auth.interceptor";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
});`,
      },
      {
        type: "h2",
        text: "Migrate leaves first",
      },
      {
        type: "p",
        text: "The safe order is bottom-up. Start with presentational components that have no children to worry about, flip them to `standalone: true`, and remove them from their NgModule's declarations. The Angular schematic automates a lot of this:",
      },
      {
        type: "code",
        lang: "bash",
        code: `ng generate @angular/core:standalone`,
      },
      {
        type: "p",
        text: "It runs in stages — convert components, prune now-empty modules, then switch bootstrap. Run one stage, commit, ship. We did this over several sprints without ever blocking feature work, because standalone and NgModule-based code interoperate cleanly. A standalone component can be imported into an old NgModule, and an NgModule's exports can be imported into a standalone component via its `imports` array.",
      },
      {
        type: "h2",
        text: "Lazy routes get dramatically simpler",
      },
      {
        type: "p",
        text: "This was the payoff our team felt most. Lazy loading no longer needs a feature module — you point a route at a component or a route file directly:",
      },
      {
        type: "code",
        lang: "ts",
        code: `import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "reports",
    loadComponent: () =>
      import("./reports/reports.component").then((m) => m.ReportsComponent),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.routes").then((m) => m.adminRoutes),
  },
];`,
      },
      {
        type: "h2",
        text: "What I would tell my past self",
      },
      {
        type: "ul",
        items: [
          "Do not big-bang it. Incremental migration is fully supported and far less risky.",
          "Delete the god `SharedModule` last, and replace it with a barrel file of standalone imports rather than another module.",
          "Adopt the new `inject()` function while you are in there — it pairs naturally with standalone and cleans up constructor injection.",
          "Lean on the schematic, but review every diff. It is good, not infallible, especially around providers.",
        ],
      },
      {
        type: "quote",
        text: "Standalone did not just remove boilerplate — it made the dependency graph legible. New engineers could finally read a component and know exactly what it needed.",
      },
      {
        type: "p",
        text: "Angular gets unfairly maligned for ceremony, and NgModules were a big part of that reputation. Standalone components are the framework shedding weight it no longer needs — and an app that migrates to them is genuinely easier to reason about.",
      },
    ],
  },
  {
    slug: "frontend-caching-playbook-browser-to-edge",
    title: "A Frontend Caching Playbook: From the Browser to the Edge",
    description:
      "Caching is the highest-leverage performance work most teams never do properly. A layered model — HTTP, service worker, data, and CDN — with the headers that actually matter.",
    date: "2026-06-10",
    readingMinutes: 11,
    tags: ["Infrastructure", "Performance", "Caching"],
    accent: "#6366f1",
    content: [
      {
        type: "p",
        text: "Most frontend performance advice fixates on bundle size. Important, but caching is where the real wins hide — a correctly cached asset costs zero bytes and zero milliseconds on repeat visits. The catch is that 'caching' is not one thing; it is at least four layers, each with its own rules. Get them confused and you ship stale data to users or, worse, cache something you never meant to.",
      },
      {
        type: "h2",
        text: "Layer 1: HTTP caching and the two-bucket model",
      },
      {
        type: "p",
        text: "Browser HTTP caching comes down to one decision: can the browser reuse a response without asking the server (a fresh response), or must it revalidate first? `Cache-Control` controls both. The single most useful pattern is to split your assets into two buckets.",
      },
      {
        type: "p",
        text: "Immutable, fingerprinted assets — anything with a content hash in the filename, like `app.4f3a9c.js` — can be cached effectively forever, because a new build produces a new filename:",
      },
      {
        type: "code",
        lang: "http",
        code: `# Hashed build artifacts: cache for a year, never revalidate.
Cache-Control: public, max-age=31536000, immutable`,
      },
      {
        type: "p",
        text: "HTML and anything whose URL is stable but whose content changes must always be revalidated, so users never get a stale shell pointing at deleted assets:",
      },
      {
        type: "code",
        lang: "http",
        code: `# HTML entry points: always check freshness before reuse.
Cache-Control: no-cache
# (no-cache means \"revalidate every time\", NOT \"do not store\")`,
      },
      {
        type: "quote",
        text: "The most common caching bug I have debugged is someone setting `no-cache` thinking it disables caching. It does not — it forces revalidation. The directive that prevents storage entirely is `no-store`.",
      },
      {
        type: "h2",
        text: "ETags and conditional requests",
      },
      {
        type: "p",
        text: "Revalidation does not have to mean re-downloading. With an `ETag`, the browser sends the token it has and the server answers `304 Not Modified` with an empty body when nothing changed — a tiny round trip instead of a full payload:",
      },
      {
        type: "code",
        lang: "http",
        code: `# First response
HTTP/1.1 200 OK
ETag: "a1b2c3"
Cache-Control: no-cache

# Browser revalidates
GET /index.html
If-None-Match: "a1b2c3"

# Unchanged — no body sent
HTTP/1.1 304 Not Modified`,
      },
      {
        type: "h2",
        text: "Layer 2: stale-while-revalidate for data",
      },
      {
        type: "p",
        text: "For API data, the user-facing win is showing something instantly while you refresh in the background. This is the stale-while-revalidate pattern, and it exists both as an HTTP directive and as a client strategy. On the client, libraries like SWR and TanStack Query implement it directly — serve the cached value, fire a revalidation, swap in the fresh result:",
      },
      {
        type: "code",
        lang: "ts",
        code: `import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function Profile({ id }: { id: string }) {
  // Returns cached data immediately, revalidates in the background.
  const { data, isLoading } = useSWR(\`/api/users/\${id}\`, fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 2000, // collapse duplicate requests
  });

  if (isLoading) return <Skeleton />;
  return <UserCard user={data} />;
}`,
      },
      {
        type: "p",
        text: "The `dedupingInterval` is doing quiet but important work: it collapses concurrent requests for the same key into one network call, which matters when several components mount and ask for the same resource at once.",
      },
      {
        type: "h2",
        text: "Layer 3: the service worker as a programmable cache",
      },
      {
        type: "p",
        text: "When you need offline support or full control, a service worker lets you write the cache policy as code. The key is to match the strategy to the resource: cache-first for static assets, network-first for data that must be fresh.",
      },
      {
        type: "code",
        lang: "ts",
        code: `self.addEventListener("fetch", (event: FetchEvent) => {
  const { request } = event;

  // Cache-first for same-origin static assets.
  if (request.destination === "script" || request.destination === "style") {
    event.respondWith(
      caches.match(request).then(
        (cached) => cached ?? fetch(request).then((res) => {
          const copy = res.clone();
          caches.open("assets-v1").then((c) => c.put(request, copy));
          return res;
        }),
      ),
    );
  }
});`,
      },
      {
        type: "p",
        text: "Note the `res.clone()` — a Response body is a stream that can be consumed once. You clone it because you need to both return it to the page and store it in the cache. Forgetting this is a classic source of 'body already used' errors.",
      },
      {
        type: "h2",
        text: "Layer 4: the CDN and cache keys",
      },
      {
        type: "p",
        text: "A CDN caches your responses at the edge, close to users. The subtlety here is the cache key — by default it is the URL, but if your responses vary by something else (language, auth state, encoding), you must declare it with `Vary`, or the CDN will serve one user's response to another:",
      },
      {
        type: "code",
        lang: "http",
        code: `# Tell the CDN: a gzipped response is not interchangeable with brotli.
Vary: Accept-Encoding
# For personalized HTML, do NOT cache shared — vary or bypass entirely.`,
      },
      {
        type: "p",
        text: "A hard-won rule: never let a CDN cache an authenticated, personalized response under a shared key. Either bypass the edge cache for those routes, split personalization out into a client-side fetch, or key the cache on the user. Leaking one user's dashboard to another is the kind of incident that ends up in a postmortem.",
      },
      {
        type: "h2",
        text: "A practical checklist",
      },
      {
        type: "ol",
        items: [
          "Fingerprint static assets and serve them `immutable` with a one-year max-age.",
          "Serve HTML with `no-cache` plus an `ETag` so users always get the current shell cheaply.",
          "Use stale-while-revalidate on the client for data that can be briefly stale.",
          "Reach for a service worker only when you need offline or fine-grained control — it is real complexity.",
          "Audit `Vary` and cache keys at the CDN; never cache personalized responses under a shared key.",
        ],
      },
      {
        type: "p",
        text: "Caching is unglamorous and it is where the largest, cheapest performance gains live. Spend a day mapping these four layers for your app and you will usually find a header that is either too aggressive or not aggressive enough — and fixing it is often a one-line, high-impact change.",
      },
    ],
  },
  {
    slug: "ci-cd-pipeline-for-frontend-teams",
    title: "Designing a CI/CD Pipeline for Frontend Teams",
    description:
      "A fast, trustworthy pipeline is infrastructure that pays for itself daily. How I structure CI stages, cache aggressively, and ship with preview deploys.",
    date: "2026-05-05",
    readingMinutes: 10,
    tags: ["Infrastructure", "CI/CD", "DevEx"],
    accent: "#f59e0b",
    content: [
      {
        type: "p",
        text: "A pipeline is the one piece of infrastructure every engineer on the team touches, every day. When it is slow or flaky, it taxes the whole team's momentum and quietly erodes trust in green checkmarks. I treat the pipeline as a product with real users — my teammates — and optimize it accordingly.",
      },
      {
        type: "h2",
        text: "Stage it for fast failure",
      },
      {
        type: "p",
        text: "Order jobs so the cheapest, most likely failures run first. There is no point spending four minutes on a build if a thirty-second lint would have caught the problem. I split CI into parallel jobs that fan out from a single install step, with the fast checks gating the expensive ones.",
      },
      {
        type: "code",
        lang: "yaml",
        code: `name: CI
on: pull_request

jobs:
  install:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile

  verify:
    needs: install
    runs-on: ubuntu-latest
    strategy:
      matrix:
        task: [lint, typecheck, test]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm run \${{ matrix.task }}`,
      },
      {
        type: "p",
        text: "The matrix runs lint, typecheck, and unit tests as three independent jobs in parallel. Total wall-clock time is the slowest single task, not their sum — and a lint failure surfaces without waiting on the test suite.",
      },
      {
        type: "h2",
        text: "Pin dependencies with a frozen lockfile",
      },
      {
        type: "p",
        text: "Always install with the lockfile-frozen flag in CI — `pnpm install --frozen-lockfile`, `npm ci`, or `yarn --immutable`. This guarantees the exact dependency tree the lockfile describes and fails loudly if the lockfile is out of sync, rather than silently resolving a different version than what runs locally. Non-reproducible installs are the root cause of an astonishing share of 'works on my machine' bugs.",
      },
      {
        type: "h2",
        text: "Cache the right things",
      },
      {
        type: "p",
        text: "Two caches matter most: the package manager store and the build/test tool cache. The `setup-node` action handles the dependency cache when you point it at your lockfile. For build tools, cache their own incremental caches keyed on a stable hash:",
      },
      {
        type: "code",
        lang: "yaml",
        code: `- name: Cache build artifacts
  uses: actions/cache@v4
  with:
    path: |
      .next/cache
      node_modules/.cache
    key: build-\${{ hashFiles('pnpm-lock.yaml') }}-\${{ github.sha }}
    restore-keys: |
      build-\${{ hashFiles('pnpm-lock.yaml') }}-`,
      },
      {
        type: "p",
        text: "The `restore-keys` fallback is the trick: an exact key match is ideal, but if today's commit has no cache yet, it restores the most recent cache for the same lockfile and builds incrementally on top of it. In a monorepo, a remote cache from Nx or Turborepo takes this further — unchanged packages are restored, not rebuilt, across the whole team and CI.",
      },
      {
        type: "h2",
        text: "Preview deploys close the feedback loop",
      },
      {
        type: "p",
        text: "Every pull request should produce a live, shareable URL. Reviewers click instead of pulling the branch and running it locally; designers and PMs sign off on the real thing. This single practice did more for review quality on my teams than any process change.",
      },
      {
        type: "ul",
        items: [
          "Build the PR, deploy it to an isolated environment, and post the URL back as a status or comment.",
          "Tear the environment down when the PR closes so preview infra does not accumulate cost.",
          "Run smoke tests or Lighthouse against the preview URL to catch regressions before merge.",
        ],
      },
      {
        type: "h2",
        text: "Make flaky tests a build-breaking bug",
      },
      {
        type: "p",
        text: "A pipeline is only valuable if people trust it. The moment a red build might be 'just flaky', engineers start re-running jobs reflexively and real failures slip through. Quarantine flaky tests immediately, file them as bugs, and fix or delete them. A small, reliable suite beats a large, untrustworthy one every time.",
      },
      {
        type: "quote",
        text: "The goal is not a pipeline that is merely correct, but one the team believes. A green check should mean 'ship it' without a second thought.",
      },
      {
        type: "p",
        text: "Treat your pipeline like the product it is: measure its runtime, watch its failure rate, and invest in it deliberately. Minutes saved per run multiply across every engineer and every push — it is some of the highest-ROI infrastructure work you can do.",
      },
    ],
  },
  {
    slug: "module-federation-micro-frontends-in-practice",
    title: "Module Federation in Practice: Micro-Frontends Without the Hype",
    description:
      "Micro-frontends are an organizational tool, not a default architecture. When Module Federation genuinely helps, how it works, and the failure modes to plan for.",
    date: "2026-03-18",
    readingMinutes: 12,
    tags: ["Architecture", "Micro-Frontends", "Module Federation"],
    accent: "#8b5cf6",
    content: [
      {
        type: "p",
        text: "Micro-frontends get pitched as a frontend silver bullet and adopted by teams who would be better served by a well-structured monolith. So let me start with the uncomfortable part: most apps do not need them. They are an answer to an organizational problem — multiple teams needing to deploy parts of one app independently — not a technical upgrade. If you have one team, you almost certainly do not want them.",
      },
      {
        type: "h2",
        text: "The problem they actually solve",
      },
      {
        type: "p",
        text: "At a certain scale, a single deployable frontend becomes a coordination bottleneck. Team A cannot ship until Team B's half-finished work is feature-flagged off; a shared release train means everyone moves at the speed of the slowest reviewer. Micro-frontends let each team own, build, and deploy a slice of the application on its own cadence. That independence is the entire value proposition — and the entire source of the complexity.",
      },
      {
        type: "h2",
        text: "How Module Federation works",
      },
      {
        type: "p",
        text: "Webpack Module Federation (and its Vite equivalents) lets one build expose modules that another build loads at runtime, over the network, rather than at compile time. A 'host' application consumes modules exposed by 'remotes'. The remote builds and deploys independently; the host pulls in its latest exposed entry at runtime.",
      },
      {
        type: "code",
        lang: "js",
        code: `// remote (the team that owns the cart) — webpack.config.js
new ModuleFederationPlugin({
  name: "cart",
  filename: "remoteEntry.js",
  exposes: {
    "./CartWidget": "./src/CartWidget",
  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.0.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
  },
});`,
      },
      {
        type: "code",
        lang: "js",
        code: `// host (the shell app) — webpack.config.js
new ModuleFederationPlugin({
  name: "shell",
  remotes: {
    cart: "cart@https://cart.example.com/remoteEntry.js",
  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.0.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
  },
});`,
      },
      {
        type: "p",
        text: "The host then imports the remote module as if it were local, lazily — because it crosses a network boundary:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `import { lazy, Suspense } from "react";

// Resolved at runtime from the remote's deployed bundle.
const CartWidget = lazy(() => import("cart/CartWidget"));

export function Header() {
  return (
    <Suspense fallback={<CartSkeleton />}>
      <CartWidget />
    </Suspense>
  );
}`,
      },
      {
        type: "h2",
        text: "The `singleton` flag is not optional",
      },
      {
        type: "p",
        text: "That `shared` config is the part teams get wrong and then spend a week debugging. React must be a singleton across the host and every remote — two copies of React in one page break hooks instantly, because hooks rely on a single shared internal dispatcher. Marking `react` and `react-dom` as `singleton: true` tells Module Federation to load exactly one copy and share it. Anything stateful that must be unique per page belongs here.",
      },
      {
        type: "quote",
        text: "If you see 'Invalid hook call' or 'cannot read useState of null' in a federated app, your first suspect is two Reacts on the page. Check your shared singletons before anything else.",
      },
      {
        type: "h2",
        text: "Version skew is the real tax",
      },
      {
        type: "p",
        text: "Independent deployment means the host and remotes are versioned separately and can drift. The host might load a remote built against a newer shared contract, or vice versa. Plan for it deliberately:",
      },
      {
        type: "ul",
        items: [
          "Define the shared contract — the props a remote exposes — as an explicit, versioned interface, and treat changes to it as breaking.",
          "Set `requiredVersion` on shared dependencies so incompatible versions fail fast and loudly instead of corrupting state silently.",
          "Wrap every remote in an error boundary; a remote can fail to load entirely, and that must degrade gracefully rather than blank the page.",
        ],
      },
      {
        type: "code",
        lang: "tsx",
        code: `class RemoteBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}`,
      },
      {
        type: "h2",
        text: "Operational realities to budget for",
      },
      {
        type: "p",
        text: "Beyond the build config, federation changes how you operate. You now have multiple deploy pipelines, multiple things that can be down independently, and a harder debugging story because a bug might live in a remote you do not own. Observability has to span boundaries — a single trace should follow a request through host and remotes alike, or production incidents become guesswork.",
      },
      {
        type: "h2",
        text: "So should you use it?",
      },
      {
        type: "ol",
        items: [
          "Do you have multiple teams that are genuinely blocked by a shared release cycle? If no, stop — use a monorepo with good module boundaries instead.",
          "Can you commit to governing shared dependencies and a versioned contract across teams? If no, the version skew will hurt.",
          "Do you have the observability and error-handling maturity to operate several independently-deployed surfaces? If no, build that first.",
        ],
      },
      {
        type: "p",
        text: "Module Federation is a genuinely impressive piece of engineering, and when the organizational problem is real it is the right tool. Just adopt it for the autonomy it buys your teams — not because the architecture diagram looks modern. The runtime complexity is real, and you pay it every day you run the system.",
      },
    ],
  },
  {
    slug: "feature-sliced-design-taming-a-growing-codebase",
    title: "Feature-Sliced Design: Taming a Growing React Codebase",
    description:
      "Folder structure is architecture. How layered, feature-first organization with enforced import rules keeps a large frontend from collapsing into spaghetti.",
    date: "2026-02-02",
    readingMinutes: 9,
    tags: ["Architecture", "React", "Maintainability"],
    accent: "#06b6d4",
    content: [
      {
        type: "p",
        text: "Every large frontend I have worked on eventually hits the same wall: nobody can change anything without touching everything. A 'small' edit ripples across the codebase because imports go in every direction and there is no agreed-upon notion of what depends on what. Feature-Sliced Design (FSD) is the methodology that fixed this for me — not because it is clever, but because it makes the dependency direction explicit and enforceable.",
      },
      {
        type: "h2",
        text: "Layers with a one-way dependency rule",
      },
      {
        type: "p",
        text: "FSD organizes code into a fixed set of layers, ordered by responsibility. The non-negotiable rule: a module may only import from layers below it, never above or sideways at the same level (with one deliberate exception). From top to bottom:",
      },
      {
        type: "ul",
        items: [
          "`app` — providers, routing, global styles; the composition root.",
          "`pages` — route-level compositions that assemble widgets and features.",
          "`widgets` — self-contained UI blocks like a header or a sidebar.",
          "`features` — user-facing interactions, e.g. 'add to cart' or 'toggle subscription'.",
          "`entities` — business domain models like `user` or `product`.",
          "`shared` — framework-agnostic utilities, UI kit, and API clients with no business logic.",
        ],
      },
      {
        type: "p",
        text: "Because dependencies only ever point downward, you can reason about impact. A change in `shared` may affect everything above it, but a change in a `feature` can never break an `entity`. That single constraint is what keeps the graph acyclic and the codebase navigable.",
      },
      {
        type: "h2",
        text: "Slices and the public API rule",
      },
      {
        type: "p",
        text: "Within a layer, code is divided into slices by business domain — `user`, `cart`, `auth`. Each slice exposes a public API through an index barrel, and everything else inside it is private. Outside code imports from the slice's entry point, never reaches into its internals:",
      },
      {
        type: "code",
        lang: "ts",
        code: `// entities/user/index.ts — the slice's public API
export { UserCard } from "./ui/UserCard";
export { useUser } from "./model/useUser";
export type { User } from "./model/types";

// ✅ allowed: import through the public API
import { UserCard, type User } from "@/entities/user";

// ❌ forbidden: reaching into private internals
import { UserCard } from "@/entities/user/ui/UserCard";`,
      },
      {
        type: "p",
        text: "This is the same encapsulation principle that makes well-designed packages pleasant to use, applied inside your own app. The internal structure of a slice becomes free to refactor, because nothing outside depends on it.",
      },
      {
        type: "h2",
        text: "Enforce it with tooling, not goodwill",
      },
      {
        type: "p",
        text: "Conventions that rely on people remembering them decay the moment a deadline looms. Encode the layering rules in the linter so violations fail CI. The `import/no-restricted-paths` rule or the dedicated `eslint-plugin-boundaries` make the architecture self-policing:",
      },
      {
        type: "code",
        lang: "js",
        code: `// eslint — forbid upward and illegal cross-layer imports
"import/no-restricted-paths": ["error", {
  zones: [
    // entities must never import from features or above
    { target: "./src/entities", from: "./src/features" },
    { target: "./src/entities", from: "./src/widgets" },
    { target: "./src/shared", from: "./src/entities" },
  ],
}]`,
      },
      {
        type: "quote",
        text: "An architecture that lives only in a wiki is a suggestion. An architecture encoded in the linter is a guarantee. Make the wrong thing impossible, not merely discouraged.",
      },
      {
        type: "h2",
        text: "What it costs, and when to adopt it",
      },
      {
        type: "p",
        text: "FSD is not free. It adds indirection and a learning curve, and on a small app it is overkill — a few well-named folders will do. Reach for it when a codebase has crossed the threshold where multiple people step on each other, where 'where does this go?' is a recurring question, and where refactors feel dangerous because the blast radius is unknowable.",
      },
      {
        type: "p",
        text: "You do not have to adopt the methodology by the letter — I have shipped pragmatic variants on every team. What matters is the underlying idea: explicit layers, a one-way dependency rule, slices with public APIs, and tooling that enforces all three. Get those right and a large frontend stays as easy to change at year three as it was at month one.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
