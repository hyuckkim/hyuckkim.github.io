<script lang="ts">
import TitlePage from "../TitlePage.svelte";

  let {data} = $props();
</script>

<TitlePage posts={data.posts} />