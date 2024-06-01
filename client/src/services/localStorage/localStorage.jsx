


export function LocalStorageService() {

    const get = (token) => {
        return localStorage.getItem(token)
    }

    const set = (token, value) => {
        localStorage.setItem(token, value)
    }

    const clear = (token) => {
        localStorage.clear(token)
    }
    return {
        get,
        set,
        clear
    }
}