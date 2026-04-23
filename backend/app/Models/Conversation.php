<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Conversation extends Model
{
    protected $fillable = [
        'owner_id',
        'is_group',
        'group_title',
    ];

    protected $casts = [
        'is_group' => 'boolean',
    ];

    //-- RELATIONSHIPS --
    public function owner(){
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function participants() {
        return $this->belongsToMany(User::class, 'participants')->withPivot(['last_joined_at', 'hidden_at', 'last_read_at'])->withTimestamps();
    }

    public function getOtherParticipantAttribute() { //FOR 1-to-1 CHATS
        return $this->participants->first(function ($user) {
            return $user->id !== Auth::id();
        });
    }

    public function messages() {
        return $this->hasMany(Message::class);
    }

    public function latestMessage() {
        return $this->hasOne(Message::class)->latestOfMany();
    }

    //-- GET --
    public function isGroup(): bool {
        return $this->is_group;
    }
}
