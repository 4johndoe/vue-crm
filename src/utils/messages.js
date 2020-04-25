import localizeFilter from "../filters/localize.filter"

export default {
    'login': localizeFilter('Login'),
    'logout': localizeFilter('Logout'),
    'auth/user-not-found': localizeFilter('Messages_UserNotFound'),
    "auth/wrong-password": localizeFilter('Messages_WrongPassword'),
    "auth/email-already-in-use": localizeFilter('Messages_EmailAlreadyUsed'),
}