<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    //-- RELATIONSHIPS --
    public function conversations(){
        return $this->belongsToMany(Conversation::class, 'participants')->using(Participant::class)->withPivot('last_read_at', 'last_joined_at')->withTimestamps();
    }

    public function ownedConversations() {
        return $this->hasMany(Conversation::class, 'owner_id');
    }

    public function wave(){
        return $this->hasOne(Wave::class);
    }

    //FRIENDSHIPS WHERE USER IS THE lower_user_id
    public function friendsLower() {
        return $this->belongsToMany(User::class, 'friends', 'lower_user_id', 'higher_user_id')->withPivot('request_accepted', 'sender_id')->withTimestamps();
    }

    //FRIENDSHIPS WHERE USER IS THE higher_user_id
    public function friendsHigher() {
        return $this->belongsToMany(User::class, 'friends', 'higher_user_id', 'lower_user_id')->withPivot('request_accepted', 'sender_id')->withTimestamps();
    }

    //MERGE ALL FRIENDSHIPS IN A SINGLE TABLE
    public function getAllFriendshipsAttribute() {
        return $this->friendsLower->merge($this->friendsHigher);
    }

    //-- GET --
    public function isAdmin(){
        return $this->is_admin == 1;
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
