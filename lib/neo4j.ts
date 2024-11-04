

import neo4j from 'neo4j-driver';



export const driver = () => {
    const uri = process.env.NEO4J_URI;
    const username = process.env.NEO4J_USERNAME;
    const password = process.env.NEO4J_PASSWORD;
    if (!uri || !username || !password) {
        throw new Error("Missing Neo4j environment variables. Please check NEO4J_URI, NEO4J_USERNAME, and NEO4J_PASSWORD.");
    }
    const connection = neo4j.driver(
        uri,
        neo4j.auth.basic(username, password)
    );

    return connection;
}
