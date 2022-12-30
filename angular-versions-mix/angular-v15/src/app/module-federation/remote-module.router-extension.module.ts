import { NgModule } from '@angular/core';

import { RemoteModuleRouterExtensionDirective } from './remote-module.router-extension.directive';

@NgModule({
    declarations: [RemoteModuleRouterExtensionDirective],
    exports: [RemoteModuleRouterExtensionDirective],
})
export class RemoteModuleRouterExtensionModule {}
