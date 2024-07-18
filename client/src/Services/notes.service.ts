export async function getNotes(token: string ) {
    try {
        const response = await axios.get("/api/v1/notes");
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
