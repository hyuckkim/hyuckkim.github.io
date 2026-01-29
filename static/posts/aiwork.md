---
title: AIwork 에디터
img: /assets/aiwork.png
date: 2025. 8.
---

[해 보기](https://hyuckkim.github.io/aiwork/editor.html) ·
[Github](https://github.com/hyuckkim/aiwork)

html + alpine으로 만들어진 정적 파일

## 기능
vi와 비슷하게, 에디터 모드와 텍스트 모드가 나뉘어 있어서
텍스트 모드에서만 직접 수정할 수 있다.  

텍스트 모드에서는 각 줄이 수정 가능한 상태로 바뀌어서 클릭하면
(모바일에서는 가상 키보드가 등장하며)
수정할 수 있다.  
각 줄이 서로 다른 요소로 이루어져서 일부 장치와 호환이 안 된다.

에디터 모드가 이 모드의 핵심 부분이다.  
각 줄이 선택 단위가 되어서 잘라내기와 치환의 범위가 된다.


## 배경
```javascript
// svelte.config.js
const config = {
  kit: {
    // CSS 파일 크기가 4kb 미만이면 별도 파일로 만들지 않고 HTML에 포함시킴
    inlineStyleThreshold: 4096, 
    // ... 기타 설정
  }
};
```
ai가 코드 조각을 자꾸 이런 식으로 준다.  
설명은 알겠는데 나는 핸드폰에서 간단히 바꾸려고 질문하는 거여서
한 줄 복붙도 쉽지 않다.

그렇다고 매 질문마다 전체 파일 다 달라고 하기도 좀 그래서
내가 직접 잘라내서 붙이는 도구를 만들었다.

[Termux-clipboard-set](https://wiki.termux.com/wiki/Termux-clipboard-set) 이랑
[Termux-clipboard-get](https://wiki.termux.com/wiki/Termux-clipboard-get)
가지고 사용했다.

## 사족
pwa 처음 만들어봐서 우여곡절이 좀 많았다...  
오프라인에서 불러오기 가능하게 하는 거 은근 신경쓸 점이 많았었다.

대대적인 상태 관리를 가지고 있긴 하지만
html 파일 하나로 끝내고 싶어서 alpine을 골라 봤는데, 꽤 잘 맞는 것 같다.  
ai가 자꾸 vue에만 있는 변수들을 가져온다는 문제가 있긴 한데 그거 치고도.