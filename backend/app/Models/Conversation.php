<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $casts = [
        'is_group' => 'boolean',
    ];

    //-- RELATIONSHIPS --
    public function owner(){
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function participants() {
        return $this->belongsToMany(User::class, 'participants')->withPivot('last_read_at', 'last_joined_at')->withTimestamps();
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
