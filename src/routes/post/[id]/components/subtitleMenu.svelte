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
    <li style:margin-left={`${Number.parseInt(subtitle.level) * 20}px`}>
        <small>
        <a href={`#${subtitle.id}`} class="secondary">{subtitle.text}</a>
        </small>
    </li>
    {/each}
    </ul>
</article>

<style>
    article {
        background: linear-gradient(0.25turn, var(--pico-card-background-color) 30%, #0000 75%);
    }
    li::marker {
        content: '⚬ ';
    }
</style>