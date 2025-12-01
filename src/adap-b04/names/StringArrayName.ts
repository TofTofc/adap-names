import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import {IllegalArgumentException} from "../common/IllegalArgumentException";
import {MethodFailedException} from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string)
    {
        IllegalArgumentException.assert(source != null,  "Source undefined / null");
        IllegalArgumentException.assert(source.length !== 0, "Need at least one String");

        super(delimiter)
        const regex = new RegExp(`\\\\\\${this.delimiter}`, "g");
        source = source.map(c => c.replaceAll(regex, this.delimiter));
        this.components = source;
    }

    public getNoComponents(): number
    {
        const tmp = this.components.length
        MethodFailedException.assert(tmp >= 0, "Number of components cant be negative")
        return tmp
    }

    public getComponent(i: number): string
    {
        IllegalArgumentException.assert(i >= 0 &&  i < this.getNoComponents(), "Index error")
        const tmp = this.components[i]
        MethodFailedException.assert(tmp != null, "Component cant be null");
        return tmp
    }

    public setComponent(i: number, c: string)
    {
        IllegalArgumentException.assert(i >= 0 &&  i < this.getNoComponents(), "Index error")
        IllegalArgumentException.assert(c != null, "String cant be null")
        c = c.replaceAll(ESCAPE_CHARACTER, "");
        this.components[i] = c;
    }

    public insert(i: number, c: string)
    {
        IllegalArgumentException.assert(i >= 0 &&  i < this.getNoComponents(), "Index error")
        IllegalArgumentException.assert(c != null, "String cant be null")
        c = c.replaceAll(ESCAPE_CHARACTER, "");
        this.components.splice(i, 0, c);
    }

    public append(c: string)
    {
        IllegalArgumentException.assert(c != null, "String cant be null")
        c = c.replaceAll(ESCAPE_CHARACTER, "");
        this.components.push(c);
    }

    public remove(i: number)
    {
        IllegalArgumentException.assert(i >= 0 &&  i < this.getNoComponents(), "Index error")
        this.components.splice(i, 1);
    }
}