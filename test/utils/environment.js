import dotenv from 'dotenv';
// This will override the config if a .env.local file is present
dotenv.config({ path: `.env.local`, override: true });

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const BASE_URL = process.env.BASE_URL;

const ENV = {ACCESS_TOKEN, BASE_URL}

export default ENV;