<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class PublicTestEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    
    public $message = "";

    /**
     * Create a new event instance.
     */
    public function __construct(string $message) {
        $this->message = $message;
        Log::info("PublicTestEvent constructed with message: " . $message);
    }
    
    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): array {
        return [
            new Channel('public-test'),
        ];
    }

    //SET EVENT NICKNAME FOR FRONTEND
    public function broadcastAs(): string {
        return 'test.event';
    }
}
