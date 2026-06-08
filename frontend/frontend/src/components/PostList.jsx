import { useGetMyPostsQuery } from '../store/apis/postApi';
import Spinner from './Spinner';
import PostItem from './PostItem';

const PostList = ({ search = '' }) => {
    const { data: posts = [], isLoading, isError, error } = useGetMyPostsQuery();

    if (isLoading) return <Spinner />;
    if (isError) {
        console.error('Gabim gjatë marrjes së postimeve:', error);
        return <p className='error'>Gabim gjatë ngarkimit të postimeve.</p>;
    }

    const filtered = search.trim()
        ? posts.filter(post =>
            post.title.toLowerCase().includes(search.toLowerCase())
          )
        : posts;

    return (
        <section className='content'>
            {filtered.length > 0 ? (
                <div className='posts'>
                    {filtered.map((post) => (
                        <PostItem key={post._id} post={post} />
                    ))}
                </div>
            ) : search ? (
                <p className='no-posts'>Nuk u gjet asnjë postim për "{search}".</p>
            ) : (
                <p className='no-posts'>Krijoni postimin tuaj të parë!</p>
            )}
        </section>
    );
};

export default PostList;
