<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageService {
    public const PROFILEIMAGE_DIR = "user_avatars";

    public static function profileImageProcess(UploadedFile $file, string $filename = 'image.webp', int $size = 136, ?string $deletePath = null): string {
        if ($deletePath && Storage::disk('public')->exists($deletePath)) 
            Storage::disk('public')->delete($deletePath);

        $manager = new ImageManager(new Driver());
        $image = $manager->read($file);
        $image->cover($size, $size);
        
        $encoded = $image->toWebp(quality: 80);
        $path = self::PROFILEIMAGE_DIR . "/{$filename}";
        
        Storage::disk('public')->put($path, $encoded->toString());

        return $path;
    }
}