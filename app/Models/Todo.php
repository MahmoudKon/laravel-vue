<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'is_done', 'completed_at', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class)->select('id', 'name');
    }

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('auth', function (Builder $builder) {
            $builder->where('user_id', 1)->orderBy('id', 'DESC');
        });

        self::creating(function($model) {
            $model->user_id = 1;
        });
    }
}
