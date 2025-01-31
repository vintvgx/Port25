import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Get the URL from the search params
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get('url');

    if (!videoUrl) {
      return new NextResponse('Missing video URL', { status: 400 });
    }

    // Fetch the video
    const response = await fetch(videoUrl);
    
    if (!response.ok) {
      return new NextResponse('Video not found', { status: 404 });
    }

    // Get the headers from the original response
    const headers = new Headers(response.headers);
    headers.set('Content-Type', 'video/mp4');
    
    // Stream the video content
    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 