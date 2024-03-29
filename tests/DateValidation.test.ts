import { z, ZodDate } from "zod"

describe('Date Validation', function(): void {
    test('Should support Date validation', function(): void {
        const dateSchema: ZodDate = z.coerce.date().min(new Date(2003, 1, 1)).max(new Date(3000, 1, 1));
        const birthDate: Date = dateSchema.parse("2006-2-1");
        const birthDate2: Date = dateSchema.parse(new Date(2007, 4, 5));
        console.log(birthDate);
        console.log(birthDate2);
    })
})