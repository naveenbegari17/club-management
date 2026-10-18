import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  Clock, 
  Building2, 
  UserCheck, 
  ShieldAlert
} from 'lucide-react';
import { MEMBERS_DATA } from '../data/mockData';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Executive Council');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Title */}
      <div className="bg-white rounded-3xl p-7 lg:p-9 border border-[#cbdbf5] shadow-2xs space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eff4ff] text-[#004ac6] border border-[#cbdbf5] text-xs font-bold">
          <Mail className="w-3.5 h-3.5" />
          <span>Campus Contact & Senate Liaison</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
          Get in Touch with ClubSync Leadership
        </h1>
        <p className="text-xs lg:text-sm text-[#434655]">
          Have questions regarding domain quotas, deliverable verifications, or university sponsorship collaborations? Reach out directly to the executive council or respective domain leads.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Contact Form (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-[#cbdbf5] shadow-2xs">
          <h3 className="text-sm font-bold text-[#0b1c30] mb-4">
            Send an Official Transmission
          </h3>

          {submitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-emerald-900">Transmission Dispatched</h4>
              <p className="text-xs text-emerald-800">
                Your message has been logged in the Student Senate dispatch queue. The respective domain lead will respond within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0b1c30] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyanshi Mehta"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-[#0b1c30] rounded-xl border border-[#cbdbf5] bg-[#f8f9ff] focus:bg-white focus:outline-none focus:border-[#004ac6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0b1c30] mb-1">
                    Campus Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@campus.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-[#0b1c30] rounded-xl border border-[#cbdbf5] bg-[#f8f9ff] focus:bg-white focus:outline-none focus:border-[#004ac6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0b1c30] mb-1">
                  Target Domain or Bureau
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-[#0b1c30] rounded-xl border border-[#cbdbf5] bg-[#f8f9ff] focus:outline-none focus:border-[#004ac6]"
                >
                  <option value="Executive Council">Executive Council (President & VP)</option>
                  <option value="Technical Domain">Technical Domain (Web, App, AI/ML)</option>
                  <option value="Design Domain">Design Domain (Branding & UI/UX)</option>
                  <option value="Event Management">Event Management (Auditorium & AV)</option>
                  <option value="Content & Docs">Content & Editorial Board</option>
                  <option value="Sponsorship & Outreach">Sponsorship & Corporate Relations</option>
                  <option value="Social Media & PR">Social Media & Broadcasting</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0b1c30] mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Deliverable verification query or sprint partnership"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-[#0b1c30] rounded-xl border border-[#cbdbf5] bg-[#f8f9ff] focus:bg-white focus:outline-none focus:border-[#004ac6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0b1c30] mb-1">
                  Message Body *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Please specify details regarding sprint items, quotas, or governance requests..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-[#0b1c30] rounded-xl border border-[#cbdbf5] bg-[#f8f9ff] focus:bg-white focus:outline-none focus:border-[#004ac6]"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#004ac6] hover:bg-[#1d4ed8] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Transmission</span>
              </button>
            </form>
          )}
        </div>

        {/* Office Details & Domain Leads (5 cols) */}
        <div className="md:col-span-5 space-y-5">
          {/* Physical Office Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#cbdbf5] shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-[#0b1c30]">Student Union Secretariat</h3>
            
            <div className="space-y-3 text-xs text-[#434655]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#004ac6] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#0b1c30]">Campus Location</div>
                  <div>Student Activity Center (SAC), Room 304</div>
                  <div>North Quadrangle Campus</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#004ac6] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#0b1c30]">Desk Hours</div>
                  <div>Mon – Fri: 10:00 AM – 6:00 PM</div>
                  <div>Weekend: By Senate appointment</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#004ac6] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#0b1c30]">Official Desk</div>
                  <div className="text-[#004ac6] font-mono text-[11px]">senate.clubsync@campus.edu</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contacts */}
          <div className="bg-[#eff4ff] rounded-3xl p-5 border border-[#cbdbf5] space-y-3">
            <h4 className="text-xs font-bold text-[#004ac6] uppercase tracking-wider">
              Lead Officers On Duty
            </h4>
            <div className="space-y-2">
              {MEMBERS_DATA.slice(0, 3).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-white/80 border border-[#cbdbf5]">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${lead.avatarBg} text-white flex items-center justify-center font-bold text-[10px]`}>
                      {lead.avatarLetter}
                    </div>
                    <div>
                      <div className="font-bold text-[#0b1c30] text-[11px] leading-tight">{lead.name}</div>
                      <div className="text-[10px] text-[#737686]">{lead.role}</div>
                    </div>
                  </div>
                  <a 
                    href={`mailto:${lead.email}`}
                    className="text-[10px] font-semibold text-[#004ac6] hover:underline"
                  >
                    Email
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
