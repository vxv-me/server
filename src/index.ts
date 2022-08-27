import * as configs from './configs';
import { bootstrap } from './main';

console.log(`server start in http://127.0.0.1:${configs.PORT}`);

bootstrap();
