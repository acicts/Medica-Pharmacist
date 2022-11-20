import axios from 'axios';
import React, { createContext, ReactElement, useCallback, useContext, useEffect, useState } from 'react'
import { authContext } from './authContext';

export const profileContext = createContext<{
    profilePic: string;
    pharmacyName: string;
    updateProfile: (_profilePic: string, _pharmacyName: string) => void;
    pharmacyID: string
}>({
    profilePic: '',
    pharmacyName: '',
    updateProfile: () => { },
    pharmacyID: ''
})

const ProfileContextProvider = (props: { children: ReactElement | ReactElement[] }) => {
    const [pharmacyName, setPharmacyName] = useState('');
    const [pharmacyID, setPharmacyID] = useState('')
    const [profilePic, setProfilePic] = useState('https://i0.wp.com/www.howtomob.com/wp-content/uploads/2022/07/whatsapp-dp-for-boys-.jpg?ssl=1&resize=512%2C512');
    const authCtx = useContext(authContext);
    const fetchData = useCallback(() => {
        const url = `${process.env.REACT_APP_API_ENDPOINT}/pharmacist/profile?token=${authCtx.token}`;
        if (authCtx.token) axios
            .get(url)
            .then((response) => {
                console.log(response);
                setPharmacyName(response.data.user.shopName);
                setProfilePic(response.data.user.logo.link)
                setPharmacyID(response.data.user.pharmacyPass.id)
            })
            .catch(console.log);
    }, [authCtx.token]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const updateProfile = (_profilePic: string, _pharmacyName: string) => {
        console.log(_pharmacyName)
        setProfilePic(_profilePic);
        setPharmacyName(_pharmacyName)
    }

    const value = {
        profilePic: profilePic,
        pharmacyName: pharmacyName,
        updateProfile,
        pharmacyID
    }
    return (
        <profileContext.Provider value={value}>{props.children}</profileContext.Provider>
    )
}

export default ProfileContextProvider