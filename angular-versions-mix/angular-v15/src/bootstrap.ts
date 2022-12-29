import { bootstrap } from '@angular-architects/module-federation-tools';

import { AppModule } from './app/app.module';

bootstrap(AppModule, {
    production: true,
    appType: 'microfrontend',
    // eslint-disable-next-line unicorn/prefer-top-level-await,no-console
}).catch((error) => console.log(error));
