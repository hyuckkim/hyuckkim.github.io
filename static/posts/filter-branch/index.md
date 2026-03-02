---
title: filter-branch
date: 2026. 2. 5.
---
!!! 주의: 이 코드는 파일을 정말 없앱니다.
git 정보를 건드리는 거라서 '수틀리면 git reset 치지' 도 안 돼요.

게임 코드를 깃허브에 올리고 싶은데
에셋은 내 게 아니잖아...  
gpt한테 물어봐서 이거 없애는 방법 있는지 물어봤다:

> 여깄습니다:
```bash
git filter-branch --force --index-filter \
"git rm -r --cached --ignore-unmatch assets" \
--prune-empty --tag-name-filter cat -- --all
```

> 😂 이건 bash 용이고요..
```powershell
git filter-branch --force --index-filter `
"git rm -r --cached --ignore-unmatch assets" `
--prune-empty --tag-name-filter cat -- --all
```
> 이건 powershell 용입니다.

입력하면 모든 커밋을 순회하며 폴더를 지운다.
나는 assets 폴더를 지우고 있어서 assets라고 입력했지만 다른 폴더도 가능하겠지.

아니 근데 파일도 지운다!

그래서 남아있는 건 로그뿐이다...
```text
rm 'assets/generate/female/4_hair/Female Hair10.png'
rm 'assets/generate/female/4_hair/Female Hair11.png'
rm 'assets/generate/female/4_hair/Female Hair12.png'
rm 'assets/generate/female/4_hair/Female Hair13.png'
rm 'assets/generate/female/4_hair/Female Hair14.png'
rm 'assets/generate/female/4_hair/Female Hair15.png'
rm 'assets/generate/female/4_hair/Female Hair16.png'
rm 'assets/generate/female/4_hair/Female Hair17.png'
rm 'assets/generate/female/4_hair/Female Hair18.png'
rm 'assets/generate/female/4_hair/Female Hair19.png'
```

파일 이름을 일일히 `1.png` `2.png` 로 바꾸지 않은 게 다행일까.
인공지능이 파일 이름 가지고 복구하는 함수를 다시 짜줄 수 있었다.  
휴.

```python
from pathlib import Path
import shutil
import sys
import re

RM_PATTERN = re.compile(r"""rm\s+['"](.+?)['"]""")

def extract_relpath(line: str) -> Path | None:
    m = RM_PATTERN.match(line.strip())
    if not m:
        return None
    return Path(m.group(1))

def build_filename_index(root: Path):
    index = {}
    for p in root.rglob("*"):
        if p.is_file():
            index.setdefault(p.name, p)
    return index

def recover(list_file: Path, src_root: Path, dst_root: Path):
    src_root = src_root.resolve()
    dst_root = dst_root.resolve()

    index = build_filename_index(src_root)

    for raw in list_file.read_text(encoding="utf-8").splitlines():
        rel = extract_relpath(raw)
        if not rel:
            continue

        filename = rel.name
        src = index.get(filename)
        if not src:
            print(f"[miss] {filename}")
            continue

        dst = dst_root / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("usage: python recover.py <list.txt> <input_root> <output_root>")
        sys.exit(1)

    recover(Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3]))
```
