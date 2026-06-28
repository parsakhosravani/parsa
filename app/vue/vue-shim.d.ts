declare module "vue/dist/vue.esm-browser.js" {
  export const createApp: (options: unknown) => {
    mount: (el: Element) => unknown;
    unmount: () => void;
  };
}
