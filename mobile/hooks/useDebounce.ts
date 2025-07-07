import { useEffect, useState } from "react";

export const useDebounce = (value:string , delay:number) => {
    const [DebQuery, setDebQuery] = useState(value)

    useEffect(() => {
const handler = setTimeout(() => {
    setDebQuery(value)
}, delay);


return () => clearTimeout(handler)
    }, [value , delay])
return DebQuery
}