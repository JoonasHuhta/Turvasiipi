import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    try {
        const { rows } = await sql`SELECT count FROM global_counters WHERE name = 'lights'`;
        const count = rows[0]?.count || 0;
        return NextResponse.json({ count });
    } catch (error) {
        console.warn("Database error:", error);
        return NextResponse.json({ count: 0 });
    }
}

export async function POST() {
    try {
        // Increment count
        await sql`
      UPDATE global_counters 
      SET count = count + 1 
      WHERE name = 'lights'
    `;

        // Fetch new count
        const { rows } = await sql`SELECT count FROM global_counters WHERE name = 'lights'`;
        const newCount = rows[0]?.count || 0;

        return NextResponse.json({ count: newCount });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
