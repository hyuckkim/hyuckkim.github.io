---
title: ModinfoBuilder
img: /assets/modinfobuilder.png
date: 2022. 10.
---

[Github](https://github.com/hyuckkim/modinfobuilder)

문명 시리즈의 모드를 저장하는 modinfo 파일에는, 
모드 안에서 사용될 파일들을 지정하는 부분이 있다.
```xml
<File md5="126C1F85517B60986C1DC86657080234" import="0">Core Files/Overrides/CivilopediaScreen.lua</File>
<File md5="91EA30067A01B6A388F3F5B590557608" import="0">Database Changes/Text/ko_KR/AI/DiplomacyResponseTextChanges.sql</File>
<File md5="1EA879F80F8818532A8A3CB6CBBFA4FB" import="0">Database Changes/Text/ko_KR/AI/NewDiplomacyResponseText.xml</File>
```
원래 공식 모딩 툴을 사용하면 md5 해시는 자동으로 갱신되는데,
메모장으로 열어서 수정하면 당연히 갱신되지 않는다.  
폴더를 순회하면서 해시를 갱신해주는 도구다.

사실 해시 안 맞아도 작동은 잘 해서 나중가면 안 쓰기는 했다.