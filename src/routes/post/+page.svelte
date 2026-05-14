<script lang="ts">
    import HorizontalBlock from '../HorizontalBlock.svelte';
  import Pagination from '../Pagination.svelte';

	export let data;
</script>

<main>
	<article>
		<h1>전체 보기</h1>
		<p>모든 포스트</p>
	</article>

	<section>
		{#each data.posts as post}
			<HorizontalBlock
				title={post.title}
				thumb={post.img}
				date={post.date}
				href={post.path}
			/>
		{/each}
	</section>
	<Pagination idx={1} size={data.size} />
</main>
<style>
	p {
		margin: 0;
	}

	section {
		display: flex;
    flex-direction: column;
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
