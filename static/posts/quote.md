---
title: 문명 6 목소리 학습
date: 2026. 2. 20.
---

GPT-Sovits 사용기

명언 같은 건 전부 게임 안에 적혀 있으니까 엄청 쉽지 않을까...  
이걸로 5편 텍스트들을 읽게 하면 재미있을지도?
라고 생각하고 시작된 여정

## 전처리
우선 오디오를 쓸 수 있는 형식으로 바꿔야 한다.
오디오는 wem 파일인데,
[vgmstream](https://github.com/vgmstream/vgmstream)으로 어떻게 하면 된다.

### 대사 조합
- 대사 파일은 id.wem으로 들어가 있어서 (숫자) xml에서 id를 매칭해줘야 한다.  
- GPT-Sovits에 적당한 조합을 만들어야 한다. `경로|이름|언어|텍스트`다.  

적고 나니까 생각보다 적을 게 적네.

## 학습
[Github Readme](https://github.com/RVC-Boss/GPT-SoVITS/blob/main/docs/ko/README.md)
읽고 똑같이 했다. conda부터 깔고.  
저거 다 하고 go-webui.bat 파일을 실행하면 webui가 잘 켜진다.  
배치 파일에 CN을 KR로 바꾸면 한글도 나온다.

![드러나는 ui](/assets/quote/1.png)

0- 1- 2- 하는 메뉴가 있다.
0은 음성 미리 잘라주는 툴이고 (사실상 미리 했다)  
1을 해야 한다.  
2는 비어있다. 아마 누군가 만들지 않을라나

![ABC](/assets/quote/2.png)
1A- 1B- 1C- 하는 메뉴가 있다.  
1C가 학습 완료된 모델로 소리를 만드는 부분이고 그걸 위해 1A 1B를 모두 거쳐아 한다.

1A는 금방 끝나고, 1B가 오래 걸린다.  
노란색 버튼 3개를 순서대로 누르거나 맨 아래 '원클릭 실행' 을 누르면 1A는 완료

![B](/assets/quote/3.png)
SoVITS 훈련과 GPT 훈련을 순서대로 하면 된다.  
SoVITS 훈련은 내 노트북 (3060) 기준으로 10분만에 됐는데
GPT 훈련은 4시간 걸렸다.

![C](/assets/quote/4.png)
C 메뉴.  
gpt 목록에서 학습된 모델을 잘 선택하고 추론 WebUI 버튼을 누르면 또 다른 창이 열린다.  
모델은 새 창에서도 바꿀 수 있으니까 학습한 ckpt랑 pth가 잘 표시되는지만 확인하기.

![새 창](/assets/quote/5.png)
생성에는 '참고 정보' 라는 게 필요하다.  
학습에 쓰인 오디오 파일 하나 넣으라는 것 같은데, 왜 이런 방식인지는 잘 모르겠다.  
아무튼 적당한 길이의 오디오를 하나 따로 빼 놓고 생성할 때마다 쓰면 된다.  
나는 파일 이름도 텍스트로 만들어놨다.

'참고 오디어의 언어' 랑 '합성해야 할 언어' 를 한국어 (또는 학습한 언어)로 바꾼다.   
이거 안 바꾸고 했더니 웬 이상한 잡음만 들려서 깜짝 놀랐었다.

그리고 이제 텍스트를 넣고 맨 아래의 '합성 음성' 버튼을 누르면.

<audio controls>
  <source src="/assets/quote/res.wav" type="audio/wav">
  Your browser does not support the audio element.
</audio>  

내가 원하는 텍스트를 읽힐 수가 있다. 신난다.