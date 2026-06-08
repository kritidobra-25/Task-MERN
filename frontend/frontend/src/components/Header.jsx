import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/userSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>Blog Personal</Link>
            </div>
            <ul>
                {user ? (
                    <>
                        <li>
                            <button className='btn btn-sm' onClick={() => navigate('/create')}>
                                + Postim i Ri
                            </button>
                        </li>
                        <li>
                            <button className='btn' onClick={handleLogout}>
                                <FaSignOutAlt /> Dil
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Hyr
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaUser /> Regjistrohu
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
};

export default Header;
