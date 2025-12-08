import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";

import { Name } from "../names/Name";
import { Directory } from "./Directory";
import {ServiceFailureException} from "../common/ServiceFailureException";
import {Exception} from "../common/Exception";
import {MethodFailedException} from "../common/MethodFailedException";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        this.assertIsValidBaseName(bn, "pre");
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        this.assertClassInvariants();
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        this.assertClassInvariants();
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        this.assertClassInvariants();

        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        this.assertClassInvariants();
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        this.assertClassInvariants();
        return this.parentNode;
    }

    /**
     * Returns all nodes in the tree that match bn
     * @param bn basename of node being searched for
     */
    public findNodes(bn: string): Set<Node> {
        try {
            const res = new Set<Node>();
            this._findInnerNodes(bn, res);
            return res;
        } catch (e) {
            throw new ServiceFailureException("could not find all nodes", e as Exception);
        }
    }

    public _findInnerNodes(bn: string, s: Set<Node>) {
        this.assertClassInvariants();

        if (bn === this.getBaseName()) {
            s.add(this);
        }
    }

    protected assertClassInvariants(): void {
        const bn: string = this.doGetBaseName();
        this.assertIsValidBaseName(bn, "inva");
    }

    protected assertIsValidBaseName(bn: string, exceptiontype: String): void
    {

        const condition: boolean = (bn != "");

        if (!condition) {
            const message: string = "Non valid base name";

            switch (exceptiontype) {
                case "pre":

                    throw new IllegalArgumentException(message);

                case "inva":

                    throw new InvalidStateException(message);

                case "post":
                    throw new MethodFailedException(message);
            }
        }
    }
}
