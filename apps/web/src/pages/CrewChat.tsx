import { useState } from 'react';
import { useChat } from '../hooks/useChat';

export default function CrewChat() {
  const { messages, send } = useChat();
  const [text, setText] = useState('');
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Real-Time Crew Chat</h1>
      <div className="border rounded p-3 h-64 overflow-y-auto mb-3">
        {messages.map((m: any) => <div key={m.id} className="mb-1"><span className="text-gray-500 text-xs">{m.sender_id?.slice(0,6)}</span> {m.body}</div>)}
        {messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}
      </div>
      <form onSubmit={e => { e.preventDefault(); send(text); setText(''); }} className="flex gap-2">
        <input className="border p-2 rounded flex-1" value={text} onChange={e=>setText(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
}
