import axios from "axios";

const SettingsAPI = {
    updateProfile: function (data: any, token: string) {
        return axios.patch(
            `${process.env.REACT_APP_API_URL}/users/updateuser`,
            data,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
    },
    uploadProfilePhoto: function (profilePhotoData: FormData, token: string) {
        return axios.post(
            `${process.env.REACT_APP_API_URL}/users/upload-profile-photo`,
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
