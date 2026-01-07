import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    try {
        const { rows } = await sql`SELECT story_id, likes FROM story_likes`;

        // Convert array to object { [story_id]: likes_count }
        const likesMap = rows.reduce((acc, row) => {
            acc[row.story_id] = row.likes;
            return acc;
        }, {} as Record<string, number>);

        return NextResponse.json(likesMap);
    } catch (error) {
        console.warn("Database error (ignore if running locally without setup):", error);
        // Return empty object on error (e.g. local dev without DB)
        return NextResponse.json({});
    }
}

export async function POST(request: Request) {
    try {
        const { storyId } = await request.json();
        if (!storyId) return NextResponse.json({ error: 'Missing storyId' }, { status: 400 });

        // Upsert: Insert if not exists, otherwise update
        await sql`
      INSERT INTO story_likes (story_id, likes)
      VALUES (${storyId}, 1)
      ON CONFLICT (story_id)
      DO UPDATE SET likes = story_likes.likes + 1;
    `;

        // Fetch updated count
        const { rows } = await sql`SELECT likes FROM story_likes WHERE story_id = ${storyId}`;
        const newCount = rows[0]?.likes || 0;

        return NextResponse.json({ likes: newCount });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
