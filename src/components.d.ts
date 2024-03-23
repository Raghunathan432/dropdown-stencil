/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface DropdownTest {
        "isOpen": boolean;
        "options": any[];
    }
}
declare global {
    interface HTMLDropdownTestElement extends Components.DropdownTest, HTMLStencilElement {
    }
    var HTMLDropdownTestElement: {
        prototype: HTMLDropdownTestElement;
        new (): HTMLDropdownTestElement;
    };
    interface HTMLElementTagNameMap {
        "dropdown-test": HTMLDropdownTestElement;
    }
}
declare namespace LocalJSX {
    interface DropdownTest {
        "isOpen"?: boolean;
        "options": any[];
    }
    interface IntrinsicElements {
        "dropdown-test": DropdownTest;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "dropdown-test": LocalJSX.DropdownTest & JSXBase.HTMLAttributes<HTMLDropdownTestElement>;
        }
    }
}
