<script lang="ts">
  import { page } from '$app/state';
  import ProjectBlock from './ProjectBlock.svelte';

	export let posts;

  const normalizePath = (value: string) => (value.length > 1 ? value.replace(/\/$/, '') : value);
  $: currentPath = normalizePath(page.url.pathname);
  const isSelected = (target: string) => currentPath === normalizePath(target);

  let postElement: HTMLElement;
</script>
<main>
  <article style:view-transition-name="title">
    <h1>Hyuckkim</h1>
    <p>있는 거 없는 거 몽땅 꺼내고 추해지기</p>
  </article>
  <h2>만든 프로젝트</h2>
  <article class="categories">
    <a class:selected={isSelected('/')} href="/">🧪개인용 유틸</a>
    <a class:selected={isSelected('/mechanism-lab')} href="/mechanism-lab">🎮매커니즘 연구소</a>
    <a class:selected={isSelected('/team-projects')} href="/team-projects">👥팀 프로젝트</a>
    <a class:selected={isSelected('/etc')} href="/etc">✨기타</a>
  </article>
  <a href="/post" class="see-all"> → 전체 보기</a>
  <section style:view-transition-name="posts" bind:this={postElement}>
		{#each posts as post}
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
  .categories {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  .categories a {
    padding: 8px 64px;
    border-radius: 16px;
    color: #000;
    text-decoration: none;
  }
  .categories a.selected {
    width: max-content;
    padding: 8px 64px;
    border-radius: 16px;
    background-color: #eee5;
  }
  h2 {
    color: #fff;
  }
	p {
		margin: 0;
	}
    .see-all {
        display: block;
        text-align: right;
        margin: 16px 0;
        color: #fff;
        text-decoration: none;
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