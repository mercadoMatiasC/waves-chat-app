<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PrivateMessageUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public int $chat_id, 
        public $messageData
    ) {}

    public function broadcastOn(): array {
        return [
            new PrivateChannel('chat.' . $this->chat_id)
        ];
    }

    public function broadcastAs(): string {
        return 'message.updated';
    }
}
