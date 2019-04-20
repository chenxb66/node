const mod = require("../src/js/index");

// jest 框架提供
test('fab 1-5', () => {
    expect(mod.fab(1)).toBe(1);
    expect(mod.fab(2)).toBe(1);
    expect(mod.fab(3)).toBe(2);
    expect(mod.fab(4)).toBe(3);
    expect(mod.fab(5)).toBe(6);
});