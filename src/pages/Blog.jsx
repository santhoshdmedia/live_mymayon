import { ArrowRight, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TriangleWatermark } from '../components/ui/Ornament';
import SectionTitle from '../components/ui/SectionTitle';
import Badge from '../components/ui/Badge';

const POSTS = [
  { slug:'arupadai-veedu-guide',         tag:'Spiritual',  title:'The Complete Guide to Arupadai Veedu in 5 Days', author:'My Mayon Team', date:'15 Jul 2026', readTime:'8 min', summary:'Everything you need to plan the six Murugan temple circuit — best season, transport, accommodation and darshan tips.' },
  { slug:'navagraha-temples-kumbakonam', tag:'Spiritual',  title:'Navagraha Temples: One Day in the Kaveri Delta', author:'Priya Venkatesh', date:'10 Jul 2026', readTime:'6 min', summary:'A practical one-day guide to all nine planet temples near Kumbakonam — timings, route and what to wear.' },
  { slug:'thanjavur-big-temple',         tag:'Heritage',   title:'Inside the Big Temple: A First-Timer\'s Briefing', author:'My Mayon Team', date:'05 Jul 2026', readTime:'5 min', summary:'What to know before you visit the UNESCO-listed Brihadeeswara — architecture, history and practical tips.' },
  { slug:'chettinad-food-trail',         tag:'Food',       title:'The Chettinad Kitchen Trail: A 2-Day Food Journey', author:'Anitha Raj', date:'28 Jun 2026', readTime:'7 min', summary:'From kuzhambu to kavuni arisi — how to eat your way through Karaikudi with a local host family.' },
  { slug:'kanyakumari-sunrise',          tag:'Coastal',    title:'Why Kanyakumari\'s Sunrise Is Worth the Early Wake',  author:'Suresh K.', date:'20 Jun 2026', readTime:'4 min', summary:'Three seas, one sunrise. We tell you exactly where to stand, what time to arrive, and what to do next.' },
  { slug:'pichavaram-mangroves',         tag:'Nature',     title:'Pichavaram Mangroves: The Boat Ride Worth Taking',  author:'My Mayon Team', date:'12 Jun 2026', readTime:'5 min', summary:'India\'s second largest mangrove forest is two hours from Chennai. Here\'s how to plan the perfect morning trip.' },
];

const TAG_COLORS = { Spiritual:'bg-rose-50 text-rose-700', Heritage:'bg-amber-50 text-amber-700', Food:'bg-orange-50 text-orange-700', Coastal:'bg-blue-50 text-blue-700', Nature:'bg-green-50 text-green-700' };

export default function Blog() {
  return (
    <div>
      <section className="relative bg-navy-radial text-cream py-20 overflow-hidden">
        <TriangleWatermark className="absolute -top-10 -right-20 w-[400px] opacity-[0.08]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <p className="font-accent italic text-gold-300 text-xl mb-2">Travel Stories</p>
          <h1 className="text-5xl font-bold mb-4">The My Mayon Journal</h1>
          <p className="text-navy-100 max-w-xl mx-auto text-lg">Practical guides, pilgrimage notes and local insights written by people who've been there.</p>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured post */}
          <div className="bg-white rounded-3xl overflow-hidden border border-navy-100 shadow-lg mb-10 grid grid-cols-1 lg:grid-cols-2">
            <div className="h-64 lg:h-auto bg-navy-radial flex items-center justify-center p-12">
              <span className="text-8xl">🛕</span>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className={`self-start text-xs font-bold px-2 py-1 rounded-full mb-3 ${TAG_COLORS['Spiritual']}`}>Featured · Spiritual</span>
              <h2 className="text-2xl font-bold text-navy-800 mb-3 leading-snug">{POSTS[0].title}</h2>
              <p className="text-navy-500 leading-relaxed mb-5">{POSTS[0].summary}</p>
              <div className="flex items-center gap-4 text-xs text-navy-400 mb-5">
                <span className="flex items-center gap-1"><User className="w-3 h-3" />{POSTS[0].author}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{POSTS[0].readTime} read</span>
                <span>{POSTS[0].date}</span>
              </div>
              <Link to={`/blog/${POSTS[0].slug}`} className="inline-flex items-center gap-2 text-gold-600 font-semibold hover:gap-3 transition-all">
                Read article <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Rest of posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.slice(1).map(post => (
              <Link key={post.slug} to={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-navy-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="h-40 bg-navy-radial flex items-center justify-center">
                  <span className="text-5xl">{ post.tag === 'Heritage' ? '🏛️' : post.tag === 'Food' ? '🍛' : post.tag === 'Coastal' ? '🌊' : post.tag === 'Nature' ? '🌿' : '🛕' }</span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className={`self-start text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${TAG_COLORS[post.tag] || 'bg-gray-50 text-gray-600'}`}>{post.tag}</span>
                  <h3 className="font-bold text-navy-800 leading-snug mb-2 flex-1">{post.title}</h3>
                  <p className="text-xs text-navy-500 leading-relaxed line-clamp-2 mb-3">{post.summary}</p>
                  <div className="flex items-center gap-3 text-xs text-navy-400 pt-3 border-t border-navy-100">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
