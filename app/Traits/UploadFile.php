<?php

namespace App\Traits;

use Illuminate\Support\Facades\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;


trait UploadFile
{
    public function uploadImage(UploadedFile $file, $folder)
    {
        $path = $this->getPath($folder);
        $name = $file->hashName();
        Storage::disk('public')->put($path.$name, $file->getContent(), 'public');
        return $name;
    }

    public function remove($file)
    {
        if (!$file) return true;
        $path = public_path($file);
        if (File::exists($path))
            unlink($path);
    }

    protected function getPath($folder, $file_name = '')
    {
        return "uploads/$folder/$file_name";
    }
}