import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import {InvalidStateException} from "../common/InvalidStateException";
import {IllegalArgumentException} from "../common/IllegalArgumentException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory)
    {
        super(baseName, parent);
        this.assertClassInvariants();
    }

    public open(): void
    {
        this.assertClassInvariants();
        this.assertPreOpen();
        // do something
    }

    public read(noBytes: number): Int8Array
    {
        this.assertClassInvariants();
        this.assertPreRead(noBytes);
        let result: Int8Array = new Int8Array(noBytes);
        // do something

        let tries: number = 0;
        for (let i: number = 0; i < noBytes; i++) {
            try {
                result[i] = this.readNextByte();
            } catch(ex) {
                tries++;
                if (ex instanceof MethodFailedException) {
                    // Oh no! What @todo?!
                }
            }
        }

        return result;
    }

    protected readNextByte(): number {
        return 0; // @todo
    }

    public close(): void
    {
        this.assertClassInvariants();
        this.assertPreClose();
        // do something
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

    protected assertClassInvariants(): void
    {

        const bn: string = this.doGetBaseName();
        this.assertIsValidBaseName(bn, "inva");

        if (this.state === FileState.DELETED) {
            throw new InvalidStateException("File is in DELETED state, but is still active in memory.");
        }
    }

    protected assertPreOpen(): void
    {
        const condition: boolean = (this.state !== FileState.DELETED && this.state !== FileState.OPEN);
        if (!condition) {
            throw new IllegalArgumentException("File cannot be opened: current state is " + this.doGetFileState());
        }
    }

    protected assertPreRead(noBytes: number): void
    {
        const condition: boolean = (this.state === FileState.OPEN && noBytes > 0);
        if (!condition) {
            throw new IllegalArgumentException("Cannot read file: Must be OPEN and request positive bytes.");
        }
    }

    protected assertPreClose(): void
    {
        const condition: boolean = (this.state === FileState.OPEN);
        if (!condition) {
            throw new IllegalArgumentException("File cannot be closed: current state is " + this.doGetFileState());
        }
    }

}