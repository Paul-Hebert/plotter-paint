<script lang="ts">
  import { spline } from '@georgedoescode/spline'
  let svgCanvas;

  let strokes = [];
  let isDrawing = false;
  let pointsInCurrentStroke = [];
  let animationFrame;

  function handlePointerDown(e) {
    isDrawing = true;
    pointsInCurrentStroke.push(getClickOnSvg(e));

    strokes.push({
      points: pointsInCurrentStroke,
    });

    console.log(strokes);
  }

  function handlePointerMove(e) {
    if (isDrawing) {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() => {
        pointsInCurrentStroke.push(getClickOnSvg(e));

        strokes.pop()
        strokes = [...strokes, {points: pointsInCurrentStroke}]

        console.log(strokes);
      });
    }
  }

  function handlePointerUp() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }

    isDrawing = false;
    pointsInCurrentStroke = [];
  }

  function getClickOnSvg({clientX, clientY}) {
    let pt = DOMPoint.fromPoint(svgCanvas); 
    pt.x = clientX;
    pt.y = clientY;


    // The cursor point, translated into svg coordinates
    return  pt.matrixTransform(svgCanvas.getScreenCTM().inverse());
  }

</script>

<main>
  <svg 
    viewBox="0 0 500 500" 
    on:pointerdown={handlePointerDown} 
    on:pointermove={handlePointerMove} 
    on:pointerup={handlePointerUp} 
    bind:this={svgCanvas}
  >
    {#each strokes as { points }}
      <path d="{spline(points)}"/> 
    {/each}
  </svg>
</main>

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
  }
</style>