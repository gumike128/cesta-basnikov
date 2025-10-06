import { Hono } from "hono";
import { Env } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    // Add more routes like this. **DO NOT MODIFY CORS OR OVERRIDE ERROR HANDLERS**
    app.get('/api/test', (c) => c.json({ success: true, data: { name: 'this works' }}));
    // Endpoint for contact form submissions
    app.post('/api/contact', async (c) => {
        try {
            const body = await c.req.json();
            console.log('[API /api/contact] Received contact form submission:', JSON.stringify(body, null, 2));
            // In a real application, you would process this data (e.g., send an email, save to DB)
            return c.json({ success: true, message: 'Contact form submitted successfully.' });
        } catch (error) {
            console.error('[API /api/contact] Error processing request:', error);
            return c.json({ success: false, error: 'Failed to process contact form submission.' }, 500);
        }
    });
    // Endpoint for event registration submissions
    app.post('/api/register', async (c) => {
        try {
            const body = await c.req.json();
            console.log('[API /api/register] Received event registration:', JSON.stringify(body, null, 2));
            // In a real application, you would save this registration to a database
            return c.json({ success: true, message: 'Event registration successful.' });
        } catch (error) {
            console.error('[API /api/register] Error processing request:', error);
            return c.json({ success: false, error: 'Failed to process event registration.' }, 500);
        }
    });
    // Endpoint for admin login
    app.post('/api/admin/login', async (c) => {
        try {
            const { email, password } = await c.req.json();
            // --- MOCK AUTHENTICATION ---
            // In a real application, you would validate against a database
            const MOCK_EMAIL = 'admin@cestabasnikov.sk';
            const MOCK_PASSWORD = 'password123';
            if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
                console.log(`[API /api/admin/login] Successful login for user: ${email}`);
                // In a real app, you'd generate a secure JWT
                const mockToken = `mock-jwt-token-${Date.now()}`;
                return c.json({ success: true, token: mockToken });
            } else {
                console.warn(`[API /api/admin/login] Failed login attempt for user: ${email}`);
                return c.json({ success: false, error: 'Nesprávny e-mail alebo heslo.' }, 401);
            }
        } catch (error) {
            console.error('[API /api/admin/login] Error processing request:', error);
            return c.json({ success: false, error: 'Interná chyba servera.' }, 500);
        }
    });
}