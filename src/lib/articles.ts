import fs from 'fs';
import path from 'path';

/**
 * Load article markdown content from file system
 * @param slug - Article slug matching the filename
 * @returns Markdown content as string
 */
export async function loadArticleContent(slug: string): Promise<string | null> {
    try {
        const filePath = path.join(process.cwd(), 'src', 'content', 'articles', `${slug}.md`);
        const content = fs.readFileSync(filePath, 'utf-8');
        return content;
    } catch (error) {
        console.error(`Failed to load article: ${slug}`, error);
        return null;
    }
}
