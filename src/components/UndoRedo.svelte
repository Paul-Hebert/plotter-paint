<script lang="ts">
  import { stateStack } from "../state-stack";
  import UndoSvg from "../icons/Undo.svelte";
  import RedoSvg from "../icons/Redo.svelte";
  import VisuallyHidden from "../components/VisuallyHidden.svelte";

  function handleKeydown(e: KeyboardEvent) {
    console.log(e);
    if (e.metaKey && e.key === "z") {
      if (e.shiftKey) {
        stateStack.redo();
      } else {
        stateStack.undo();
      }
    }
  }
</script>

<svelte:document on:keydown={handleKeyup} />

<div class="undo-redo">
  <button disabled={$stateStack.first} on:click={() => stateStack.undo()}>
    <VisuallyHidden>Undo</VisuallyHidden>
    <span aria-hidden="true"><UndoSvg /></span>
  </button>
  <button disabled={$stateStack.last} on:click={() => stateStack.redo()}>
    <VisuallyHidden>Redo</VisuallyHidden>
    <span aria-hidden="true"><RedoSvg /></span>
  </button>
</div>

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
