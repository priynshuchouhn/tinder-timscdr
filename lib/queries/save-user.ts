// lib/user.js
import { driver } from '../neo4j';

export const saveUser = async (userData: any) => {
    const session = driver().session(); 

    try {
        const { userId, name, gender, interested_in, email, birthdate, photos } = userData;

        const query = `
      CREATE (u:User {
        clerkId: $userId
        name: $name,
        gender: $gender,
        interested_in: $interested_in,
        email: $email,
        birthdate: $birthdate,
        photos: $photos
      })
    `;

        const params = {
            clerkId :userId,
            name,
            gender,
            interested_in,
            email,
            birthdate: `${userData.year}-${userData.month}-${userData.day}`, // convert date to ISO string
            photos,
        };

        await session.run(query, params);
    } catch (error) {
        console.error("Error saving user:", error);
        throw error; // Rethrow error to handle it in the calling function
    } finally {
        await session.close(); // Always close the session
    }
};
