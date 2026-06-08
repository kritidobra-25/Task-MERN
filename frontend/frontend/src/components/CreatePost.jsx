import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import PostForm from './PostForm';

const CreatePost = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    return (
        <>
            <section className='heading'>
                <h1>Krijo Postim të Ri</h1>
                <p>Shkruaj dhe publiko postimin tënd</p>
            </section>
            <PostForm />
        </>
    );
};

export default CreatePost;
