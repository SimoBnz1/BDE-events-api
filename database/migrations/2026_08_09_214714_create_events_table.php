<?php

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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('location');
            $table->date('date_event');
            $table->decimal('price',6,2)->default(0.00);
            $table->integer('capacity');
            $table->enum('category', ['soiree', 'sport', 'culture', 'workshop', 'conference'])->default('culture');
            $table->enum('status', ['draft', 'published', 'cancelled'])->default('draft');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
