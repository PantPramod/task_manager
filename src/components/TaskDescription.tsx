import { equalTo, onValue, orderByChild, push, query, ref, set } from "firebase/database"
import { database } from "../firebase"
import { useAuth } from "../context/GlobalContextProvider"
import { useState, useEffect } from 'react'

export type taskType = {
    obj: {
        id: string
        title: string,
        description: string,
        dueDate: string,
        email: string,
        assigne?: string
    }
    OnClose?: () => void

}
const TaskDescription = ({ obj, OnClose }: taskType) => {
    const { email } = useAuth()
    const [text, setText] = useState('')
    const [data, setData] = useState<any>([])

    useEffect(() => {
        (() => {
            const data = query(ref(database, 'comments'), orderByChild("taskId"), equalTo(obj?.id));

            onValue(data, (snapshot) => {
                let arr: any = []
                snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    arr.push({ id: childKey, ...childData })
                });
                setData([...arr.reverse()])
            }, {
                onlyOnce: false
            });
        })()
    }, [])

    const addComment = async (e: any) => {
        e.preventDefault();

        const commentsListRef = ref(database, 'comments');
        const newPostRef = push(commentsListRef);
        await set(newPostRef, {
            taskId: obj?.id,
            by: email,
            text
        });

        if (obj?.assigne) {
            const notificationListRef = ref(database, 'notifications');
            const newNotificationPostRef = push(notificationListRef);

            await set(newNotificationPostRef, {
                isComment: true,
                comment: text,
                by: email,
                title: obj?.title,
                seen: false,
                to: obj?.email === email ? obj?.assigne : obj?.email
            });
        }
        setText('')
    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[#3f363698]">
            <div className="bg-white p-4 rounded-md w-full sm:w-[400px] md:w-[500px] relative">
                <p
                    onClick={OnClose}
                    className="text-xl font-bold cursor-pointer absolute right-2 top-2">x</p>
                <p className="mt-5">  <strong>Title: </strong> {obj?.title}</p>

                <p className="mt-2"><strong>Description: </strong> {obj?.description}</p>

                <p className="mt-2"><strong>DueDate: </strong> {obj?.dueDate}</p>

                <p className="mt-2"><strong>Created By: </strong> {obj?.email}</p>

                <p className="mt-2"><strong>Assigned To: </strong> {obj?.assigne}</p>
                <form
                    onSubmit={addComment}
                    className="w-full flex items-center mt-5">
                    <input
                        type="text"
                        placeholder="Enter Your Comment here"
                        className=" border border-gray-700 p-2 rounded-l-md flex-1"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    />
                    <button

                        className="bg-black text-white px-4 self-stretch rounded-r-md">Send</button>
                </form>

                <div className="w-full  rounded-2xl mt-2 overflow-y-auto max-h-[200px]">
                    {
                        data.map((comment: any) => <p 
                        key={comment?.id}
                        className="mt-3 flex gap-x-4 bg-gray-100 items-center p-2">
                            <span
                                className={`uppercase bg-blue-500 text-white rounded-full  w-7 h-7 flex items-center justify-center`}>{comment?.by[0]}</span>
                            {/* <span className="text-xs ">{comment?.by}</span> */}
                            <span className="text-sm"> {comment?.text}</span>
                        </p>)
                    }
                </div>
            </div>
        </div>
    )
}

export default TaskDescription
