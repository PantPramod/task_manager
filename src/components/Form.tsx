import  { Dispatch } from 'react'
import { actionType, stateType } from '../reducers/dashboardReducer'

type propTypes = {
    updateHandler?: (e: any) => void,
    saveHandler?: (e: any) => void,
    setState: Dispatch<actionType>
    state: stateType
}
const Form = ({ updateHandler,saveHandler, setState, state }: propTypes) => {
    return (
        <form
            onSubmit={updateHandler || saveHandler}
            className='mt-10 shadow-lg bg-gray-50 border border-dashed border-gray-400 rounded-2xl p-4 w-[95%] sm:w-[500px] mx-auto '>
            <button
                type='button'
                onClick={() => setState({ type: updateHandler?"HIDE_EDIT":"HIDE_CREATE", payload: "" })}
                className='ml-auto block'>x</button>
            <label>Title</label>
            <input
                type='text'
                className='border border-gray-400 p-2 rounded-md block mt-1 w-full outline-none'
                value={state.title}
                onChange={(e) => setState({ type: "SET_TITLE", payload: e.target.value })}
                placeholder='Enter Title'
            />

            <label className='inline-block mt-5'>Description</label>
            <input
                type='text'
                className='border border-gray-400 p-2 rounded-md block mt-1 w-full outline-none'
                value={state.description}
                onChange={(e) => setState({ type: "SET_DESCRIPTION", payload: e.target.value })}
                placeholder='Enter Description'
            />

            <label className='inline-block mt-5'>Due Date</label>
            <input
                type='date'
                className='border border-gray-400 p-2 rounded-md block mt-1 w-full outline-none'
                value={state.dueDate}
                onChange={(e) => setState({ type: "SET_DUE_DATE", payload: e.target.value })}
            />
            <button className='border border-gray-500 text-gray-500 hover:border-black hover:text-black transition-all ease-in-out duration-300 px-4 py-2 rounded-md mt-5 mx-auto block'>Save</button>
        </form>
    )
}

export default Form
