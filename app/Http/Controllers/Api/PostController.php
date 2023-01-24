<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostsResource;
use App\Models\Post;
use App\Traits\UploadFile;

class PostController extends Controller
{
    use UploadFile;

    public function index()
    {
        $posts = Post::with('category')
                    ->when(request()->get('category'), function($query) {
                        $query->where('category_id', request()->get('category'));
                    })
                    ->where(function($query) {
                        $query->when(request('search'), function($query) {
                            $query->where('title', 'LIKE', '%'. request('search'). '%')
                                    ->orWhere('content', 'LIKE', '%'. request('search'). '%');
                        });
                    })
                    ->when(request('post_id'), function($query) {
                        $query->where('id', request('post_id'));
                    })
                    ->orderBy(request('column', 'id'), request('order', 'DESC'))
                    ->paginate(5);
        return PostsResource::collection( $posts );
    }

    public function store(PostRequest $request)
    {
        $data = $request->validated();
        if ($request->image)
            $data['image'] = $this->uploadImage($request->image, 'posts');
        $post = Post::create($data);
        return new PostsResource($post);
    }

    public function show(Post $post)
    {
        return new PostsResource($post);
    }

    public function update(Post $post, PostRequest $request)
    {
        $data = $request->validated();
        if ( isset($data['image']) && $data['image'] ) {
            $this->remove($post->image);
            $data['image'] = $this->uploadImage($request->image, 'posts');
        }
        $post->update($data);
        return new PostsResource($post);
    }

    public function destroy(Post $post)
    {
        $post->delete();
        $this->remove($post->image);
        return response()->noContent();
    }
}
