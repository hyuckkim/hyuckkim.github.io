<script>
    import { base } from "$app/paths";
    import Stars from "$lib/components/stars.svelte";
    import "../app.scss";
</script>
<Stars />
<div class="absolute">
    <div class="root container">
        <header>
            <nav>
                <ul>
                    <li><a href={`${base}/`}><strong>라이브러리와 싸우는 사람</strong></a></li>
                </ul>
                <ul>
                    <li><a href={`${base}/new`}>글쓰기</a></li>
                    <li><a href={`${base}/about`}>about</a></li>
                </ul>
            </nav>
        </header>
        <main class="container">
            <slot />
        </main>
        <footer>
            <a href="https://github.com/hyuckkim/hyuckkim.github.io/">
                <img src="https://github.com/hyuckkim/hyuckkim.github.io/actions/workflows/deploy.yml/badge.svg" alt="">
            </a>
        </footer>
    </div>
</div>

<style>
    :root {
        background-color: #555555;
    }
    .root {
        background-color: #ffffffaa;
        min-height: 100vh;
        margin: 0 auto;
        padding: 0 24px 6px;
    }
    .absolute {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    footer {
        padding: 8px;
    }
</style>