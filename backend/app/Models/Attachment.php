<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    protected $fillable = [
        'message_id',
        'is_image',
        'file_name',
        'file_size',
        'file_path',
    ];

    //-- RELATIONSHIPS --
    public function message(){
        return $this->belongsTo(Message::class);
    }
}
