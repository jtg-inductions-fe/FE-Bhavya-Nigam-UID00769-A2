import { useAppSelector } from '@store/store';

export const Profile = () => {
    const user = useAppSelector((state) => state.user.user);

    return (
        <div>
            {!user ? (
                <div>Please Login First</div>
            ) : (
                <div>
                    Login successful
                    <div>{user.login}</div>
                </div>
            )}
        </div>
    );
};
