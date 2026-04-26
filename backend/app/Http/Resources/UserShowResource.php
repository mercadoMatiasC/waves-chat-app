<?php 
namespace App\Http\Resources; 

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class UserShowResource extends JsonResource{ 
    public function toArray(Request $request): array { 
        $me = Auth::user();

        return [
            'id' => $this->id,
            'username' => $this->username,
            'description' => $this->description,
            'profile_image_route' => $this->profile_image_route ? url($this->profile_image_route) : null,
            'wave' => (new WaveShowResource($this->whenLoaded('wave'))),
            'active_status' => $this->active_status,
            'is_admin' => $this->is_admin,
            'is_friend' => $me->isFriendsWith($this->resource),
            'chat_id' => ($me->id !== $this->id) ? $me->getConversationWith($this->resource) : null,
        ];
    } 
}