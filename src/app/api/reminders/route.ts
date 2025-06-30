import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Reminder from '@/model/reminder';

export async function GET() {
  await connectDB();
  const reminders = await Reminder.find().sort({ date: 1 });
  return NextResponse.json({ reminders });
}

export async function POST(req: Request) {
  const { title, date, repeat,  userId } = await req.json();
  await connectDB();
  const reminder = await Reminder.create({ title, date, repeat,  userId, isDone: false });
  return NextResponse.json({ message: 'Reminder created', reminder });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await connectDB();
  await Reminder.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Reminder deleted' });
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await connectDB();
  await Reminder.findByIdAndUpdate(id, { isDone: true });
  return NextResponse.json({ message: 'Marked as done' });
}
