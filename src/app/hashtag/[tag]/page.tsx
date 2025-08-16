import HashtagView from "@/views/HashtagView";

export default function HashTagPage({ params }: { params: { tag: string } }) {
  return (
    <div className="min-h-screen">
      <h1>HashTag {params.tag}</h1>
      <div className="container mx-auto px-4 py-8 max-w-screen-md">
        <HashtagView />
      </div>
    </div>
  );
}
