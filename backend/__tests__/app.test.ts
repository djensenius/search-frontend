import request from 'supertest';
import app from '../src/index';

describe('Health Endpoint', () => {
  it('should return health status', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.body).toMatchObject({
      status: 'healthy',
      service: 'dachshund-search-backend'
    });
    expect(response.body.timestamp).toBeDefined();
  });
});

describe('Search Endpoint', () => {
  it('should return 400 for missing query parameter', async () => {
    const response = await request(app)
      .get('/api/search')
      .expect(400);

    expect(response.body.error).toBe('Invalid query parameters');
  });

  it('should return 400 for empty query parameter', async () => {
    const response = await request(app)
      .get('/api/search?q=')
      .expect(400);

    expect(response.body.error).toBe('Invalid query parameters');
  });

  it('should validate limit parameter', async () => {
    const response = await request(app)
      .get('/api/search?q=test&limit=100')
      .expect(400);

    expect(response.body.error).toBe('Invalid query parameters');
  });

  it('should accept valid limit parameter of 25', async () => {
    // This test verifies that the backend can handle requests for 25 results per page
    // Note: This will return an error due to missing search backend, but should pass validation
    const response = await request(app)
      .get('/api/search?q=test&limit=25');

    // Should not return a validation error (400), meaning the limit=25 passed validation
    expect(response.status).not.toBe(400);
  });

  it('should validate offset parameter', async () => {
    const response = await request(app)
      .get('/api/search?q=test&offset=-1')
      .expect(400);

    expect(response.body.error).toBe('Invalid query parameters');
  });
});

describe('Index Endpoint', () => {
  it('should return 400 for missing domains', async () => {
    const response = await request(app)
      .post('/api/index')
      .send({})
      .expect(400);

    expect(response.body.error).toBe('Invalid request body');
  });

  it('should return 400 for empty domains array', async () => {
    const response = await request(app)
      .post('/api/index')
      .send({ domains: [] })
      .expect(400);

    expect(response.body.error).toBe('Invalid request body');
  });

  it('should return 400 for invalid domain format', async () => {
    const response = await request(app)
      .post('/api/index')
      .send({ domains: [''] })
      .expect(400);

    expect(response.body.error).toBe('Invalid request body');
  });
});

describe('Admin Endpoints', () => {
  it('should return 401 for admin stats without key', async () => {
    const response = await request(app)
      .get('/api/admin/stats')
      .expect(401);

    expect(response.body.error).toBe('Unauthorized');
  });

  it('should return 401 for admin top-queries without key', async () => {
    const response = await request(app)
      .get('/api/admin/top-queries')
      .expect(401);

    expect(response.body.error).toBe('Unauthorized');
  });

  it('should return 401 for admin force-index without key', async () => {
    const response = await request(app)
      .post('/api/admin/force-index')
      .expect(401);

    expect(response.body.error).toBe('Unauthorized');
  });
});

describe('404 Handler', () => {
  it('should return 404 for unknown routes', async () => {
    const response = await request(app)
      .get('/unknown-route')
      .expect(404);

    expect(response.body.error).toBe('Route not found');
  });
});