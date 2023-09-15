

const Notifications = ({ notifications }: any) => {
    return (
        <div className='absolute shadow-xl  p-4 left-4 sm:left-1/2 top-[100%] rounded-md right-4  max-h-[calc(100vh-150px)] bg-gray-100  overflow-y-auto'>
            {
                notifications.map((notifi: any, index: number) =>
                    <div
                        key={notifi?.id}
                        className=''>
                        {
                            notifi?.isComment ?
                                <div className='hover:bg-gray-50  flex items-center p-2 cursor-pointer'>{`${index + 1}. ${notifi?.by} commented "${notifi?.comment}" on task "${notifi?.title}"`}</div>
                                :
                                <div
                                    className='hover:bg-gray-50  flex items-center p-2 cursor-pointer' key={notifi?.id}>
                                    <p>{index + 1} . You have assigned a task "{notifi?.title}"  from {notifi?.from}</p>

                                </div>

                        }

                    </div>
                )
            }
        </div>
    )
}

export default Notifications

