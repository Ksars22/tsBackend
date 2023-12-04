import dotenv from "dotenv";

class vEnviroment {
    secret_key: string = "";
    current_dev: string = "";
    db_uri: string = "";
    port: Number = 0;
    smtp_host: string = "";
    email_username: string = "";
    email_password: string = "";
    sender_email: string = "";

    constructor() {
        dotenv.config();
        this.secret_key = process.env.SECRET_KEY || "";
        this.current_dev = process.env.DEV_USER || "";
        this.port = Number(process.env.PORT);
        this.smtp_host = process.env.SMTP_HOST || "";
        this.email_password = process.env.GMAIL_PASSWORD || "";
        this.email_username = process.env.GMAIL_USERNAME || "";
        this.sender_email = process.env.SENDER_EMAIL || "";
        switch (this.current_dev) {
            case "matt":
                this.db_uri = process.env.DATABASE_URL || "";
                break;
            case "kyle":
                this.db_uri = process.env.TEST_DATABASE_URL || "";
                break;
            case "josh":
                this.db_uri = process.env.TEST_DATABASE_URL || "";
        }
    }
}

export default vEnviroment;
