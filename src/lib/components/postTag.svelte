<script lang="ts">
    import { base } from "$app/paths";

    export let tag: string;
</script>

<a  href={`${base}/tag/${tag}`} class="contrast"><small>#{tag}</small></a>

<style>
    small {
        background-color: #ddd;
        padding: 2px 6px;
        margin-right: 8px;
    }
    a {
        text-decoration: none;
    }
</style>