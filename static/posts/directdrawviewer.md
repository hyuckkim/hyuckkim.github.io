---
title: directdraw-viewer
img: /assets/directdraw-viewer.png
date: 2026. 1.
---

[Marketplace](https://marketplace.visualstudio.com/items?itemName=hyuckkim.directdraw-viewer) ·
[Github](https://github.com/hyuckkim/directdraw-viewer)

vscode 확장프로그램.

## 기능
[dds](https://ko.wikipedia.org/wiki/%EB%8B%A4%EC%9D%B4%EB%A0%89%ED%8A%B8%EB%93%9C%EB%A1%9C_%EC%84%9C%ED%94%BC%EC%8A%A4) 파일을 열 수 있게 해준다.  
여러 레이어가 있으면 그 중 하나를 표시하고 나머지 레이어는 하단에서 선택할 수 있다.  
좌측 상단의 다운로드 버튼을 누르면 다운로드 받을 수 있다.

## 사족
생각보다 인터넷의 세계에 빈 공간이 엄청 많다.  
내가 며칠 슬쩍 만드는 걸로 빈 공간을 채울 수 있다면 그게 좋지.

### 이미지
이미지 내부의 비트맵을 가져와서 웹뷰에 올려야 하는 건데,
이게 대답하는 인공지능 고장내기가 딱 좋아보인다.

가상 파일 시스템 써서 거기에 올린다음 그걸 여는 게 성능상 좋다고 말한다던가  
(진짜일 순 있겠지만 라이브러리 얼마나 커지게)  
이미지들을 동적으로 전달하는 게 훨씬 빠르다고 한다던가  
(오히려 오류가 바로 안 나와서 더 갑갑해진다)

base64 png로 보내는게 제일 안정적인 것 같아서 결국 그걸로 마무리.  
다른 참고할만한 리포지토리가 있었으면 좋았을 텐데.