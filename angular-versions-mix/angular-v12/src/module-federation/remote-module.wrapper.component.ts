import { AfterContentInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RemoteEntry } from '../app/app.model';

import { remoteModuleLoader } from './remote-module.loader';

@Component({
    template: '<div #remoteModuleContainer></div>',
})
export class RemoteModuleWrapperComponent implements AfterContentInit {
    @ViewChild('remoteModuleContainer', { read: ElementRef, static: true })
    customElementWrapperRef!: ElementRef;

    constructor(private readonly route: ActivatedRoute) {}

    async ngAfterContentInit(): Promise<void> {
        const remoteEntryConfig: RemoteEntry = this.route.snapshot.data.remoteEntryConfig;
        const elementName = `${remoteEntryConfig.remoteName}-element`;

        await remoteModuleLoader(remoteEntryConfig);

        const element = document.createElement(elementName);
        this.customElementWrapperRef.nativeElement.append(element);
    }
}
