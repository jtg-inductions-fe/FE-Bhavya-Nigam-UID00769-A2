import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { USER_NOT_FOUND } from '@constant';
import { deleteUserFollow } from '@services/DeleteUserFollow.Service';
import { getRepositoriesByUser } from '@services/GetRepositories.Service';
import { getUser } from '@services/GetUser.Service';
import { getUserFollow } from '@services/GetUserFollow.Service';
import { getUserFollowingList } from '@services/GetUserFollowingList.Service';
import { getUserFollowList } from '@services/GetUserFollowList.Service';
import { putUserFollow } from '@services/PutUserFollow.Service';
import { useAppSelector } from '@store/store';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { ProfileContainer } from './Profile.Container';

import '@testing-library/jest-dom/vitest';

vi.mock('@services/DeleteUserFollow.Service');
vi.mock('@services/GetRepositories.Service');
vi.mock('@services/GetUser.Service');
vi.mock('@services/GetUserFollow.Service');
vi.mock('@services/PutUserFollow.Service');
vi.mock('@services/GetUserFollowingList.Service');
vi.mock('@services/GetUserFollowList.Service');

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
    useParams: () => ({
        username: 'octocat',
    }),
}));

vi.mock('@store/store', () => ({
    useAppSelector: vi.fn(),
}));

const mockStore = {
    userDetails: {
        id: 583231,
        login: 'octocat',
        avatar_url: 'https://avatars.example.com',
        html_url: 'https://example.com/octocat',
        name: 'The Octocat',
        location: 'San Francisco',
        bio: 'mock user bio',
        followers: 100,
        following: 9,
        blog: 'https://example.blog',
        email: 'octocat@github.com',
        public_repos: 24,
    },
    username: 'testuser',
    pat: 'testpat',
};

const mockUser = mockStore.userDetails;

const mockRepos = [
    {
        id: 1,
        name: 'mockRepo',
        html_url: 'https://example.com/octocat/repos',
        description: 'mock description',
        language: 'mocklanguage',
        stargazers_count: 1,
    },
];

const mockFollowers = [
    {
        login: 'user1',
        name: 'user one',
        avatar_url: 'https://avatars-user-1.example.com',
    },
];

const mockFollowing = [
    {
        login: 'user2',
        name: 'user two',
        avatar_url: 'https://avatars-user-2.example.com',
    },
];

beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppSelector).mockReturnValue(mockStore);
    vi.mocked(getUser).mockResolvedValue(mockUser);
    vi.mocked(getRepositoriesByUser).mockResolvedValue(mockRepos);
    vi.mocked(getUserFollowList).mockResolvedValue(mockFollowers);
    vi.mocked(getUserFollowingList).mockResolvedValue(mockFollowing);
    vi.mocked(getUserFollow).mockResolvedValue(false);
    vi.mocked(putUserFollow).mockResolvedValue(true);
    vi.mocked(deleteUserFollow).mockResolvedValue(true);
});

afterEach(() => {
    cleanup();
});

describe('Profile Page', () => {
    it('renders user profile', async () => {
        render(<ProfileContainer />);

        expect(await screen.findByText('The Octocat')).toBeInTheDocument();
        expect(await screen.findAllByText('Followers')).toHaveLength(2);
        expect(await screen.findAllByText('Following')).toHaveLength(2);
        expect(await screen.findAllByText('Repositories')).toHaveLength(2);
        expect(await screen.findByText('San Francisco')).toBeInTheDocument();
    });

    it('renders repositories', async () => {
        render(<ProfileContainer />);

        expect(await screen.findByText('mockRepo')).toBeInTheDocument();
        expect(await screen.findByText('mock description')).toBeInTheDocument();
        expect(await screen.findByText('mocklanguage')).toBeInTheDocument();
        expect(await screen.findByText('24')).toBeInTheDocument();
    });

    it('renders followers list', async () => {
        render(<ProfileContainer />);

        expect(await screen.findByText('user1')).toBeInTheDocument();
        expect(await screen.findByText('user one')).toBeInTheDocument();
    });

    it('renders following list', async () => {
        render(<ProfileContainer />);

        expect(await screen.findByText('user2')).toBeInTheDocument();
        expect(await screen.findByText('user two')).toBeInTheDocument();
    });

    it('Follow user when the follow button is clicked', async () => {
        vi.mocked(getUserFollow).mockResolvedValue(false);
        vi.mocked(putUserFollow).mockResolvedValue(true);

        render(<ProfileContainer />);

        const followButton = await screen.findByRole('button', {
            name: /^Follow$/i,
        });

        fireEvent.click(followButton);

        expect(await screen.findByText('101')).toBeInTheDocument();
    });

    it('Unfollow user when the unfollow button is clicked', async () => {
        vi.mocked(getUserFollow).mockResolvedValue(true);
        vi.mocked(deleteUserFollow).mockResolvedValue(true);

        render(<ProfileContainer />);

        const unfollowButton = await screen.findByRole('button', {
            name: /^Followed$/i,
        });

        fireEvent.click(unfollowButton);

        expect(await screen.findByText('99')).toBeInTheDocument();
    });

    it('show error when user fetch failed', async () => {
        vi.mocked(getUser).mockRejectedValue(new Error(USER_NOT_FOUND));

        render(<ProfileContainer />);

        expect(await screen.findAllByText(USER_NOT_FOUND)).toHaveLength(2);
    });
});
