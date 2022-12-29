// eslint-disable-next-line unicorn/prefer-top-level-await,no-console,import/unambiguous
import { bootstrap } from '@angular-architects/module-federation-tools';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

bootstrap(AppModule, {
    production: environment.production,
    appType: 'shell', // for shell
    // eslint-disable-next-line unicorn/prefer-top-level-await,no-console
}).catch((error) => console.log(error));
