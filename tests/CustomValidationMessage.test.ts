import { z, ZodError, ZodIssue, ZodObject } from "zod";

describe('Custom Validation Message', function(): void  {
    interface UserLogin {
        readonly email: string;
        readonly password: string;
    }

    test('Should support custom validation error message', function(): void {
        // membuat schema validation dengan default message
        const userloginSchema: ZodObject<any> = z.object({
            email: z.coerce.string().email("email tidak valid!"),
            password: z.coerce.string().min(6, "password harus lebih dari 6 karakter !")
        })
        const userLoginReq: UserLogin = {
            email: "audia",
            password: "aiu"
        }
        try{
            userloginSchema.parse(userLoginReq);
        }
        catch(e) {
            if(e instanceof ZodError) {
                const zodError: ZodError = e as ZodError;
                const validationErrors: Array<ZodIssue> = zodError.errors;
                const message: Array<string> = validationErrors.map(arr => {
                    console.log(arr.message);
                    return arr.message;
                })
                expect(z.array(z.string()).min(2).parse(message)).toEqual(message);
            }
        }
    })
})