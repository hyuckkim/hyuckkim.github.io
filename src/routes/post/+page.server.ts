import type { PageServerLoad } from './$types';
import matter from 'gray-matter';
import { resolvePostAssetPath } from '$lib/postMarkdown';

export const prerender = true;

function getDateSortKey(value: unknown): string {
    if (!value) return '';

    if (value instanceof Date) {
        return value.toISOString().slice(0, 10);
    }

    let str = String(value).trim();

    // 구분자 및 공백 정규화
    str = str.replace(/\s+/g, ' ');
    str = str.replace(/[.\s/]+/g, '-');

    // 분기 처리
    const quarterMatch = str.match(/(\d{2,4}).*Q([1-4])|(\d{2,4}).*([1-4])분기/);
    if (quarterMatch) {
        const year = quarterMatch[1] || quarterMatch[3];
        const quarter = quarterMatch[2] || quarterMatch[4];
        const month = (Number(quarter) - 1) * 3 + 1;
        return `${normalizeYear(year)}-${pad(month)}-00`;
    }

    // 연/월/일 추출
    const parts = str.split('-').filter(Boolean);
    const year = parts[0];
    const month = parts[1] || '00';
    const day = parts[2] || '00';

    return `${normalizeYear(year)}-${pad(month)}-${pad(day)}`;
}

function normalizeYear(y?: string): string {
    if (!y) return '0000';
    const digits = y.replace(/\D/g, '');
    if (digits.length === 2) {
        return '20' + digits; // 필요시 로직 조정 가능
    }
    return digits.padStart(4, '0');
}

function pad(n: string | number): string {
    return String(n).padStart(2, '0');
}

export const _postList = () => {
    const markdownModules = import.meta.glob('/static/posts/*/index.md', {
        eager: true,
        query: '?raw',
        import: 'default'
    }) as Record<string, string>;

    return Object.keys(markdownModules)
        .map((filePath) => {
            const slug = filePath.split('/')[3];
            const content = markdownModules[filePath];
            const data = matter(content);
            const meta = data.data as {
                title?: string;
                img?: string;
                date?: string | Date;
            };

            const dateSortKey = getDateSortKey(meta.date);

            return {
                slug,
                title: meta.title ?? slug,
                img: resolvePostAssetPath(slug, meta.img) ?? '',
                date: meta.date ?? '',
                dateSortKey,
                path: `/post/${slug}`
            };
        })
        .filter((post) => Boolean(post.slug))
        .sort((a, b) => b.dateSortKey.localeCompare(a.dateSortKey))
        .map(({ dateSortKey: _dateSortKey, slug: _slug, ...post }) => post);

};

export const load: PageServerLoad = async () => {
    return { posts: _postList()
        .slice(0, 10) };
};
