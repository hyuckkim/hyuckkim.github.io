---
title: 나는 폰코딩을 했다
date: 25. 3. 13.
---

군대에 가고서부터 아무래도 쓸 수 있는 기기가 폰밖에 없으니까 폰으로 이것저것을 하게 됐다.
코딩은 내 전공이긴 한데 취미기도 해서 그걸 하려고도 했었고.

내가 타이핑을 한땀한땀 엄지로 하는 건 말이 안 되고
ai가 코드줄을 짜 주면 그걸 붙여넣는 방식이
제일 그럴듯해보여서
[편집기](/post/aiwork)
도 만들고 그랬었다.

근데 전역하고 복학하고 나서도 은근 쓸만한 것 같다:  
군대에선 없었던 하드웨어 키보드가 있으니까 더더욱!  
emacs랑 하드웨어 키보드랑 이것저것 연결한 이야기.

목차: 
- termux
- 한글 입력
- 클립보드
- 테마
- emacs

## termux
리눅스 터미널이라고 생각하면 된다.
[공식 홈페이지](https://termux.org)
가 있어서, 여기서 설치하면 된다.
(구글이 아니다!)  
F-Droid라는 게 있으면 자동 업데이트가 된다는 것 같은데
어차피 termux 안에서 `pkg update` `pkg upgrade`
쓴다 치면 딱히 의미없는 것 아닌가?  
app 단에서 고쳐야 할 보안 패치 같은 거 있으면
필요하려나.

약간 background에서 돌아갈 것 같은 칙칙한 인상 답게
그냥 뒤로가기 눌러서 나가도 꺼지지 않는다.  
진짜 끄려면 알림 창에 나타난 Termux에서
Exit를 선택해야 한다.

왼쪽 끝 부터 오른쪽으로 드래그하면
하얀색 창이 나오는데
놀랍게도 세션을 여러 개 열 수 있다!
(닫을 순 없다)

만약 물리 키보드를 사용중이라면
Ctrl + Alt + C로 세션을 만들고  
Ctrl + Alt + 1~9로 선택할 수 있다.  
Ctrl + Alt + P 또는 N으로 다음 / 이전을
선택할 수도 있다.

## 한글 입력
놀랍게도, 한글이 기본으로 된다!  
엄청 버벅거리면서 기묘한 동작으로 되긴 하는데...
나는 그게 한국어가 그렇게 되고 끝인줄 알았다.

하지만 `~/.termux/termux-properties`에 들어가보면
`enforce-char-based-input = true` 라는 게
주석처리 되어 있다.

이 주석을 바꾸면 termux가 자기 멋대로 입력 데이터를
섞어서 원할 때 출력하던 걸 키보드가
(물리 키보드던, 가상 키보드건)
입력한 대로 뱉어내게 된다.

물론 입력중인 글자는 안 나오고
단축키 누른다고 기존 입력들을 먼저
뱉어내는 것도 아니라
그래도 사용감이 이상할 수도 있다.  
근데 그 정도는 감안해야 한다고 생각한다..

## 클립보드
꾹 누르면 copy나 paste 버튼이 뜨기는 하지만
맨날 꾹 누르고 있긴 좀 그렇다.  
특히 코드가 화면보다 길면 복사하기 매우 어려워진다.

termux-api라는 앱을 깔면 클립보드에 명령어로
접근할 수 있다.

`termux-clipboard-set 복사할텍스트` 를 입력하면
텍스트를 복사할 수 있다.  
`cat | termux-clipboard-set` 을 이용하면 파일을
복사할 수 있다!

`termux-clipboard-get`을 입력하면
마지막으로 클립보드에 복사된 텍스트를 꺼낸다.
이것도 `termux-clipboard-get > result.txt`를 사용해
파일에 쓸 수 있다!

나는 명령어가 길어서
`.bashrc`에 조금 줄인 별명을 넣었다.

```bash
alias ttcs='termux-clipboard-set'
alias ttcg='termux-clipboard-get'

```

## 테마
기본 색 솔직히 좀 눈 아프다. 바꿔야 한다.
아무 곳을 꾹 누르면 나오는 Copy Paste 메뉴에서
`More...` 를 누르면 Style을 설정할 수 있다.

적당히 폰트와 색상을 고르면 된다.

## emacs
`pkg install emacs` 로 emacs를 깔았다.  
근데 이제 뭐함?

`(xclip-mode 1)`  
클립보드를 활성화시켜야 한다.
기본으로는 emacs 기본 ctrl+y가
emacs 자체 클립보드만 사용한다.

`(load-theme 'gruvbox-dark-hard t)`  
테마를 아까 바꾼 테마와 맞춰야 한다.

```
(defun my/remove-cr-in-yanked-text (beg end)
  "Remove carriage return characters in the yanked text between BEG and END."
  (save-excursion
    (save-match-data
      (when (and beg end (< beg end))
        (if (fboundp 'atomic-change-group)
            (atomic-change-group
              (replace-string "\r" "" nil beg end))
          (replace-string "\r" "" nil beg end))))))

(defun my/after-yank-remove-cr (&rest _)
  "Advice to remove CR characters after yank."
  ;; 붙여넣은 텍스트 범위를 직접 계산
  (let ((beg (mark t))   ;; yank 직후 mark는 붙여넣기 시작점
        (end (point)))   ;; point는 붙여넣기 끝점
    (when (and beg end)
      (my/remove-cr-in-yanked-text beg end))))

(advice-add 'yank :after #'my/after-yank-remove-cr)
```
붙여넣기 할 때마다 몇몇 데이터가 CRLF로 들어오는데
이거 리눅스 LF로 맞춰야지

등등등 당연히 이맥스에선 할 수 있는게 엄청 많다.  
나는 
[코파일럿](https://github.com/copilot-emacs/copilot.el)
도 연결했다...  
코파일럿 없으면 코딩 못해
