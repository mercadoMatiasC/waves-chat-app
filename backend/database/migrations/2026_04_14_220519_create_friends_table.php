<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('friends', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class, 'higher_user_id')->constrained()->cascadeOnDelete();
            $table->foreignIdFor(User::class, 'lower_user_id')->constrained()->cascadeOnDelete();
            $table->foreignIdFor(User::class, 'sender_id')->constrained()->cascadeOnDelete()<
            $table->boolean('request_accepted')->default(false);
            $table->timestamps();
            $table->unique(['higher_user_id', 'lower_user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('friends');
    }
};
