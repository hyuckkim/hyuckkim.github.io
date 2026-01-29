---
title: 안녕 프로그래밍 언어
img: /assets/anyoung.png
date: 2021. 3.
---

[Github](https://github.com/hyuckkim/anyoung)

C언어로 만든 가상 언어의 REPL.  
선인고등학교 2학년 1학기 정보 주제연구 주제로 발표했었다.

한글 프로그래밍 언어에서 '조사'에 집중했다.  
문장 하나에 조사를 전부 다른 걸 쓰면
일종의 named argument처럼 쓸 수 있지 않을까? 하는 감상에서 시작했다.

실행할 기본 함수들을 함수 포인터에 집어넣어 놓고,
그때그때 문자열로 파싱해서 실행한다.  
나름 조건문이나 반복문도 있는데,
구현 방식이 '높이'가 1보다 높은 구문들을 전부 문자열로 저장해두는 것이다.

함수 포인터에는 사용자 함수도 정의할 수 있는데, ('동작'으로 있다)  
이것도 구현 방식이 마찬가지로 함수 문자열들을 저장해놓는 것.  
이래놓고 이곳저곳에서 배열 길이 제한이 있어서
(malloc에 익숙하지 않았다)
변수 너무 많이 정의하면 깨진다.

변수는 int랑 string이 있고 간단한 연산자를 구현해 놨다.

CodePage 65001에서 빌드한 버전과 아닌 버전으로 나눠서 만들었었고,
서로 반대 방향에서 실행하면 깨진다.  
내부적으로 UTF-8을 한 바이트씩 파싱해서 사용하기 때문.

## 예제
```안녕
"Hello, world!"를 말하기
```
국룰 hello world.

```안녕
a를 2로 정하기
8번 되풀이
    b를 1로 정하기
    9번 되풀이
        c를 a * b로 정하기
        말하기 a + " x " + b + " = " + c를
        b를 1만큼 더하기
    여기까지
    a를 1만큼 더하기
여기까지
```
구구단 만들기. '말하기'를 앞에 써놨는데, 뒤에 써도 작동한다.

```안녕
되풀이 i로 100번
    술을 99 - i로 정하기
    조건 술 = 0이면
        "No more bottles of beer on the wall, no more bottles of beer."를 말하기
        "Go to the store and buy some more, 99 bottles of beer on the wall."를 말하기
    여기까지
    조건 술 = 1이면
        "1 bottle of beer on the wall, 1 bottle of beer."를 말하기
        "Take one down and pass it around, no more bottles of beer on the wall."를 말하기
    여기까지
    조건 술 = 2이면
        "2 bottles of beer on the wall, 2 bottles of beer."를 말하기
        "Take one down and pass it around, 1 bottle of beer on the wall."를 말하기
    여기까지
    조건 술 > 2이면
        술  + " bottles of beer on the wall, "+ 술  + " bottles of beer."를 말하기
        "Take one down and pass it around, " + (술 - 1)+ " bottles of beer on the wall."를 말하기
    여기까지
여기까지
```
유명한 예제 프로그램인데 잘 모르겠음.

## 사족
당시에 ['아희'](https://aheui.readthedocs.io/ko/latest/)에 엄쳥 빠져있었다.  
한글 프로그래밍 언어가 진지하게 괜찮아 보이기도 하고 그래서 유니티에 있는 내가 만든 모든 변수를 한글로 적기도 하고.  
(이렇게 하면 장점이 딱 하나 있다, 이 변수는 내가 만들었군! 이라고 할 수 있긴 하다.)

그래서 한글 프로그래밍 언어에 대해서 이것저것 찾아봤는데,
조사 위주로 작동하는 구현체는 하나도 없었다.  
어라? 이 정도면 나도? 하고 급하게 만들었다...

![문자열을 변수로 사용](/assets/anyoung-eval.png)
_뭔가 자바스크립트에서 저지를 법한 범죄를 저지르는 나.png_  

꺄아아아악!!  
배열을 못 만들어서 이렇게라도 쓰라고 만들었던 것 같다.