<script lang="ts">
  import { stateStack } from "../state-stack";
  import { spline } from "@georgedoescode/spline";

  export let strokes;

  let svgElement;

  let isDrawing = false;
  let pointsInCurrentStroke = [];
  let animationFrame;

  function handlePointerDown(e) {
    isDrawing = true;
    pointsInCurrentStroke = [getClickOnSvg(e)];
  }

  function handlePointerMove(e) {
    if (!isDrawing) return;

    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }

    animationFrame = requestAnimationFrame(() => {
      pointsInCurrentStroke = [...pointsInCurrentStroke, getClickOnSvg(e)];
    });
  }

  function endStroke() {
    if (!isDrawing) return;

    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }

    stateStack.push({
      strokes: [...strokes, [...pointsInCurrentStroke]],
    });

    isDrawing = false;
    pointsInCurrentStroke = [];
  }

  function getClickOnSvg({ clientX, clientY }) {
    let pt = DOMPoint.fromPoint(svgElement);
    pt.x = clientX;
    pt.y = clientY;

    // The cursor point, translated into svg coordinates
    return pt.matrixTransform(svgElement.getScreenCTM().inverse());
  }
</script>

<svelte:document
  on:pointerup={endStroke}
  on:pointerleave={endStroke}
  on:pointermove={handlePointerMove}
/>

<svg
  viewBox="0 0 500 500"
  bind:this={svgElement}
  on:pointerdown={handlePointerDown}
>
  {#each strokes as points}
    <path d={spline(points)} />
  {/each}
  <path d={spline(pointsInCurrentStroke)} />
</svg>

<style>
  svg {
    background: #fff;
    border: 1px solid #ccc;
    width: 500px;
    height: 500px;
  }

  path {
    fill: none;
    stroke: #000;
    stroke-width: 5;
    stroke-linecap: round;
  }
</style>
