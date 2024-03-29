import { z, ZodError, ZodString } from "zod";

describe('Validation Error', function(): void {
    test('Should support Validation Error', function(): void {
        const nameSchema: ZodString = z.coerce.string().min(3).max(100);
        try {
            expect(() => nameSchema.parse("Au")).toThrow(ZodError);
            nameSchema.parse("al");
        }
        catch (e) {
            if(e instanceof ZodError) console.log(e.message);
        }
    })
})