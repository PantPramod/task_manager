type propType = {
    message: string
    onClose: () => void
}
const Alert = ({ message, onClose }: propType) => {
    return (
        <div
            onClick={onClose}
            className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[#4945458f]'>
            <div
                onClick={(e) => e.stopPropagation()}
                className='bg-white w-full sm:w-[400px] rounded-md min-h-[150px] shadow-3xl flex items-center justify-center relative'>
                <p 
                onClick={onClose}
                className='absolute right-2 top-2 font-bold cursor-pointer '>X</p> 
                <p className='text-green-600'>{message}</p>
            </div>
        </div>
    )
}

export default Alert
