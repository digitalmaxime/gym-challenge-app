type UserData = {
    id: string;
    email: string;
    userName?: string | undefined;
    authLevel: number | undefined;
    memberships: string[] | undefined;
}

export default UserData;
