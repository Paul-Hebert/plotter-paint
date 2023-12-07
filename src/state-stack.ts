import { createStack } from "svelte-undo";

export const stateStack = createStack({ strokes: [] });
