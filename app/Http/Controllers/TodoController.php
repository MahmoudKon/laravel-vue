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
            $query->where('completed', request()->completed);
        })->get();
        return TodosResource::collection( $todos );
    }

    public function notCompleted()
    {
        return Todo::where('completed', false)->count();
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
        $completed_at = $todo->completed ? null : now();
        $todo->update(['completed' => !$todo->completed, 'completed_at' => $completed_at]);
        return response()->noContent();
    }

    public function changeAllStatus(Request $request)
    {
        $query = clone $update_query = Todo::query();
        $completed_at = $request->status ? now() : null;
        $update_query->update(['completed' => $request->status, 'completed_at' => $completed_at]);
        return TodosResource::collection( $query->get() );
        return response()->noContent();
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response()->noContent();
    }

    public function destroyCompleted()
    {
        Todo::where('completed', true)->delete();
        return response()->noContent();
    }
}
