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

    public getComponent(i: number): string
    {
        const regex = new RegExp(`(?<!\\\\)\\${this.getDelimiterCharacter()}`);
        return this.name.split(regex)[i];
    }

    public setComponent(i: number, c: string)
    {
        const regex = new RegExp(`(?<!\\\\)\\${this.getDelimiterCharacter()}`);
        const array = this.name.split(regex);
        array[i] = c;
        this.name = array.join(this.delimiter);
    }

    public insert(i: number, c: string)
    {
        const regex = new RegExp(`(?<!\\\\)\\${this.getDelimiterCharacter()}`);
        let array = this.name.split(regex);
        array.splice(i, 0, c);
        this.name = array.join(this.delimiter);
        this.noComponents += 1;
    }

    public append(c: string)
    {
        this.name += this.delimiter + c;
        this.noComponents += 1;
    }

    public remove(i: number)
    {
        const regex = new RegExp(`(?<!\\\\)\\${this.getDelimiterCharacter()}`);
        let array = this.name.split(regex);
        array.splice(i, 1);
        this.name = array.join(this.delimiter);
        this.noComponents -= 1;
    }
}