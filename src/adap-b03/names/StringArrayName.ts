import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string)
    {
        super(delimiter)
        const regex = new RegExp(`\\\\\\${this.delimiter}`, "g");
        source = source.map(c => c.replaceAll(regex, this.delimiter));
        this.components = source;
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
}