import { UrlMatcher, UrlSegment } from '@angular/router';

export const remoteUrlStartsWith =
    (prefix: string): UrlMatcher =>
    (url: UrlSegment[]) => {
        const fullUrl = url.map((u) => u.path).join('/');
        if (fullUrl.startsWith(prefix)) {
            return { consumed: url };
        }

        return null;
    };
