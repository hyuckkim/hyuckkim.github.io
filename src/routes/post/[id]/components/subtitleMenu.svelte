<script lang="ts">
    export let subtitles: {
        level: string;
        id: string;
        text: string;
    }[]
</script>

<article>
    <ul style:padding=0 style:margin=0>
    {#each subtitles as subtitle}
    <small>
    <li style:margin-left={`${Number.parseInt(subtitle.level) * 20}px`}>
        <a href={`#${subtitle.id}`} class="secondary">{subtitle.text}</a>
    </li>
    </small>
    {/each}
    </ul>
</article>

<style>
    article {
        background: linear-gradient(0.25turn, #ffff 30%, #0000 80%);
    }
    li::marker {
        content: '⚬ ';
    }
</style>