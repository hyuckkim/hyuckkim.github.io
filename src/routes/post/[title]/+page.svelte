<script lang="ts">
	export let data;

  function returnToBack() {
    if (location.pathname === '/') return;
    history.back();
  }
</script>
<main>
  <article class="post" style:view-transition-name={`post-${data.title}`}>
    <div class="meta">
      <button on:click={returnToBack} aria-label="Go Back" class="back-button">← 이전으로 돌아가기</button>
      {#if data.meta.date}
      <time>{data.meta.date}</time>
      {/if}
    </div>
    {#if data.meta.img}
    <img
      src={data.meta.img}
      alt={data.meta.title}
      style:view-transition-name={`post-img-${data.title}`} />
    {/if}
    <h1 style:view-transition-name={`post-title-${data.title}`}>
      {data.meta.title ?? ''}
    </h1>
    <div class="content">
      {@html data.post}
    </div>
  </article>
</main>

<style>

article {
  view-transition-name: post;
}
article time {
  font-size: smaller;
}
article .meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
}
img {
  display: block;
  margin: 0 auto;
  max-height: 500px;
}
:global(img) {
  max-width: 100%;
  height: auto;
}

button {
  align-self: baseline;
  background: none;
  border: none;
  cursor: pointer;
}
.content {
  border: 1px solid #000;
  border-radius: 8px;
  padding: 1em;
  margin: -0.5em;
  background: #e3e3f3aa;
}

:global(pre:has(code), :not(pre) > code) {
  background-color: #fff;
  padding: 0.4em 0.2em;
  border-radius: 4px;
  overflow: auto;
}
</style>