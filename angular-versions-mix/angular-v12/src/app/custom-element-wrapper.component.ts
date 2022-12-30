import { AfterContentInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { appRoutesRegistry } from './app-routes.registry';

@Component({
    template: '<div #customElementContainer></div>',
})
export class CustomElementWrapperComponent implements AfterContentInit {
    @ViewChild('customElementContainer', { read: ElementRef, static: true })
    customElementWrapperRef!: ElementRef;

    constructor(private readonly route: ActivatedRoute) {}

    ngAfterContentInit(): void {
        const remoteName = this.route.snapshot.data.remoteName;
        const elementName = this.route.snapshot.data.elementName;

        const importFn = appRoutesRegistry[remoteName];
        importFn()
            // eslint-disable-next-line no-console
            .then(() => console.debug(`element ${elementName} loaded!`))
            // eslint-disable-next-line no-console
            .catch((error) => console.error(`error loading ${elementName}:`, error));

        const element = document.createElement(elementName);
        this.customElementWrapperRef.nativeElement.append(element);
    }
}
