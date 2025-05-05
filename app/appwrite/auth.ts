import { ID, OAuthProvider, Query } from "appwrite";
import { account, appwriteConfig, database } from "./client";
import { redirect } from "react-router";

export const loginWithGoogle = async () => {
    try {
        account.createOAuth2Session(OAuthProvider.Google);
    } catch (error) {
        console.error("Error logging in with Google:", error);
        throw error;
    }
}

export const getUser = async () => {
    try {
        const user = await account.get();

        if (!user) return redirect("/sign-in");

        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [
                Query.equal("accountId", user.$id),
                Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"]),
            ]
        );

        return documents.length > 0 ? documents[0] : redirect("/sign-in");
    } catch (error) {
        console.error("Error getting user:", error);
        throw error;
    }
}

export const logout = async () => {
    try {
        await account.deleteSession("current");
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
}

export const getGooglePicture = async (accessToken: string) => {
    try {
        const response = await fetch(
            "https://people.googleapis.com/v1/people/me?personFields=photos",
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (!response.ok) throw new Error("Failed to fetch Google profile picture");

        const { photos } = await response.json();
        return photos?.[0]?.url || null;
    } catch (error) {
        console.error("Error getting Google picture:", error);
        throw error;
    }
}

export const storeUserData = async () => {
    try {
        const user = await account.get();
        if (!user) throw new Error("User not found");

        const { providerAccessToken } = (await account.getSession("current")) || {};
        const profilePicture = providerAccessToken
            ? await getGooglePicture(providerAccessToken)
            : null;

        const createdUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
                accountId: user.$id,
                email: user.email,
                name: user.name,
                imageUrl: profilePicture,
                joinedAt: new Date().toISOString(),
            }
        );

        if (!createdUser.$id) redirect("/sign-in");
    } catch (error) {
        console.error("Error storing user data:", error);
        throw error;
    }
}

export const getExistingUser = async (id: string) => {
    try {
        const { documents, total } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal("accountId", id)]
        );
        return total > 0 ? documents[0] : null;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

export const getAllUsers = async (limit: number, offset: number) => {
    try {
        const { documents: users, total } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.limit(limit), Query.offset(offset)]
        )

        if (total === 0) return { users: [], total };

        return { users, total };
    } catch (e) {
        console.log('Error fetching users')
        return { users: [], total: 0 }
    }
}