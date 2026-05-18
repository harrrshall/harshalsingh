import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ============== Types ==============

export interface PhysicsFrontmatter {
    current_section: string;
    current_topic: string;
    completed_sections: string[];
    last_updated: string;
}

export interface RoadmapSection {
    id: string;
    title: string;
    level: number; // 1 = Roman numeral, 2 = Letter subsection
    status: 'completed' | 'current' | 'upcoming';
}

export interface Book {
    subject: string;
    title: string;
    authors: string;
    edition: string;
    level: string;
    whyRecommended: string;
    coreChapters: string;
    problemSources: string;
    alternative: string;
    notes: string;
    status: 'reading' | 'completed' | '';
}

export interface PhysicsProgress {
    percentage: number;
    completedCount: number;
    totalCount: number;
    currentSection: string;
    currentTopic: string;
    lastUpdated: string;
}

// ============== Section Definitions ==============

// Define all major sections in the roadmap for progress tracking
const ROADMAP_SECTIONS: { id: string; title: string; level: number }[] = [
    { id: 'I.A', title: 'Assumed Background', level: 2 },
    { id: 'I.B', title: 'Mathematical Prerequisites Roadmap', level: 2 },
    { id: 'II.A', title: 'Classical Mechanics', level: 2 },
    { id: 'II.B', title: 'Electromagnetism (E&M)', level: 2 },
    { id: 'II.C', title: 'Quantum Mechanics', level: 2 },
    { id: 'II.D', title: 'Thermodynamics & Statistical Mechanics', level: 2 },
    { id: 'II.E', title: 'Mathematical Methods for Physicists', level: 2 },
    { id: 'II.F', title: 'Experimental Physics & Lab Methods', level: 2 },
    { id: 'II.G', title: 'Computational Physics', level: 2 },
    { id: 'III.A', title: 'Mathematical Methods (Deeper)', level: 2 },
    { id: 'III.B', title: 'Classical Electrodynamics (Advanced)', level: 2 },
    { id: 'III.C', title: 'Quantum Mechanics (Advanced)', level: 2 },
    { id: 'III.D', title: 'Advanced Classical Mechanics', level: 2 },
    { id: 'IV.A', title: 'Quantum Field Theory', level: 2 },
    { id: 'IV.B', title: 'General Relativity', level: 2 },
    { id: 'IV.C', title: 'Many-Body Physics & Condensed Matter', level: 2 },
    { id: 'V.A', title: 'Assessment Strategy', level: 2 },
    { id: 'V.B', title: 'Diagnostic Exam Sequence', level: 2 },
    { id: 'V.C', title: 'GRE Physics Subject Test Preparation', level: 2 },
    { id: 'VI', title: 'Projects & Design Integration', level: 1 },
    { id: 'VII', title: 'Computational & Laboratory Toolchain', level: 1 },
    { id: 'VIII', title: 'Research Preparation & Literature', level: 1 },
    { id: 'IX', title: 'Time Allocation & Sequencing', level: 1 },
    { id: 'X', title: 'Mentorship, Community & Resources', level: 1 },
];

// ============== Parsing Functions ==============

const roadmapPath = path.join(process.cwd(), 'physics_roadmap.md');
const booklistPath = path.join(process.cwd(), 'physics_booklist.csv');

export function getRoadmapData(): { frontmatter: PhysicsFrontmatter; content: string } | null {
    try {
        if (!fs.existsSync(roadmapPath)) {
            return null;
        }
        const fileContents = fs.readFileSync(roadmapPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            frontmatter: {
                current_section: data.current_section || '',
                current_topic: data.current_topic || '',
                completed_sections: data.completed_sections || [],
                last_updated: data.last_updated || '',
            },
            content,
        };
    } catch (error) {
        console.error('Error reading roadmap:', error);
        return null;
    }
}

export function getBooklist(): Book[] {
    try {
        if (!fs.existsSync(booklistPath)) {
            return [];
        }
        const fileContents = fs.readFileSync(booklistPath, 'utf8');
        const lines = fileContents.split('\n').filter(line => line.trim());

        if (lines.length < 2) return [];

        // Skip header row
        const books: Book[] = [];
        for (let i = 1; i < lines.length; i++) {
            const values = parseCSVLine(lines[i]);
            if (values.length >= 10) {
                books.push({
                    subject: values[0] || '',
                    title: values[1] || '',
                    authors: values[2] || '',
                    edition: values[3] || '',
                    level: values[4] || '',
                    whyRecommended: values[5] || '',
                    coreChapters: values[6] || '',
                    problemSources: values[7] || '',
                    alternative: values[8] || '',
                    notes: values[9] || '',
                    status: (values[10] as 'reading' | 'completed' | '') || '',
                });
            }
        }
        return books;
    } catch (error) {
        console.error('Error reading booklist:', error);
        return [];
    }
}

// Parse CSV line handling quoted values with commas
function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());

    return result;
}

// ============== Progress Calculation ==============

export function calculateProgress(): PhysicsProgress {
    const roadmapData = getRoadmapData();

    if (!roadmapData) {
        return {
            percentage: 0,
            completedCount: 0,
            totalCount: ROADMAP_SECTIONS.length,
            currentSection: '',
            currentTopic: '',
            lastUpdated: '',
        };
    }

    const { frontmatter } = roadmapData;
    const completedCount = frontmatter.completed_sections.length;
    const totalCount = ROADMAP_SECTIONS.length;
    const percentage = Math.round((completedCount / totalCount) * 100);

    return {
        percentage,
        completedCount,
        totalCount,
        currentSection: frontmatter.current_section,
        currentTopic: frontmatter.current_topic,
        lastUpdated: frontmatter.last_updated,
    };
}

export function getSectionsWithStatus(): RoadmapSection[] {
    const roadmapData = getRoadmapData();

    if (!roadmapData) {
        return ROADMAP_SECTIONS.map(section => ({
            ...section,
            status: 'upcoming' as const,
        }));
    }

    const { frontmatter } = roadmapData;
    const completedSet = new Set(frontmatter.completed_sections);

    return ROADMAP_SECTIONS.map(section => {
        let status: 'completed' | 'current' | 'upcoming';

        if (completedSet.has(section.id)) {
            status = 'completed';
        } else if (section.id === frontmatter.current_section) {
            status = 'current';
        } else {
            status = 'upcoming';
        }

        return {
            ...section,
            status,
        };
    });
}

export function getCurrentBook(): Book | null {
    const books = getBooklist();
    return books.find(book => book.status === 'reading') || null;
}

export function getCompletedBooks(): Book[] {
    const books = getBooklist();
    return books.filter(book => book.status === 'completed');
}

// Map section titles to book subjects
const SECTION_TO_SUBJECTS: Record<string, string[]> = {
    'I.A': ['Math Prerequisites'],
    'I.B': ['Math Prerequisites', 'Linear Algebra', 'ODE/PDE', 'Complex Analysis'],
    'II.A': ['Classical Mechanics'],
    'II.B': ['Electromagnetism'],
    'II.C': ['Quantum Mechanics'],
    'II.D': ['Thermodynamics & Statistical Mechanics'],
    'II.E': ['Mathematical Methods'],
    'II.F': ['Laboratory / Experimental'],
    'II.G': ['Computational Physics'],
    'III.A': ['Mathematical Methods', 'Group Theory'],
    'III.B': ['Electromagnetism'],
    'III.C': ['Quantum Mechanics'],
    'III.D': ['Classical Mechanics'],
    'IV.A': ['Quantum Field Theory'],
    'IV.B': ['General Relativity', 'Special Relativity'],
    'IV.C': ['Condensed Matter / Solid State'],
    'V.A': ['Problem Books / Supplements'],
    'V.B': ['Problem Books / Supplements'],
    'V.C': ['Problem Books / Supplements'],
    'VI': ['Computational Physics', 'Laboratory / Experimental'],
    'VII': ['Computational Physics', 'Laboratory / Experimental'],
    'VIII': ['Online Open Source'],
    'IX': [],
    'X': ['Online Open Source'],
};

export function getBooksBySection(sectionId: string): Book[] {
    const books = getBooklist();
    const subjects = SECTION_TO_SUBJECTS[sectionId] || [];

    if (subjects.length === 0) return [];

    return books.filter(book =>
        subjects.some(subject =>
            book.subject.toLowerCase().includes(subject.toLowerCase()) ||
            subject.toLowerCase().includes(book.subject.toLowerCase())
        )
    );
}

export function getAllBooksGroupedBySection(): Record<string, Book[]> {
    const result: Record<string, Book[]> = {};

    for (const section of ROADMAP_SECTIONS) {
        const books = getBooksBySection(section.id);
        if (books.length > 0) {
            result[section.id] = books;
        }
    }

    return result;
}
