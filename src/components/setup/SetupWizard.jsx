import React, { useState } from 'react';
import { useDC } from '../../context/DCContext';
import { 
  Building, 
  Users, 
  UserPlus, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  Trash2, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export const SetupWizard = () => {
  const { 
    departments, addDepartment, 
    teams, addTeam, 
    members, registerMember, 
    assignMemberToTeam, 
    completeSetupWizard 
  } = useDC();

  const [step, setStep] = useState(1);

  // Step 1 state: Add department
  const [newDeptCode, setNewDeptCode] = useState('');
  const [newDeptName, setNewDeptName] = useState('');

  // Step 2 state: Add team
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDesc, setNewTeamDesc] = useState('');

  // Step 3 state: Add member
  const [mName, setMName] = useState('');
  const [mDept, setMDept] = useState('COMPUTER SCIENCE');
  const [mEmail, setMEmail] = useState('');
  const [mPhone, setMPhone] = useState('+91 90000 00000');
  const [mTeam, setMTeam] = useState('Media Team');

  const handleAddDept = (e) => {
    e.preventDefault();
    if (!newDeptCode.trim() || !newDeptName.trim()) return;
    addDepartment(newDeptCode, newDeptName);
    setNewDeptCode('');
    setNewDeptName('');
  };

  const handleAddTeam = (e) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;
    addTeam(newTeamName, newTeamDesc || 'Operational team unit');
    setNewTeamName('');
    setNewTeamDesc('');
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!mName.trim() || !mEmail.trim()) return;
    registerMember({
      name: mName,
      department: mDept,
      email: mEmail,
      phone: mPhone,
      team: mTeam,
      roleTitle: 'MEMBER'
    });
    setMName('');
    setMEmail('');
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-slate-900 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0A2342] via-slate-950 to-[#800020] p-6 text-white border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#0A2342] flex items-center justify-center font-black text-sm border-2 border-[#800020] shadow-md">
              DC
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">Initial College Setup Wizard</h1>
              <p className="text-xs text-gray-300">Dhaanish College of Engineering • First-Time Configuration</p>
            </div>
          </div>

          <div className="text-right font-mono text-xs">
            <span className="text-amber-400 font-bold">Step {step} of 4</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-800 h-1.5">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-[#800020] transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Steps Content */}
        <div className="p-6 sm:p-8 space-y-6 flex-1 overflow-y-auto">
          
          {/* STEP 1: DEPARTMENTS */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building className="w-5 h-5 text-cyan-400" />
                  <span>Step 1: Configure College Departments</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">Add all academic departments operating at Dhaanish College.</p>
              </div>

              <form onSubmit={handleAddDept} className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-gray-800 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Dept Code (e.g. CSE AI)"
                  value={newDeptCode}
                  onChange={(e) => setNewDeptCode(e.target.value)}
                  className="bg-gray-900 border border-gray-800 text-white px-3 py-2 rounded-xl focus:border-cyan-500 focus:outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="Full Department Name"
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  className="bg-gray-900 border border-gray-800 text-white px-3 py-2 rounded-xl focus:border-cyan-500 focus:outline-none"
                />
                <button type="submit" className="bg-[#0A2342] hover:bg-indigo-900 text-white font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Add Department</span>
                </button>
              </form>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
                {departments.map(d => (
                  <div key={d.id} className="p-3 rounded-xl bg-gray-950 border border-gray-800 text-xs">
                    <span className="font-bold text-cyan-400 font-mono block">{d.code}</span>
                    <span className="text-gray-300 text-[11px] line-clamp-1">{d.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: TEAMS */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-400" />
                  <span>Step 2: Create Permanent Operations Teams</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">Configure permanent team units for event management.</p>
              </div>

              <form onSubmit={handleAddTeam} className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-gray-800 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Team Name (e.g. Media Team)"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="bg-gray-900 border border-gray-800 text-white px-3 py-2 rounded-xl focus:border-indigo-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newTeamDesc}
                  onChange={(e) => setNewTeamDesc(e.target.value)}
                  className="bg-gray-900 border border-gray-800 text-white px-3 py-2 rounded-xl focus:border-indigo-500 focus:outline-none"
                />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Add Team</span>
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                {teams.map(t => (
                  <div key={t.id} className="p-3 rounded-xl bg-gray-950 border border-gray-800 text-xs space-y-1">
                    <span className="font-bold text-white block">{t.name}</span>
                    <span className="text-gray-400 text-[11px] line-clamp-1">{t.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: ADD MEMBERS */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-emerald-400" />
                  <span>Step 3: Register Initial Members & Generate Profiles</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">Add student volunteers, leads, and faculty coordinators across departments.</p>
              </div>

              <form onSubmit={handleAddMember} className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 p-4 rounded-2xl border border-gray-800 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Member Name (e.g. Karimulla)"
                  value={mName}
                  onChange={(e) => setMName(e.target.value)}
                  className="bg-gray-900 border border-gray-800 text-white px-3 py-2 rounded-xl focus:outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={mEmail}
                  onChange={(e) => setMEmail(e.target.value)}
                  className="bg-gray-900 border border-gray-800 text-white px-3 py-2 rounded-xl focus:outline-none"
                />
                <select
                  value={mDept}
                  onChange={(e) => setMDept(e.target.value)}
                  className="bg-gray-900 border border-gray-800 text-white px-3 py-2 rounded-xl focus:outline-none"
                >
                  {departments.map(d => <option key={d.id} value={d.code}>{d.name} ({d.code})</option>)}
                </select>
                <select
                  value={mTeam}
                  onChange={(e) => setMTeam(e.target.value)}
                  className="bg-gray-900 border border-gray-800 text-white px-3 py-2 rounded-xl focus:outline-none"
                >
                  {teams.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>
                <button type="submit" className="sm:col-span-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Register & Remove Photo Background (Simulate)</span>
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-52 overflow-y-auto">
                {members.map(m => (
                  <div key={m.id} className="p-3 rounded-xl bg-gray-950 border border-gray-800 text-xs flex items-center gap-3">
                    <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-lg object-cover" />
                    <div>
                      <div className="font-bold text-white">{m.name} ({m.id})</div>
                      <div className="text-[10px] text-cyan-400">{m.department} • {m.team}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: ASSIGN MEMBERS TO TEAMS & FINISH */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>Step 4: Verify Team Mapping & Launch DC System</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">Review assigned members under permanent teams before finalizing initial setup.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-72 overflow-y-auto pr-1">
                {teams.slice(0, 6).map(t => {
                  const assigned = members.filter(m => m.team === t.name);
                  return (
                    <div key={t.id} className="p-4 rounded-2xl bg-slate-950 border border-gray-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                        <span>{t.name}</span>
                        <span className="font-mono text-gray-400">{assigned.length} Members</span>
                      </div>
                      <div className="space-y-1 text-xs">
                        {assigned.length > 0 ? (
                          assigned.map(m => (
                            <div key={m.id} className="text-gray-300 font-medium flex justify-between">
                              <span>{m.name}</span>
                              <span className="text-[10px] text-gray-500 font-mono">{m.department}</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-[11px] text-gray-500 italic">No members assigned yet</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="p-6 bg-slate-950 border-t border-gray-800 flex items-center justify-between">
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              step === 1 ? 'opacity-40 cursor-not-allowed bg-gray-800 text-gray-500' : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#0A2342] hover:bg-indigo-900 text-white text-xs font-bold shadow-lg"
            >
              <span>Continue to Step {step + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={completeSetupWizard}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-xs font-bold shadow-xl animate-pulse"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Complete Setup & Open DC Ecosystem</span>
            </button>
          )}
        </div>

      </motion.div>
    </div>
  );
};
