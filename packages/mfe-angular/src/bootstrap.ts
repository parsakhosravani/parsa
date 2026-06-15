// Exposed via Module Federation as `mfe_angular/bootstrap`.
// Provides a framework-agnostic mount/destroy API consumed by the
// shell's AngularMfeLoader React component.
import "reflect-metadata";
import "zone.js";
import "@angular/compiler"; // JIT compiler
import { ApplicationRef } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { StoryComponent } from "./app/story.component";

export async function mount(
  container: HTMLElement
): Promise<{ destroy: () => void }> {
  const hostEl = document.createElement("app-story");
  container.appendChild(hostEl);

  const appRef = (await bootstrapApplication(StoryComponent)) as ApplicationRef;

  return {
    destroy() {
      appRef.destroy();
      if (hostEl.parentNode) hostEl.parentNode.removeChild(hostEl);
    },
  };
}
