<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'completed', 'completed_at', 'user_id', 'priority'];

    public function user()
    {
        return $this->belongsTo(User::class)->select('id', 'name');
    }

    public function getPriority()
    {
        if ($this->priority == 0) return 'gray';
        if ($this->priority == 1) return 'green';
        if ($this->priority == 2) return 'yellow';
        if ($this->priority == 3) return 'red';
        return 'gray';
    }

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('auth', function (Builder $builder) {
            $builder->where('user_id', auth()->id())->orderBy('id', 'DESC');
        });

        self::creating(function($model) {
            $model->completed = $model->completed ?? false;
            $model->user_id = 1;
        });
    }
}
