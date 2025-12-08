import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import {IllegalArgumentException} from "../common/IllegalArgumentException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER)
    {
        IllegalArgumentException.assert(
            delimiter.length === 1, "Delim size not 1"
        );
        this.delimiter = delimiter

    }

    public clone(): Name
    {
        return Object.create(this);
    }

    public asString(delimiter: string = this.delimiter): string
    {
        const components = [];
        for (let i = 0; i < this.getNoComponents(); i++)
        {
            components.push(this.getComponent(i))
        }

        const regex = new RegExp(`(?<!\\\\)\\${DEFAULT_DELIMITER}`, "g");
        return components.map(c => c.replaceAll(regex, ESCAPE_CHARACTER + DEFAULT_DELIMITER)).join(DEFAULT_DELIMITER);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string
    {
        const out: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            let comp = this.getComponent(i) ?? "";

            if (ESCAPE_CHARACTER) {
                comp = comp.replaceAll(ESCAPE_CHARACTER, ESCAPE_CHARACTER + ESCAPE_CHARACTER);
            }
            if (this.delimiter) {
                comp = comp.replaceAll(this.delimiter, ESCAPE_CHARACTER + this.delimiter);
            }
            out.push(comp);
        }
        return out.join(this.delimiter);
    }

    public isEqual(other: Name): boolean
    {
        return this.asDataString() === other.asDataString() && this.getDelimiterCharacter() === other.getDelimiterCharacter();
    }

    public getHashCode(): number
    {
        const s = this.asDataString();
        let h = 0;
        for (let i = 0; i < s.length; i++) {
            h = ((h << 5) - h) + s.charCodeAt(i);
            h |= 0;
        }
        return h >>> 0;
    }

    public isEmpty(): boolean
    {
        if (this.getNoComponents() == 0)
        {
            return true
        }
        return false
    }

    public getDelimiterCharacter(): string
    {
        return this.delimiter
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void
    {
        IllegalArgumentException.assert(other != null, "Other cant be null")
        const n = other.getNoComponents();
        for (let i = 0; i < n; i++) {
            this.append(other.getComponent(i));
        }
    }

}