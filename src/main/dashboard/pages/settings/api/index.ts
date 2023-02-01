import axios from "axios";

const SettingsAPI = {
    updateProfile: function (data: any, token: string) {
        return axios.patch("http://localhost:3500/api/users/updateuser", data, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
    },
    uploadProfilePhoto: function (profilePhotoData: FormData, token: string) {
        return axios.post(
            "http://localhost:3500/api/users/upload-profile-photo",
            profilePhotoData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                },
            }
        );
    },
};

export default SettingsAPI;
