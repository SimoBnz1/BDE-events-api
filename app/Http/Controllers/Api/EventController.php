<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Event::query();

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $events = $query->latest()->get();

        return response()->json($events);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date_event' => 'required|date',
            'location' => 'required|string',
            'price' => 'required|numeric|min:0',
            'capacity' => 'required|integer|min:1',
            'category' => 'required|in:soiree,sport,culture,workshop,conference'
        ]);
        $validatedData['user_id'] = Auth::id();
        $validatedData['status'] = 'published';
        $event=Event::create($validatedData);
        return response()->json([
            'mssg'=>'evenments a ajouter',
            'event'=>$event]);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date_event' => 'required|date',
            'location' => 'required|string',
            'price' => 'required|numeric|min:0',
            'capacity' => 'required|integer|min:1',
            'category' => 'required|in:soiree,sport,culture,workshop,conference'
        ]);
        $event->update($validatedData);
        return response()->json([
            'mssg'=>'Event Updatign with successfuly',
            'event'=>$event
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();
        return response()->json([
            'mssg'=>'events deleted successfly',
            'event'=>$event
        ]);
        
        
    }
}
