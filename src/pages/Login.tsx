import { useReducer } from 'react'
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom'
import loginReducer from '../reducers/loginReducer';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../context/GlobalContextProvider';



const Login = () => {
    const [state, setState] = useReducer(loginReducer, {
        email: "",
        password: "",
        error: "",
        message: ""
    })
    const navigate = useNavigate()
    const { setEmail } = useAuth()

    const loginHandler = async (e: any) => {
        e.preventDefault()
        setState({ type: "SET_ERROR", payload: "" })
        setState({ type: "SET_MESSAGE", payload: "" })
        try {
            const res: any = await signInWithEmailAndPassword(auth, state.email, state.password)
            setEmail(res?._tokenResponse?.email)
            console.log(res?._tokenResponse?.email);
            navigate("/dashboard")
        } catch (err: any) {
            setState({ type: "SET_MESSAGE", payload: "" })
            setState({ type: "SET_ERROR", payload: err?.message })
        }
    }

    const forgetPasswordHandler = async () => {
        if (!state?.email) {
            setState({ type: "SET_ERROR", payload: "Please Fill the Email" })
            return;
        }
        try {
            setState({ type: "SET_ERROR", payload: "" })
            const res = await sendPasswordResetEmail(auth, state.email)
            setState({ type: "SET_MESSAGE", payload: "Please Check your email to reset Password" })
            console.log(res)
        } catch (err: any) {
            setState({ type: "SET_MESSAGE", payload: "" })
            setState({ type: "SET_ERROR", payload: err?.message })
        }


    }
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <form
                onSubmit={loginHandler}
                className='bg-gray-50 w-[95%] sm:w-[500px] mx-auto p-4 sm:p-8 shadow-2xl rounded-3xl'>
                <h1 className=' text-center text-2xl mt-10 uppercase'>Login</h1>
                {
                    state.error &&
                    <div className='mt-4 rounded-md bg-red-200 p-4 border border-dashed border-red-600 text-red-600'>
                        {state?.error}
                    </div>
                }
                {
                    state.message &&
                    <div className='mt-4 rounded-md bg-green-200 p-4 border border-dashed border-green-600 text-green-600'>
                        {state?.message}
                    </div>
                }
                <div className='mt-4'>
                    <label>Email</label>
                    <input
                        type='email'
                        placeholder='abc@gmail.com'
                        className='border border-gray-400 p-2 rounded-md py-1 block w-full outline-none'
                        value={state.email}
                        onChange={(e) => setState({ type: "SET_EMAIL", payload: e.target.value })}
                        required
                    />
                </div>
                <div className='mt-4'>
                    <label>Password</label>
                    <input
                        type='password'
                        placeholder='********'
                        className='border border-gray-400 p-2 rounded-md py-1 block w-full outline-none'
                        value={state.password}
                        onChange={(e) => setState({ type: "SET_PASSWORD", payload: e.target.value })}
                        required
                    />
                </div>
                <p
                    className='mt-3 text-sm cursor-pointer hover:text-blue-600'
                    onClick={forgetPasswordHandler}
                >
                    Forgot Password?
                </p>
                <div className='mt-8'>
                    <button
                        disabled={!state.email || !state.password}
                        type='submit'
                        className='border disabled:text-gray-400 border-gray-400 hover:border-black transition-all ease-in-out duration-300 px-4 py-2 mx-auto block rounded-md'
                    >
                        Log In
                    </button>
                </div>
                <p className='text-center mt-2 hover:text-blue-600 transition-all ease-in-out duration-300'>
                    <Link to="/" >don't have an account Register</Link>
                </p>
            </form>
        </div>
    )
}

export default Login
