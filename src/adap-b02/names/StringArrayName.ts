import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string)
    {
       if( delimiter != null)
       {
           this.delimiter = delimiter
       }
        const regex = new RegExp(`\\\\\\${this.delimiter}`, "g");
        source = source.map(c => c.replaceAll(regex, this.delimiter));
        this.components = source;
    }

    public asString(delimiter: string = this.delimiter): string
    {
        return this.components.join(delimiter);
    }


    public asDataString(): string
    {
        const regex = new RegExp(`(?<!\\\\)\\${DEFAULT_DELIMITER}`, "g");
        return this.components.map(c => c.replaceAll(regex, ESCAPE_CHARACTER + DEFAULT_DELIMITER)).join(DEFAULT_DELIMITER);
    }

    public getDelimiterCharacter(): string
    {
        return this.delimiter
    }

    public isEmpty(): boolean
    {
        if (this.components.length == 0)
        {
            return true
        }
        return false
    }

    public getNoComponents(): number
    {
        return this.components.length
    }

    public getComponent(i: number): string
    {
        return this.components[i]
    }

    public setComponent(i: number, c: string): void
    {
        c = c.replaceAll(ESCAPE_CHARACTER, "");
        this.components[i] = c;
    }

    public insert(i: number, c: string): void
    {
        c = c.replaceAll(ESCAPE_CHARACTER, "");
        this.components.splice(i, 0, c);
    }

    public append(c: string): void
    {
        c = c.replaceAll(ESCAPE_CHARACTER, "");
        this.components.push(c);
    }

    public remove(i: number): void
    {
        this.components.splice(i, 1);
    }

    public concat(other: Name): void
    {
        const regex = new RegExp(`(?<!\\\\)\\${this.getDelimiterCharacter()}`);
        const array = other.asDataString().split(regex);
        array.forEach(entry => {
            this.append(entry)
        });
    }

}