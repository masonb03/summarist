
import Player from "../page"

const PlayerPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <div>Book not found</div>;
  }

  const book = await res.json();

  return <Player book={book} />;
};

export default PlayerPage;