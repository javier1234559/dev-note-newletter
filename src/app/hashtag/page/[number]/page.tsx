import HashtagView from "@/views/HashtagView";

export default function HashTagPage({ params }: { params: { number: string } }) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-screen-md">
        <h1>Page {params.number}</h1>
        <HashtagView />
      </div>
    </div>
  );
}
