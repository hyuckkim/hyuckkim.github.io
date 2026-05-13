<script lang="ts">
    import HorizontalBlock from '../../HorizontalBlock.svelte';

	export let data;
</script>

<main>
	<article>
		<h1>전체 보기</h1>
		<p>{data.no} 페이지</p>
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
</main>
<a href="/post/{Math.max(1, data.no - 1)}">이전</a>
<a href="/post/{Math.min(data.size, data.no -  - 1)}">다음</a>

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
