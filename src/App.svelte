<script lang="ts">
  import { stateStack } from "./state-stack";
  import SvgCanvas from "./components/SvgCanvas.svelte";
</script>

<main>
  <SvgCanvas strokes={$stateStack.current.strokes} />

  <button disabled={$stateStack.first} on:click={() => stateStack.undo()}>
    Undo
  </button>
  <button disabled={$stateStack.last} on:click={() => stateStack.redo()}>
    Redo
  </button>
</main>
