import { BookOpen } from 'lucide-react';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import { POSTS, formatDate } from '../data/posts.js';
import { SITE } from '../data/site.js';

export default function Writing() {
  if (!POSTS.length) return null;
  return (
    <section className="block" aria-labelledby="writing">
      <SectionHead
        id="writing"
        title="Writing"
        aside="what I learned while building."
        action={<a className="see-all" href={SITE.medium} target="_blank" rel="noopener">See all</a>}
      />
      <ul className="posts">
        {POSTS.map((post, i) => (
          <Reveal as="li" key={post.id} delay={i * 70}>
            <a className="post" href={post.href} target="_blank" rel="noopener">
              <span className="post__cover" data-tag={post.tag}>
                <img src={post.cover} alt="" loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }} />
              </span>
              <span className="post__body">
                <time className="post__date" dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="post__title">{post.title}</span>
                <span className="post__meta">
                  <span><BookOpen aria-hidden="true" /> {post.minutes} min read</span>
                  <span className="post__tag">{post.tag}</span>
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
