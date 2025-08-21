import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'RepoProvas API',
            version: '1.0.0',
            description:
                'A comprehensive test sharing platform API that allows students to share and access previous exams from their courses and professors.',
            contact: {
                name: 'Gabriela Tiago',
                email: 'gabrielatiagodearujo@outlook.com',
                url: 'https://github.com/GabrielTiago',
            },
        },
        servers: [
            {
                url: 'http://localhost:4000',
                description: 'Development server',
            },
        ],
        tags: [
            {
                name: 'Authentication',
            },
            {
                name: 'Tests',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT token obtained from login endpoint',
                },
            },
            schemas: {
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                            example: 'example@example.com',
                        },
                        password: {
                            type: 'string',
                            minLength: 8,
                            description: 'User password',
                            example: 'Password123!',
                        },
                    },
                },
                LoginResponse: {
                    type: 'object',
                    properties: {
                        token: {
                            type: 'string',
                            description: 'JWT token for authentication',
                            example:
                                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI0NjkyMDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                        },
                        message: {
                            type: 'string',
                            description: 'Message',
                            example: 'Login successful',
                        },
                    },
                },
                RegisterRequest: {
                    type: 'object',
                    required: ['email', 'password', 'confirmPassword'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                            example: 'example@example.com',
                        },
                        password: {
                            type: 'string',
                            minLength: 8,
                            description: 'User password',
                            example: 'Password123!',
                        },
                        confirmPassword: {
                            type: 'string',
                            description: 'Password confirmation',
                            example: 'Password123!',
                        },
                    },
                },
                TestRequest: {
                    type: 'object',
                    required: ['name', 'pdfUrl', 'categoryId', 'disciplineId', 'teacherId'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Test name/title',
                            example: 'Calculus Final Exam 2023',
                        },
                        pdfUrl: {
                            type: 'string',
                            format: 'uri',
                            description: 'URL to the PDF file',
                            example: 'https://example.com/test.pdf',
                        },
                        categoryId: {
                            type: 'integer',
                            description: 'Category ID',
                            example: 1,
                        },
                        disciplineId: {
                            type: 'integer',
                            description: 'Discipline ID',
                            example: 1,
                        },
                        teacherId: {
                            type: 'integer',
                            description: 'Teacher ID',
                            example: 1,
                        },
                    },
                },
                Test: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Test unique identifier',
                        },
                        name: {
                            type: 'string',
                            description: 'Test name/title',
                        },
                        pdfUrl: {
                            type: 'string',
                            format: 'uri',
                            description: 'URL to the PDF file',
                        },
                        categoryId: {
                            type: 'integer',
                            description: 'Category ID',
                        },
                        disciplineId: {
                            type: 'integer',
                            description: 'Discipline ID',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Test creation timestamp',
                        },
                    },
                },
                Response: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Message'
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Error message',
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
