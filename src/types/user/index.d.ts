interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isEmailConfirmed: Boolean;
    photoPath: string | null;
}

export default IUser;
