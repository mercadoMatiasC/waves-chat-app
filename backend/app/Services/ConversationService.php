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

    protected function ensureNewMembersAreFriends(User $auth_user, array $participant_ids) {
        if (empty($participant_ids)) 
            return;

        $invited_users = User::whereIn('id', $participant_ids)->get();

        foreach ($invited_users as $invited_user)
            if (!$auth_user->isFriendsWith($invited_user))
                throw new BusinessException("User {$invited_user->name} is not in your friends list.");
    }

    public function storeConversation(array $data, array $participant_ids, ?User $owner = null) {
        return DB::transaction(function () use ($data, $participant_ids, $owner) {            
            $auth_user = Auth::user();
            $this->ensureNewMembersAreFriends($auth_user, $participant_ids);

            if (!$owner) 
                $this->checkForExistingOneToOne($participant_ids);
            else
                $data['owner_id'] = $owner->id;

            array_push($participant_ids, $auth_user->id);
            $participant_ids = array_unique($participant_ids);

            $conversation = Conversation::create($data);

            $pivotData = [];
            foreach ($participant_ids as $id)
                $pivotData[$id] = ['last_joined_at' => now()];
            
            $conversation->participants()->attach($pivotData);

            return $conversation;
        });
    }

    public function updateConversation(array $data, array $participant_ids, Conversation $conversation) {
        if (!$conversation->isGroup()) 
            throw new BusinessException("This conversation is not a group!");

        if (!$conversation->owner->is(Auth::user()))
            throw new BusinessException("You don't have permission to update this chat information.");

        return DB::transaction(function () use ($data, $participant_ids, $conversation) {
            $conversation->refresh()->lockForUpdate();
            $current_ids = $conversation->participants()->pluck('users.id')->toArray();

            $new_ids = array_diff($participant_ids, $current_ids);
            $this->ensureNewMembersAreFriends(Auth::user(), $new_ids);

            $syncData = [];
            foreach ($participant_ids as $id) 
                $syncData[$id] = (in_array($id, $new_ids)) ? ['last_joined_at' => now()] : [];

            $conversation->participants()->sync($syncData);
            $conversation->update($data);

            return $conversation->load('participants');
        });
    }
}