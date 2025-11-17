import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string)
    {
        this.name = source;
        if(delimiter != null)
        {
            this.delimiter = delimiter
        }
        const regex = new RegExp(`(?<!\\\\)\\${this.getDelimiterCharacter()}`);
        this.noComponents = source.split(regex).length;
    }

    public asString(delimiter: string = this.delimiter): string
    {
        let name = this.name;
        if (delimiter !== this.delimiter) {
            const regex = new RegExp(`(?<!\\\\)\\${this.getDelimiterCharacter()}`, "g");
            name = name.replaceAll(regex, delimiter);
        }
        return name.replaceAll(ESCAPE_CHARACTER, "");
    }

    public asDataString(): string
    {
        let name = this.name;
        if (this.getDelimiterCharacter() != DEFAULT_DELIMITER)
        {
            let regex = new RegExp(`(?<!\\\\)\\${DEFAULT_DELIMITER}`, "g");
            name = name.replaceAll(regex, ESCAPE_CHARACTER + DEFAULT_DELIMITER);

            regex = new RegExp(`(?<!\\\\)\\${this.getDelimiterCharacter()}`, "g");
            name = name.replaceAll(regex, DEFAULT_DELIMITER);

            name = name.replaceAll(ESCAPE_CHARACTER + this.getDelimiterCharacter(), this.getDelimiterCharacter());
        }
        return name;
    }

    public getDelimiterCharacter(): string
    {
        return this.delimiter
    }

    public isEmpty(): boolean
    {
        if (this.noComponents == 0)
        {
            return true
        }
        return false
    }

    public getNoComponents(): number
    {
        return this.noComponents
    }

    public getComponent(x: number): string
    {
        const regex = new RegExp(`(?<!\\\\)\\${this.getDelimiterCharacter()}`);
        return this.name.split(regex)[x];
    }

    public setComponent(n: number, c: string): void
    {
        const regex = new RegExp(`(?<!\\\\)\\${this.getDelimiterCharacter()}`);
        const array = this.name.split(regex);
        array[n] = c;
        this.name = array.join(this.delimiter);
    }

    public insert(n: number, c: string): void
    {
        const regex = new RegExp(`(?<!\\\\)\\${this.getDelimiterCharacter()}`);
        let array = this.name.split(regex);
        array.splice(n, 0, c);
        this.name = array.join(this.delimiter);
        this.noComponents += 1;
    }

    public append(c: string): void
    {
        this.name += this.delimiter + c;
        this.noComponents += 1;
    }

    public remove(n: number): void
    {
        const regex = new RegExp(`(?<!\\\\)\\${this.getDelimiterCharacter()}`);
        let array = this.name.split(regex);
        array.splice(n, 1);
        this.name = array.join(this.delimiter);
        this.noComponents -= 1;
    }

    public concat(other: Name): void
    {
        this.noComponents += other.getNoComponents();
        this.name += this.delimiter + other.asDataString();
    }

}