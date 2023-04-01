<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Ramsey\Uuid\Uuid;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->uuid('assigned_to');
            //$table->unsignedBigInteger('assigned_to')->nullable()->default(null); // Set default value for 'assigned_to'
            $table->string('title');
            $table->string('priority');
            $table->integer('progress')->default(0);;
            $table->text('description');
            $table->enum('status', ['todo', 'in_progress', 'completed']);
            $table->datetime('due_date');
            $table->timestamps();
          //  $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
           // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
};
