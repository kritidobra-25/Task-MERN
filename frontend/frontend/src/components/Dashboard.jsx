import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import PostList from './PostList';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    return (
        <>
            <section className='heading'>
                <p className='blog-welcome'>Mirë se vini, {user && user.name}!</p>
                <h1 className='blog-subtitle'>Menaxho postimet e tua</h1>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '1rem', flexWrap: 'wrap' }}>
                    <button className='btn' onClick={() => navigate('/create')}>
                        + Krijo Postim të Ri
                    </button>
                    <button className='btn btn-search' onClick={() => { setShowSearch(!showSearch); setSearch(''); }}>
                        Kërko
                    </button>
                </div>
                {showSearch && (
                    <div className='search-bar'>
                        <input
                            type='text'
                            placeholder='Kërko titullin e postimit...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                        />
                    </div>
                )}
            </section>
            <PostList search={search} />
        </>
    );
};

export default Dashboard;
