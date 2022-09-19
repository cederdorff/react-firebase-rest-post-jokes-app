import { useEffect, useState } from "react";
import JokeCard from "../components/JokeCard";

export default function JokesPage() {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const url = "https://race-rest-default-rtdb.firebaseio.com/jokes.json";
            const response = await fetch(url);
            const data = await response.json();
            const jokesArray = Object.keys(data).map(key => ({ id: key, ...data[key] })); // from object to array
            setJokes(jokesArray);
        }
        getPosts();
    }, []);

    return (
        <section className="page">
            <section className="grid-container">
                {jokes.map(jokeObj => (
                    <JokeCard joke={jokeObj} key={jokeObj.id} />
                ))}
            </section>
        </section>
    );
}
