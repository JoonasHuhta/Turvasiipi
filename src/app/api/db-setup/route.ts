import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await sql`
      CREATE TABLE IF NOT EXISTS story_likes (
        story_id VARCHAR(50) PRIMARY KEY,
        likes INT DEFAULT 0
      );
    `;
        return NextResponse.json({ message: 'Table created successfully' });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
