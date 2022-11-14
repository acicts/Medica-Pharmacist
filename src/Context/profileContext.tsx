import React, { createContext, ReactElement, useContext, useState } from 'react'

export const profileContext = createContext<any>({
    profilePic: 'https://i0.wp.com/www.howtomob.com/wp-content/uploads/2022/07/whatsapp-dp-for-boys-.jpg?ssl=1&resize=512%2C512',
    pharmacyName: 'Pharmacy Name'
})

const ProfileContextProvider = (props: { children: ReactElement | ReactElement[] }) => {
    const [pharmacyNae, setProfile] = useState();
    return (
        <profileContext.Provider value={{
            profilePic: 'https://i0.wp.com/www.howtomob.com/wp-content/uploads/2022/07/whatsapp-dp-for-boys-.jpg?ssl=1&resize=512%2C512',
            pharmacyName: 'Pharmacy Name'
        }}>{props.children}</profileContext.Provider>
    )
}

export default ProfileContextProvider