import express from 'express';
import dotenv from 'dotenv';
import {ConfigService} from './services/config.service';
import {RedisService} from './services/redis.service';
import {createSessionRouters} from './routes/session.routes';

dotenv.config();

const configService = new ConfigService();
const redisService: RedisService = new RedisService(configService);

const app = express();

app.use(express.json());
app.use('/api/session', createSessionRouters(redisService));

const port = +configService.get('PORT', '3000');

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

export default app;

