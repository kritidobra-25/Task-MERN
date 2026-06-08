import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDeletePostMutation } from '../store/apis/postApi';
import { toast } from 'react-toastify';
import { MdOutlineEdit, MdOutlineDelete } from 'react-icons/md';

const PostItem = ({ post }) => {
    const navigate = useNavigate();
    const [deletePost] = useDeletePostMutation();
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm('Jeni i sigurt që doni ta fshini këtë postim?')) return;
        setDeleting(true);
        const result = await deletePost(post._id);
        if (result.error) {
            toast.error(result.error.data?.message || 'Fshirja dështoi!');
        } else {
            toast.success('Postimi u fshi!');
        }
        setDeleting(false);
    };

    return (
        <div className='post-item'>
            {post.image && (
                <div className='post-item-image'>
                    <img src={post.image} alt={post.title} />
                </div>
            )}
            <div className='post-item-body'>
                <div className='post-item-meta'>
                    <span className='post-category'>{post.category}</span>
                    <span className='post-date'>
                        {new Date(post.createdAt).toLocaleDateString('sq-AL')}
                    </span>
                </div>
                <h2 className='post-title'>{post.title}</h2>
                <p className='post-excerpt'>
                    {post.content.length > 150
                        ? post.content.substring(0, 150) + '...'
                        : post.content}
                </p>
                <div className='post-item-actions'>
                    <button
                        className='btn btn-sm'
                        onClick={() => navigate(`/edit/${post._id}`)}
                    >
                        <MdOutlineEdit /> Edito
                    </button>
                    <button
                        className='btn btn-sm btn-danger'
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        <MdOutlineDelete /> {deleting ? 'Duke fshirë...' : 'Fshi'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
