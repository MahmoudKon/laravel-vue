<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoriesResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return CategoriesResource::collection( Category::withCount('posts')->paginate(5) );
    }

    public function list()
    {
        return Category::select('id', 'name')->get()->toArray();
    }
}
