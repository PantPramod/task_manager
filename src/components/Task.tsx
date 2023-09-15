
import { MdDelete } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import { BiSolidUserPlus } from 'react-icons/bi'

type propTypes = {
    OnClick: () => void
    task: any
    index: number
    editHandler: (arg0: any) => void
    delRow: (arg0: any) => void
    requestHandler?: (arg0: any) => void
}

const Task = ({ OnClick, task, index, editHandler, delRow, requestHandler }: propTypes) => {
    return (
        <div
            onClick={OnClick}
            key={task?.id}
            className='cursor-pointer flex gap-x-2 w-full bg-gray-100 items-center  justify-between p-3 mt-2'>
            <p className='min-w-[94px]'>{index + 1}. {task?.title.substr(0, 8)}...</p>
            <p>{task?.dueDate}</p>

            {

                <p className="w-[200px]"><strong>{task?.assigne && "Assigned To :"}</strong>{task?.assigne}</p>
            }


            <div className='flex gap-x-4 items-center '>

                <AiFillEdit
                    color="blue"
                    cursor="pointer"
                    size={22}
                    onClick={(e: any) => { e.stopPropagation(); editHandler(task) }}
                />
                {
                    requestHandler &&
                    <BiSolidUserPlus
                        onClick={(e: any) => { e.stopPropagation(); requestHandler(task) }}
                        color="green"
                        cursor="pointer"
                        size={22}
                    />

                }

                <MdDelete
                    onClick={(e: any) => { e.stopPropagation(); delRow(task) }}
                    color="red"
                    cursor="pointer"
                    size={22}
                />

            </div>


        </div>
    )
}

export default Task

