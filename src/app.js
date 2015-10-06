import {Inject, ElementRef, DynamicComponentLoader, ComponentMetadata as Component, ViewMetadata as View, bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';

@Component({
    selector: 'burner'
})
@View({
    template: `<div>Hello World</div>`,
    directives: [CORE_DIRECTIVES]
})
export class Burner {
    constructor() {
        // Yeah, raze it all to the ground. Mhuh mhuh mhuh!
        throw new Error();
    }
}

@Component({
    selector: 'root'
})
@View({
    template: `<button (click)="burn()">Burn</button>`,
    directives: [CORE_DIRECTIVES]
})
export class Root {
    constructor(@Inject(ElementRef) elementRef, @Inject(DynamicComponentLoader) dynamicComponentLoader) {
        this.elementRef = elementRef;
        this.dynamicComponentLoader = dynamicComponentLoader;
    }
    burn() {
        // The Burner component throws an exception within it's constructor...
        this.dynamicComponentLoader.loadNextToLocation(Burner, this.elementRef)
        .then((componentRef) => {
            // We don't expect this code to run... the promise above should've been rejected.
            // Yet we find the code does execute.
            console.log('wat?');
            throw new Error('crazy nightmare');
        })
        .then(() => {
            // We *definitely* don't expect this to run... checkout the exception thrown in the resolve handler above!
            // Yet we find the code does execute.
            console.log('wtf?');
        });
    }
}

bootstrap(Root);
