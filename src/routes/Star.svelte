<script lang="ts">
    import { onMount } from 'svelte';

    let canvas: HTMLCanvasElement;
    let w: number, h: number;

    // 설정값
    const config = {
        star: {
            color: '#fffe',
            width: 1.5
        },
        line: {
            color: '#fff9',
            width: 0.4
        },
        position: { x: 0, y: 0 },
        velocity: 0.2,
        length: 0,
        distance: 130,
        radius: 120,
        stars: [] as Star[],
    };

    class Star {
        x: number;
        y: number;
        vx: number;
        vy: number;
        radius: number;

        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = config.velocity - Math.random() * 0.3;
            this.vy = config.velocity - Math.random() * 0.3;
            this.radius = Math.random() * config.star.width;
        }

        draw(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        }

        update() {
            if (this.y < 0 || this.y > h) this.vy *= -1;
            if (this.x < 0 || this.x > w) this.vx *= -1;
            this.x += this.vx;
            this.y += this.vy;
        }
    }

    function drawLines(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < config.length; i++) {
            for (let j = i + 1; j < config.length; j++) {
                const a = config.stars[i];
                const b = config.stars[j];

                const dx = a.x - b.x;
                const dy = a.y - b.y;

                if (Math.abs(dx) < config.distance && Math.abs(dy) < config.distance) {
                    const distToMouseX = a.x - config.position.x;
                    const distToMouseY = a.y - config.position.y;
                    if (
                        Math.abs(distToMouseX) < config.radius &&
                        Math.abs(distToMouseY) < config.radius
                    ) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
        }
    }

    function initStars() {
        config.stars = [];
        config.length = Math.round((w * h) / 12000);
        for (let i = 0; i < config.length; i++) {
            config.stars.push(new Star());
        }
    }

    onMount(() => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const setCanvas = () => {
            w = canvas.clientWidth;
            h = canvas.clientHeight;
            canvas.width = w;
            canvas.height = h;
        };

        const setContext = () => {
            ctx.fillStyle = config.star.color;
            ctx.strokeStyle = config.line.color;
            ctx.lineWidth = config.line.width;
        };

        const animate = () => {
            ctx.clearRect(0, 0, w, h);
            for (const star of config.stars) {
                star.update();
                star.draw(ctx);
            }
            drawLines(ctx);
            requestAnimationFrame(animate);
        };

        const bindEvents = () => {
            window.addEventListener('mousemove', (e) => {
                config.position = { x: e.clientX, y: e.clientY };
            });
            window.addEventListener('resize', () => {
                setCanvas();
                setContext();
            });
        };

        setCanvas();
        setContext();
        initStars();
        bindEvents();
        animate();
    });
</script>

<canvas bind:this={canvas} on:click></canvas>

<style>
    canvas {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: radial-gradient(circle at center, #0d1b2a, #000);
        z-index: -9999;
    }
</style>
