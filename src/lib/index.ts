// place files you want to import through the `$lib` alias in this folder.
export async function _fetchData(page: number = 0) {
    const pageLength = 10;
    const data = import.meta.glob('/src/writings/*.md', {
        query: "?raw",
        import: "default",
    });
    const list = await Promise.all(Object.keys(data)
        .map(k => ({name: k, data: data[k]}))
        .sort((a, b) => a.name < b.name ? 1 : -1)
        .slice(page * pageLength, page * pageLength + pageLength)
        .map(async l => ({
            name: l.name, data: await l.data()
        }))
    );

    const parsed = list.map(d => ({
        ...parseMarkdownWithMetadata(d.data as string),
        name: splitNameOnly(d.name)
    }));

    
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
    const file = await data[`/src/writings/${name}.md`]();
    return parseMarkdownWithMetadata(file as string);
}

function parseMarkdownWithMetadata(data: string) {{
    const { metadata, body } = separateMetadata(data);
    
    return {
        metadata,
        data: body,
    };
}
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
    const splitted = document.split('---\r\n');
    const metadatas = splitted[1].split('\r\n')
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