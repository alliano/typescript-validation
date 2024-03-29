import { z, ZodObject } from "zod";

describe('Optional Validation', function(): void {
    type User = {
        id: number;
        firstName: string;
        lastName?: string;
        email: string;
    }
    test('Should support optional validation', function(): void {
        const userSchema: ZodObject<any> = z.object({
            id: z.coerce.number(),
            firstName: z.coerce.string(),
            // untuk membuat optional validation kita bisa menambahkan .optional()
            lastName: z.coerce.string().optional(),
            email: z.coerce.string()
        });
        const userLogin: User = {
            id: 1,
            firstName: "Audia",
            email: "safa@gmail.com"
        }
        const userLoginSuccess: User = userSchema.parse(userLogin) as User;
        expect(userLoginSuccess).toEqual(userLogin);
    })
});