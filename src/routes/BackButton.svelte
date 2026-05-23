<script lang="ts">
  export let href: string | null = null;

  function returnToBack() {
    if (href) {
      location.href = href;
      return;
    }
    
    if (location.pathname === '/') return;
    history.back();
  }
</script>
<button on:click={returnToBack} aria-label="Go Back" class="back-button">← 이전으로 돌아가기</button>
<style>
    
button {
  align-self: baseline;
  background: none;
  border: none;
  cursor: pointer;
}

</style>