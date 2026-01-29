---
title: 투명
date: 2026. 1. 29.
---

애플리케이션을 투명 배경에서 실행하는 법을 알아보자.  
참고로 일단 데스크톱이어야 한다.

## WebView
나는 js가 좋아요!

[Electron](https://www.electronjs.org/docs/latest/tutorial/custom-window-styles)에선 `createWindow()`에 설정할 수 있는 옵션이 있다.
```javascript
function createWindow () {
  const win = new BrowserWindow({
    width: 100,
    height: 100,
    resizable: false,
    frame: false,
    transparent: true
  })
  win.loadFile('index.html')
}
```
`frame: false`랑 `transparent: true`를 같이 써 주면
생각했던 대로 투명하게 만들 수 있다.

[Tarui](https://v1.tauri.app/v1/api/config/#windowconfig.transparent)에선
`windowconfig`를 수정해야 한다.

```json
"windows": [
  {
    "title": "some",
    "width": 800,
    "height": 600,
    "transparent": true,
    "decorations": false,
    "shadow": false
  }
],
```
`"transparent": true`랑 `decorations: false`랑 `shadow: false`를
같이 써주면 된다.

[근데 내가 만들 때는 webview에 버그](https://github.com/MicrosoftEdge/WebView2Feedback/issues/5492)가 생겨서 다른 방법을 생각해야 했다.  
꼭 나한테만 이런 일이 발생하지.

## Wpf
어차피 데스크탑이라고 하니까 이것부터 생각났다.

`<Window>` 태그에 설정을 달면 된다.
```xml
<Window x:Class="Transparent.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:Transparent"
        mc:Ignorable="d"
        AllowsTransparency="True"
        WindowStyle="None"
        Topmost="True"
        Title="MainWindow" Height="200" Width="400">

</Window>
```
`AllowsTransparency="True"`랑 `WindowStyle="None"`을 사용하면 된다.

## GDI+
얘가 하는 게 가장 정석에 가까울 줄 알았는데 아니었다.  
우선 창을 투명하게 만드는 것 자체는 `CreateWindowEx에 이미 있긴 하다.
```C++
HWND hwnd = CreateWindowEx(
  WS_EX_LAYERED | WS_EX_TOPMOST,
  wc.lpszClassName, filename.c_str(),
  WS_POPUP,
  x, y, gDrawW, gDrawH,
  nullptr, nullptr, hInstance, nullptr);
```

`WS_EX_LAYERED`랑 `WS_POPUP`을 같이 써주면 된다.  
되는데...

### 이미지 띄우기
근데 단순히 투명하게 만들고, 투명윈도우가 울부짓었다 크아앙 하고 끝날 게 아니니까.  
결국 이미지를 띄워야 하는데 이게 험난하다.

```c++
HDC hdc = BeginPaint(hwnd, &ps);
Graphics graphics(hdc);
if (gImg) {
    gImg->Draw(graphics, gDrawW, gDrawH);
}
EndPaint(hwnd, &ps);
```
BeginPaint를 해서 그냥 이미지를 그렸었는데,
이렇게 만들면 이미지가 투명해지지 않는다.  
엄밀히 말하면 투명해지긴 하는데 창을 움직이면, 원래 칭의 배경이 그대로 따라간다.

이거에 대한 [해답](https://stackoverflow.com/questions/3970066/creating-a-transparent-window-in-c-win32)은,
`UpdateLayeredWindow`를 사용해야 한다는 것이었다.

`UpdateLayeredWindow`는 그리기를 DWM에게 직접 시키는데,
이래야 투명할 수 있다는 것이다.

근데 호출하려고 들고 있어야 하는 게 좀 많다.  
- 크기 바뀔 때마다 만드는 비트맵  
- 메모리 DC  
- 스크린 DC

```C++
// 3. 레이어드 윈도우 갱신
RECT rc; GetWindowRect(hwnd, &rc);
POINT ptWinPos = { rc.left, rc.top };
SIZE sizeWin = { w, h };
POINT ptSrc = { 0, 0 };

BLENDFUNCTION blend = {};
blend.BlendOp = AC_SRC_OVER;
blend.SourceConstantAlpha = 255;
blend.AlphaFormat = AC_SRC_ALPHA;

BOOL ok = UpdateLayeredWindow(
    hwnd,
    g_hdcScreen,
    &ptWinPos,
    &sizeWin,
    g_hdcMem,
    &ptSrc,
    0,
    &blend,
    ULW_ALPHA
);
```
그러니까 최종적으로 해야 하는 건 이거다.  
UpdateLayeredWindow에 줘야 하는 건 많긴 한데 그림 빼고 일단 나머지는 다 만들 수 있다.

```C++
Graphics g(g_hdcMem);
g.SetCompositingMode(CompositingModeSourceOver);
g.Clear(Color(0, 0, 0, 0));
gImg->Draw(g, w, h);
```
그림은 만들어야 하는데, 이건 메모리 DC에 미리 그려놔야 하고,
```C++

if (!g_hdcScreen)
  g_hdcScreen = GetDC(hwnd);

if (!g_hdcMem)
  g_hdcMem = CreateCompatibleDC(g_hdcScreen);

```
메모리 DC는 스크린 DC랑 연결해놔야 하고, 스크린 DC는 창에서 미리 받아와야 한다.

약간 어지럽긴 한데 다 빼놓고 보면직접 랜더링하는 대신 중간 Graphics에 올린다는 느낌?  
그 밖에 인공지능이 자동으로 더블 버퍼링 같은 거 만들어놨는데 이건 패스.

## DirectX
결국 최종점은 여기일 건데 안 해봤다.  
하고 나서 써야지.