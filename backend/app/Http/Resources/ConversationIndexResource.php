<?php 
namespace App\Http\Resources; 

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource; 
    
class ConversationIndexResource extends JsonResource{ 
    public function toArray(Request $request): array { 
        return [
            'id' => $this->id,
            'is_group' => $this->is_group,
            'owner_id' => $this->owner_id,
            'group_title' => $this->group_title,
            'latest_message' => $this->latestMessage ? [
                'text' => $this->latestMessage->text_body,
                'created_at' => $this->latestMessage->created_at,
            ] : null,
            'other_end_user' => $this->when(
                !$this->is_group, 
                fn() => new UserIndexResource($this->other_participant)
            ),
        ];
    } 
}