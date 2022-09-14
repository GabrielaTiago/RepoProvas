import dotenv from 'dotenv';
import { server } from '.';

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;

server.listen(PORT, () => {
    console.log(`The server is up and runnig on port ${PORT}`);
});
