type stateType = {
    email: string
    password: string
    confirmPassword: string
    error: string
    isRegisteredSuccessfully: boolean
}
type actionType = {
    type: "SET_EMAIL" | "SET_PASSWORD" | "SET_CONFIRM_PASSWORD" | "SET_ERROR" | "SET_IS_REGISTERED_SUCCESSFULLY";
    payload: string;
}

const signupReducer = (state: stateType, action: actionType) => {
    const { type, payload } = action
    switch (type) {
        case "SET_EMAIL":
            return { ...state, email: payload }

        case "SET_PASSWORD":
            return { ...state, password: payload }

        case "SET_CONFIRM_PASSWORD":
            return { ...state, confirmPassword: payload }

        case "SET_ERROR":
            return { ...state, error: payload }

        case "SET_IS_REGISTERED_SUCCESSFULLY":
            return { ...state, isRegisteredSuccessfully: true }
        default:
            return state
    }
}

export default signupReducer