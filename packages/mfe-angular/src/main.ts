// Standalone dev entry point — bootstraps the Angular app directly.
// When consumed via Module Federation, `bootstrap.ts` is used instead.
import "reflect-metadata";
import "zone.js";
import "@angular/compiler"; // JIT compiler
import { bootstrapApplication } from "@angular/platform-browser";
import { StoryComponent } from "./app/story.component";

bootstrapApplication(StoryComponent).catch(console.error);
