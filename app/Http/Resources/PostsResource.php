<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class PostsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'         => $this->id,
            'title'      => $this->title,
            'content' => $this->content,
            'short_content'=> Str::limit($this->content, 50),
            'image'      => $this->image ? asset($this->image) : null,
            'category_id'=> $this->category_id,
            'category'   => $this->category->name,
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
