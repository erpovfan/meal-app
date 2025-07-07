export const BASEURL = 'https://www.themealdb.com/api/json/v1/1'



export const mealFunc = {
    searchMEAL : async (query : string) => {
        const url = `${BASEURL}/search.php?s=${encodeURIComponent(query)}`

        const res = await fetch(url , {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
            }
            
        })
        const data = await res.json()
        if(res.ok) {
            return data.meals
        } 
        if(!res.ok) {
            console.log('error')
            return []
            
        }


    } , 


    RandomSingleMeal :async () => {
        const url = `${BASEURL}/random.php`
const res  =await fetch(url)
const data = await res.json()
if(res.ok) {
    return data?.meals
}
if(!res.ok) {
    console.log('error')
    return []
}

    } , 


    CATmeal : async () => {
const url = `${BASEURL}/categories.php`
const res= await fetch(url)
const data = await res.json()
if(res.ok) {
    return data.categories
}
if(!res.ok) {
    console.log('error')
    return []
}
    } , 
    filterbyCat : async (query :String) => {
        const url = `${BASEURL}/filter.php?c=${query}`
        const res = await fetch(url)
        const data = await res.json()
        if(res.ok) {
            return data.meals
        } 
        if(!res.ok) {
            console.log('error')
            return []
            
        }

    } , 
    

MealbyId : async (id:string) => {

    const url = `${BASEURL}/lookup.php?i=${id}`
    const res = await fetch(url)
    const data = await res.json()

    if(res.ok) {
        return data.meals

    }
    if(!res.ok) {
        console.log('error')
        return []
    }


} , 

RandomMeal : async () => {
     const url = `${BASEURL}/random.php`
     const res = await fetch(url)
     const data = await res.json()
     if(res.ok) {
        return data.meals ? data.meals[0] : []
     }
     if(!res.ok) {
        console.log('error')
        return []
     }
} , 

GETRandomMeals : async (count=6) => {

    const promises = Array(count).fill(undefined).map(() => mealFunc.RandomMeal() )
    const meals = await Promise.all(promises)
    return meals.filter((meal) => meal !==null)
} 

}