export type stateType = {
    menu: string
    title: string
    description: string
    dueDate: string
    showCreate: boolean
    showEdit: boolean
    showNotification?: boolean
    showDescription?: boolean
    id: string
    assigne?: string
    showRequest: boolean
    unseen?: string
}

export type actionType = {
    type: "SET_TITLE" | "SET_DESCRIPTION" | "SET_DUE_DATE" | "SHOW_CREATE" | "HIDE_CREATE" | "SET_MENU" | "HIDE_EDIT" | "SHOW_EDIT" | "SET_ID" | "SET_ASSIGNE" | "SHOW_REQ" | "HIDE_REQ" | "SET_UNSEEN" | "SHOW_NOTIFICATION" | "HIDE_NOTIFICATION" | "SHOW_DESCRIPTION" | "HIDE_DESCRIPTION"
    payload: string
}

const dashboardReducer = (state: stateType, action: actionType) => {
    const { type, payload } = action
    switch (type) {
        case "SET_TITLE":
            return { ...state, title: payload };
        case "SET_DESCRIPTION":
            return { ...state, description: payload };

        case "SET_DUE_DATE":
            return { ...state, dueDate: payload };

        case "SHOW_CREATE":
            return { ...state, showCreate: true };

        case "HIDE_CREATE":
            return { ...state, showCreate: false }

        case "SHOW_EDIT":
            return { ...state, showEdit: true };

        case "HIDE_EDIT":
            return { ...state, showEdit: false }

        case "SHOW_REQ":
            return { ...state, showRequest: true };

        case "HIDE_REQ":
            return { ...state, showRequest: false }

        case "SET_MENU":
            return { ...state, menu: payload }

        case "SET_ID":
            return { ...state, id: payload }

        case "SET_ASSIGNE":
            return { ...state, assigne: payload }

        case "SET_UNSEEN":
            return { ...state, unseen: payload }

        case "SHOW_NOTIFICATION":
            return { ...state, showNotification: true }

        case "HIDE_NOTIFICATION":
            return { ...state, showNotification: false }

        case "SHOW_DESCRIPTION":
            return { ...state, showDescription: true }

        case "HIDE_DESCRIPTION":
            return { ...state, showDescription: false }

        default:
            return state
    }
}

export default dashboardReducer