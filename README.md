# Setup
``` sh
npm init
```

``` sh
npm install @types/jest --save-dev
```

``` sh
npm install babel-jest @babel/preset-env --save-dev      
```

``` sh
npm install typescript --save-dev
```

``` sh
tsc --init
```

set up `babel.config.json`
``` json
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-typescript"
    ]
}
```

set up `package.json`
``` json
  "jest": {
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
    }
  },
  "type": "module"
```

set up `tsconfig.json`
``` json
"include": ["./src/**/*", "./tests/**/*.test.ts"]
"module": "ES6"
```

# Schema
``` ts
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
```

# Data type conversion
``` ts
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
```

# Date Vaidation
``` ts
describe('Date Validation', function(): void {
    test('Should support Date validation', function(): void {
        const dateSchema: ZodDate = z.coerce.date().min(new Date(2003, 1, 1)).max(new Date(3000, 1, 1));
        const birthDate: Date = dateSchema.parse("2006-2-1");
        const birthDate2: Date = dateSchema.parse(new Date(2007, 4, 5));
        console.log(birthDate);
        console.log(birthDate2);
    })
})
```

# Validation Error
Object yang di throw ketika terjadi Validation Error
``` ts
export declare class ZodError<T = any> extends Error {
    issues: ZodIssue[];
    get errors(): ZodIssue[];
    constructor(issues: ZodIssue[]);
    format(): ZodFormattedError<T>;
    format<U>(mapper: (issue: ZodIssue) => U): ZodFormattedError<T, U>;
    static create: (issues: ZodIssue[]) => ZodError<any>;
    toString(): string;
    get message(): string;
    get isEmpty(): boolean;
    addIssue: (sub: ZodIssue) => void;
    addIssues: (subs?: ZodIssue[]) => void;
    flatten(): typeToFlattenedError<T>;
    flatten<U>(mapper?: (issue: ZodIssue) => U): typeToFlattenedError<T, U>;
    get formErrors(): typeToFlattenedError<T, string>;
}
```

``` ts
describe('Validation Error', function(): void {
    test('Should support Validation Error', function(): void {
        const nameSchema: ZodString = z.coerce.string().min(3).max(100);
        try {
            nameSchema.parse("al");
            expect(() => nameSchema.parse("Au")).toThrow(ZodError);
        }
        catch (e) {
            if(e instanceof ZodError) console.log(e);
        }
    })
})
```

# Object Validation
``` ts
export type User = {
    id: number;
    name: string;
    email: string;
}
```

``` ts
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
            name: "sa", // nama tidak valid
            email: "audia21" // email tidak valid
        }
        expect(() => userSchema.parse(userLoginErr)).toThrow(ZodError);
    })
})
```

# Nested Object Validation
``` ts
export type User = {
    id: number;
    name: string;
    email: string;
    address?: Address;
}

export type Address = {
    id: string;
    province: string;
    city: string;
    postalCode: number;
    vilage: string;
}
```

``` ts
describe('Object Validation', function(): void {
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
        // object valid
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
        // object tidak valid
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
            userSchema.parse(userlogin);
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
```

# Collection Validation
``` ts
describe('Collection Validation', function(): void {
    test('Should support array validation', function(): void {
        const arraySchema = z.array(z.string()).min(1).max(5);
        const dataArr: Array<string> = new Array<string>()
        dataArr.push("a", "b", "c", "d");
        const arr: Array<string> = arraySchema.parse(dataArr);
        expect(arr).toEqual(dataArr);
    })
    test('Should error array validation', function(): void {
        const arraySchema = z.array(z.string()).min(1).max(3);
        const dataArr: Array<string> = new Array<string>()
        dataArr.push("a", "b", "c", "d");
        expect(() => arraySchema.parse(dataArr)).toThrow(ZodError);
    })

    test('Should support Set Validation', function(): void {
        const setSchema: ZodSet = z.set(z.string()).min(1).max(3);
        const dataSet: Set<string> = new Set<string>(["a", "b", "c"]);
        const set: Set<string> = setSchema.parse(dataSet);
        expect(set).toEqual(dataSet);
    })

    test('Shoudl support Map Validation', function(): void {
        const maspSchema: ZodMap = z.map(z.number(), z.string());
        const dataMap: Map<number, string> = new Map<number, string>();
        dataMap.set(1, "Naila");
        dataMap.set(2, "Alli");
        dataMap.set(3, "junior");
        const map: Map<number, string> = maspSchema.parse(dataMap);
        expect(map).toEqual(dataMap);
    })
})
```

# Costom Validation message
``` ts
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
```
# Optional Validation
``` ts
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
```

# transform
``` ts
export type Address = {
    id: string;
    province: string;
    city: string;
    postalCode: number;
    vilage: string;
}
```
``` ts
describe('Transform', function(): void {
    test('Should support Transform', function() {
        const addressSchema: ZodObject<any> = z.object({
            /**
             * fungsi transform() dapat kita gunakan untuk melakukan
             * manipulasi data
             */
            id: z.coerce.string().transform(data => data.toLowerCase()),
            province: z.coerce.string().transform(data => data.toUpperCase()),
            city: z.coerce.string().max(100),
            postalCode: z.coerce.number(),
            vilage: z.coerce.string().max(100)
        })
        const address: Address = {
            id: 'YR3427EY',
            province: 'kalimantan',
            city: 'Pontianak',
            postalCode: 2312,
            vilage: 'konoha'
        }
        const { id, province } = addressSchema.parse(address) as Address;
        expect(id).toBe('yr3427ey');
        expect(province).toBe('KALIMANTAN');
    });
})
```
# Custom Validation
``` ts
describe('Custom Validation', function(): void {
    test('Should support custom validation', function(): void {
        const userSchema: ZodObject<any> = z.object({
            id: z.coerce.number(),
            /**
             * melakukan custom validation dengan mengguinakan RefinameCtx
             */
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
```