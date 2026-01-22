import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const galleryDir = path.join(process.cwd(), 'public', 'gallery');
  
  try {
    const files = fs.readdirSync(galleryDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );
    
    const images = imageFiles.map((file, index) => ({
      id: index + 1,
      title: file.replace(/\.[^/.]+$/, ''), // Remove file extension
      image: `/gallery/${file}`
    }));
    
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error reading gallery directory:', error);
    return NextResponse.json({ error: 'Failed to load gallery images' }, { status: 500 });
  }
}
