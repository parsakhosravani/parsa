<script setup lang="ts">
import { ref, computed } from "vue";
import { frameworkStories, frameworks } from "./story";

const accent = frameworks.find((f) => f.slug === "vue")!.accent;
const story = frameworkStories.vue;
const chapters = story.chapters;

const active = ref(0);

const chapter = computed(() => chapters[active.value]);
const progress = computed(
  () => ((active.value + 1) / chapters.length) * 100
);

function go(i: number) {
  active.value = i;
}
function next() {
  if (active.value < chapters.length - 1) active.value++;
}
function prev() {
  if (active.value > 0) active.value--;
}
</script>

<template>
  <div>
    <div
      class="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800"
    >
      <div
        class="h-full rounded-full transition-all duration-500"
        :style="{ width: `${progress}%`, background: accent }"
      />
    </div>

    <article
      class="rounded-2xl border border-zinc-200 bg-white/70 p-7 dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <p class="text-xs uppercase tracking-widest text-zinc-500">
        {{ chapter.era }}
      </p>
      <h2
        class="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100"
      >
        {{ chapter.title }}
      </h2>
      <p class="mt-1 text-zinc-500 dark:text-zinc-400">
        {{ chapter.subtitle }}
      </p>
      <div
        class="mt-5 space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-300"
      >
        <p v-for="(p, i) in chapter.paragraphs" :key="i">{{ p }}</p>
      </div>
    </article>

    <div class="mt-6 flex items-center justify-between">
      <button
        :disabled="active === 0"
        class="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
        @click="prev"
      >
        ← Previous
      </button>

      <div class="flex gap-2">
        <button
          v-for="(c, i) in chapters"
          :key="c.id"
          :aria-label="`Go to ${c.title}`"
          class="h-2.5 w-2.5 rounded-full transition"
          :class="i !== active ? 'bg-zinc-300 dark:bg-zinc-700' : ''"
          :style="
            i === active
              ? { background: accent, transform: 'scale(1.3)' }
              : {}
          "
          @click="go(i)"
        />
      </div>

      <button
        :disabled="active === chapters.length - 1"
        class="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
        @click="next"
      >
        Next →
      </button>
    </div>
  </div>
</template>
