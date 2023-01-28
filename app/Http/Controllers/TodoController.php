<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoRequest;
use App\Http\Resources\TodosResource;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return TodosResource::collection( Todo::get() );
    }

    public function notCompleted()
    {
        return Todo::where('completed', false)->count();
    }

    public function store(TodoRequest $request)
    {
        $todo = Todo::create($request->validated());
        return new TodosResource( $todo );
    }

    public function update(TodoRequest $request, Todo $todo)
    {
        $todo->update($request->validated());
        return new TodosResource( $todo );
    }

    public function changeStatus(Todo $todo)
    {
        $completed_at = $todo->completed ? null : now();
        $todo->update(['completed' => !$todo->completed, 'completed_at' => $completed_at]);
        return new TodosResource( $todo );
    }

    public function changeAllStatus(Request $request)
    {
        $query = clone $update_query = Todo::query();
        $completed_at = $request->status ? now() : null;
        $update_query->update(['completed' => $request->status, 'completed_at' => $completed_at]);
        return TodosResource::collection( $query->get() );
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
