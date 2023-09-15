import { useReducer } from 'react'
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert';
import signupReducer from '../reducers/signupReducer';
import {  createUserWithEmailAndPassword } from "firebase/auth";



const SignUp = () => {
    const [state, setState] = useReducer(signupReducer, {
        email: "",
        password: "",
        confirmPassword: "",
        error: "",
        isRegisteredSuccessfully: false
    })

    const navigate = useNavigate()


    const signUpHandler = async (e: any) => {
        e.preventDefault()
        if (state.password.length < 6) {
            setState({ type: "SET_ERROR", payload: "Password must be atleast 6 characters long" })
            return
        }
        if (state.password !== state.confirmPassword) {
            setState({ type: "SET_ERROR", payload: "passwords don't match" })
            return;
        }
        try {
            setState({ type: "SET_ERROR", payload: "" })
           
            const userData =  await createUserWithEmailAndPassword(auth, state.email, state.password)
            setState({ type: "SET_IS_REGISTERED_SUCCESSFULLY", payload: "" })
            console.log(userData);
        } catch (err: any) {
            setState({ type: "SET_ERROR", payload: err?.message })
        }
    }



    // const logout = async () => {
    //     const res = auth.signOut()
    //     console.log(res)
    // }

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <form
                onSubmit={signUpHandler}
                className='bg-gray-50 w-[95%] sm:w-[500px] mx-auto p-4 sm:p-8 shadow-2xl rounded-3xl'>
                <h1 className=' text-center text-2xl mt-10 uppercase'>Register New User</h1>
                {
                    state.error &&
                    <div className='mt-4 rounded-md bg-red-200 p-4 border border-dashed border-red-600 text-red-600'>
                        {state?.error}
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
                <div className='mt-4'>
                    <label>Confirm Password</label>
                    <input
                        type='password'
                        placeholder='********'
                        className='border border-gray-400 p-2 rounded-md py-1 block w-full outline-none'
                        value={state.confirmPassword}
                        onChange={(e) => setState({ type: "SET_CONFIRM_PASSWORD", payload: e.target.value })}
                        required
                    />
                </div>

                <div className='mt-8'>
                    <button
                        type='submit'
                        className='border border-gray-400 hover:border-black transition-all ease-in-out duration-300 px-4 py-2 mx-auto block rounded-md'
                    >
                        SignUp
                    </button>
                </div>
                <p className='text-center mt-2 hover:text-blue-600 transition-all ease-in-out duration-300'>
                    <Link to="/login" >Already have an account Login</Link>
                </p>


            </form>
            {state.isRegisteredSuccessfully &&
                <Alert
                    onClose={() => {navigate("/login") }}
                    message='Account Created SuccessFully Login With Credentials'
                />}
        </div>
    )
}

export default SignUp
