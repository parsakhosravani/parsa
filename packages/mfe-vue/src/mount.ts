import { createApp } from "vue";
import App from "./App.vue";

/**
 * Framework-agnostic mount function exposed via Module Federation as `mfe_vue/mount`.
 * Called by the shell's VueMfeLoader component at /vue.
 */
export function mount(container: HTMLElement): { unmount: () => void } {
  const app = createApp(App);
  app.mount(container);
  return { unmount: () => app.unmount() };
}
