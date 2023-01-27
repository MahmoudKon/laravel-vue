<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoRequest;
use App\Http\Resources\TodosResource;
use App\Models\Todo;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isNull;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::when( in_array(request()->completed, [0, 1]), function($query) {
            $query->where('is_done', request()->completed);
        })->get();
        return TodosResource::collection( $todos );
    }

    public function notCompleted()
    {
        return Todo::where('is_done', false)->count();
    }

    public function store(TodoRequest $request)
    {
        Todo::create($request->validated());
        return response()->noContent();
    }

    public function update(TodoRequest $request, Todo $todo)
    {
        $todo->update($request->validated());
        return response()->noContent();
    }

    public function changeStatus(Todo $todo)
    {
        $completed_at = $todo->is_done ? null : now();
        $todo->update(['is_done' => ! $todo->is_done, 'completed_at' => $completed_at]);
        return response()->noContent();
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response()->noContent();
    }

    public function destroyCompleted()
    {
        Todo::where('is_done', true)->delete();
        return response()->noContent();
    }
}
