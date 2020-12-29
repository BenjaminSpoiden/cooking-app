import { stringify } from "querystring"
import { useEffect, useState } from "react"

export const useFetchAvatar = (url: string) => {

    const [userData, setUserData] = useState({data: null, isLoading: true})

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setUserData({data: data, isLoading: false})
        })
        .catch(reason => console.log(reason))
    }, [])

    return userData
}