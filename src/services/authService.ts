import { UserDetail } from 'types/UserDetails';

export const getUser = async (
    token: string,
    username: string,
): Promise<UserDetail> => {
    const response = await fetch('https://api.github.com/user', {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        throw new Error('Invalid credentials');
    }

    const data = (await response.json()) as UserDetail;

    if (data.login !== username) {
        throw new Error('Unauthorized access');
    }

    localStorage.setItem('user', username);
    localStorage.setItem('pat', token);

    return data;
};
