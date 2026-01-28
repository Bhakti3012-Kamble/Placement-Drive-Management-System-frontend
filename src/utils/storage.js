/**
 * LocalStorage management utility for PDMS
 */

const STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
    STUDENT_REG_DATA: 'studentRegistrationData',
    RECRUITER_REG_PROCESS: 'recruiterRegProcess',
    STUDENT_PROFILE_DATA: 'studentProfileData'
};

export const storage = {
    setToken: (token) => localStorage.setItem(STORAGE_KEYS.TOKEN, token),
    getToken: () => localStorage.getItem(STORAGE_KEYS.TOKEN),

    setUser: (user) => localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
    getUser: () => {
        const user = localStorage.getItem(STORAGE_KEYS.USER);
        return user ? JSON.parse(user) : null;
    },

    setStudentRegData: (data) => localStorage.setItem(STORAGE_KEYS.STUDENT_REG_DATA, JSON.stringify(data)),
    getStudentRegData: () => {
        const data = localStorage.getItem(STORAGE_KEYS.STUDENT_REG_DATA);
        return data ? JSON.parse(data) : {};
    },

    clear: () => localStorage.clear(),

    remove: (key) => localStorage.removeItem(key)
};

export default storage;
