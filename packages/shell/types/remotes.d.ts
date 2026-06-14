// Type declarations for Module Federation remote imports

declare module "mfe_react/App" {
  import type { ComponentType } from "react";
  const App: ComponentType;
  export default App;
}

declare module "mfe_vue/mount" {
  export function mount(container: HTMLElement): { unmount: () => void };
}

declare module "mfe_angular/bootstrap" {
  export function mount(
    container: HTMLElement
  ): Promise<{ destroy: () => void }>;
}
