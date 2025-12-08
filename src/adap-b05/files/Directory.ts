import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }
    public override _findInnerNodes(bn: string, s: Set<Node>): void {

        super._findInnerNodes(bn, s);

        for (const childNode of this.childNodes) {

            childNode["_findInnerNodes"](bn, s);

        }
    }
}