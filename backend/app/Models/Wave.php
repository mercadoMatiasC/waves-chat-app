<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wave extends Model
{
    protected $fillable = [
        'user_id',
        'text_body',
        'colour_code',
        'emoji',
    ];

    //-- RELATIONSHIPS --
    public function user() {
        return $this->belongsTo(User::class);
    }
}