import { z, ZodBoolean, ZodError, ZodNumber, ZodString } from "zod"

describe('Zod', function(): void {
    it('shoudl support create Schema Zod', function(): void {
        /**
         * untuk melakukan validation, hal pertama yang harus dibuat 
         * yaitu scema, schema ini adalah sebuah constrain atau aturan
         * aturan yang kita gunakan untuk melakukan validasi pada source
         */
        const usernameSchema = z.string().min(4).max(100); // membuat schema
        const username = "nailaAudia21";
        const result = usernameSchema.parse(username); // melakukan validasi
        expect(result).toBe("nailaAudia21");
    });

    test('Should support data type validation', function(): void {
        const emailSchema: ZodString = z.string().email();
        const isAdminSchema: ZodBoolean = z.boolean();
        const numberSchema: ZodNumber = z.number().min(1).max(10000);

        const email: string = emailSchema.parse("audiaAlli@gmail.com");
        const isAdmin: boolean = isAdminSchema.parse(true);
        const number: number = numberSchema.parse(1);
        expect(email).toBe("audiaAlli@gmail.com");
        expect(isAdmin).toBeTruthy();
        expect(number).toEqual(1);
    })
})