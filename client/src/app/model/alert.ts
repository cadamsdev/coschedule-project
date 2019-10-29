import { AlertType } from './alert-type';

export class Alert {

    constructor(public type: AlertType,
                public msg: string) { }

}