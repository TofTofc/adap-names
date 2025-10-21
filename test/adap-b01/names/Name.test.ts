import { describe, it, expect } from "vitest";
import { Name } from "../../../src/adap-b01/names/Name";

describe("Basic initialization tests", () => {
  it("test construction 1", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Basic function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"], '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '#');
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

describe("asDataString escapes default delimiter inside a single component", () => {
    it("asDataString escapes '.' inside component", () => {
        let n = new Name(["oss.cs.fau.de"], '#');
        expect(n.asDataString()).toBe("oss\\.cs\\.fau\\.de");
    });
});

describe("asDataString joins components with default delimiter and escapes per-component", () => {
    it("join with default delimiter and per-component escaping", () => {
        let n = new Name(["oss.cs.fau.de"], '#');
        n.append("people");
        expect(n.asDataString()).toBe("oss\\.cs\\.fau\\.de.people");
    });
});

describe("component single backslash -> becomes two backslashes in asDataString", () => {
    it("component '\\' -> asDataString yields two backslashes", () => {
        let n = new Name(["\\"], '#');

        expect(n.asString()).toBe("\\");

        expect(n.asDataString()).toBe("\\\\");
    });
});

describe("multiple empty components behave correctly", () => {
    it("three empty components produce '//' asString (delimiter '/') and '..' asDataString", () => {
        let n = new Name(["", "", ""], '/');
        expect(n.asString()).toBe("//");
        expect(n.asDataString()).toBe("..");
    });
});