import {BaseClient} from "./Client";

export class Event {
    public name: string;

    constructor(options: any) {
        this.name = options.name
    }

}