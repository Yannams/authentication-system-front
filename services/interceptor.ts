import { api } from "./api";

let accessToken: string|null = null

export const setAccessToken =(token:string | null) => {
    accessToken= token
}

api.interceptors.request.use((config)=>{
    if(accessToken){
        config.headers.Authorization= `Bearer ${accessToken}`
    }
    return config
})