import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import {MethodFailedException} from "../common/MethodFailedException";
import {IllegalArgumentException} from "../common/IllegalArgumentException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string)
    {
        IllegalArgumentException.assert(source != null,  "Source undefined / null");
        IllegalArgumentException.assert(source.length !== 0, "Need at least one Char");

        super(delimiter);
        this.name = source;

        const esc = ESCAPE_CHARACTER;
        const delim = this.delimiter;

        const regex = new RegExp(`(?<!\\\\${esc})\\${delim}`, "g");

        this.noComponents = source.split(regex).length;
    }

    public getNoComponents(): number
    {
        const tmp = this.noComponents
        MethodFailedException.assert(tmp >= 0, "Number of components cant be negative")
        return tmp
    }

    public getComponent(i: number): string
    {
        IllegalArgumentException.assert(i >= 0 &&  i < this.getNoComponents(), "Index error")
        const regex = new RegExp(`(?<!\\\\)\\${this.getDelimiterCharacter()}`);
        const tmp = this.name.split(regex)[i];
        MethodFailedException.assert(tmp != null, "Component cant be null")
        return tmp
    }

    public setComponent(i: number, c: string)
    {
        IllegalArgumentException.assert(i >= 0 &&  i < this.getNoComponents(), "Index error")
        IllegalArgumentException.assert(c != null, "String cant be null")
        const regex = new RegExp(`(?<!\\\\)\\${this.getDelimiterCharacter()}`);
        const array = this.name.split(regex);
        array[i] = c;
        this.name = array.join(this.delimiter);
    }

    public insert(i: number, c: string)
    {
        IllegalArgumentException.assert(i >= 0 &&  i < this.getNoComponents(), "Index error")
        IllegalArgumentException.assert(c != null, "String cant be null")
        const regex = new RegExp(`(?<!\\\\)\\${this.getDelimiterCharacter()}`);
        let array = this.name.split(regex);
        array.splice(i, 0, c);
        this.name = array.join(this.delimiter);
        this.noComponents += 1;
    }

    public append(c: string)
    {
        IllegalArgumentException.assert(c != null, "String cant be null")
        this.name += this.delimiter + c;
        this.noComponents += 1;
    }

    public remove(i: number)
    {
        IllegalArgumentException.assert(i >= 0 &&  i < this.getNoComponents(), "Index error")
        const regex = new RegExp(`(?<!\\\\)\\${this.getDelimiterCharacter()}`);
        let array = this.name.split(regex);
        array.splice(i, 1);
        this.name = array.join(this.delimiter);
        this.noComponents -= 1;
    }
}