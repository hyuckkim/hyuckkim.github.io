<script>
    import { base } from "$app/paths";
    import "../app.scss";
</script>
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
</div>
<style>
    :root {
        background-color: #999999;
    }
    .root {
        background-color: #ffffffcc;
        min-height: 100vh;
        margin: 0 auto;
        padding: 0 24px 6px;
    }
</style>