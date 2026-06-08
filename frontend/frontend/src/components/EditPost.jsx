import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useGetPostQuery } from '../store/apis/postApi';
import PostForm from './PostForm';
import Spinner from './Spinner';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    const { data: post, isLoading, isError } = useGetPostQuery(id);

    if (isLoading) return <Spinner />;
    if (isError) return <p className='error'>Postimi nuk u gjet.</p>;

    return (
        <>
            <section className='heading'>
                <h1>Edito Postimin</h1>
                <p>Përditësoni postimin tuaj</p>
            </section>
            <PostForm existingPost={post} />
        </>
    );
};

export default EditPost;
