"use client";
import { useState } from 'react';

type Page = { id: string; slug: string; title: string; content: string };
const seed: Page[] = [
  { id: 'about', slug: 'about', title: 'About Us', content: 'Our story in demi-fine jewellery.' },
  { id: 'care', slug: 'care', title: 'Care', content: 'Keep jewellery dry and store separately.' },
];

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>(seed);
  const [draft, setDraft] = useState<Partial<Page>>({});

  const create = () => {
    if (!draft.title) return;
    const slug = (draft.slug || draft.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setPages([{ id: slug, slug, title: draft.title!, content: draft.content || '' }, ...pages]);
    setDraft({});
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-lg font-semibold">Create page</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input placeholder="Title" className="border rounded-lg px-3 py-2" value={draft.title || ''} onChange={e=>setDraft({ ...draft, title: e.target.value })} />
          <input placeholder="Slug (optional)" className="border rounded-lg px-3 py-2" value={draft.slug || ''} onChange={e=>setDraft({ ...draft, slug: e.target.value })} />
          <input placeholder="Content" className="sm:col-span-3 border rounded-lg px-3 py-2" value={draft.content || ''} onChange={e=>setDraft({ ...draft, content: e.target.value })} />
        </div>
        <div className="mt-4"><button className="btn" onClick={create}>Add page</button></div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold">Pages</h2>
        <ul className="mt-4 divide-y">
          {pages.map(p => (
            <li key={p.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-xs text-neutral-500">/{p.slug}</p>
              </div>
              <button className="btn-outline text-sm">Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


