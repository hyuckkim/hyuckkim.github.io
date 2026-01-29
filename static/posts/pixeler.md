---
title: Pixeler
img: /assets/pixeler.png
date: 2022. 1.
---

[Github](https://github.com/hyuckkim/Pixeler) ·
[해 보기](https://hyuckkim.github.io/Pixeler)

html 파일.
'팔레트 만들기' 버튼을 클릭하면
이미지가 알고리즘에 의해 몇 개 색상의 조합으로 변경된다.

하단 색상 input을 통해 각각의 색상을 바꿀 수 있다.  
이미지는 다운로드 버튼을 눌러 저장할 수 있다.


## 사족
[Loren Picsum](https://picsum.photos/)을 사용했다.  
이 때 로렘 입숨 비슷한 거 엄청 내가 만든 프로젝트에 넣고 싶었어서 하나 넣었는데 잘 들어간 것 같다.

### 아이디어
러스트에 [imagequant](https://pngquant.org/lib/) 라는 라이브러리가 있다.  
[https://squoosh.app/](https://squoosh.app/)을 보다가 알게 된 사이트인데,
이미지를 최대한 원래와 비슷한 최소 색상으로 나타내서
극적인 용량 압축 효고를 얻을 수 있다.  
(quant라고 하는 분야가 원래 있다는 걸 나는 몰랐다.)

근데 이거랑 반대로, 색 개수를 일부러 극단적으로 줄이면
어쩔 수 없이 픽셀화에 가까운 그림이 된다.  
그리고 그걸 노렸다!

그리고 이제 팔레트에 접근해서 색을 내가 원하는 색으로 바꾸면, 짜잔.  
뭔가 앨범 아트 같은 느낌에 이상한 그림이 된다.
