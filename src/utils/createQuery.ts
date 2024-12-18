export const createQueryString = (queryObject: Record<string, any>): string => {
    const queryString = Object.entries(queryObject)
        // eslint-disable-next-line no-unused-vars
        .filter(([_, value]) => value !== undefined && value !== null && value !== "")
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join("&");
    return queryString ? `?${queryString}` : "";
};