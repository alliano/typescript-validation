import { z, ZodBoolean, ZodNumber, ZodString } from "zod"

describe('Data Type Conversion', function(): void {
    /**
     * coerce adalah sebuah object yang bisa kita gunakan untuk melakukan 
     * konversi tipe data secara otomatis
     */
    test('Should support data type conversion', function(): void {
        const emailSchema: ZodString = z.coerce.string().email();
        const booleanSchema: ZodBoolean = z.coerce.boolean();
        const numberSchema: ZodNumber = z.coerce.number().min(1).max(100);
        const usernameSchema: ZodString = z.coerce.string().min(3).max(100);

        const email: string = emailSchema.parse(`audia@gmail.com`);
        const isPremium: boolean = booleanSchema.parse(`true`);
        const age: number = numberSchema.parse(`20`);
        const username: string = usernameSchema.parse(`safanaila12`);
        expect(email).toBe(`audia@gmail.com`);
        expect(isPremium).toBe(true);
        expect(age).toBe(20);
        expect(username).toBe(`safanaila12`);
    })
})