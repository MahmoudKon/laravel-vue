<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'content', 'image', 'category_id'];

    public function category()
    {
        return $this->belongsTo(Category::class)->select('id', 'name');
    }

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value && Storage::disk('public')->exists( "uploads/posts/$value" ) ? "storage/uploads/posts/$value" : null,
        );
    }

}
