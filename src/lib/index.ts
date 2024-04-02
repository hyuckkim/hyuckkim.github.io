import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import { writable } from 'svelte/store';

const pageLength = 10;
const files = import.meta.glob('/src/writings/*.md', {
    query: '?raw',
    import: 'default'
});

let data: {
    metadata: {
        [key: string]: string;
    };
    data: string;
    name: string;
    index: number;
}[] = [];

async function loadData() {
    if (data.length !== 0) return;

    const loaded = await Promise.all(Object.keys(files)
    .map((k) => ({ name: k, data: files[k] }))
    .map(async (l) => ({
        name: l.name,
        data: await l.data()
    })));

    data = loaded.map((d) => {
        if (typeof d.data === 'string') {
            const markdown = parseMarkdownWithMetadata(d.data);
            return {
                metadata: markdown.metadata,
                data: markdown.data,
                name: splitNameOnly(d.name)
            };
        } else {
            return {
                metadata: {},
                data: '',
                name: splitNameOnly(d.name)
            };
        }
    })
    .sort((f1, f2) => f1.metadata["date"] > f2.metadata["date"] ? 1 : -1)
    .map((d, i) => ({...d, index: i + 1}));
}

export async function _fetchData(page: number = 0) {
    await loadData();
    return {
        size: data.length,
        data: [...data].reverse().slice(page * pageLength, page * pageLength + pageLength).map(d => ({...d, data: d.data.slice(0, 120)}))
        // 최근 데이터부터 보여주기, pageLength개 만큼만 보여주도록 자르기, 썸네일에 필요한 정도의 글만 잘라오기
    };
}

export async function _getData(name: string) {
    await loadData();
    let found = data.filter(d => d.name === name)[0]; // 이름으로 접근 시도
    const docNo = Number.parseInt(name) - 1; // 글 번호는 1번부터 시작
    if (!found && !isNaN(docNo)) { // 번호로 접근 시도
        found = data[docNo];
    }

    if (!found) throw Error("Not found");

    return found;
}

export async function _getAllTags() {
    await loadData();
    const tags = data
        .map((v) => v.metadata.tags.split(', '))
        .flat();

    return [...new Set(tags)];
}

export async function _fetchTagData(tag: string, page: number = 0) {
    await loadData();
    const documents = data
        .filter((v) => v.metadata.tags?.split(', ').includes(tag));

    return {
        size: documents.length,
        data: [...documents].reverse().slice(page * pageLength, page * pageLength + pageLength).map(d => ({...d, data: d.data.slice(0, 120)}))
        // 최근 데이터부터 보여주기, pageLength개 만큼만 보여주도록 자르기, 썸네일에 필요한 정도의 글만 잘라오기
    };
}

export function parseMarkdownWithMetadata(data: string) {
    const { metadata, body } = separateMetadata(data);

    return {
        metadata,
        data: body
    };
}

function splitNameOnly(fullname: string): string {
    const pathSplitted = fullname.split('/');
    const pathRemoved = pathSplitted[pathSplitted.length - 1];

    return pathRemoved.split('.')[0];
}

function separateMetadata(document: string): {
    metadata: { [key: string]: string };
    body: string;
} {
    const splitted = document.split(/---\r\n|---\n/);
    const metadatas = splitted[1]
        .split(/\r\n|\n/)
        .filter((d) => !!d)
        .map((d) => d.split(': '))
        .filter((d) => !!d[1])
        .reduce((prev: { [key: string]: string }, curr) => {
            prev[curr[0]] = curr[1];
            return prev;
        }, {});

    return {
        metadata: metadatas,
        body: splitted.slice(2).join('---\n')
    };
}

export async function _buildMarkdown(data: string): Promise<string> {
    return (
        await unified()
            .use(remarkParse)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeStringify, { allowDangerousHtml: true })
            .use(rehypeHighlight)
            .process(data)
    ).toString();
}

export function _localStorageStore(key: string, initial: object) {
    const value = localStorage.getItem(key);
    const store = writable(value == null ? initial : JSON.parse(value));
    store.subscribe((v) => localStorage.setItem(key, JSON.stringify(v)));

    return store;
}
