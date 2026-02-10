---
title: USB 프린터를 iptime 공유기에 물려서 네트워크 프린터처럼 사용하기 (CLI)
date: 26.2.11
---

우리 집 프린터는 네트워크 기능이 없다.
그렇다고 컴퓨터 하나를 계속 켜 두기도 뭐해서, 공유기 기능을 써 보기로 했다.

## 공유기 설정
![iptime 설정 창. 네트워크 프린터 서버.](assets/printer1.png)
네트워크 프린트 서버 기능을 켜고 장치 관리에도 장치가 잘 연결되어 있는지 확인해야 한다.

뭐 이건 당연한 거니까..

## 수동 설치하기...
그 전에, 파일 만드는 건 대부분 오버일테니까 수동으로 설치하는 법부터.

### 드라이버
적당히 자기가 쓰는 프린터의 드라이버를 받아야 한다.  
나는 [삼성](https://www.samsungsvc.co.kr/download/view?code=SL-M2027)이다.

이 때 드라이버에 있는 exe 파일 실행하고 시키는 대로 하면 설치가 될 것이다.

### 설정에서 추가하기
![프린터 및 스캐너 > 수동으로 새 장치 추가 ](assets/print2.png)
윈도우에서 프린터 및 스캐너 설정 창을 잘 뒤지다 보면 수동으로 새 장치 추가 창이 나오는데  
그럼 웹 주소를 입력할 수 있다.

![인증서 추가 마법사](assets/print3.png)
적당히 맞는 인증서 찾아서 꽂으면 완료.

## 배치 파일 만들기
우선 내가 만든 최종 배치 파일은 다음과 같다:

```bat
@echo off

REM 관리자 권한 확인
openfiles >nul 2>&1
if %errorlevel% neq 0 (
    echo [오류] 관리자 권한으로 실행되지 않았습니다.
    echo 마우스 오른쪽 버튼을 눌러 '관리자 권한으로 실행'을 선택하세요.
    pause
    exit
)

pushd "%~dp0"

set INF_PATH="Printer\UPD\us015.inf"
set DRIVER_NAME="Samsung M2020 Series"
set PRINTER_NAME="Samsung_M2027_IPP"
set PORT_URL="http://192.168.0.1:631/printers/ipTIME_Printer"

echo 1. 드라이버를 등록합니다...
pnputil /add-driver %INF_PATH% /install

echo 2. 드라이버 파일을 복사합니다...
rundll32 printui.dll,PrintUIEntry /ia /m %DRIVER_NAME% /f %INF_PATH%

echo 3. IPP 프린터를 생성합니다...
REM /u 옵션은 기존 포트가 있어도 무시하고 설치를 시도합니다.
rundll32 printui.dll,PrintUIEntry /if /b %PRINTER_NAME% /r %PORT_URL% /m %DRIVER_NAME%

echo 설치가 완료되었습니다. Samsung_M2027_IPP 프린터가 있는지 확인해주세요.
start ms-settings:printers
pause
```

이 배치 파일을 실행하면 자동으로 드라이버를 등록하고
새 프린터를 등록해 그 프린터가 새 드라이버를 사용하게 한다.

사용에는 inf 파일이 필요하고 (드라이버 목록 정의 파일이다),  
PRINTER_NAME은 마음대로 정할 수 있지만 DRIVER_NAME은 아니다.

INF_PATH로 넣은 파일을 읽어보면 어떤 값으로 정해야 하는지 알 수 있다.

```bat
%DriverName% = DRVINSTALL, USBPRINT\SamsungC410_SeriesC150
%DriverName% = DRVINSTALL, WSDPRINT\SamsungC410_SeriesC150    
%DriverName% = DRVINSTALL, USBPRINT\SamsungM2070_SeriesAAFA
%DriverName% = DRVINSTALL, WSDPRINT\SamsungM2070_SeriesAAFA   
%DriverName% = DRVINSTALL, USBPRINT\SamsungC420_Series3144
%DriverName% = DRVINSTALL, WSDPRINT\SamsungC420_Series3144   
"Samsung M2020 Series" = DRVINSTALL, USBPRINT\SamsungM2020_SeriesFAC5 
"Samsung M2020 Series" = DRVINSTALL, WSDPRINT\SamsungM2020_SeriesFAC5     
"Samsung C43x Series" = DRVINSTALL, USBPRINT\SamsungC43x_Series14CC  
"Samsung C43x Series" = DRVINSTALL, WSDPRINT\SamsungC43x_Series14CC
"Samsung M2010 Series" = DRVINSTALL, USBPRINT\SamsungM2010_Series0AD1
"Samsung M2010 Series" = DRVINSTALL, WSDPRINT\SamsungM2010_Series0AD1
"Samsung M2060 Series" = DRVINSTALL, USBPRINT\SamsungM2060_Series3AF7
"Samsung M2060 Series" = DRVINSTALL, WSDPRINT\SamsungM2060_Series3AF7
```
(적어도 내가 받은 파일에는) 수십 개의 드라이버로 들어 있고 그 중에 뭘 쓸 지 선택하는 건데,
이건 내 프린터와 맞춰야 한다.

프린터가 USB 용으로 지정되어 있어서 한 단계를 더 거쳐야 한다든지 하는 이슈가 있지만
자동화하고 나면 끝이지 뭐.