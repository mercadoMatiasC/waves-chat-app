<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Http\Resources\FriendResource;
use App\Http\Resources\UserIndexResource;
use App\Models\User;
use App\Services\ConversationService;
use App\Services\FriendService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FriendController extends Controller
{
    protected function getUnifiedFriendships() {
        $user = Auth::user()->load(['friendsLower', 'friendsHigher']);

        return $user->friendsLower->merge($user->friendsHigher);
    }

    public function index() {
        $friends = $this->getUnifiedFriendships()->where('pivot.request_accepted', true);

        return UserIndexResource::collection($friends);
    }

    public function sentRequests() {
        $user = Auth::user();
        $sent = $this->getUnifiedFriendships()->where('pivot.request_accepted', false)->where('pivot.sender_id', $user->id);

        return UserIndexResource::collection($sent);
    }

    public function receivedRequests() {
        $user = Auth::user();
        $received = $this->getUnifiedFriendships()->where('pivot.request_accepted', false)->where('pivot.sender_id', '!=', $user->id);

        return UserIndexResource::collection($received);
    }

    public function store(User $user, FriendService $service) {
        $friend_request = $service->storeFriendRequest($user);

        return (new FriendResource($friend_request))->response()->setStatusCode(201);
    }

    public function accept(User $user, FriendService $friendService, ConversationService $convService) {
        return DB::transaction(function () use ($user, $friendService, $convService) {
            $friend_request = $friendService->acceptFriendRequest($user);
            
            $participant_ids = [Auth::id(), $user->id];
            $convService->storeConversation([], $participant_ids);

            return (new FriendResource($friend_request))->response()->setStatusCode(200);
        });
    }

    public function destroy(User $user, FriendService $service) {
        $service->removeFriend($user);
        
        return response()->json(
            [
                'success' => true,
                'message' => 'Friend removed successfully'
            ], 200);
    }
}
