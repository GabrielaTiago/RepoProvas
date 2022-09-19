import { faker } from '@faker-js/faker';

export async function __createValidTests() {
    const test = {
        name: faker.lorem.words(3),
        pdfUrl: faker.internet.url(),
        categoryId: 1,
        disciplineId: 1,
        teacherId: 2
    };
    return test;
}
