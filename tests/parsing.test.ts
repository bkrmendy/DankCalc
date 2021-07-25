import { numberFromParts } from "../src/Parser";
import { id } from "../src/utils/Utils";

describe("decimal number calculation", () => {
    it("decimal number with no sign or fractional part", () => {
        const n = numberFromParts(id, 123, null);
        expect(n).toEqual(123);
    });
});