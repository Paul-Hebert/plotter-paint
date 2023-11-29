<script lang="ts">
  let svgCanvas;

  let circles = [];

  function addCircle(e) {
    const { x,y } = getClickOnSvg(e);

    circles = [...circles, {x, y}]
  }


  function getClickOnSvg(e) {
    let pt = DOMPoint.fromPoint(svgCanvas); 
    pt.x = e.clientX;
    pt.y = e.clientY;
    

    // The cursor point, translated into svg coordinates
    return  pt.matrixTransform(svgCanvas.getScreenCTM().inverse());
  }

</script>

<main>
  <svg viewBox="0 0 500 500" on:click={addCircle} bind:this={svgCanvas}>
    {#each circles as { x, y }}
      <circle cx="{x}" cy="{y}" r="5"/> 
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
</style>