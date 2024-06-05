type TcsTyperUser = {
    username: string;
}

export type TcsTyperSettings = {
    theme: string,
    sound: string
}

export type UserDetails = {
    coach: boolean,
    created_at: string,
    id: number,
    full_name: string,
    password: string,
    tests: Array<object>,
    username: string
}

export async function fetchUserDetails(username: string): Promise<UserDetails> {
    let response: UserDetails
    try {
        response = await fetch("https://tcs-typer.netlify.app/api/user?username=" + username).then((resp) => resp.json());
    } catch (e) {
        throw new Error("An error occurred while fetching the user details: " + e)
    }

    console.log("FETCHED USER DETAILS SHAPE: ", response)
    return response
}

export function getUser() {
    try {
        const storedUser = localStorage.getItem("TcsTyper_SavedUser")

        if (storedUser) {
            return JSON.parse(localStorage.getItem("TcsTyper_SavedUser") || "");
        } else {
            // OLD Storage fix:
            const oldStoredUser = localStorage.getItem("username")
            if (oldStoredUser) {
                const newUser = { username: oldStoredUser }
                setUser(newUser)
                window.localStorage.removeItem("username")
                return newUser
            } else {
                return null
            }
        }
    } catch {
        return null
    }
}

export function setUser(newUser: TcsTyperUser): void {
    localStorage.setItem("TcsTyper_SavedUser", JSON.stringify(newUser));
}

export function getSettings(): TcsTyperSettings {
    const storedSettings = localStorage.getItem("TcsTyper_SavedSettings")

    useSavedSettings: if (storedSettings) {
        let returning
        try {
            returning = JSON.parse(storedSettings);
        } catch {
            break useSavedSettings
        }
        if (!returning) {
            break useSavedSettings
        }
        if (returning.sound === "standard-click") {
            returning.sound = "default-click"
        }
        setSettings(returning)
        return returning
    }

    const defaultSettings = { theme: "default-theme", sound: "default-click" }


    // OLD Storage fix:
    const oldStoredTheme = localStorage.getItem("theme")
    let oldStoredSound = localStorage.getItem("sound")
    if (oldStoredTheme || oldStoredSound) {
        let newSettings = defaultSettings
        if (oldStoredTheme) {
            newSettings = { ...newSettings, theme: oldStoredTheme }
            window.localStorage.removeItem("theme")
        }
        if (oldStoredSound) {
            oldStoredSound = oldStoredSound === "standard-click" ? "default-click" : oldStoredSound
            newSettings = { ...newSettings, sound: oldStoredSound }
            window.localStorage.removeItem("sound")
        }
        setSettings(newSettings)
        return newSettings
    } else {
        setSettings(defaultSettings)
        return defaultSettings
    }
}

export function setSettings(newTheme: TcsTyperSettings): void {
    localStorage.setItem("TcsTyper_SavedSettings", JSON.stringify(newTheme));
}
