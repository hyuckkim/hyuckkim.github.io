---
title: Daum
img: /assets/daum.png
date: 2024. 1.
---

GDSC-TUK 2기 프로젝트 Next.js 팀 제출물이다.  
처음에는 [Notion 클론 코딩 유튜브](https://www.youtube.com/watch?v=0OaDyjB9Ib8)
보고 시작한 프로젝트인데, 기능을 각자 추가하자고 해서
나는 칸반 보드 기능을 추가했다.

보드 상태관리랑 드래그 동작, db랑 연결 만든다고 삽질 좀 했다.

그래도 나름 뿌듯한 게, 다른 팀원들이 만든 캘린더 기능이나 커스텀 차트 기능이랑
꽤 잘 붙었다고 생각한다.

커스텀 훅을 써야 할 이유도 잘 알게 됐다.  
이 많은 것들을 전부 useState로 관리하면 코드가 엄청 지저분해질 것...  
어쨌든 이걸 prop으로 다 전달해야 한다고 생각하면 상태관리 라이브러리를 쓰는 게
맞는 것 같기도 하고.
```typescript
export interface KanbanBoardProps {
  content: KanbanBoard | undefined;
  onNewElement: () => void;
  onRemoveElement: (id: string) => void;
  onRenameElement: (id: string, name: string) => void;
  onMoveElement: (id: string, index: number) => void;
  onElementSetAttribute: (id: string, attributes: {}) => void;

  onAddDocument: (id: string, document: Id<"documents">) => void;
  onMoveDocument: (id: string, document: Id<"documents">, index: number) => void,
  onRemoveDocument: (document: Id<"documents">) => void;
  onDocumentSetAttribute: (Document: Id<"documents">, attributes: {}) => void;
}
```