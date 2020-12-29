import { useEffect, useState } from "react"

export const usePersistedData = (key: string, defaultValue: any) => {

    const [data, setData] = useState(localStorage.getItem(key) || defaultValue)

    useEffect(() => {
        localStorage.setItem(key, data)
    }, [key, data])

    return [data, setData]
}