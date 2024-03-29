import { z, ZodObject } from "zod";
import { Address } from "../src/ObjectValidation";

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