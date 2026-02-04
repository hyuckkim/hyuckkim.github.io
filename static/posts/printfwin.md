---
title: winMain이지만 printf는 쓰고 싶어
date: 2026. 2. 5.
---

```C
int APIENTRY wWinMain(
    _In_ HINSTANCE hInstance,
    _In_opt_ HINSTANCE hPrevInstance,
    _In_ LPWSTR    lpCmdLine,
    _In_ int       nCmdShow)

```

`winMain`이나 `wWinMain`은 윈도우에서 main을 대체해서 쓰는 실행기다.

복잡한 건 넘기고 일단 `main()`이랑 다르게 콘솔 창이 안 나온다는 특징이 있다.  
근데 디버그 모드에서 printf 못 쓰는 게 너무 뼈아프다...
또 lua 바인딩해 놨으면 lua의 `print()`도 콘솔에 출력해서 없으면 디버깅이 매우 불편하다

그래서 해결방법을 찾아 왔다.
[AllocConsole](https://learn.microsoft.com/ko-kr/windows/console/allocconsole)이다.
```C
#ifdef _DEBUG
    if (AllocConsole()) {
        FILE* fp;
        freopen_s(&fp, "CONOUT$", "w", stdout);
        freopen_s(&fp, "CONOUT$", "w", stderr);
        printf("Debug Console Opened\n");
    }
#endif
```
이걸 넣으면 콘솔이 열린다. `stdout`이랑 `stderr`를 콘솔에 연결하는 과정 포함.

## 프리징
매 프레임 lua에서 print를 하니까 뜬금없는 타이밍에 프리징이 걸린다.  
lua나 C++ 단이나 문제는 없는데 이걸 매프레임 하고 있으니까 문제겠지

```C
void flush_logs() {
    if (g_frameLogBuffer.empty()) return;

    for (const auto& log : g_frameLogBuffer) {
        printf("%s\n", log.c_str());
    }

    g_frameLogBuffer.clear();
}
```

```C++
lua["print"] = [](sol::variadic_args args) {
  std::string full_msg = "";
  sol::function to_string = lua["tostring"];

  for (auto v : args) {
    std::string s = to_string(v.get<sol::object>());
    full_msg += s + "  ";
  }

  g_frameLogBuffer.push_back(full_msg);
  };
```

lua 프린트 함수를 덮어씌워서 printf가 C++에서 통제된 타이밍에 걸리게 만들었다.  
이러니까 해결되긴 한다는 게 참 미묘
