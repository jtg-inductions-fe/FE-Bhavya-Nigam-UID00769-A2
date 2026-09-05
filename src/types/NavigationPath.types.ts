import {
    HOME_PAGE_URL,
    LOGIN_PAGE_URL,
    PROFILE_PAGE_URL,
    SEARCH_PAGE_URL,
} from '@constant';

export type NavigationPath =
    | typeof SEARCH_PAGE_URL
    | typeof PROFILE_PAGE_URL
    | typeof LOGIN_PAGE_URL
    | typeof HOME_PAGE_URL;
