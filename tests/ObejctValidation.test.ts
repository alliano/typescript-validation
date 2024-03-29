import { z, ZodError, ZodIssue, ZodObject } from "zod"
import { User } from "../src/ObjectValidation"

describe('Object Validation', function(): void {
    // membuat schema object validation
    const userSchema: ZodObject<any> = z.object({
        id: z.coerce.number().min(1),
        name: z.coerce.string().min(3).max(100),
        email: z.coerce.string().email()
    });


    test('Should support Object Validation', function(): void {
        const userLogin: User = {
            id: 1,
            name: "Safa",
            email: "audia21@gmail.com"
        }
        const login: User = userSchema.parse(userLogin) as User;
        expect(login).toEqual(userLogin);
    })

    test('Should object validation error', function(): void {
        const userLoginErr: User = {
            id: 1,
            name: "sa",
            email: "audia21"
        }
        expect(() => userSchema.parse(userLoginErr)).toThrow(ZodError);
    })

    // membuat schema nested validation
    const userSchemaNested: ZodObject<any> = z.object({
        id: z.coerce.number().min(1),
        name: z.coerce.string().min(3).max(100),
        email: z.coerce.string().email(),
        address: z.object({
            id: z.coerce.string().max(20),
            province: z.coerce.string().max(100),
            city: z.coerce.string().max(100),
            postalCode: z.coerce.number(),
            vilage: z.coerce.string().max(100)
        })
    });
    test('Should support Nested Object Validation', function(): void {
        const userlogin: User = {
            id: 1,
            name: "Naila",
            email: "naila@gmail.com",
            address: {
                id: "ieru429",
                province: "Maluku",
                city: "Ambon",
                postalCode: 2353,
                vilage: "konoha"
            }
        }
        const user: User = userSchemaNested.parse(userlogin) as User;
        expect(user).toEqual(userlogin)
    })
    test('Should error Nested Object Validation', function(): void {
        const userlogin: User = {
            id: 1,
            name: "au",
            email: "nailagmail",
            address: {
                id: "ieru429di43092ur28du",
                province: "M",
                city: "s",
                postalCode: 2353,
                vilage: "konoha"
            }
        }
        try {
            expect(() => userSchemaNested.parse(userlogin));
            userSchema.parse(userlogin)
        }catch (e) {
            if(e instanceof ZodError) {
                const error: ZodError = e as ZodError;
                const errors: Array<ZodIssue> = error.errors;
                errors.forEach(err => {
                    console.log("error message : "+ err.message);
                    console.log("error field : "+err.path);
                })
            }
        }
    })
})