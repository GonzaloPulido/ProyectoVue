export async function fetchDataFromApi(url){
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Error al obtener los datos de la API")
        }
        return await response.json()
    } catch (error) {
        console.error("Error al obtener los datos de la API:", error)
        throw error
    }
}