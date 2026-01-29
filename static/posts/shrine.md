---
title: shrine-pi
img: /assets/shrine.png
date: 2025. 10.
---

[보기](https://shrine-pi.vercel.app) ·
[Github](https://github.com/hyuckkim/shrine)

## 기능
[원본 리포지토리](https://github.com/LoneGazebo/Community-Patch-DLL)와
[번역 리포지토리](https://github.com/handanikr/vp_kr)의
v4.22 버전과 현재 버전을 파싱해 분석한 결과를 보여준다.

- 원본에서 번역이 바뀌었다면 따라서 번역이 바뀌어야 한다.
- 원본에서 태그가 바뀌었다면 따라서 태그가 바뀌어야 한다.
- 원본과 파일 위치가 달라진 부분은 대분류는 유지한 채로 반영해야 한다.
- 대분류마다 겹치는 태그도 존재한다.
- 구문 전체가 {} 또는 [] 안에 있으면 '기술적 태그'로 표시하고
번역률에 표시하지 않는다.

필터링 기능과 차이점 표시 기능은 나중에 만들었다.

## 사족
vercel에 올렸는데 그냥 빌드 명령어 전 부분에 `node 파일`을 입력하면
전처리를 할 수 있었다. 처음 알았다.