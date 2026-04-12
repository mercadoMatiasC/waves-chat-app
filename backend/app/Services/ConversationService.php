<?php
namespace App\Services;

use App\Exceptions\BusinessException;
use App\Models\Conversation;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ConversationService {
    protected function checkForExistingOneToOne(array $user_ids) {
        //Checks if there's a 1-to-1 chat that has both users
        $exists = Conversation::where('is_group', false)->whereHas('participants', function($q) use ($user_ids) {
                $q->whereIn('user_id', $user_ids);
            }, '=', 2)->exists();

        if ($exists) 
            throw new BusinessException("A 1-to-1 chat already exists between these users.");
    }

    public function storeConversation(array $data, array $participant_ids, ?User $owner = null) {
        return DB::transaction(function () use ($data, $participant_ids, $owner) {            
            if (!$owner) 
                $this->checkForExistingOneToOne($participant_ids);
            else
                $data['owner_id'] = $owner->id;

            array_push($participant_ids, Auth::user()->id);
            $participant_ids = array_unique($participant_ids);

            $conversation = Conversation::create($data);

            $pivotData = [];
            foreach ($participant_ids as $id)
                $pivotData[$id] = ['last_joined_at' => now()];
            
            $conversation->participants()->attach($pivotData);

            return $conversation;
        });
    }

    public function updateConversation(array $data, Conversation $conversation) {
        if (!$conversation->isGroup()) 
            throw new BusinessException("This conversation is not a group!");

        if (!$conversation->owner->is(Auth::user()))
            throw new BusinessException("You don't have permission to update this chat information.");

        return DB::transaction(function () use ($data, $conversation) {
            $conversation->refresh()->lockForUpdate();
            $conversation->update($data);
            return $conversation;
        });
    }
}