import { unified } from "unified";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";

// place files you want to import through the `$lib` alias in this folder.
export async function _fetchData(page: number = 0) {
    const pageLength = 10;
    const data = import.meta.glob('/src/writings/*.md', {
        query: "?raw",
        import: "default",
    });
    const list = Object.keys(data)
        .map(k => ({name: k, data: data[k]}))
        .sort((a, b) => a.name < b.name ? 1 : -1);

    const sliced = await Promise.all(list
        .slice(page * pageLength, page * pageLength + pageLength)
        .map(async l => ({
            name: l.name, data: await l.data()
        }))
    );

    const parsed = sliced.map(d => {
        if (typeof d.data === "string") {
            const markdown = parseMarkdownWithMetadata(d.data);
            return {
                metadata: markdown.metadata,
                data: markdown.data.slice(0, 120),
                name: splitNameOnly(d.name)
            }
        }
        else {
            return {
                metadata: {},
                data: "",
                name: splitNameOnly(d.name)
            }
        }
    });

    
    return {
        size: list.length,
        data: parsed
    };
}

export async function _getData(name: string) {
    const data = import.meta.glob("/src/writings/*.md", {
        query: "?raw",
        import: "default",
    });
    if (!data[`/src/writings/${name}.md`]) throw Error('not found');
    const file = await data[`/src/writings/${name}.md`]();
    if (typeof file !== "string") return {metadata: {}, data: ""};

    return parseMarkdownWithMetadata(file);
}

export async function _getAllTags() {
    const data = import.meta.glob("/src/writings/*.md", {
        query: "?raw",
        import: "default",
    });

    const list = Object.keys(data)
        .map(k => ({name: k, data: data[k]}))
        .sort((a, b) => a.name < b.name ? 1 : -1);

    const sliced = await Promise.all(list
        .map(async l => ({
            name: l.name, data: await l.data()
        }))
    );

    const tags = sliced
        .map(v => (typeof v.data === "string") ? parseMarkdownWithMetadata(v.data) : undefined)
        .map(v => (v !== undefined) ? v.metadata.tags.split(", ") : undefined);

    return [...new Set(tags.flat())].filter((v): v is string => v !== undefined);
}

function parseMarkdownWithMetadata(data: string) {
    const { metadata, body } = separateMetadata(data);
    
    return {
        metadata,
        data: body,
    };
}

function splitNameOnly(fullname: string): string {
    const pathSplitted = fullname.split('/');
    const pathRemoved = pathSplitted[pathSplitted.length - 1];
    
    return pathRemoved.split('.')[0];
}

function separateMetadata(document: string): {
    metadata: {[key: string]: string },
    body: string,
} {
    const splitted = document.split(/---\r\n|---\n/);
    const metadatas = splitted[1].split(/\r\n|\n/)
        .filter(d => !!d)
        .map(d => d.split(': '))
        .filter(d => !!d[1])
        .reduce((prev: {[key: string]: string}, curr) => {
            prev[curr[0]] = curr[1];
            return prev;
    }, {});

    return {
        metadata: metadatas,
        body: splitted[2],
    }
}

export async function _buildMarkdown(data: string): Promise<string> {
    return (await unified()
        .use(remarkParse)
        .use(remarkRehype, {allowDangerousHtml: true})
        .use(rehypeStringify, {allowDangerousHtml: true})
        .use(rehypeHighlight)
        .process(data))
        .toString()
}