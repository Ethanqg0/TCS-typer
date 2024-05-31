type TcsTyperUser = {
    username: any;
}
type TcsTyperSettings = {
    theme: string,
    sound: string
}

async function getUsername(): Promise<any> {
    let storedUser = localStorage.getItem("TcsTyper_SavedUser") as any;
    storedUser = JSON.parse(storedUser || "{}") as any;

    return storedUser["username"];
}

async function fetchUserDetails(): Promise<any> {
    const response = await fetch("https://tcs-typer.netlify.app/api/user/");
    const users = await response.json();
    const username = await getUsername();

    console.log(users);

    if (!response.ok) {
        throw new Error("An error occurred while fetching the user details.");
    }

    for (const user of users) {
        if (user.username === username) {
            return user;
        }
    }

    return null;
}


function getUser() {
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

    let defualtSettings = { theme: "default-theme", sound: "default-click" }


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

function setSettings(newTheme: TcsTyperSettings): void {
    localStorage.setItem("TcsTyper_SavedSettings", JSON.stringify(newTheme));
}
