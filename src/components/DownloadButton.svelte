<script lang="ts">
  export let svgElement;

  export function download() {
    const anchor = document.createElement("a");
    anchor.setAttribute("download", "drawing");
    anchor.setAttribute(
      "href",
      "data:image/svg+xml;base64," + btoa(svgElement.outerHTML),
    );
    anchor.setAttribute("target", "_blank");
    anchor.click();
  }
</script>

<button on:click={download}>Download</button>
