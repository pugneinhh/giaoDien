import axios from "axios";

export const upCloud = async (file) => {
    const formData = new FormData();
    formData.append("file", file)
    formData.append("upload_preset", "mishoes")
    const { data } = await axios.post("https://api.cloudinary.com/v1_1/dtetgawxc/image/upload",formData)
    return {publicId: data?.public_id, url: data?.secure_url }
}