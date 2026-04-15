<?php
namespace App\Services;

use App\Exceptions\BusinessException;
use App\Models\Friend;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FriendService {
    private function getSortedIds(int $idA, int $idB): array {
        $ids = [$idA, $idB];
        sort($ids);
        return $ids;
    }

    public function ensureUserCanSendRequest(User $requested_user, $sorted_ids){
        //CHECK IF THERE'S A REQUEST ALREADY
        $existing = Friend::where('lower_user_id', $sorted_ids[0])->where('higher_user_id', $sorted_ids[1])->first();

        if ($existing)
            throw new BusinessException($existing->request_accepted ? "You are already friends." : "A friend request is already pending.");

        if (Auth::id() === $requested_user->id)
            throw new BusinessException("You cannot send a friend request to yourself.");

        //CHECK IF THE REQUESTED USER IS AVAILABLE
        if (!$requested_user->active_status)
            throw new BusinessException("The requested user is not available.");
    }

    public function ensureRequestCanBeAccepted($request){
        if (!$request || $request->request_accepted)
            throw new BusinessException("No pending request found.");

        //CHECK IF THE SENDER USER IS NOT THE SAME REQUESTED
        if ($request->sender_id === Auth::id())
            throw new BusinessException("You cannot accept your own request.");
    }

    public function storeFriendRequest(User $requested_user) {
        $sorted_ids = $this->getSortedIds(Auth::id(), $requested_user->id);
        $this->ensureUserCanSendRequest($requested_user, $sorted_ids);

        return Friend::create([
            'lower_user_id'  => $sorted_ids[0],
            'higher_user_id' => $sorted_ids[1],
            'sender_id'      => Auth::id()
        ]);
    }

    public function acceptFriendRequest(User $sender_user) {
        $sorted_ids = $this->getSortedIds(Auth::id(), $sender_user->id);
        $friend_request = Friend::where('lower_user_id', $sorted_ids[0])->where('higher_user_id', $sorted_ids[1])->first();

        $this->ensureRequestCanBeAccepted($friend_request);

        return DB::transaction(function () use ($friend_request) {
            $friend_request->lockForUpdate();
            $friend_request->update(['request_accepted' => true]);

            return $friend_request;
        });
    }
}