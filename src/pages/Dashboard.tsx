import { useEffect, useReducer, useState } from 'react'
import { useAuth } from '../context/GlobalContextProvider'
import { ref, push, set, onValue, query, equalTo, orderByChild } from "firebase/database";
import { database } from '../firebase';
import { IoMdNotifications } from 'react-icons/io'
import dashboardReducer from '../reducers/dashboardReducer';
import TaskDescription from '../components/TaskDescription';
import ShowRequestComponent from '../components/ShowRequestComponent';
import Task from '../components/Task';
import Form from '../components/Form';
import Notifications from '../components/Notifications';


const Dashboard = () => {
    const { email } = useAuth()
    const [state, setState] = useReducer(dashboardReducer,
        {
            title: "",
            description: "",
            dueDate: "",
            showCreate: false,
            showEdit: false,
            showRequest: false,
            showNotification: false,
            showDescription: false,
            menu: "all_tasks",
            id: "",
            assigne: "",
            unseen: "",

        })
    const [data, setData] = useState<any>([])

    const [assignedTasks, setAssignedTasks] = useState<any>([])

    const [notifications, setNotifications] = useState<any>([])

    const [obj, setObj] = useState({
        title: "",
        description: "",
        dueDate: "",
        email: "",
        assigne: "",
        id: ""
    })

    const saveHandler = async (e: any) => {
        e.preventDefault()
        const postListRef = ref(database, 'tasks');
        const newPostRef = push(postListRef);
        await set(newPostRef, {
            title: state.title,
            description: state.description,
            dueDate: state.dueDate,
            email
        });
        setState({ type: "SET_MENU", payload: "all_tasks" })
    }

    const delRow = async (obj: any) => {
        await set(ref(database, 'tasks/' + obj?.id), null)
    }

    const editHandler = (obj: any) => {
        setState({ type: "SHOW_EDIT", payload: "" })
        setState({ type: "SET_ID", payload: obj?.id })
        setState({ type: "SET_TITLE", payload: obj?.title })
        setState({ type: "SET_DESCRIPTION", payload: obj?.description })
        setState({ type: "SET_ASSIGNE", payload: obj?.assigne })
        setState({ type: "SET_DUE_DATE", payload: obj?.dueDate })
    }

    const updateHandler = async (e: any) => {
        e.preventDefault();
        await set(ref(database, 'tasks/' + state?.id), {
            title: state.title,
            description: state.description,
            dueDate: state.dueDate,
            ...(state?.assigne && { assigne: state.assigne, }),
            email
        })
        setState({ type: "HIDE_EDIT", payload: "" })
    }

    const requestHandler = (obj: any) => {
        setState({ type: "SHOW_REQ", payload: "" })
        setState({ type: "SET_ID", payload: obj?.id })
        setState({ type: "SET_TITLE", payload: obj?.title })
        setState({ type: "SET_DESCRIPTION", payload: obj?.description })
        setState({ type: "SET_DUE_DATE", payload: obj?.dueDate })
    }

    const addAssigne = async (e: any) => {
        e.preventDefault();
        if (state?.assigne === email) {
            alert("can't Assign to self")
            return;
        }
        await set(ref(database, 'tasks/' + state?.id), {
            title: state.title,
            description: state.description,
            dueDate: state.dueDate,
            email,
            assigne: state?.assigne

        })
        setState({ type: "HIDE_REQ", payload: "" })
        const notificationListRef = ref(database, 'notifications');
        const newPostRef = push(notificationListRef);
        await set(newPostRef, {
            from: email,
            to: state.assigne,
            title: state.title,
            seen: false
        });
    }


    useEffect(() => {
        if (state.showNotification) {
            for (let i = 0; i < notifications.length; i++) {
                set(ref(database, 'notifications/' + notifications[i]?.id), {
                    ...notifications[i],
                    seen: true
                })
            }

        }
    }, [state.showNotification])

    useEffect(() => {
        (() => {
            const data = query(ref(database, 'tasks'), orderByChild("email"), equalTo(email));
            onValue(data, (snapshot) => {
                let arr: any = []
                snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    arr.push({ id: childKey, ...childData })
                });
                setData([...arr])
            }, {
                onlyOnce: false
            });
        })()

        const data = query(ref(database, 'tasks'), orderByChild("assigne"), equalTo(email));
        onValue(data, (snapshot) => {
            let arr: any = []
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                arr.push({ id: childKey, ...childData })
            });
            setAssignedTasks([...arr])
        }, {
            onlyOnce: false
        });
    }, [])

    useEffect(() => {
        const data = query(ref(database, 'notifications'), orderByChild("to"), equalTo(email));
        onValue(data, (snapshot) => {
            let arr: any = []
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                arr.push({ id: childKey, ...childData })
            });
            setNotifications([...arr.reverse()])
            let count = 0;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].seen === false) {
                    count++;
                }
            }
            setState({ type: "SET_UNSEEN", payload: count.toString() })
        }, {
            onlyOnce: false
        });
    }, [])


    return (
        <div className=''>
            <header className='p-4 shadow-md flex justify-between items-center w-full relative'>
                <h1 className='uppercase font-semibold'>Task Manager Dashboard</h1>
                <div className='flex items-center gap-x-4'>
                    <div className=''>
                        {!!Number(state.unseen) &&
                            <p
                                onClick={() => setState({ type: state.showNotification ? "HIDE_NOTIFICATION" : "SHOW_NOTIFICATION", payload: "" })}
                                className='cursor-pointer absolute bottom-0 right-0 bg-red-600 text-white  w-4 flex items-center justify-center h-4 text-xs rounded-full'>{state.unseen}</p>}

                        <IoMdNotifications
                            cursor="pointer"
                            color="#442381"
                            size={30}
                            onClick={() => setState({ type: state.showNotification ? "HIDE_NOTIFICATION" : "SHOW_NOTIFICATION", payload: "" })}
                        />
                        {
                            state.showNotification &&
                            <Notifications
                                notifications={notifications}
                            />

                        }

                    </div>
                    <div className='  bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center uppercase'>
                        {email[0]}
                    </div>
                </div>
            </header>
            <div className='flex min-h-[calc(100vh-80px)] flex-col sm:flex-row'>
                <div className=' bg-gray-300 w-full sm:w-[300px]'>
                    <nav className='p-3'>
                        <ul>
                            <li
                                onClick={() => setState({ type: "SET_MENU", payload: "all_tasks" })}
                                className={`p-2 cursor-pointer ${state.menu === "all_tasks" ? "bg-[#442381] text-white" : ""} transition-all ease-in-out duration-300`}>All Tasks</li>
                            <li
                                onClick={() => setState({ type: "SET_MENU", payload: "create_tasks" })}
                                className={`p-2 cursor-pointer ${state.menu === "create_tasks" ? "bg-[#442381] text-white" : ""} transition-all ease-in-out duration-300`}>Create Task</li>

                            <li
                                onClick={() => setState({ type: "SET_MENU", payload: "assigned_tasks" })}
                                className={`p-2 cursor-pointer ${state.menu === "assigned_tasks" ? "bg-[#442381] text-white" : ""} transition-all ease-in-out duration-300`}>Assigned Task</li>
                        </ul>
                    </nav>
                </div>
                <div className='flex-1 p-4'>
                    {
                        state?.menu === "create_tasks"
                        &&
                        <>
                            {
                                !state.showCreate
                                    ?
                                    <button
                                        onClick={() => setState({ type: "SHOW_CREATE", payload: "" })}
                                        className=' mt-10 mb-10 mx-auto block font-bold border-dashed border-gray-400 text-gray-400 px-5 py-2 rounded-md border hover:border-blue-900 hover:text-blue-900 transition-all ease-in-out duration-300'>Create New Task +</button>
                                    :
                                    <>
                                        <p className='text-center font-bold text-xl mb-10'>Create Task</p>
                                        <Form
                                            setState={setState}
                                            state={state}
                                            saveHandler={saveHandler}
                                        />
                                    </>
                            }
                        </>
                    }



                    {state.menu === "all_tasks" &&
                        <div className=' overflow-x-auto'>
                            <p className='text-center font-bold text-xl mb-10'>All Tasks</p>
                            {data.map((task: any, index: number) =>
                                <Task
                                    OnClick={() => {
                                        setState({ type: "SHOW_DESCRIPTION", payload: "" })
                                        setObj({ ...task })
                                    }}
                                    delRow={delRow}
                                    editHandler={editHandler}
                                    index={index}
                                    task={task}
                                    requestHandler={requestHandler}
                                />

                            )
                            }
                        </div>
                    }

                    {state.menu === "assigned_tasks" &&
                        <div className='overflow-x-auto'>
                            <p className='text-center font-bold text-xl mb-10'>Assigned Tasks</p>
                            {assignedTasks.map((task: any, index: number) =>
                                <Task
                                    OnClick={() => {
                                        setState({ type: "SHOW_DESCRIPTION", payload: "" })
                                        setObj({ ...task })
                                    }}
                                    task={task}
                                    index={index}
                                    editHandler={editHandler}
                                    delRow={delRow}
                                />
                            )
                            }
                        </div>
                    }
                </div>
            </div>

            {state.showEdit &&
                <div className=' bg-[#000000a2] fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
                    <Form
                        updateHandler={updateHandler}
                        setState={setState}
                        state={state}
                    />
                </div>
            }
            {state.showRequest &&
                <ShowRequestComponent
                    addAssigne={(e) => addAssigne(e)}
                    OnClose={() => setState({ type: "HIDE_REQ", payload: "" })}
                    OnChange={(value: string) => setState({ type: "SET_ASSIGNE", payload: value })}
                    assigne={state?.assigne}
                />
            }
            {
                state.showDescription &&
                <TaskDescription
                    obj={obj}
                    OnClose={() => setState({ type: "HIDE_DESCRIPTION", payload: "" })}
                />
            }
        </div>
    )
}

export default Dashboard
