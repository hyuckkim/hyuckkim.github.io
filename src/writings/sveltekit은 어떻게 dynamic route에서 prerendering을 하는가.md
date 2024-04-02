---
title: sveltekit은 어떻게 dynamic route에서 prerendering을 하는가
tags: svelte, sveltekit
date: 2024-03-12
---

Github Page에는 정적 페이지만 배포할 수 있으므로... Github에 svelte 사이트를 배포하려면 `adapter-static` 을 사용해야 한다.

근데 좀 신기한 걸 발견했다.

![Next.js 경로](/post_img/5/nextjs.png)  
(Next.js에서 [static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
를 사용해 SPA로 빌드한 모습)  
Next.js는 static으로 빌드해도 CSR을 하는 반면,

![Svelte 경로](/post_img/5/svelte.png)  
(Sveltekit에서 [adapter-static](https://kit.svelte.dev/docs/adapter-static)
을 사용해 빌드한 모습)  
Sveltekit은 제대로 index.html을 생성한다!

...심지어 `dynamic route`에서까지!  
......어떻게 하는 거지.

---

## 원리

방금 찾았는데, 좀 허무한 방법이었다.

[sveltekit 문서](https://kit.svelte.dev/docs/page-options#prerender)
에 나오는데, 루트 경로에서 출발해서 크롤링을 하는 원리라고 한다.

그래서 루트 경로에서 `<a>` 태그로 연결되어 있지 않으면 렌더링되지 않을 수 있고, `svelte.config.js`에 설정을 추가하면 적절히 렌더링되게 할 수 있다고 한다.

```js
prerender: {
    entries: ['/'];
}
```

## 그 밖에

이렇게 html 파일을 만들어버리는 식이니까,

-   POST 요청을 못 한다.
-   searchParams를 못 쓴다.  
    `onMount` 안에서 억지로 CSR 하면 되긴 하다.
-   서버에서 fetch를 보내면 compile 시간에 실행된다.

```ts
import type { PageLoad } from './$types';
export const prerender = true;
export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch('/my-server-route.json');
    return await res.json();
};
```

어찌 생각하면 당연한 얘기긴 한데 좀 당황했다.
