import { RefinementCtx, z, ZodError, ZodObject } from "zod";
import { User } from "../src/ObjectValidation";

describe('Custom Validation', function(): void {
    test('Should support custom validation', function(): void {
        const userSchema: ZodObject<any> = z.object({
            id: z.coerce.number(),
            name: z.coerce.string().transform((data: string, refinameCtx: RefinementCtx) => {
                if(data !== data.toLocaleLowerCase()) {
                    refinameCtx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "nama harus menggunakan huruf kecil!"
                    })
                    return z.INVALID;
                }
                else {
                    return data;
                }
            }),
            email: z.coerce.string().email()
        })
        const userLogin: User = {
            id: 1,
            name: "Audia Naila Safa",
            email: "test@gmail.com"
        }
        try {
            userSchema.parse(userLogin);
        }catch(e) {
            if(e instanceof ZodError) {
                const errorMessage: Array<string> = (e as ZodError).errors.map(err => {
                    return err.message;
                });
                expect(errorMessage).toEqual(new Array<string>('nama harus menggunakan huruf kecil!'))
                console.log(errorMessage);
            }
        }
    });
});