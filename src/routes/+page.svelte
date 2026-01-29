<script lang="ts">
  import ProjectBlock from './ProjectBlock.svelte';

	export let data;
</script>
<main>
  <article>
    <h1>Hyuckkim</h1>
    <p>있는 거 없는 거 몽땅 꺼내고 추해지기</p>
  </article>
  <h2>만든 프로젝트</h2>
  <section>
		{#each data.posts as post}
			<ProjectBlock 
				title={post.title}
				thumb={post.img}
				date={post.date}
				href={post.path}
			/>
		{/each}
  </section>
</main>

<style>
  h2 {
    color: #fff;
  }
	p {
		margin: 0;
	}
  section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
		grid-auto-rows: masonry;
    width: 100%;
  }
  @media (max-width: 800px) {
    section {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 500px) {
    section {
      grid-template-columns: 1fr;
    }
  }
</style>