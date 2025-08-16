import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const src = req.nextUrl.searchParams.get("src");

    if (!src) {
        return new Response("Missing src", { status: 400 });
    }

    const res = await fetch(src, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        },
    });

    const contentType = res.headers.get("content-type") || "";

    if (!contentType.startsWith("image/")) {
        return new Response("Invalid image response", { status: 400 });
    }

    return new Response(res.body, {
        headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=86400",
        },
    });
}
