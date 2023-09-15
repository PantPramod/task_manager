type stateType = {
    email: string
    password: string
    error: string
    message?: string
}
type actionType = {
    type: "SET_EMAIL" | "SET_PASSWORD" | "SET_ERROR" | "SET_MESSAGE";
    payload: string;
}

const loginReducer = (state: stateType, action: actionType) => {
    const { type, payload } = action
    switch (type) {
        case "SET_EMAIL":
            return { ...state, email: payload }

        case "SET_PASSWORD":
            return { ...state, password: payload }

        case "SET_ERROR":
            return { ...state, error: payload }

        case "SET_MESSAGE":
            return { ...state, message: payload }

        default:
            return state
    }
}

export default loginReducer