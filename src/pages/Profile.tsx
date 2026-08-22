import { Navbar } from '@container/Navbar/Navbar.Container';
import { useAppSelector } from '@store/store';

export const Profile = () => {
    const user = useAppSelector((state) => state.user.user);

    return (
        <div>
            <Navbar />

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
