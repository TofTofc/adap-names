import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string)
    {
        super(delimiter);
        this.name = source;

        const esc = ESCAPE_CHARACTER;
        const delim = this.delimiter;

        const regex = new RegExp(`(?<!\\\\${esc})\\${delim}`, "g");

        this.noComponents = source.split(regex).length;
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
}