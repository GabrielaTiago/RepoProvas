import { Test } from '@prisma/client';

export type TInsertTest = Omit<Test, 'id' | 'createdAt'>;

export type TGetTestsByDiscipline = {
    id: number;
    number: number;
    Discipline: {
        id: number;
        name: string;
        TeacherDiscipline: {
            Teacher: { id: number; name: string };
            Test: { id: number; name: string; pdfUrl: string }[];
        }[];
    }[];
};

export type TGetTestsByTeacher = {
    id: number;
    name: string;
    TeacherDiscipline: {
        Discipline: {
            id: number;
            name: string;
            term: { id: number; number: number };
        };
        Test: { id: number; name: string; pdfUrl: string }[];
    }[];
};
