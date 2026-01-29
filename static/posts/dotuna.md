---
title: DoTuna
img: /assets/dotuna.png
date: 2025. 6.
---

[Github](https://github.com/hyuckkim/DoTuna)

C# winform으로 만든 html 생성기.

## 기능
index.json과 게시글.json으로 이루어진 [아카이브 폴더](https://mega.nz/folder/COpUVSxY#AEbhRcjb2lzLQ0K9t0n9ng/folder/Pb43BLDK)를 열 수 있다.  
스레드 이름과 유저 이름으로 필터링할 수 있다.  
생성될 이름을 자세히 지정할 수 있다.
`{id}`, `{title}`, `{name}`, `{created}`, `{updated}`, `{size}`
가 각 스레드별 변수로 대체된다.  
/ 문자열을 파싱해서 실제 폴더 형식으로 대체한다.


## 배경
[참치 인터넷 어장](https://tunaground.net) 이라는 사이트가 있다.  
해외 사이트처럼 스레드 기반의 게시판에
AA (아스키 아트지만 지금은 아무 글자나 써서 만듬) 창작이 주가 되는 사이트인데,
이 사이트가 Next.js 기반으로 전면 개편을 하면서
구 데이터를 [대방출](https://mega.nz/folder/COpUVSxY#AEbhRcjb2lzLQ0K9t0n9ng/folder/Pb43BLDK)했다.

[아카이브](https://archive.tunaground.net/)도 따로 있고 해서 괜찮겠지 했는데
아카이브가 없어진다 그래서 허겁지겁 파일로 랜더링하는 걸 다시 만들었다.  
사실 html 파일 자체는 이미 만들어져서 다운받을 수 있는 형식으로 있긴 한데
사람들이 원하는 건 원하는 파일만 폴더별 파일별로 다운로드 받는 것.

이때 군대 안에 있었어서, 하루에 2시간씩 사지방 가면서 구조 고치고 했었다.  
사지방에선 애초에 큰 파일을 못 받아서 테스트를 못하다 보니
O(n^3)으로 동작하고 있는 걸 발견 못 한 사소한 찐빠가 있었지만,  
휴가가서 고쳤으니 이런들 어떠하리 저런들 어떠하리

마지막엔 [네이티브 아카이브](https://tunaground.github.io/lightuna-list/anchor)가 만들어져서 만든 의미가 없어진 느낌...  
이것도 검색 기능이랑 페이지네이션 없는 게 불편해서 [내가 추가한](https://hyuckkim.github.io/lightuna-list/anchor) 게 있다.