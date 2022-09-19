import UserAvatar from "./UserAvatar";

export default function JokeCard({ joke }) {
    return (
        <article key={joke.id}>
            <UserAvatar uid={joke.uid} />
            <details>
                <summary>{joke.setup}</summary>
                <p>{joke.punchline}</p>
            </details>
        </article>
    );
}
