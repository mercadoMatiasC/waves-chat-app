import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { apiRequest } from './apiClient'; // Path to your api client

window.Pusher = Pusher;

export const echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                apiRequest('/broadcasting/auth', {
                    method: 'POST',
                    body: {
                        socket_id: socketId,
                        channel_name: channel.name
                    }
                })
                .then(data => {
                    callback(false, data);
                })
                .catch(error => {
                    console.error("Broadcast Auth Error:", error);
                    callback(true, error);
                });
            }
        };
    },
});