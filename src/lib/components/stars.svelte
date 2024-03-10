<script lang="ts">
    import { onMount } from "svelte";

    let canvas: HTMLCanvasElement;

    let w: number, h: number;
    $: config = {
        star: {
            color: 'rgba(255, 255, 255, 0.9)',
            width: 1.5
        },
        line: {
            color: 'rgba(255, 255, 255, 0.9)',
            width: 0.4
        },
        position: {
            x: w * 0.5,
            y: h * 0.5
        },
        velocity: 0.2,
        length: Math.round(w * h / 12000),
        distance: 130,
        radius: 120,
        stars: new Array<Star>(),
        event: -1,
    };
    class Star {
            x = Math.random() * w;
            y = Math.random() * h;
            vx = config.velocity - (Math.random() * 0.3);
            vy = config.velocity - (Math.random() * 0.3);
            radius = Math.random() * config.star.width;

            create(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
            }

            static animate() {
                for (let i = 0; i < config.length; i++) {
                    const star = config.stars[i];

                    if (star.y < 0 || star.y > h) star.vy *= -1;
                    else if (star.x < 0 || star.x > w) star.vx *= -1;
                    star.x += star.vx;
                    star.y += star.vy;
                }
            }
            static line(ctx: CanvasRenderingContext2D) {
                for (let i = 0; i < config.length; i++) {
                    for (let j = 0; j < config.length; j++) {
                        const iStar = config.stars[i];
                        const jStar = config.stars[j];

                        const interact = (a: {x: number, y: number}, b: {x: number, y: number}, distance: number) => (
                            (a.x - b.x) < distance &&
                            (a.y - b.y) < distance &&
                            (a.x - b.x) > -distance &&
                            (a.y - b.y) > -distance
                        );

                        if (
                            interact({ x: iStar.x, y: iStar.y }, { x: jStar.x, y: jStar.y }, config.distance) &&
                            interact({ x: iStar.x, y: iStar.y }, config.position, config.radius)
                        ) {
                            ctx.beginPath();
                            ctx.moveTo(iStar.x, iStar.y);
                            ctx.lineTo(jStar.x, jStar.y);
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
            }
        };

    onMount(() => {
        const ctx = canvas.getContext('2d');

        const createStars = () => {
            if (!ctx) return;

            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < config.length; i++) {
                config.stars.push(new Star());
                const star = config.stars[i];
                star.create(ctx);
            }

            Star.line(ctx);
            Star.animate();
        };

        const setCanvas = () => {
            if (!canvas) return;
            
            w = canvas.clientWidth;
            h = canvas.clientHeight;

            canvas.width = w;
            canvas.height = h;
        };

        const setContext = () => {
            if (!ctx) return;
            ctx.fillStyle = config.star.color;
            ctx.strokeStyle = config.line.color;
            ctx.lineWidth = config.line.width;
            ctx.fill();
        };

        const loop = (callback: () => void) => {
            callback();
            window.requestAnimationFrame(() => loop(callback));
        }

        const waitForFinalEvent = (callback: () => void, ms: number) => {
            if (config.event) {
                clearTimeout(config.event);
            }
            config.event = setTimeout(callback, ms);
        }

        const bind = () => {
            window.addEventListener("mousemove", (e) => {
                config.position = { x: e.pageX, y: e.pageY };
            });

            window.addEventListener("resize", () => {
                waitForFinalEvent(init, 700);
            })
        }

        const init = () => {
            setCanvas();
            setContext();

            bind();
        }
        init();
        loop(() => {
            createStars();
        });
    });
</script>

<canvas bind:this={canvas} />

<style>
    canvas {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
</style>