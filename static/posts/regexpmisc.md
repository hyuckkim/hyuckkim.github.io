---
title: regexp-misc
img: /assets/regexp-misc.png
date: 2023. 12.
---

[npm](https://www.npmjs.com/package/regexp-misc) ·
[Github](https://github.com/hyuckkim/regexp-misc)

간단한 정규식 도구 몇 개

## 타입
`RegExpExecArray`는 `regexp.exec()`의 결과로 나오는 변수다.
`[0]`이 찾은 정규 구문이고, 나머지는 정규식에서 `()`로 감싼 부분 구문이다.


## 함수

### separate
```typescript
separate(text: string, regexp: RegExp): (string | RegExpExecArray)[]
```

split은 텍스트만 남기니까,
그 대신 표현식을 찾은 부분에서는 표현식을 사용해서 반환한다.

`value is string`으로 분기해서 각자 사용할 수 있다.

#### 예제
```javascript
const s = separate('hello, <h>regexp</h> <b>world</b>!', /<.+?>(.+?)<\/.+?>/g);
console.log(s);
```

이렇게 함수를 쓰면

```javascript
[
  'hello, ',
  (RegExpExecArray),
  ' ',
  (RegExpExecArray),
  '!'
]
```

이런 식으로, 태그는 객체로 나머지 부분은 텍스트로 나온다.

### match
```typescript
match<T>(text: string, array: [RegExp, (found: RegExpExecArray) => T][]): T | null
```

한 코드에 여러 정규식을 매칭해서, 찾은 정규식을 실행한다.

#### 예제
```javascript
match(line, [
  [/^# (.+)/, m => ({ type: 'h1', text: m[1] })],
  [/^\* (.+)/, m => ({ type: 'li', text: m[1] })],
  [/^```/,     _ => ({ type: 'code_start' })],
])
```

## 사족
정작 만들어놓고 한 두 번 썼나.  

import가 제대로 안 돼서 쓰려면 `import * as tool` 이런 식으로 써야 됐었어가지고.  

gpt한테 물어보니까 어떻게어떻게 하면 고칠 수 있다고 그런다.  
제작년까진 이렇게 안 알려줬어..