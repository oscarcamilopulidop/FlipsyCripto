import { Auth } from "aws-amplify"


export const CheckConnection = async () => {
    let response
    try {
        return await Auth.currentAuthenticatedUser()
    } catch (error) {
        return error
    }
}