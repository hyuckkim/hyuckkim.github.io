import type { PageLoad } from '../$types.js';

export const load: PageLoad = ({ params, url}) => {
    return {
        key: url.searchParams.get('code')
    };
}