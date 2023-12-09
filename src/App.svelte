<script lang="ts">
  import { stateStack } from "./state-stack";
  import SvgCanvas from "./components/SvgCanvas.svelte";
  import UndoRedo from "./components/UndoRedo.svelte";
</script>

<main>
  <SvgCanvas strokes={$stateStack.current.strokes} />

  <UndoRedo />
</main>
