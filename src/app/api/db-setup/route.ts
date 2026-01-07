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
    await sql`
      CREATE TABLE IF NOT EXISTS global_counters (
        name VARCHAR(50) PRIMARY KEY,
        count INT DEFAULT 0
      );
    `;
    // Initialize the lights counter if it doesn't exist
    await sql`
      INSERT INTO global_counters (name, count) VALUES ('lights', 0) ON CONFLICT (name) DO NOTHING;
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS story_reactions (
        story_id VARCHAR(50),
        reaction_type VARCHAR(20),
        count INT DEFAULT 0,
        PRIMARY KEY (story_id, reaction_type)
      );
    `;
    return NextResponse.json({ message: 'Table created successfully' });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
