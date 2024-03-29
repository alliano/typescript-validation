import { z, ZodError, ZodMap, ZodSet } from "zod"

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