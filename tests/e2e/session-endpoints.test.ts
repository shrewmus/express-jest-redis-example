import request from 'supertest';
import {describe} from 'node:test';
import app from '../../src';


describe('Session endpoints', () => {


    it('[TEST] GET /api/session/info no header data should return 400', async () => {
        const response = await request(app)
            .get('/api/session/info');

        console.log('[LOG] body', response.body)

        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body).toMatchObject({
            status: 400,
            data: null,
            status_message: 'Outside token not found in headers'
        })
    });
    it('[TEST] GET /api/session/info with header data should return 404', async () => {
        const response = await request(app)
            .get('/api/session/info')
            .set('x-mgaauth', 'test');

        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
        expect(response.body).toMatchObject({
            status: 404,
            data: null,
            status_message: 'Session data not found'
        });
    });
    it('[TEST] GET /api/session/info with header data should return 200', async () => {
        const response = await request(app)
            .get('/api/session/info')
            .set('x-mgaauth', 'auth:sensor:art_test');

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toMatchObject({
            status: 200,
            data: expect.anything(),
            status_message: 'Session data found'
        });
    });
});
