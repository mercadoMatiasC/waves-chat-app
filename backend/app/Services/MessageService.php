<?php
namespace App\Services;

use App\Exceptions\BusinessException;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MessageService {
    public function checkIfUserCanSeeMessage(Message $message) {
        $is_participant = $message->conversation->participants->contains('id', Auth::id());

        if (!$is_participant)
            throw new BusinessException("You cannot see this message.");
    }

    public function checkIfUserCanManageMessage(Conversation $conversation, $sender_id, ?Message $message = null){
        if ($message && ($message->sender_id !== Auth::id()))
            throw new BusinessException("You cannot edit a message you didn't send.");

        if ((int) $sender_id !== Auth::id())
            throw new BusinessException("You cannot send a message under other user's sender_id.");

        if (!$conversation->participants()->where('user_id', Auth::id())->exists())
            throw new BusinessException("You are not a member of this conversation.");
    }

    public function storeMessage(array $data, Conversation $conversation) {
        $this->checkIfUserCanManageMessage($conversation, $data['sender_id']);

        return DB::transaction(function () use ($data, $conversation) {   
            $message = $conversation->messages()->create($data);
            $conversation->touch();

            return $message;
        });
    }

    public function updateMessage(array $data, Conversation $conversation, Message $message) {
        $this->checkIfUserCanManageMessage($conversation, $message->sender_id, $message);

        return DB::transaction(function () use ($data, $message) {
            $message->refresh()->lockForUpdate();
            $message->update($data);
            return $message;
        });
    }
}