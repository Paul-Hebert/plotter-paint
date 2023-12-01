<script lang="ts">
  import { spline } from "@georgedoescode/spline";

  let svgElement;

  let strokes = [];
  let isDrawing = false;
  let pointsInCurrentStroke = [];
  let animationFrame;

  function handlePointerDown(e) {
    isDrawing = true;
    pointsInCurrentStroke.push(getClickOnSvg(e));

    strokes = [
      ...strokes,
      {
        points: pointsInCurrentStroke,
      },
    ];
  }

  function handlePointerMove(e) {
    if (isDrawing) {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() => {
        pointsInCurrentStroke.push(getClickOnSvg(e));

        strokes.pop();
        strokes = [...strokes, { points: pointsInCurrentStroke }];
      });
    }
  }

  function endStroke() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }

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
  on:pointerdown={handlePointerDown}
  on:pointermove={handlePointerMove}
/>

<svg viewBox="0 0 500 500" bind:this={svgElement}>
  {#each strokes as { points }}
    <path d={spline(points)} />
  {/each}
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
