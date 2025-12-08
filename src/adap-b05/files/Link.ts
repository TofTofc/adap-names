import { Node } from "./Node";
import { Directory } from "./Directory";
import {IllegalArgumentException} from "../common/IllegalArgumentException";
import {InvalidStateException} from "../common/InvalidStateException";
import {MethodFailedException} from "../common/MethodFailedException";

export class Link extends Node {

    protected targetNode: Node | null = null;

    constructor(bn: string, pn: Directory, tn?: Node)
    {
        super(bn, pn);

        this.assertClassInvariants();

        if (tn != undefined) {
            this.targetNode = tn;
        }
    }

    public getTargetNode(): Node | null
    {
        this.assertClassInvariants();
        return this.targetNode;
    }

    public setTargetNode(target: Node): void
    {
        this.assertClassInvariants();
        this.targetNode = target;
    }

    public getBaseName(): string {
        const target = this.ensureTargetNode(this.targetNode);
        return target.getBaseName();
    }

    public rename(bn: string): void
    {
        this.assertIsValidBaseName(bn, "pre");
        const target = this.ensureTargetNode(this.targetNode);
        target.rename(bn);
    }

    protected ensureTargetNodeExists(exceptiontype: string): Node {
        const condition: boolean = (this.targetNode !== null);

        if (!condition) {
            const message: string = "Target node cannot be null for delegation.";

            switch (exceptiontype) {
                case "pre":
                    throw new IllegalArgumentException(message);
                case "inva":
                    throw new InvalidStateException(message);
                case "post":
                    throw new MethodFailedException(message);
            }
        }

        return this.targetNode as Node;
    }

    protected override assertClassInvariants(): void
    {
        const bn: string = this.doGetBaseName();
        this.assertIsValidBaseName(bn, "inva");
    }

    protected ensureTargetNode(target: Node | null): Node
    {
        return this.ensureTargetNodeExists("inva");
    }
}