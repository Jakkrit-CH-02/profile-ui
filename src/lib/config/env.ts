let envSource = import.meta.env

if ((window as any).env  != null) {
   envSource = (window as any).env
}


const {
   NODE_ENV,
   VITE_APP_BASE_NAME,
   VITE_APP_TENANT_ID,
   VITE_APP_CLIENT_ID,
   VITE_APP_REDIRECT_URL,
   VITE_APP_API_SCOPE,
   VITE_APP_API_ENDPOINT,
   VITE_APP_IMAGE_ROOT,
} = envSource

export default {
   NODE_ENV,
   BASE_NAME: VITE_APP_BASE_NAME ?? "",
   TENANT_ID: VITE_APP_TENANT_ID ?? "",
   CLIENT_ID: VITE_APP_CLIENT_ID ?? "",
   REDIRECT_URL: VITE_APP_REDIRECT_URL ?? "",
   API_SCOPE: VITE_APP_API_SCOPE ?? "",
   API_ENDPOINT: VITE_APP_API_ENDPOINT ?? "",
   IMAGE_ROOT: VITE_APP_IMAGE_ROOT ?? "",
}