import { MongoClient, ObjectId } from "mongodb";

// Initialize MongoDB client and database connection
const client = new MongoClient(process.env.DATABASE_URL);
const db = client.db("movieDB");
const movieCollection = db.collection("movies");

/**
 * Handles adding a new movie to the database.
 * 
 * Input:
 * - JSON request body containing { title, actors, releaseYear }
 * 
 * Processing:
 * - Parses the request body and inserts a new movie document into the collection.
 * - Converts releaseYear to an integer.
 * 
 * Output:
 * - Returns the created movie object with a 201 status if successful.
 * - Returns a 500 status if an error occurs.
 */
export async function POST(request) {
  try {
    const { title, actors, releaseYear } = await request.json();
    const newMovie = { title, actors, releaseYear: parseInt(releaseYear, 10) };

    await client.connect();
    const result = await movieCollection.insertOne(newMovie);
    
    if (result.acknowledged) {
      newMovie._id = result.insertedId;
      return new Response(JSON.stringify(newMovie), { status: 201 });
    }

    return new Response("Failed to add movie", { status: 500 });
  } catch (error) {
    console.error("Error adding movie:", error.message);
    return new Response("Error adding movie", { status: 500 });
  } finally {
    await client.close();
  }
}

/**
 * Handles retrieving all movies from the database.
 * 
 * Processing:
 * - Connects to the database and fetches all movie documents.
 * 
 * Output:
 * - Returns a JSON array of movies with a 200 status if successful.
 * - Returns a 500 status if an error occurs.
 */
export async function GET() {
  try {
    await client.connect();
    const movies = await movieCollection.find({}).toArray();
    return new Response(JSON.stringify(movies), { status: 200 });
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    return new Response("Error fetching movies", { status: 500 });
  } finally {
    await client.close();
  }
}

/**
 * Handles updating an existing movie in the database.
 * 
 * Input:
 * - JSON request body containing { id, title, actors, releaseYear }
 * 
 * Processing:
 * - Converts id to an ObjectId and updates the corresponding movie document.
 * - Converts releaseYear to an integer.
 * 
 * Output:
 * - Returns a 200 status if the update is successful.
 * - Returns a 404 status if the movie is not found or unchanged.
 * - Returns a 500 status if an error occurs.
 */

export async function PUT(request) {
  try {
    const { id, title, actors, releaseYear } = await request.json();
    
    await client.connect();
    const result = await movieCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, actors, releaseYear: parseInt(releaseYear, 10) } }
    );

    if (result.modifiedCount === 0) {
      return new Response("Movie not found or no changes made", { status: 404 });
    }

    return new Response("Movie updated", { status: 200 });
  } catch (error) {
    console.error("Error updating movie:", error.message);
    return new Response("Error updating movie", { status: 500 });
  } finally {
    await client.close();
  }
}

/**
 * Handles deleting a movie from the database.
 * 
 * Input:
 * - JSON request body containing { id }
 * 
 * Processing:
 * - Converts id to an ObjectId and deletes the corresponding movie document.
 * 
 * Output:
 * - Returns a 200 status if the movie is deleted.
 * - Returns a 404 status if the movie is not found.
 * - Returns a 500 status if an error occurs.
 */

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    await client.connect();
    const result = await movieCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response("Movie not found", { status: 404 });
    }

    return new Response("Movie deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting movie:", error.message);
    return new Response("Error deleting movie", { status: 500 });
  } finally {
    await client.close();
  }
}
