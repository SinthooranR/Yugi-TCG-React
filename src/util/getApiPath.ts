const devApiUrl = process.env.NEXT_PUBLIC_API_URL_DEV;

const apiUrl = process.env.NODE_ENV === "development" ? devApiUrl : "";

export default apiUrl;
