import { useEffect, useState } from "react"

export const useFetch = <T>(IFunction : () => Promise<T> , autoFetch = true) => {
    const [data, setData] = useState<T | null>(null)
    const [error , seterror] = useState<Error | null>(null)
    const [loading , setloading] = useState(false)

   const FetchData = async () => {
    setloading(true)
    try {
        const res = await IFunction()
        setData(res)


    } catch (err) {
        console.log(error)
        seterror(
            err instanceof Error ? err : new Error('failed')
        )

        
    }finally {
        setloading(false)
    }
   }


   const reset = () => {
    setData(null)
    setloading(false)
    seterror(null)
   }

   useEffect(() => {
    if(autoFetch) {
        FetchData()
    }
   } , [])
    
   return {data , error , loading , reset , FetchData}
}