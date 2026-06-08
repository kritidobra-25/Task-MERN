import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useCreatePostMutation, useUpdatePostMutation } from '../store/apis/postApi';

const PostForm = ({ existingPost = null }) => {
    const navigate = useNavigate();
    const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
    const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'Të përgjithshme',
        image: '',
    });

    const { title, content, category, image } = formData;

    useEffect(() => {
        if (existingPost) {
            setFormData({
                title: existingPost.title || '',
                content: existingPost.content || '',
                category: existingPost.category || 'Të përgjithshme',
                image: existingPost.image || '',
            });
        }
    }, [existingPost]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.error('Titulli dhe përmbajtja janë të detyrueshme');
            return;
        }

        try {
            if (existingPost) {
                await updatePost({ id: existingPost._id, ...formData }).unwrap();
                toast.success('Postimi u përditësua!');
            } else {
                await createPost(formData).unwrap();
                toast.success('Postimi u krijua!');
            }
            navigate('/dashboard');
        } catch (err) {
            toast.error(err?.data?.message || 'Diçka shkoi keq!');
        }
    };

    const categories = [
        'Histori',
        'Teknologji',
        'Jetë',
        'Udhëtime',
        'Ushqim',
        'Kulturë',
        'Sport',
        'Fashion',
        'Skincare',
        'Makeup',
        'Hair',
        'Bebushat',
        'AI'
    ];

    const isLoading = isCreating || isUpdating;

    return (
        <section className='form'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='title'>Titulli</label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        value={title}
                        placeholder='Shkruaj titullin e postimit...'
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='category'>Kategoria</label>
                    <select
                        id='category'
                        name='category'
                        value={category}
                        onChange={handleChange}
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor='image'>URL e Imazhit (opsionale)</label>
                    <input
                        type='url'
                        id='image'
                        name='image'
                        value={image}
                        placeholder='https://example.com/image.jpg'
                        onChange={handleChange}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='content'>Përmbajtja</label>
                    <textarea
                        id='content'
                        name='content'
                        value={content}
                        placeholder='Shkruaj përmbajtjen e postimit...'
                        onChange={handleChange}
                        rows={10}
                        required
                    />
                </div>

                <div className='form-group'>
                    <button type='submit' className='btn btn-block' disabled={isLoading}>
                        {isLoading ? 'Duke ruajtur...' : existingPost ? 'Përditëso Postimin' : 'Krijo Postimin'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default PostForm;
