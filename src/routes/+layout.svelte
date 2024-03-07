<script>import "../app.scss";</script>
<div class="root container">
    <header style="padding: 0;">
        <nav>
            <ul>
                <li><a href="/"><strong>라이브러리와 싸우는 사람</strong></a></li>
            </ul>
            <ul>
                <li><a href="/about">about</a></li>
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
        background-color: #fff;
        min-height: 98vh;
        margin: 0 auto;
        padding: 0 24px;
        border-radius: 4px;
    }
</style>