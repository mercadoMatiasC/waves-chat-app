<?php

namespace App\Http\Controllers;

use App\Events\PrivateFriendRequestReceived;
use App\Http\Resources\FriendResource;
use App\Http\Resources\UserIndexResource;
use App\Http\Resources\UserShowResource;
use App\Models\User;
use App\Services\ConversationService;
use App\Services\FriendService;
use Illuminate\Support\Facades\Auth;

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
        $me = Auth::user();
        
        $senderData = [
            'username' => $me->username,
            'profile_image_route' => $me->profile_image_route ? asset('storage/' . $me->profile_image_route) : null
        ];

        broadcast(new PrivateFriendRequestReceived($user->id, $senderData))->toOthers();

        return (new FriendResource($friend_request))->response()->setStatusCode(201);
    }

    public function accept(User $user, FriendService $friendService, ConversationService $convService) {
        $friend_request = $friendService->acceptFriendRequest($user);
        Auth::user()->refresh();

        //CREATING THE 1-to-1 CONVERSATION
        $participant_ids = [$user->id];
        $convService->storeConversation([], $participant_ids);

        return (new FriendResource($friend_request))->response()->setStatusCode(200);
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
