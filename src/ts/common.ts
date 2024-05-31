type TcsTyperUser = {
    username: string
}
type TcsTyperSettings = {
    theme: string,
    sound: string
}

function getUser(): TcsTyperUser | null {
    try {
        let storedUser = localStorage.getItem("TcsTyper_SavedUser")

        if (storedUser) {
            return JSON.parse(localStorage.getItem("TcsTyper_SavedUser") || "");
        } else {
            // OLD Storage fix:
            let oldStoredUser = localStorage.getItem("username")
            if (oldStoredUser) {
                let newUser = { username: oldStoredUser }
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

function setUser(newUser: TcsTyperUser): void {
    localStorage.setItem("TcsTyper_SavedUser", JSON.stringify(newUser));
}

function getSettings(): TcsTyperSettings {
    let storedSettings = localStorage.getItem("TcsTyper_SavedSettings")

    if (storedSettings) {
        let returning = JSON.parse(storedSettings);
        if (returning.sound === "standard-click") {
            returning.sound = "default-click"
        }
        setSettings(returning)
        return returning
    } else {
        let defualtSettings = { theme: "default-click", sound: "default-click" }


        // OLD Storage fix:
        let oldStoredTheme = localStorage.getItem("theme")
        let oldStoredSound = localStorage.getItem("sound")
        if (oldStoredTheme || oldStoredSound) {
            let newSettings = defualtSettings
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
            setSettings(defualtSettings)
            return defualtSettings
        }
    }
}

function setSettings(newTheme: TcsTyperSettings): void {
    localStorage.setItem("TcsTyper_SavedSettings", JSON.stringify(newTheme));
}
