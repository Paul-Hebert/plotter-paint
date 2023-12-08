<script lang="ts">
  import { stateStack } from "./state-stack";
  import VisuallyHidden from "./components/VisuallyHidden.svelte";
  import SvgCanvas from "./components/SvgCanvas.svelte";
  import Undo from "./icons/Undo.svelte";
  import Redo from "./icons/Redo.svelte";
</script>

<main>
  <SvgCanvas strokes={$stateStack.current.strokes} />

  <div class="undo-redo">
    <button disabled={$stateStack.first} on:click={() => stateStack.undo()}>
      <VisuallyHidden>Undo</VisuallyHidden>
      <span aria-hidden="true"><Undo /></span>
    </button>
    <button disabled={$stateStack.last} on:click={() => stateStack.redo()}>
      <VisuallyHidden>Redo</VisuallyHidden>
      <span aria-hidden="true"><Redo /></span>
    </button>
  </div>
</main>

<style>
  button {
    background: white;
    border-radius: 50%;
    border: 1px solid hsl(200, 100%, 30%);
    cursor: pointer;
    width: 4em;
    height: 4em;
    display: inline-grid;
    place-items: center;
    transition: transform 0.15s ease-out;
  }

  button:hover:not(:disabled) {
    transform: translateY(-1px) scale(1.02);
  }

  button:active:not(:disabled) {
    transform: scale(0.98);
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .undo-redo {
    display: flex;
    gap: 1em;
  }
</style>
