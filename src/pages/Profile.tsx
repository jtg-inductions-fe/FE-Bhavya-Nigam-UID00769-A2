    import { useAppSelector } from '@store/store';

export const Profile = () => {
    const user = useAppSelector((state) => state.user.user);

    if (!user) {
        return <div>Please Login First</div>;
    }

    return (
        <div>
            Login successful
            <div>{user.login}</div>
        </div>
    );
};
