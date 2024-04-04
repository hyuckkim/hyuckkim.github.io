<script>
    import Stars from '$lib/components/stars.svelte';
    import '../app.scss';
</script>

<Stars />
<div class="absolute">
    <div class="root container">
        <div>
            <header>
                <nav>
                    <ul>
                        <li><a href={`/`}><strong>라이브러리와 싸우는 사람</strong></a></li>
                    </ul>
                    <ul>
                        <li><a href={`/new`}>글쓰기</a></li>
                        <li><a href={`/tag`}>tag</a></li>
                        <li><a href={`/about`}>about</a></li>
                    </ul>
                </nav>
            </header>
            <main class="container">
                <slot />
            </main>
        </div>
        <footer>
            <a href="https://github.com/hyuckkim/hyuckkim.github.io/">
                <img
                    src="https://github.com/hyuckkim/hyuckkim.github.io/actions/workflows/deploy.yml/badge.svg"
                    alt=""
                />
            </a>
        </footer>
    </div>
</div>

<style>
    :root {
        background-color: var(--pico-muted-color);
    }
    .root {
        --alpha: 0.8;
        background-color: color-mix(in srgb, var(--pico-background-color), transparent 20%);
        min-height: 100vh;
        margin: 0 auto;
        padding: 0 24px 6px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .absolute {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    header {
        margin-left: -24px;
        margin-right: -24px;
        margin-bottom: 12px;
        padding-left: 12px;
        padding-right: 12px;
        background-color: var(--pico-background-color);
    }
    footer {
        margin-left: -24px;
        margin-right: -24px;
        margin-bottom: -6px;
        padding-left: 8px;
        padding-right: 8px;
        padding-top: 28px;
        padding-bottom: 28px;
        background-color: #0003;
    }
</style>
