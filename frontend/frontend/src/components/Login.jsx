

import { FaSignInAlt } from 'react-icons/fa'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../store/apis/userApi';
import { setUser } from '../store/slices/userSlice';
import { toast } from 'react-toastify';


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const user = useSelector(state => state.user);
    const [formData, setFormData] = useState({ email: "", password: "" })
    const { email, password } = formData;

    const handleChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await login(formData);
        if (response.error) {
            toast.error(response.error.data?.message || response.error.error || 'Login failed');
        } else {
            dispatch(setUser(response.data));
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/');
            toast.success(`Welcome ${response.data.name}!`);
        }

    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);


    return (
        <>
            <section className="heading">
                <h1><FaSignInAlt /> Login </h1>
                <p>Login and start creatig tasks</p>
            </section>


            <section className='form'>
                <form onSubmit={handleSubmit}>


                    <div className='form-group'>
                        <input required type='email' className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={handleChange} />
                    </div>

                    <div className='form-group'>
                        <input required type='password' className='form-control' id='password' name='password' value={password} placeholder='Enter password' onChange={handleChange} />
                    </div >


                    <div
                        className='form-group'>
                        <button type="submit" disabled={isLoading} className="btn btn block">
                            {isLoading ? 'Please wait..' : "Login"}
                        </button>

                    </div>
                </form>

            </section >

        </>
    )
}

export default Login