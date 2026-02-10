import { api } from "./api";
import { refreshToken } from "./auth/auth.service";

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    const isRefreshRequest =
      typeof originalRequest?.url === "string" &&
      originalRequest.url.includes("/auth/refresh")

    // éviter boucle infinie
    if (
      error.response?.status === 401 &&
      !isRefreshRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const res = await refreshToken()

        const newAccessToken = res.data.accessToken

        setAccessToken(newAccessToken)

        // 🔥 on met le nouveau token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        // 🔥 on rejoue la requête
        return api(originalRequest)
      } catch (err) {
        // refresh KO → logout
        setAccessToken(null)
        window.location.href = "/authentication/login"
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)


