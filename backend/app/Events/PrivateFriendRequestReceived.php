<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PrivateFriendRequestReceived implements ShouldBroadcastNow {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public int $user_id, 
        public $senderData
    ) {}

    public function broadcastOn(): array {
        return [
            new PrivateChannel('user.' . $this->user_id)
        ];
    }

    public function broadcastAs(): string {
        return 'request.received';
    }
}
