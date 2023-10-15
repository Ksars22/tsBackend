import dotenv from 'dotenv';

class vEnviroment {

    secret_key: string = "";
    current_dev: string = "";
    db_uri: string = "";
    port: Number = 0;

    constructor() {
        dotenv.config();
        this.secret_key = process.env.SECRET_KEY || '';
        this.current_dev = process.env.DEV_USER || '';
        this.port = Number(process.env.PORT);
        switch (this.current_dev) {
            case 'matt':
                this.db_uri = process.env.DATABASE_URL || '';
                break;
            case 'kyle':
                this.db_uri = process.env.TEST_DATABASE_URL || '';
                break;
        }
    }
}

export default vEnviroment;