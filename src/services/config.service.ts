export class ConfigService {
    private readonly envConfig: any;

    constructor() {
        this.envConfig = process.env;
    }

    get(key: string, defaultValue: string): string {
        return this.envConfig[key] || defaultValue;
    }

}
