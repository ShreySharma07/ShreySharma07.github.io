// Shrey's Medium posts, newest first.
export const POSTS = [
  {
    id: 'argus',
    title: 'Argus: a fraud investigator that knows when to ask',
    date: '2026-09-24',
    minutes: 10,
    tag: 'agents',
    cover: 'https://miro.medium.com/v2/resize:fit:700/1*I-mSUmLRGi-iLE-Ud4EYew.png',
    href: 'https://medium.com/@shrey7shrey/argus-a-fraud-investigator-that-knows-when-to-ask-6ebd34b45a8a'
  },
  {
    id: 'auramind',
    title: 'AuraMind: Building a RAG-Powered GenAI Mental Health Companion',
    date: '2025-04-20',
    minutes: 4,
    tag: 'rag',
    cover: 'https://miro.medium.com/v2/resize:fit:700/1*iLryIFaC-FY3_ws0E3AqSA.png',
    href: 'https://medium.com/@shrey7shrey/auramind-building-a-rag-powered-genai-mental-health-companion-77a7a79cb6d1'
  }
];

export const formatDate = iso =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
