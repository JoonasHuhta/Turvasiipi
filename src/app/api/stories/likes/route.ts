import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    try {
        const { rows } = await sql`SELECT story_id, reaction_type, count FROM story_reactions`;

        // Convert to nested object: { [story_id]: { like: 0, heart: 0 } }
        const reactionsMap: Record<string, Record<string, number>> = {};

        rows.forEach(row => {
            if (!reactionsMap[row.story_id]) {
                reactionsMap[row.story_id] = {};
            }
            reactionsMap[row.story_id][row.reaction_type] = row.count;
        });

        return NextResponse.json(reactionsMap);
    } catch (error) {
        console.warn("Database error (ignore if running locally without setup):", error);
        return NextResponse.json({});
    }
}

export async function POST(request: Request) {
    try {
        const { storyId, type } = await request.json();
        if (!storyId || !type) return NextResponse.json({ error: 'Missing storyId or type' }, { status: 400 });

        const validTypes = ['like', 'heart'];
        if (!validTypes.includes(type)) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

        // Upsert: Insert if not exists, otherwise update
        await sql`
      INSERT INTO story_reactions (story_id, reaction_type, count)
      VALUES (${storyId}, ${type}, 1)
      ON CONFLICT (story_id, reaction_type)
      DO UPDATE SET count = story_reactions.count + 1;
    `;

        // Fetch updated count for this specific reaction
        const { rows } = await sql`
      SELECT count FROM story_reactions 
      WHERE story_id = ${storyId} AND reaction_type = ${type}
    `;
        const newCount = rows[0]?.count || 0;

        return NextResponse.json({ count: newCount, type });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
