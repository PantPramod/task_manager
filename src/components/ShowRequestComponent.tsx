

type propTypes={
    addAssigne:(e:any)=>void,
    OnClose:()=>void,
    OnChange:(arg0:string)=>void,
    assigne?:string
}
const ShowRequestComponent = ({ addAssigne, OnClose, OnChange, assigne }: propTypes) => {
    return (

        <div className=' bg-[#000000a2] fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
            <form
                onSubmit={addAssigne}
                className='relative w-[95%] sm:w-[400px] bg-white flex items-center flex-col justify-center p-4'>
                <p
                    className='absolute right-2 top-2 cursor-pointer'
                    onClick={OnClose}
                >x</p>
                <label className='inline-block mt-5 self-start'>Assign Task to </label>
                <input
                    type='email'
                    className='border border-gray-400 p-2 rounded-md block mt-1 w-full outline-none'
                    value={assigne}
                    // onChange={(e) => setState({ type: "SET_ASSIGNE", payload: e.target.value })}
                    onChange={(e) => OnChange(e.target.value)}
                    placeholder='newuser@gmail.com'
                />
                <button className='mt-4 bg-black text-white w-full py-2 rounded-md'>Send</button>
            </form>
        </div>
    )
}

export default ShowRequestComponent



