<?php

namespace App\Http\Requests;

use App\Traits\UploadFile;
use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    use UploadFile;
    
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title'       => 'required|string|min:10|max:200',
            'content'     => 'required|string|min:10',
            'category_id' => 'required|numeric|exists:categories,id',
            'image'       => 'nullable|image|mimes:png,jpg',
        ];
    }

    protected function prepareForValidation()
    {
        if ( is_string($this->image) && $this->image ) {
            $this->merge(['image' => null]);
        }
    }

    public function attributes()
    {
        return ['category_id' => 'category'];
    }
}
