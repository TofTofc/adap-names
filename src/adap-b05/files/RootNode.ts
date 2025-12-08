import { Name } from "../names/Name";
import { StringName } from "../names/StringName";
import { Directory } from "./Directory";
import {IllegalArgumentException} from "../common/IllegalArgumentException";
import {InvalidStateException} from "../common/InvalidStateException";
import {MethodFailedException} from "../common/MethodFailedException";

export class RootNode extends Directory {

    protected static ROOT_NODE: RootNode = new RootNode();

    public static getRootNode() {
        return this.ROOT_NODE;
    }

    constructor() {
        super("", new Object as Directory);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = this;
    }

    public getFullName(): Name {
        return new StringName("", '/');
    }

    public move(to: Directory): void {
        throw new IllegalArgumentException("Dont move root");
    }

    protected doSetBaseName(bn: string): void {
        this.assertIsValidBaseName(bn, "pre");
    }
    protected assertIsValidBaseName(bn: string, exceptiontype: string): void
    {

        const condition: boolean = (bn === "");

        if (!condition) {
            const message: string = "RootNode base name must be empty (\" \").";

            switch (exceptiontype) {
                case "pre":

                    throw new IllegalArgumentException(message);

                case "inva":

                    throw new InvalidStateException(message);

                case "post":

                    throw new MethodFailedException(message);

                default:
                    throw new Error(`Unknown assertion type: ${exceptiontype}`);
            }
        }
    }

    protected override assertClassInvariants(): void
    {
        const bn: string = this.doGetBaseName();
        this.assertIsValidBaseName(bn, "inva");
    }

}